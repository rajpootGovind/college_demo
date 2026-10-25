import { env } from '../config/env.js'
import {
  getEnquiryRepository,
  type EnquiryRepository,
  type StoredEnquiry,
} from '../repositories/enquiry-repository.js'
import { logger } from '../utils/logger.js'
import { normaliseEmail, toE164 } from '../utils/normalise.js'
import type { AdmissionEnquiryInput, ContactInput } from '../validators/enquiry.js'
import { getCrmAdapter } from './crm/index.js'
import type { CrmLead } from './crm/types.js'

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000

export interface EnquiryReceipt {
  id: string
  status: 'new' | 'duplicate'
  submittedAt: string
  persisted: boolean
  crm: {
    status: 'forwarded' | 'skipped' | 'failed'
    message: string
  }
  demo: boolean
}

interface RequestContext {
  submissionId: string
  ipHash?: string
}

function toReceipt(
  record: StoredEnquiry,
  repository: EnquiryRepository,
  status: 'new' | 'duplicate',
): EnquiryReceipt {
  const crmStatus = record.crmStatus === 'pending' ? 'skipped' : record.crmStatus

  return {
    id: record.id,
    status,
    submittedAt: record.createdAt.toISOString(),
    persisted: repository.kind === 'mongodb',
    crm: {
      status: crmStatus,
      message:
        record.crmMessage ??
        (record.crmStatus === 'pending'
          ? 'CRM forwarding is still pending.'
          : 'No CRM status recorded.'),
    },
    demo: env.DEMO_MODE,
  }
}

async function forwardToCrm(
  record: StoredEnquiry,
  repository: EnquiryRepository,
): Promise<EnquiryReceipt> {
  const adapter = getCrmAdapter()
  const lead: CrmLead = {
    externalId: record.id,
    institutionId: record.institutionId,
    type: record.type,
    guardianName: record.guardianName,
    studentName: record.studentName,
    name: record.name,
    phoneE164: record.phoneE164,
    email: record.email,
    program: record.program,
    academicYear: record.academicYear,
    subject: record.subject,
    message: record.message,
    consent: record.consent,
    source: record.leadSource,
    submittedAt: record.createdAt.toISOString(),
  }

  const result = await adapter.pushLead(lead)
  await repository.updateCrmStatus(record.id, result.status, result.message)

  logger.info('enquiry.forwarded', {
    id: record.id,
    type: record.type,
    crmAdapter: adapter.name,
    crmStatus: result.status,
    persisted: repository.kind === 'mongodb',
  })

  return toReceipt({ ...record, crmStatus: result.status, crmMessage: result.message }, repository, 'new')
}

export async function submitAdmissionEnquiry(
  input: AdmissionEnquiryInput,
  context: RequestContext,
): Promise<EnquiryReceipt> {
  const repository = getEnquiryRepository()

  const alreadyStored = await repository.findBySubmissionId(
    context.submissionId,
    env.INSTITUTION_ID,
  )
  if (alreadyStored) {
    return toReceipt(alreadyStored, repository, 'duplicate')
  }

  const phoneE164 = toE164(input.phone)
  const studentName = input.studentName.trim()

  const recentDuplicate = await repository.findRecentDuplicate({
    institutionId: env.INSTITUTION_ID,
    type: 'admission',
    since: new Date(Date.now() - DUPLICATE_WINDOW_MS),
    phoneE164,
    studentName,
  })
  if (recentDuplicate) {
    logger.info('enquiry.duplicate_suppressed', { id: recentDuplicate.id })
    return toReceipt(recentDuplicate, repository, 'duplicate')
  }

  const record = await repository.create({
    submissionId: context.submissionId,
    institutionId: env.INSTITUTION_ID,
    type: 'admission',
    guardianName: input.guardianName.trim(),
    studentName,
    phone: input.phone.trim(),
    phoneE164,
    email: normaliseEmail(input.email),
    program: input.program.trim(),
    academicYear: input.academicYear.trim(),
    message: input.message?.trim() || undefined,
    consent: input.consent,
    consentAt: new Date(),
    leadSource: 'website-admission',
    status: 'new',
    crmStatus: 'pending',
    ipHash: context.ipHash,
  })

  return forwardToCrm(record, repository)
}

export async function submitContactMessage(
  input: ContactInput,
  context: RequestContext,
): Promise<EnquiryReceipt> {
  const repository = getEnquiryRepository()

  const alreadyStored = await repository.findBySubmissionId(
    context.submissionId,
    env.INSTITUTION_ID,
  )
  if (alreadyStored) {
    return toReceipt(alreadyStored, repository, 'duplicate')
  }

  const email = normaliseEmail(input.email)
  const recentDuplicate = await repository.findRecentDuplicate({
    institutionId: env.INSTITUTION_ID,
    type: 'contact',
    since: new Date(Date.now() - DUPLICATE_WINDOW_MS),
    email,
    subject: input.subject.trim(),
  })
  if (recentDuplicate) {
    return toReceipt(recentDuplicate, repository, 'duplicate')
  }

  const record = await repository.create({
    submissionId: context.submissionId,
    institutionId: env.INSTITUTION_ID,
    type: 'contact',
    name: input.name.trim(),
    phone: input.phone?.trim() || undefined,
    phoneE164: input.phone ? toE164(input.phone) : undefined,
    email,
    subject: input.subject.trim(),
    message: input.message.trim(),
    consent: input.consent,
    consentAt: new Date(),
    leadSource: 'website-contact',
    status: 'new',
    crmStatus: 'pending',
    ipHash: context.ipHash,
  })

  return forwardToCrm(record, repository)
}
