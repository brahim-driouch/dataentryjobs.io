import { ICertification } from "@/types/profile";
import mongoose, { Model, Schema } from "mongoose";

const CertificationSchema = new Schema<ICertification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: String, required: true },
  expirationDate: { type: String },
  credentialId: { type: String },
  credentialUrl: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

CertificationSchema.index({ userId: 1, order: 1 });

export const Certification: Model<ICertification> = mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);