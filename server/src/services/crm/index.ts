import { env } from '../../config/env.js'
import { DisabledCrmAdapter } from './disabled-crm-adapter.js'
import { HttpCrmAdapter } from './http-crm-adapter.js'
import type { CrmAdapter } from './types.js'

let adapter: CrmAdapter | null = null

export function getCrmAdapter(): CrmAdapter {
  if (adapter) return adapter

  if (env.CRM_MODE === 'live' && env.CRM_API_URL && env.CRM_API_KEY) {
    adapter = new HttpCrmAdapter({
      url: env.CRM_API_URL,
      apiKey: env.CRM_API_KEY,
      timeoutMs: env.CRM_TIMEOUT_MS,
      institutionId: env.INSTITUTION_ID,
    })
    return adapter
  }

  adapter = new DisabledCrmAdapter(
    'CRM integration is not configured for this demonstration. The enquiry is stored in the demo database only.',
  )
  return adapter
}

export type { CrmAdapter, CrmLead, CrmResult } from './types.js'
