import { Schema, model, type InferSchemaType } from 'mongoose'

const enquirySchema = new Schema(
  {
    submissionId: { type: String, required: true, trim: true },
    institutionId: { type: String, required: true, index: true, trim: true },
    type: {
      type: String,
      enum: ['admission', 'contact'],
      required: true,
      index: true,
    },
    guardianName: { type: String, trim: true },
    studentName: { type: String, trim: true },
    name: { type: String, trim: true },
    phone: { type: String, trim: true, index: true },
    phoneE164: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    program: { type: String, trim: true },
    academicYear: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, trim: true, maxlength: 1200 },
    consent: { type: Boolean, required: true },
    consentAt: { type: Date, required: true },
    leadSource: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'duplicate', 'contacted'],
      default: 'new',
    },
    crmStatus: {
      type: String,
      enum: ['pending', 'forwarded', 'skipped', 'failed'],
      default: 'pending',
    },
    crmMessage: { type: String },
    ipHash: { type: String },
  },
  { timestamps: true },
)

enquirySchema.index({ submissionId: 1, institutionId: 1 }, { unique: true })
enquirySchema.index({ phone: 1, createdAt: -1 })

export type EnquiryDocument = InferSchemaType<typeof enquirySchema> & {
  _id: { toString(): string }
  createdAt: Date
  updatedAt: Date
}

export const EnquiryModel = model('Enquiry', enquirySchema)
