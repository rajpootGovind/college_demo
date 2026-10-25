import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from './app.js'
import { resetInMemoryEnquiries } from './repositories/enquiry-repository.js'

const app = createApp()

const admissionPayload = {
  guardianName: 'Anita Mehra',
  studentName: 'Rohan Mehra',
  phone: '9876543210',
  email: 'anita@example.com',
  program: 'Middle School (Grades 6-8)',
  academicYear: '2027-28',
  message: 'We would like to book a campus tour.',
  consent: true,
}

const contactPayload = {
  name: 'Priya Nair',
  email: 'priya@example.com',
  subject: 'Admissions',
  message: 'Could you share the fee structure for the senior school?',
  consent: true,
}

beforeEach(() => {
  resetInMemoryEnquiries()
})

describe('GET /api/v1/health', () => {
  it('reports service, database and CRM state', async () => {
    const response = await request(app).get('/api/v1/health')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.data.status).toBe('ok')
    expect(response.body.data.database).toBe('memory')
    expect(response.body.data.crm).toBe('disabled')
    expect(response.body.data.demoMode).toBe(true)
  })
})

describe('POST /api/v1/enquiries', () => {
  it('creates an admission enquiry', async () => {
    const response = await request(app).post('/api/v1/enquiries').send(admissionPayload)

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.data.status).toBe('new')
    expect(response.body.data.crm.status).toBe('skipped')
    expect(response.body.data.id).toBeTruthy()
  })

  it('returns 200 for a replayed idempotency key', async () => {
    const first = await request(app)
      .post('/api/v1/enquiries')
      .set('X-Idempotency-Key', 'idem-key-123456')
      .send(admissionPayload)

    const second = await request(app)
      .post('/api/v1/enquiries')
      .set('X-Idempotency-Key', 'idem-key-123456')
      .send(admissionPayload)

    expect(first.status).toBe(201)
    expect(second.status).toBe(200)
    expect(second.body.data.id).toBe(first.body.data.id)
  })

  it('rejects invalid payloads with field-level details', async () => {
    const response = await request(app)
      .post('/api/v1/enquiries')
      .send({ ...admissionPayload, phone: '123', consent: false, email: 'not-an-email' })

    expect(response.status).toBe(400)
    expect(response.body.success).toBe(false)
    expect(response.body.error.code).toBe('validation_error')
    expect(response.body.error.details.phone).toBeDefined()
    expect(response.body.error.details.consent).toBeDefined()
    expect(response.body.error.details.email).toBeDefined()
  })

  it('rejects a bot submission via the honeypot', async () => {
    const response = await request(app)
      .post('/api/v1/enquiries')
      .send({ ...admissionPayload, website: 'http://spam.example' })

    expect(response.status).toBe(400)
    expect(response.body.error.code).toBe('validation_error')
  })

  it('returns 400 for malformed JSON', async () => {
    const response = await request(app)
      .post('/api/v1/enquiries')
      .set('Content-Type', 'application/json')
      .send('{"guardianName": ')

    expect(response.status).toBe(400)
    expect(response.body.error.code).toBe('invalid_json')
  })
})

describe('POST /api/v1/contact', () => {
  it('creates a contact message', async () => {
    const response = await request(app).post('/api/v1/contact').send(contactPayload)

    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.data.status).toBe('new')
  })

  it('requires consent', async () => {
    const response = await request(app)
      .post('/api/v1/contact')
      .send({ ...contactPayload, consent: false })

    expect(response.status).toBe(400)
    expect(response.body.error.details.consent).toBeDefined()
  })
})

describe('unknown routes', () => {
  it('returns a structured 404', async () => {
    const response = await request(app).get('/api/v1/does-not-exist')

    expect(response.status).toBe(404)
    expect(response.body.success).toBe(false)
    expect(response.body.error.code).toBe('not_found')
  })
})
