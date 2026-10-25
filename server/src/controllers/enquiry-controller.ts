import { randomUUID } from 'node:crypto'
import type { Request, Response } from 'express'
import {
  submitAdmissionEnquiry,
  submitContactMessage,
} from '../services/enquiry-service.js'
import { hashIp } from '../utils/normalise.js'
import type { AdmissionEnquiryInput, ContactInput } from '../validators/enquiry.js'

function resolveSubmissionId(req: Request, bodySubmissionId?: string): string {
  const header = req.header('x-idempotency-key')?.trim()
  const candidate = header && header.length > 0 ? header : bodySubmissionId

  if (candidate && candidate.length >= 8 && candidate.length <= 120) {
    return candidate
  }

  return randomUUID()
}

export async function createAdmissionEnquiry(req: Request, res: Response) {
  const body = req.body as AdmissionEnquiryInput
  const receipt = await submitAdmissionEnquiry(body, {
    submissionId: resolveSubmissionId(req, body.submissionId),
    ipHash: hashIp(req.ip),
  })

  res.status(receipt.status === 'duplicate' ? 200 : 201).json({
    success: true,
    data: receipt,
  })
}

export async function createContactMessage(req: Request, res: Response) {
  const body = req.body as ContactInput
  const receipt = await submitContactMessage(body, {
    submissionId: resolveSubmissionId(req, body.submissionId),
    ipHash: hashIp(req.ip),
  })

  res.status(receipt.status === 'duplicate' ? 200 : 201).json({
    success: true,
    data: receipt,
  })
}
