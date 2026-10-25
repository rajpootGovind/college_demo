import { describe, expect, it } from 'vitest'
import {
  admissionEnquirySchema,
  contactSchema,
  formatIssues,
  isValidIndianMobile,
} from './enquiry.js'

const validAdmission = {
  guardianName: 'Anita Mehra',
  studentName: 'Rohan Mehra',
  phone: '9876543210',
  email: 'ANITA@Example.com ',
  program: 'Middle School (Grades 6-8)',
  academicYear: '2027-28',
  message: 'We would like a campus tour.',
  consent: true,
}

describe('isValidIndianMobile', () => {
  it('accepts common Indian mobile formats', () => {
    expect(isValidIndianMobile('9876543210')).toBe(true)
    expect(isValidIndianMobile('+91 98765 43210')).toBe(true)
    expect(isValidIndianMobile('919876543210')).toBe(true)
  })

  it('rejects numbers that do not start with 6-9', () => {
    expect(isValidIndianMobile('1234567890')).toBe(false)
  })
})

describe('admissionEnquirySchema', () => {
  it('normalises whitespace and lowercases the email', () => {
    const result = admissionEnquirySchema.safeParse(validAdmission)

    expect(result.success).toBe(true)
    if (!result.success) return
    expect(result.data.guardianName).toBe('Anita Mehra')
    expect(result.data.email).toBe('anita@example.com')
  })

  it('rejects an invalid phone number', () => {
    const result = admissionEnquirySchema.safeParse({ ...validAdmission, phone: '12345' })

    expect(result.success).toBe(false)
    if (result.success) return
    expect(formatIssues(result.error).phone?.[0]).toMatch(/10-digit/i)
  })

  it('requires explicit consent', () => {
    const result = admissionEnquirySchema.safeParse({ ...validAdmission, consent: false })

    expect(result.success).toBe(false)
    if (result.success) return
    expect(formatIssues(result.error).consent?.[0]).toMatch(/consent/i)
  })

  it('rejects a filled honeypot', () => {
    const result = admissionEnquirySchema.safeParse({ ...validAdmission, website: 'spam' })

    expect(result.success).toBe(false)
  })

  it('allows an omitted optional email', () => {
    const { email: _email, ...withoutEmail } = validAdmission
    expect(admissionEnquirySchema.safeParse(withoutEmail).success).toBe(true)
  })
})

describe('contactSchema', () => {
  const validContact = {
    name: 'Priya Nair',
    email: 'priya@example.com',
    subject: 'Admissions',
    message: 'Could you share the fee structure for the senior school?',
    consent: true,
  }

  it('accepts a complete contact message', () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true)
  })

  it('requires a message of at least 20 characters', () => {
    const result = contactSchema.safeParse({ ...validContact, message: 'too short' })

    expect(result.success).toBe(false)
    if (result.success) return
    expect(formatIssues(result.error).message?.[0]).toMatch(/at least 20/i)
  })

  it('treats an empty optional phone as valid', () => {
    expect(contactSchema.safeParse({ ...validContact, phone: '' }).success).toBe(true)
  })

  it('rejects an invalid optional phone', () => {
    expect(contactSchema.safeParse({ ...validContact, phone: '000000' }).success).toBe(false)
  })
})

describe('formatIssues', () => {
  it('groups messages by field path', () => {
    const result = contactSchema.safeParse({ name: '', email: 'nope', consent: false })
    expect(result.success).toBe(false)
    if (result.success) return

    const details = formatIssues(result.error)
    expect(details.name).toBeDefined()
    expect(details.email).toBeDefined()
    expect(details.consent).toBeDefined()
  })
})
