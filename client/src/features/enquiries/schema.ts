import { z } from 'zod'

const phonePattern = /^(?:\+?91)?[6-9]\d{9}$/

function isValidIndianMobile(value: string) {
  return phonePattern.test(value.replace(/[\s-]/g, ''))
}

const phoneField = z
  .string()
  .trim()
  .min(10, 'Please enter a 10-digit mobile number.')
  .refine(isValidIndianMobile, 'Enter a valid 10-digit Indian mobile number.')

const optionalEmailField = z
  .string()
  .trim()
  .email('Enter a valid email address.')
  .or(z.literal(''))
  .optional()

const optionalPhoneField = z
  .string()
  .trim()
  .refine((value) => value === '' || isValidIndianMobile(value), 'Enter a valid mobile number.')
  .optional()

const honeypotField = z
  .string()
  .max(0, 'Spam detected.')
  .optional()

export const admissionEnquirySchema = z.object({
  guardianName: z
    .string()
    .trim()
    .min(2, 'Please enter the parent or guardian name.')
    .max(80, 'Please keep this under 80 characters.'),
  studentName: z
    .string()
    .trim()
    .min(2, "Please enter the student's name.")
    .max(80, 'Please keep this under 80 characters.'),
  phone: phoneField,
  email: optionalEmailField,
  program: z.string().trim().min(1, 'Select a class or stage of interest.'),
  academicYear: z.string().trim().min(1, 'Select an academic year.'),
  message: z.string().trim().max(600, 'Please keep your message under 600 characters.').optional(),
  consent: z.boolean().refine((value) => value, {
    message: 'Please confirm that we may contact you about this enquiry.',
  }),
  website: honeypotField,
})

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'Please keep this under 80 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: optionalPhoneField,
  subject: z.string().trim().min(1, 'Choose what your message is about.'),
  message: z
    .string()
    .trim()
    .min(20, 'Please add a little more detail so we can help — at least 20 characters.')
    .max(1200, 'Please keep your message under 1200 characters.'),
  consent: z.boolean().refine((value) => value, {
    message: 'Please confirm that we may respond to your message.',
  }),
  website: honeypotField,
})

export type AdmissionEnquiryValues = z.infer<typeof admissionEnquirySchema>
export type ContactValues = z.infer<typeof contactSchema>

export const ACADEMIC_YEARS = ['2026–27', '2027–28'] as const

export const CONTACT_SUBJECTS = [
  'Admissions enquiry',
  'Campus visit request',
  'Academic programme',
  'Transport & campus services',
  'Careers at Aurevia',
  'Something else',
] as const
