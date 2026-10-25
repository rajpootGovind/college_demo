import { randomUUID } from 'node:crypto'
import type { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger.js'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      id: string
    }
  }
}

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  req.id = req.header('x-request-id') ?? randomUUID()
  res.setHeader('X-Request-Id', req.id)

  const startedAt = process.hrtime.bigint()

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000
    const meta = {
      requestId: req.id,
      method: req.method,
      path: req.originalUrl.split('?')[0],
      status: res.statusCode,
      durationMs: Math.round(durationMs),
    }

    if (res.statusCode >= 500) logger.error('request.failed', meta)
    else if (res.statusCode >= 400) logger.warn('request.rejected', meta)
    else logger.info('request.completed', meta)
  })

  next()
}
