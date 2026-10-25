import compression from 'compression'
import cors, { type CorsOptions } from 'cors'
import express from 'express'
import helmet from 'helmet'
import { env } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/error-handler.js'
import { requestLogger } from './middleware/request-logger.js'
import routes from './routes/index.js'
import { AppError } from './utils/AppError.js'

function corsOptions(): CorsOptions {
  const allowedOrigins = new Set(env.CORS_ORIGINS)

  return {
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.has(origin)) return callback(null, true)
      if (!env.isProduction) return callback(null, true)
      return callback(
        new AppError(403, 'cors_not_allowed', 'This origin is not allowed to access the API.'),
      )
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'X-Idempotency-Key', 'X-Request-Id'],
    credentials: false,
    maxAge: 86_400,
  }
}

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  app.set('trust proxy', 1)

  app.use(helmet())
  app.use(cors(corsOptions()))
  app.use(express.json({ limit: '32kb' }))
  app.use(compression())
  app.use(requestLogger)

  app.get('/', (_req, res) => {
    res.json({
      success: true,
      data: {
        name: `${env.INSTITUTION_ID} public website API`,
        version: 'v1',
        documentation: '/api/v1/health',
      },
    })
  })

  app.use('/api/v1', routes)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
