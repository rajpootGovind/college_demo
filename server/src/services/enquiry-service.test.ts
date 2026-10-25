import { beforeEach, describe, expect, it } from 'vitest'
import { resetInMemoryEnquiries } from '../repositories/enquiry-repository.js'
import { submitAdmissionEnquiry, submitContactMessage } from './enquiry-service.js'

const admissionInput = {
  guardianName: 'Anita Mehra',
  studentName: 'Rohan Mehra',
  phone: '9876543210',
  email: 'anita@example.com',
  program: 'Middle School (Grades 6-8)',
  academicYear: '2027-28',
  message: 'Please share the admission pack.',
  consent: true,
}

beforeEach(() => {
  resetInMemoryEnquiries()
})

describe('submitAdmissionEnquiry', () => {
  it('stores a new enquiry and reports the CRM hand-off status', async () => {
    const receipt = await submitAdmissionEnquiry(admissionInput, {
      submissionId: 'submission-0001',
    })

    expect(receipt.status).toBe('new')
    expect(receipt.id).toMatch(/^mem_/)
    expect(receipt.persisted).toBe(false)
    expect(receipt.demo).toBe(true)
    expect(receipt.crm.status).toBe('skipped')
    expect(new Date(receipt.submittedAt).getTime()).not.toBeNaN()
  })

  it('returns the original receipt when the same submission id is retried', async () => {
    const first = await submitAdmissionEnquiry(admissionInput, {
      submissionId: 'submission-0002',
    })
    const second = await submitAdmissionEnquiry(admissionInput, {
      submissionId: 'submission-0002',
    })

    expect(second.status).toBe('duplicate')
    expect(second.id).toBe(first.id)
  })

  it('suppresses a repeat enquiry from the same phone and student', async () => {
    const first = await submitAdmissionEnquiry(admissionInput, {
      submissionId: 'submission-0003',
    })
    const second = await submitAdmissionEnquiry(
      { ...admissionInput, guardianName: 'Anita M.' },
      { submissionId: 'submission-0004' },
    )

    expect(second.status).toBe('duplicate')
    expect(second.id).toBe(first.id)
  })

  it('treats a different student as a new enquiry', async () => {
    await submitAdmissionEnquiry(admissionInput, { submissionId: 'submission-0005' })
    const second = await submitAdmissionEnquiry(
      { ...admissionInput, studentName: 'Isha Mehra' },
      { submissionId: 'submission-0006' },
    )

    expect(second.status).toBe('new')
  })
})

describe('submitContactMessage', () => {
  const contactInput = {
    name: 'Priya Nair',
    email: 'Priya@Example.com',
    subject: 'Admissions',
    message: 'Could you share the fee structure for the senior school?',
    consent: true,
  }

  it('stores a contact message and normalises the email', async () => {
    const receipt = await submitContactMessage(contactInput, {
      submissionId: 'submission-contact-1',
    })

    expect(receipt.status).toBe('new')
    expect(receipt.crm.status).toBe('skipped')
  })

  it('deduplicates repeat contact messages by email and subject', async () => {
    const first = await submitContactMessage(contactInput, {
      submissionId: 'submission-contact-2',
    })
    const second = await submitContactMessage(
      { ...contactInput, email: 'priya@example.com' },
      { submissionId: 'submission-contact-3' },
    )

    expect(second.status).toBe('duplicate')
    expect(second.id).toBe(first.id)
  })
})
