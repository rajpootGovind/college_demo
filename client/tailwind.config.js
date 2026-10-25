/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '2rem', lg: '2.5rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14243A',
          soft: '#1B2E47',
          deep: '#0D1928',
        },
        ivory: {
          DEFAULT: '#FAF8F3',
          deep: '#F3EFE6',
        },
        teal: {
          DEFAULT: '#167D78',
          dark: '#0F5F5B',
          soft: '#E7F1F0',
        },
        gold: {
          DEFAULT: '#D6AE66',
          soft: '#F4EADA',
          dark: '#B08A44',
        },
        slate: {
          DEFAULT: '#526174',
          soft: '#7C8A9B',
        },
        line: 'rgba(20, 36, 58, 0.10)',
        primary: {
          DEFAULT: '#167D78',
          foreground: '#FFFFFF',
          dark: '#0F5F5B',
        },
        background: '#FAF8F3',
        foreground: '#14243A',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#14243A',
        },
        muted: {
          DEFAULT: '#F3EFE6',
          foreground: '#526174',
        },
        border: 'rgba(20, 36, 58, 0.10)',
        input: 'rgba(20, 36, 58, 0.16)',
        ring: '#167D78',
        destructive: {
          DEFAULT: '#B3413A',
          foreground: '#FFFFFF',
        },
        success: {
          DEFAULT: '#1F6F4A',
          soft: '#EAF3EE',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.22em' }],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        content: '1240px',
        prose: '68ch',
      },
      borderRadius: {
        xs: '2px',
        sm: '3px',
        md: '4px',
        xl: '10px',
      },
      boxShadow: {
        lift: '0 18px 50px -28px rgba(20, 36, 58, 0.45)',
        panel: '0 1px 0 rgba(20, 36, 58, 0.06)',
      },
      backgroundImage: {
        'hero-veil':
          'linear-gradient(100deg, rgba(13,25,40,0.94) 0%, rgba(13,25,40,0.82) 38%, rgba(20,36,58,0.42) 68%, rgba(20,36,58,0.18) 100%)',
        'card-veil':
          'linear-gradient(to top, rgba(13,25,40,0.88) 0%, rgba(13,25,40,0.35) 45%, rgba(13,25,40,0.02) 75%)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(0.82)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'soft-pulse': 'soft-pulse 2.4s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.22s ease-out',
        'accordion-up': 'accordion-up 0.22s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
