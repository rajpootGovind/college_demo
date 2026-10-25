import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { institution } from '../../config/institution'
import type { EnquiryReceipt } from '../../types'
import { Button } from '../ui/button'

export function EnquirySuccess({
  receipt,
  onReset,
}: {
  receipt: EnquiryReceipt
  onReset: () => void
}) {
  const [copied, setCopied] = useState(false)
  const reference = receipt.id.slice(-8).toUpperCase()

  async function copyReference() {
    try {
      await navigator.clipboard.writeText(receipt.id)
      setCopied(true)
      toast.success('Reference copied')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Could not copy — please note the reference manually.')
    }
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-teal/25 bg-teal-soft/50 p-6 sm:p-8"
    >
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-teal text-white">
        <Check className="size-5" aria-hidden="true" />
      </span>

      <h2
        id="enquiry-success-heading"
        tabIndex={-1}
        className="mt-5 font-display text-2xl font-semibold text-ink focus:outline-none"
      >
        {receipt.status === 'duplicate' ? 'We already have this enquiry' : 'Enquiry received'}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-slate">
        {receipt.status === 'duplicate'
          ? 'This enquiry was submitted moments ago, so we have not created a second copy. Our team already has your details.'
          : `Thank you. The admissions team will call you within two working days on the number you provided. Admissions for ${institution.announcement.academicYear} are handled in the order enquiries are received.`}
      </p>

      <dl className="mt-6 grid gap-4 border-t border-teal/20 pt-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[10px] uppercase tracking-label text-slate-soft">Reference</dt>
          <dd className="mt-1 flex items-center gap-2 font-medium text-ink">
            <span className="font-mono tracking-wide">{reference}</span>
            <button
              type="button"
              onClick={copyReference}
              aria-label="Copy enquiry reference"
              className="rounded-full p-1.5 text-slate transition-colors hover:bg-white hover:text-teal"
            >
              {copied ? (
                <Check className="size-3.5" aria-hidden="true" />
              ) : (
                <Copy className="size-3.5" aria-hidden="true" />
              )}
            </button>
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-label text-slate-soft">Submitted</dt>
          <dd className="mt-1 text-ink">
            {new Date(receipt.submittedAt).toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-6 border-t border-teal/20 pt-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-label text-teal-dark">
          What happens next
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-slate">
          <li>1. A call from admissions to understand your child’s grade and needs.</li>
          <li>2. A campus morning invitation, with a tour and a faculty conversation.</li>
          <li>3. A learner interaction, followed by a written offer where a seat is available.</li>
        </ol>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="ink">
          <Link to="/admissions#process">View the admission process</Link>
        </Button>
        <Button type="button" variant="outline" onClick={onReset}>
          Submit another enquiry
        </Button>
      </div>

      <p className="mt-5 text-[10px] leading-relaxed text-slate-soft">
        Demonstration only — this reference is stored in the demo API and is not shared with a
        real school or CRM.
      </p>
    </div>
  )
}
