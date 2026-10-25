import { randomUUID } from 'node:crypto'
import { isDatabaseConnected } from '../config/database.js'
import { EnquiryModel } from '../models/Enquiry.js'

export type EnquiryType = 'admission' | 'contact'
export type EnquiryStatus = 'new' | 'duplicate' | 'contacted'
export type CrmStatus = 'pending' | 'forwarded' | 'skipped' | 'failed'

export interface StoredEnquiry {
  id: string
  submissionId: string
  institutionId: string
  type: EnquiryType
  guardianName?: string
  studentName?: string
  name?: string
  phone?: string
  phoneE164?: string
  email?: string
  program?: string
  academicYear?: string
  subject?: string
  message?: string
  consent: boolean
  consentAt: Date
  leadSource: string
  status: EnquiryStatus
  crmStatus: CrmStatus
  crmMessage?: string
  createdAt: Date
}

export type EnquiryCreateInput = Omit<StoredEnquiry, 'id' | 'createdAt'> & { ipHash?: string }

export interface DuplicateQuery {
  institutionId: string
  type: EnquiryType
  since: Date
  phoneE164?: string
  studentName?: string
  email?: string
  subject?: string
}

export interface EnquiryRepository {
  readonly kind: 'mongodb' | 'memory'
  create(input: EnquiryCreateInput): Promise<StoredEnquiry>
  findBySubmissionId(submissionId: string, institutionId: string): Promise<StoredEnquiry | null>
  findRecentDuplicate(query: DuplicateQuery): Promise<StoredEnquiry | null>
  updateCrmStatus(id: string, status: CrmStatus, message: string): Promise<void>
}

type LeanEnquiry = {
  _id: { toString(): string }
  submissionId: string
  institutionId: string
  type: EnquiryType
  guardianName?: string
  studentName?: string
  name?: string
  phone?: string
  phoneE164?: string
  email?: string
  program?: string
  academicYear?: string
  subject?: string
  message?: string
  consent: boolean
  consentAt: Date
  leadSource: string
  status: EnquiryStatus
  crmStatus: CrmStatus
  crmMessage?: string
  createdAt: Date
}

function toStoredEnquiry(document: LeanEnquiry): StoredEnquiry {
  return {
    id: document._id.toString(),
    submissionId: document.submissionId,
    institutionId: document.institutionId,
    type: document.type,
    guardianName: document.guardianName,
    studentName: document.studentName,
    name: document.name,
    phone: document.phone,
    phoneE164: document.phoneE164,
    email: document.email,
    program: document.program,
    academicYear: document.academicYear,
    subject: document.subject,
    message: document.message,
    consent: document.consent,
    consentAt: document.consentAt,
    leadSource: document.leadSource,
    status: document.status,
    crmStatus: document.crmStatus,
    crmMessage: document.crmMessage,
    createdAt: document.createdAt,
  }
}

class MongoEnquiryRepository implements EnquiryRepository {
  readonly kind = 'mongodb' as const

  async create(input: EnquiryCreateInput): Promise<StoredEnquiry> {
    const created = await EnquiryModel.create(input)
    return toStoredEnquiry(created.toObject() as unknown as LeanEnquiry)
  }

  async findBySubmissionId(
    submissionId: string,
    institutionId: string,
  ): Promise<StoredEnquiry | null> {
    const document = await EnquiryModel.findOne({ submissionId, institutionId }).lean()
    return document ? toStoredEnquiry(document as unknown as LeanEnquiry) : null
  }

  async findRecentDuplicate(query: DuplicateQuery): Promise<StoredEnquiry | null> {
    const filter: Record<string, unknown> = {
      institutionId: query.institutionId,
      type: query.type,
      createdAt: { $gte: query.since },
    }

    if (query.type === 'admission') {
      filter.phoneE164 = query.phoneE164
      filter.studentName = query.studentName
    } else {
      filter.email = query.email
      filter.subject = query.subject
    }

    const document = await EnquiryModel.findOne(filter).sort({ createdAt: -1 }).lean()
    return document ? toStoredEnquiry(document as unknown as LeanEnquiry) : null
  }

  async updateCrmStatus(id: string, status: CrmStatus, message: string): Promise<void> {
    await EnquiryModel.updateOne({ _id: id }, { crmStatus: status, crmMessage: message })
  }
}

class InMemoryEnquiryRepository implements EnquiryRepository {
  readonly kind = 'memory' as const
  private readonly records: StoredEnquiry[] = []

  async create(input: EnquiryCreateInput): Promise<StoredEnquiry> {
    const record: StoredEnquiry = {
      ...input,
      id: `mem_${randomUUID()}`,
      createdAt: new Date(),
    }
    this.records.unshift(record)
    return record
  }

  async findBySubmissionId(
    submissionId: string,
    institutionId: string,
  ): Promise<StoredEnquiry | null> {
    return (
      this.records.find(
        (record) =>
          record.submissionId === submissionId && record.institutionId === institutionId,
      ) ?? null
    )
  }

  async findRecentDuplicate(query: DuplicateQuery): Promise<StoredEnquiry | null> {
    return (
      this.records.find((record) => {
        if (record.institutionId !== query.institutionId) return false
        if (record.type !== query.type) return false
        if (record.createdAt.getTime() < query.since.getTime()) return false
        if (query.type === 'admission') {
          return (
            record.phoneE164 === query.phoneE164 && record.studentName === query.studentName
          )
        }
        return record.email === query.email && record.subject === query.subject
      }) ?? null
    )
  }

  async updateCrmStatus(id: string, status: CrmStatus, message: string): Promise<void> {
    const record = this.records.find((item) => item.id === id)
    if (record) {
      record.crmStatus = status
      record.crmMessage = message
    }
  }

  reset() {
    this.records.length = 0
  }
}

const memoryRepository = new InMemoryEnquiryRepository()
const mongoRepository = new MongoEnquiryRepository()

export function getEnquiryRepository(): EnquiryRepository {
  return isDatabaseConnected() ? mongoRepository : memoryRepository
}

/** Test-only helper: clears the in-memory demo store. */
export function resetInMemoryEnquiries() {
  memoryRepository.reset()
}
