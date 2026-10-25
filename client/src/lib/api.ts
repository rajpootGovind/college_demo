import type {
  ApiFailure,
  ApiSuccess,
  ContactInput,
  EnquiryInput,
  EnquiryReceipt,
} from '../types'

const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const TIMEOUT_MS = 15_000

export class ApiError extends Error {
  readonly code: string
  readonly status: number
  readonly details?: Record<string, string[]>

  constructor(
    message: string,
    options: { code?: string; status?: number; details?: Record<string, string[]> } = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = options.code ?? 'network_error'
    this.status = options.status ?? 0
    this.details = options.details
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...init.headers,
      },
    })

    const payload = (await response.json().catch(() => null)) as
      | ApiSuccess<T>
      | ApiFailure
      | null

    if (!response.ok || !payload || payload.success === false) {
      const failure = payload && payload.success === false ? payload.error : undefined
      throw new ApiError(
        failure?.message ??
          'We could not complete that request just now. Please try again in a moment.',
        {
          code: failure?.code ?? 'request_failed',
          status: response.status,
          details: failure?.details,
        },
      )
    }

    return payload.data
  } catch (error) {
    if (error instanceof ApiError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError(
        'The request took too long to respond. Please check your connection and try again.',
        { code: 'timeout' },
      )
    }
    throw new ApiError(
      'We could not reach the admissions server. Please check your connection and try again.',
      { code: 'network_error' },
    )
  } finally {
    clearTimeout(timeout)
  }
}

export const api = {
  submitEnquiry(input: EnquiryInput, submissionId: string) {
    return request<EnquiryReceipt>('/api/v1/enquiries', {
      method: 'POST',
      body: JSON.stringify({ ...input, submissionId }),
      headers: { 'X-Idempotency-Key': submissionId },
    })
  },
  submitContact(input: ContactInput, submissionId: string) {
    return request<EnquiryReceipt>('/api/v1/contact', {
      method: 'POST',
      body: JSON.stringify({ ...input, submissionId }),
      headers: { 'X-Idempotency-Key': submissionId },
    })
  },
  health() {
    return request<{ status: string; database: string; crm: string }>('/api/v1/health', {
      method: 'GET',
    })
  },
}
