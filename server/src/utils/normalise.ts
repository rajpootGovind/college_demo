import { createHash } from 'node:crypto'
import { env } from '../config/env.js'

/** Normalise an Indian mobile number to +91XXXXXXXXXX for CRM hand-off. */
export function toE164(value: string): string {
  const digits = value.replace(/\D/g, '')
  const lastTen = digits.slice(-10)
  return digits.startsWith('91') && digits.length === 12
    ? `+${digits}`
    : `+91${lastTen}`
}

/** Store only a salted hash of the requester's IP address. */
export function hashIp(ip: string | undefined): string | undefined {
  if (!ip) return undefined
  return createHash('sha256')
    .update(`${ip}:${env.INSTITUTION_ID}`)
    .digest('hex')
    .slice(0, 32)
}

export function normaliseEmail(value: string | undefined): string | undefined {
  const email = value?.trim().toLowerCase()
  return email ? email : undefined
}
