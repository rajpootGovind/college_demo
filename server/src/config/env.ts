import 'dotenv/config'
import { z } from 'zod'

const emptyToUndefined = (value: unknown) => (value === '' ? undefined : value)

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(5000),
    MONGODB_URI: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
    CORS_ORIGINS: z
      .string()
      .default('http://localhost:5173,http://localhost:4173')
      .transform((value) =>
        value
          .split(',')
          .map((origin) => origin.trim())
          .filter(Boolean),
      ),
    INSTITUTION_ID: z.string().min(1).default('aurevia-school'),
    DEMO_MODE: z
      .enum(['true', 'false'])
      .default('true')
      .transform((value) => value === 'true'),
    CRM_MODE: z.enum(['disabled', 'live']).default('disabled'),
    CRM_API_URL: z.preprocess(emptyToUndefined, z.string().url().optional()),
    CRM_API_KEY: z.preprocess(emptyToUndefined, z.string().min(1).optional()),
    CRM_TIMEOUT_MS: z.coerce.number().int().positive().max(30_000).default(6_000),
    RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().int().positive().max(1440).default(10),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(30),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  })
  .superRefine((value, ctx) => {
    if (value.CRM_MODE === 'live') {
      if (!value.CRM_API_URL) {
        ctx.addIssue({
          code: 'custom',
          path: ['CRM_API_URL'],
          message: 'CRM_API_URL is required when CRM_MODE=live.',
        })
      }
      if (!value.CRM_API_KEY) {
        ctx.addIssue({
          code: 'custom',
          path: ['CRM_API_KEY'],
          message: 'CRM_API_KEY is required when CRM_MODE=live.',
        })
      }
    }
  })

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n')
  // Failing fast here is intentional: a misconfigured API should not start.
  console.error(`Invalid environment configuration:\n${issues}`)
  process.exit(1)
}

export const env = {
  ...parsed.data,
  isProduction: parsed.data.NODE_ENV === 'production',
  isTest: parsed.data.NODE_ENV === 'test',
  rateLimit: {
    windowMs: parsed.data.RATE_LIMIT_WINDOW_MINUTES * 60_000,
    max: parsed.data.RATE_LIMIT_MAX,
  },
}

export type Env = typeof env
