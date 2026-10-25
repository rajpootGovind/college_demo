type SocialName = 'Instagram' | 'Facebook' | 'LinkedIn' | 'YouTube' | string

const paths: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </>
  ),
  Facebook: (
    <path
      d="M13.5 21v-7.2h2.5l.4-2.9h-2.9V9.1c0-.85.24-1.43 1.47-1.43h1.54V5.08c-.27-.04-1.19-.11-2.26-.11-2.24 0-3.77 1.36-3.77 3.86v2.07H8v2.9h2.48V21h3.02Z"
      fill="currentColor"
    />
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10v7M7 7.2v.1M11 17v-4.1c0-1.4.8-2.3 2-2.3s2 .9 2 2.3V17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.8" y="5.6" width="18.4" height="12.8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.4 9.4l4.6 2.6-4.6 2.6V9.4Z" fill="currentColor" />
    </>
  ),
}

export function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
  const glyph = paths[name] ?? paths.Instagram
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  )
}
