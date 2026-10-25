import type { NextFunction, Request, Response } from 'express'
import type { ZodType } from 'zod'
import { AppError } from '../utils/AppError.js'
import { formatIssues } from '../validators/enquiry.js'

export function validateBody(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      next(
        new AppError(
          400,
          'validation_error',
          'Please check the highlighted fields and try again.',
          formatIssues(result.error),
        ),
      )
      return
    }

    req.body = result.data
    next()
  }
}
