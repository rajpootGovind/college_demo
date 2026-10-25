import type { CrmAdapter, CrmLead, CrmResult } from './types.js'

export class DisabledCrmAdapter implements CrmAdapter {
  readonly name = 'disabled'
  readonly enabled = false

  constructor(private readonly reason: string) {}

  async pushLead(_lead: CrmLead): Promise<CrmResult> {
    return {
      status: 'skipped',
      message: this.reason,
    }
  }
}
