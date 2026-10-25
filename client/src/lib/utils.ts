import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const shortDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

export function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return dateFormatter.format(date)
}

export function formatShortDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return shortDateFormatter.format(date)
}

export function buildSrcSet(src: string, widths: number[] = [640, 960, 1280, 1600]) {
  if (!src.includes('images.unsplash.com')) return undefined
  return widths
    .map((width) => `${src.replace(/([?&])w=\d+/, `$1w=${width}`)} ${width}w`)
    .join(', ')
}

export function newSubmissionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `sub-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function absoluteUrl(baseUrl: string, path: string) {
  return new URL(path, baseUrl).toString()
}
