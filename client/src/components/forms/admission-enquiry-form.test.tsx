import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AdmissionEnquiryForm } from './admission-enquiry-form'

const receipt = {
  id: 'enq_1234567890abcdef',
  status: 'new' as const,
  submittedAt: '2026-10-25T09:30:00.000Z',
  persisted: true,
  crm: { status: 'skipped' as const, message: 'CRM integration is not configured.' },
  demo: true,
}

function renderForm(
  initialEntry = '/admissions?program=Primary%20School%20(Nursery%20%E2%80%93%20Grade%20V)',
) {
  const client = new QueryClient({
    defaultOptions: { mutations: { retry: false }, queries: { retry: false } },
  })

  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AdmissionEnquiryForm />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

async function fillValidForm() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText(/parent \/ guardian name/i), 'Priya Sharma')
  await user.type(screen.getByLabelText(/student name/i), 'Aarav Sharma')
  await user.type(screen.getByLabelText(/mobile number/i), '9810000000')
  await user.click(screen.getByRole('checkbox', { name: /i agree to be contacted/i }))
  return user
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('AdmissionEnquiryForm', () => {
  it('shows validation errors and does not call the API on an empty submit', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const user = userEvent.setup()
    renderForm()

    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(await screen.findByText(/please enter the parent or guardian name/i)).toBeTruthy()
    expect(screen.getByText(/enter the student/i)).toBeTruthy()
    expect(screen.getByText(/10-digit mobile number/i)).toBeTruthy()
    expect(screen.getByText(/please confirm that we may contact you/i)).toBeTruthy()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('submits a valid enquiry and shows the success confirmation', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true, data: receipt }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    renderForm()
    const user = await fillValidForm()
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(
      await screen.findByRole('heading', { name: /enquiry received/i }),
    ).toBeTruthy()
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    const [url, init] = fetchSpy.mock.calls[0]
    expect(String(url)).toContain('/api/v1/enquiries')
    expect(init?.method).toBe('POST')
    const body = JSON.parse(String(init?.body))
    expect(body).toMatchObject({
      guardianName: 'Priya Sharma',
      studentName: 'Aarav Sharma',
      phone: '9810000000',
      consent: true,
      program: 'Primary School (Nursery – Grade V)',
    })
    expect(typeof body.submissionId).toBe('string')
  })

  it('shows field errors returned by the API', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          error: {
            code: 'validation_error',
            message: 'Please check the highlighted fields and try again.',
            details: { phone: ['Enter a valid 10-digit Indian mobile number.'] },
          },
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    renderForm()
    const user = await fillValidForm()
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect(
      await screen.findByText(/enter a valid 10-digit indian mobile number/i),
    ).toBeTruthy()
    expect((screen.getByLabelText(/mobile number/i) as HTMLInputElement).value).toBe(
      '9810000000',
    )
  })

  it('keeps the answers and offers a retry when the API fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          success: false,
          error: { code: 'internal_error', message: 'The enquiry could not be saved.' },
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      ),
    )

    renderForm()
    const user = await fillValidForm()
    await user.click(screen.getByRole('button', { name: /submit enquiry/i }))

    expect((await screen.findByRole('alert')).textContent).toContain(
      'The enquiry could not be saved.',
    )
    expect(
      (screen.getByLabelText(/parent \/ guardian name/i) as HTMLInputElement).value,
    ).toBe('Priya Sharma')
    await waitFor(() => {
      const retry = screen.getByRole('button', { name: /try again/i }) as HTMLButtonElement
      expect(retry.disabled).toBe(false)
    })
  })
})
