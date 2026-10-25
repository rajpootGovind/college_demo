import { Router } from 'express'
import {
  createAdmissionEnquiry,
  createContactMessage,
} from '../controllers/enquiry-controller.js'
import { getHealth } from '../controllers/health-controller.js'
import { apiRateLimiter } from '../middleware/rate-limit.js'
import { validateBody } from '../middleware/validate.js'
import { admissionEnquirySchema, contactSchema } from '../validators/enquiry.js'

const router = Router()

router.get('/health', getHealth)

router.post(
  '/enquiries',
  apiRateLimiter,
  validateBody(admissionEnquirySchema),
  createAdmissionEnquiry,
)

router.post('/contact', apiRateLimiter, validateBody(contactSchema), createContactMessage)

export default router
