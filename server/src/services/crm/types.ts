export interface CrmLead {
  externalId: string
  institutionId: string
  type: 'admission' | 'contact'
  guardianName?: string
  studentName?: string
  name?: string
  phoneE164?: string
  email?: string
  program?: string
  academicYear?: string
  subject?: string
  message?: string
  consent: boolean
  source: string
  submittedAt: string
}

export interface CrmResult {
  status: 'forwarded' | 'skipped' | 'failed'
  message: string
}

export interface CrmAdapter {
  readonly name: string
  readonly enabled: boolean
  pushLead(lead: CrmLead): Promise<CrmResult>
}
