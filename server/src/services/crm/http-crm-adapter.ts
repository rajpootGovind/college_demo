import { logger } from '../../utils/logger.js'
import type { CrmAdapter, CrmLead, CrmResult } from './types.js'

interface HttpCrmAdapterOptions {
  url: string
  apiKey: string
  timeoutMs: number
  institutionId: string
}

/**
 * Forwards a lead to the existing education CRM.
 *
 * The contract is documented in docs/crm-integration.md. This adapter deliberately
 * does not guess any CRM-specific endpoint shape: it posts one predictable payload
 * to the configured URL and treats any 2xx as success.
 */
export class HttpCrmAdapter implements CrmAdapter {
  readonly name = 'http'
  readonly enabled = true

  constructor(private readonly options: HttpCrmAdapterOptions) {}

  async pushLead(lead: CrmLead): Promise<CrmResult> {
    try {
      const response = await fetch(this.options.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.options.apiKey}`,
          'X-Institution-Id': this.options.institutionId,
          'Idempotency-Key': lead.externalId,
        },
        body: JSON.stringify({
          source: 'school-website',
          lead,
        }),
        signal: AbortSignal.timeout(this.options.timeoutMs),
      })

      if (!response.ok) {
        logger.warn('crm.rejected', {
          status: response.status,
          externalId: lead.externalId,
        })
        return {
          status: 'failed',
          message: `CRM rejected the lead (HTTP ${response.status}). The enquiry has been saved for manual follow-up.`,
        }
      }

      return {
        status: 'forwarded',
        message: 'Lead forwarded to the admissions CRM.',
      }
    } catch (error) {
      logger.warn('crm.unavailable', {
        externalId: lead.externalId,
        message: error instanceof Error ? error.message : String(error),
      })
      return {
        status: 'failed',
        message:
          'The admissions CRM could not be reached. The enquiry has been saved for manual follow-up.',
      }
    }
  }
}
