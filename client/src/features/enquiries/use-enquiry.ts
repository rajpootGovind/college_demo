import { useMutation } from '@tanstack/react-query'
import { ApiError, api } from '../../lib/api'
import type { EnquiryReceipt } from '../../types'
import type { AdmissionEnquiryValues, ContactValues } from './schema'

export function useAdmissionEnquiry() {
  return useMutation<EnquiryReceipt, ApiError, { values: AdmissionEnquiryValues; submissionId: string }>({
    mutationFn: ({ values, submissionId }) =>
      api.submitEnquiry(
        {
          guardianName: values.guardianName,
          studentName: values.studentName,
          phone: values.phone,
          email: values.email || undefined,
          program: values.program,
          academicYear: values.academicYear,
          message: values.message || undefined,
          consent: values.consent,
          website: values.website,
        },
        submissionId,
      ),
  })
}

export function useContactMessage() {
  return useMutation<EnquiryReceipt, ApiError, { values: ContactValues; submissionId: string }>({
    mutationFn: ({ values, submissionId }) =>
      api.submitContact(
        {
          name: values.name,
          email: values.email,
          phone: values.phone || undefined,
          subject: values.subject,
          message: values.message,
          consent: values.consent,
          website: values.website,
        },
        submissionId,
      ),
  })
}
