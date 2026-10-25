import { z } from 'zod'

const phonePattern = /^(?:\+?91)?[6-9]\d{9}$/

export function isValidIndianMobile(value: string) {
  return phonePattern.test(value.replace(/[\s-]/g, ''))
}

const phoneSchema = z
  .string()
  .trim()
  .min(10, 'Enter a 10-digit mobile number.')
  .refine(isValidIndianMobile, 'Enter a valid 10-digit Indian mobile number.')

const optionalEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Enter a valid email address.')
  .or(z.literal(''))
  .optional()

const submissionIdSchema = z.string().trim().min(8).max(120).optional()

const honeypotSchema = z
  .string()
  .max(0, 'This submission was flagged as spam.')
  .optional()

const consentSchema = z.boolean().refine((value) => value === true, {
  message: 'Consent to be contacted is required.',
})

export const admissionEnquirySchema = z.object({
  submissionId: submissionIdSchema,
  guardianName: z.string().trim().min(2, 'Guardian name is required.').max(80),
  studentName: z.string().trim().min(2, 'Student name is required.').max(80),
  phone: phoneSchema,
  email: optionalEmailSchema,
  program: z.string().trim().min(1, 'Select a class or stage of interest.').max(120),
  academicYear: z.string().trim().min(1, 'Academic year is required.').max(20),
  message: z.string().trim().max(600, 'Message must be under 600 characters.').optional(),
  consent: consentSchema,
  website: honeypotSchema,
})

export const contactSchema = z.object({
  submissionId: submissionIdSchema,
  name: z.string().trim().min(2, 'Name is required.').max(80),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .refine((value) => value === '' || isValidIndianMobile(value), 'Enter a valid mobile number.')
    .optional(),
  subject: z.string().trim().min(1, 'Choose a subject.').max(120),
  message: z
    .string()
    .trim()
    .min(20, 'Message must be at least 20 characters.')
    .max(1200, 'Message must be under 1200 characters.'),
  consent: consentSchema,
  website: honeypotSchema,
})

export type AdmissionEnquiryInput = z.infer<typeof admissionEnquirySchema>
export type ContactInput = z.infer<typeof contactSchema>

export function formatIssues(error: z.ZodError): Record<string, string[]> {
  const details: Record<string, string[]> = {}
  for (const issue of error.issues) {
    const key = issue.path.length > 0 ? issue.path.join('.') : 'form'
    details[key] = [...(details[key] ?? []), issue.message]
  }
  return details
}
