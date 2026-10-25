import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { institution } from '../../config/institution'
import {
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactValues,
} from '../../features/enquiries/schema'
import { useContactMessage } from '../../features/enquiries/use-enquiry'
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

const defaultValues: ContactValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  website: '',
}

export function ContactForm() {
  const submissionId = useRef(newSubmissionId())
  const [receipt, setReceipt] = useState<EnquiryReceipt | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const mutation = useContactMessage()

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: 'onBlur',
  })

  useEffect(() => {
    if (receipt) {
      document.getElementById('contact-success-heading')?.focus()
    }
  }, [receipt])

  async function onSubmit(values: ContactValues) {
    setFailure(null)
    try {
      const result = await mutation.mutateAsync({ values, submissionId: submissionId.current })
      setReceipt(result)
      toast.success('Message sent', {
        description: 'Our office will respond within two working days.',
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
            setError(field as keyof ContactValues, { type: 'server', message: messages[0] })
          }
        })
      }
      toast.error('Message not sent', { description: message })
    }
  }

  function startAnother() {
    submissionId.current = newSubmissionId()
    mutation.reset()
    setReceipt(null)
    setFailure(null)
    reset(defaultValues)
  }

  if (receipt) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="border border-teal/25 bg-teal-soft/50 p-7 sm:p-9"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-teal text-white">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h2
          id="contact-success-heading"
          tabIndex={-1}
          className="mt-5 font-display text-2xl font-semibold text-ink focus:outline-none"
        >
          Message received
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Thank you for writing to {institution.identity.shortName}. The office will respond
          within two working days. For anything urgent, please call{' '}
          <a
            href={`tel:${institution.contact.phone}`}
            className="font-medium text-teal underline underline-offset-2"
          >
            {institution.contact.phoneDisplay}
          </a>
          .
        </p>
        <p className="mt-5 text-[10px] uppercase tracking-label text-slate-soft">
          Reference {receipt.id.slice(-8).toUpperCase()} · demonstration only
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button type="button" variant="outline" onClick={startAnother}>
            Send another message
          </Button>
          <Button asChild variant="ghost">
            <Link to="/admissions#enquiry">
              Admission enquiry <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-label="General contact form"
      className="relative"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="contact-name" label="Your name" required error={errors.name?.message}>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={fieldDescribedBy('contact-name', errors.name?.message)}
            {...register('name')}
          />
        </FormField>

        <FormField id="contact-email" label="Email address" required error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={fieldDescribedBy('contact-email', errors.email?.message)}
            {...register('email')}
          />
        </FormField>

        <FormField id="contact-phone" label="Phone number" optional error={errors.phone?.message}>
          <Input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 98100 00000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={fieldDescribedBy('contact-phone', errors.phone?.message)}
            {...register('phone')}
          />
        </FormField>

        <FormField id="contact-subject" label="What is this about?" required error={errors.subject?.message}>
          <Controller
            control={control}
            name="subject"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="contact-subject"
                  aria-invalid={Boolean(errors.subject)}
                  onBlur={field.onBlur}
                >
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_SUBJECTS.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          id="contact-message"
          label="Message"
          required
          error={errors.message?.message}
          className="sm:col-span-2"
          hint="Please avoid sharing sensitive personal or medical information here."
        >
          <Textarea
            id="contact-message"
            rows={5}
            placeholder="How can we help?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={fieldDescribedBy('contact-message', errors.message?.message, 'Please avoid sharing sensitive personal or medical information here.')}
            {...register('message')}
          />
        </FormField>
      </div>

      <div className="mt-5 flex items-start gap-3">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              id="contact-consent"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              onBlur={field.onBlur}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'contact-consent-error' : undefined}
              className="mt-0.5"
            />
          )}
        />
        <div>
          <Label htmlFor="contact-consent" className="cursor-pointer text-[13px] leading-relaxed">
            I agree to be contacted about this message.
            <span className="text-teal" aria-hidden="true"> *</span>
          </Label>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-soft">
            See our{' '}
            <Link to="/privacy" className="text-teal underline underline-offset-2">
              privacy policy
            </Link>{' '}
            for how enquiries are handled.
          </p>
          {errors.consent?.message && (
            <p id="contact-consent-error" className="mt-1 text-xs font-medium text-destructive">
              {errors.consent.message}
            </p>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {failure && (
        <ErrorState
          className="mt-6"
          title="We could not send your message"
          description={`${failure} Your message is still in the form — please try again.`}
        />
      )}

      <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-slate-soft">We reply within two working days.</p>
        <Button type="submit" disabled={isSubmitting} className="group shrink-0">
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              {failure ? 'Try again' : 'Send message'}
              <ArrowRight
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
