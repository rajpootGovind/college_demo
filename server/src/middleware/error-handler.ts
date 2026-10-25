import type { ErrorRequestHandler, RequestHandler } from 'express'
import { AppError } from '../utils/AppError.js'
import { logger } from '../utils/logger.js'

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'not_found',
      message: `No API route matches ${req.method} ${req.originalUrl.split('?')[0]}.`,
    },
  })
}

function isJsonParseError(error: unknown): error is SyntaxError & { status: number } {
  return (
    error instanceof SyntaxError &&
    'body' in error &&
    'status' in error &&
    (error as { status?: number }).status === 400
  )
}

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (res.headersSent) return

  let status = 500
  let code = 'internal_error'
  let message = 'Something went wrong on our side. Please try again.'
  let details: Record<string, string[]> | undefined

  if (error instanceof AppError) {
    status = error.statusCode
    code = error.code
    message = error.message
    details = error.details
  } else if (isJsonParseError(error)) {
    status = 400
    code = 'invalid_json'
    message = 'The request body could not be read as valid JSON.'
  } else if ((error as { name?: string })?.name === 'ValidationError') {
    status = 400
    code = 'validation_error'
    message = 'The submitted data did not pass validation.'
  }

  if (status >= 500) {
    logger.error('unhandled_error', {
      requestId: req.id,
      path: req.originalUrl,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  res.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  })
}
