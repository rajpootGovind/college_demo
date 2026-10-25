import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ADMISSION_PROGRAM_OPTIONS, institution } from '../../config/institution'
import {
  ACADEMIC_YEARS,
  admissionEnquirySchema,
  type AdmissionEnquiryValues,
} from '../../features/enquiries/schema'
import { useAdmissionEnquiry } from '../../features/enquiries/use-enquiry'
import { ApiError } from '../../lib/api'
import { newSubmissionId } from '../../lib/utils'
import type { EnquiryReceipt } from '../../types'
import { ErrorState } from '../shared/states'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { FormField, fieldDescribedBy } from './form-field'
import { EnquirySuccess } from './enquiry-success'

const defaultValues: AdmissionEnquiryValues = {
  guardianName: '',
  studentName: '',
  phone: '',
  email: '',
  program: '',
  academicYear: institution.announcement.academicYear,
  message: '',
  consent: false,
  website: '',
}

export function AdmissionEnquiryForm() {
  const submissionId = useRef(newSubmissionId())
  const [receipt, setReceipt] = useState<EnquiryReceipt | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const mutation = useAdmissionEnquiry()
  const [searchParams] = useSearchParams()

  const initialValues = useMemo<AdmissionEnquiryValues>(() => {
    const requested = searchParams.get('program') ?? ''
    return {
      ...defaultValues,
      program: ADMISSION_PROGRAM_OPTIONS.includes(requested) ? requested : '',
    }
  }, [searchParams])

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AdmissionEnquiryValues>({
    resolver: zodResolver(admissionEnquirySchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  })

  useEffect(() => {
    if (receipt) {
      document.getElementById('enquiry-success-heading')?.focus()
    }
  }, [receipt])

  async function onSubmit(values: AdmissionEnquiryValues) {
    setFailure(null)
    try {
      const result = await mutation.mutateAsync({
        values,
        submissionId: submissionId.current,
      })
      setReceipt(result)
      toast.success('Enquiry received', {
        description:
          result.status === 'duplicate'
            ? 'We already have this enquiry on file.'
            : 'Our admissions team will be in touch within two working days.',
      })
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Something unexpected happened. Please try again.'
      setFailure(message)

      if (error instanceof ApiError && error.details) {
        Object.entries(error.details).forEach(([field, messages]) => {
          if (field in defaultValues && messages.length > 0) {
            setError(field as keyof AdmissionEnquiryValues, {
              type: 'server',
              message: messages[0],
            })
          }
        })
      }

      toast.error('Enquiry not sent', { description: message })
    }
  }

  function startAnother() {
    submissionId.current = newSubmissionId()
    mutation.reset()
    setReceipt(null)
    setFailure(null)
    reset(initialValues)
  }

  if (receipt) {
    return <EnquirySuccess receipt={receipt} onReset={startAnother} />
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Admission enquiry form"
      className="relative"
    >
      <div className="mb-6 flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Admission enquiry</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.01em] text-ink">
            Tell us about your child
          </h2>
        </div>
        <p className="text-[11px] text-slate-soft">
          Fields marked <span className="text-teal">*</span> are required
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id="guardianName"
          label={institution.labels.guardian}
          required
          error={errors.guardianName?.message}
        >
          <Input
            id="guardianName"
            autoComplete="name"
            placeholder="e.g. Priya Sharma"
            aria-invalid={Boolean(errors.guardianName)}
            aria-describedby={fieldDescribedBy('guardianName', errors.guardianName?.message)}
            {...register('guardianName')}
          />
        </FormField>

        <FormField
          id="studentName"
          label={institution.labels.student}
          required
          error={errors.studentName?.message}
        >
          <Input
            id="studentName"
            autoComplete="off"
            placeholder="e.g. Aarav Sharma"
            aria-invalid={Boolean(errors.studentName)}
            aria-describedby={fieldDescribedBy('studentName', errors.studentName?.message)}
            {...register('studentName')}
          />
        </FormField>

        <FormField
          id="phone"
          label="Mobile number"
          required
          error={errors.phone?.message}
          hint="We will only call about this enquiry."
        >
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98100 00000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={fieldDescribedBy('phone', errors.phone?.message, 'We will only call about this enquiry.')}
            {...register('phone')}
          />
        </FormField>

        <FormField
          id="email"
          label="Email address"
          optional
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="parent@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={fieldDescribedBy('email', errors.email?.message)}
            {...register('email')}
          />
        </FormField>

        <FormField
          id="program"
          label={institution.labels.program}
          required
          error={errors.program?.message}
          className="sm:col-span-2"
        >
          <Controller
            control={control}
            name="program"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="program"
                  aria-invalid={Boolean(errors.program)}
                  aria-describedby={fieldDescribedBy('program', errors.program?.message)}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder="Select a class or stage" />
                </SelectTrigger>
                <SelectContent>
                  {ADMISSION_PROGRAM_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          id="academicYear"
          label="Academic year"
          required
          error={errors.academicYear?.message}
        >
          <Controller
            control={control}
            name="academicYear"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="academicYear" onBlur={field.onBlur}>
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  {ACADEMIC_YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          id="message"
          label="Anything we should know?"
          optional
          error={errors.message?.message}
          hint={`${errors.message ? '' : 'Optional — learning support needs, sibling details or a preferred visit time.'}`}
        >
          <Textarea
            id="message"
            rows={5}
            placeholder="Share anything that would help us prepare for the conversation."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={fieldDescribedBy('message', errors.message?.message)}
            {...register('message')}
          />
        </FormField>
      </div>

      <div className="mt-6">
        <div className="flex items-start gap-3">
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <Checkbox
                id="consent"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'consent-error' : 'consent-hint'}
                className="mt-0.5"
              />
            )}
          />
          <div>
            <Label htmlFor="consent" className="cursor-pointer text-[13px] leading-relaxed">
              I agree to be contacted by the admissions team about this enquiry.
              <span className="text-teal" aria-hidden="true"> *</span>
            </Label>
            <p id="consent-hint" className="mt-1 text-[11px] leading-relaxed text-slate-soft">
              We use these details only to respond to your enquiry. Read our{' '}
              <Link to="/privacy" className="text-teal underline underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
            {errors.consent?.message && (
              <p id="consent-error" className="mt-1 text-xs font-medium text-destructive">
                {errors.consent.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {failure && (
        <ErrorState
          className="mt-6"
          title="We could not send your enquiry"
          description={`${failure} Your answers are still here — please try again.`}
        />
      )}

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[11px] leading-relaxed text-slate-soft">
          {institution.admissions.enquiryNote}
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="group shrink-0">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending enquiry…
            </>
          ) : (
            <>
              {failure ? 'Try again' : 'Submit enquiry'}
              <ArrowRight
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-label text-slate-soft/80">
        Demo mode · stored only in the demonstration database
      </p>
    </form>
  )
}
