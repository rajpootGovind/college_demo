import { describe, expect, it } from 'vitest'
import { admissionEnquirySchema } from './schema'

const base = {
  guardianName: 'Priya Sharma',
  studentName: 'Aarav Sharma',
  program: 'Primary School (Nursery – Grade V)',
  academicYear: '2026–27',
  consent: true,
}

describe('admissionEnquirySchema', () => {
  it('accepts common Indian mobile formats', () => {
    for (const phone of ['9810000000', '+91 98100 00000', '+919810000000', '98100-00000']) {
      const result = admissionEnquirySchema.safeParse({ ...base, phone })
      expect(result.success, phone).toBe(true)
    }
  })

  it('rejects landline-style or short numbers', () => {
    for (const phone of ['01204000000', '98100', '12345 67890']) {
      const result = admissionEnquirySchema.safeParse({ ...base, phone })
      expect(result.success, phone).toBe(false)
    }
  })

  it('requires consent and valid optional email', () => {
    const noConsent = admissionEnquirySchema.safeParse({
      ...base,
      phone: '9810000000',
      consent: false,
    })
    expect(noConsent.success).toBe(false)

    const badEmail = admissionEnquirySchema.safeParse({
      ...base,
      phone: '9810000000',
      email: 'not-an-email',
    })
    expect(badEmail.success).toBe(false)

    const emptyEmail = admissionEnquirySchema.safeParse({
      ...base,
      phone: '9810000000',
      email: '',
    })
    expect(emptyEmail.success).toBe(true)
  })
})
