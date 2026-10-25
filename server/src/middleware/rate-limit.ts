import rateLimit from 'express-rate-limit'
import { env } from '../config/env.js'

export const apiRateLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  limit: env.rateLimit.max,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => env.isTest,
  message: {
    success: false,
    error: {
      code: 'rate_limited',
      message:
        'Too many enquiries from this connection. Please wait a few minutes and try again.',
    },
  },
})
