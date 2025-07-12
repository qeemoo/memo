import mongoose, { Document, Schema } from 'mongoose';

export interface IMemo extends Document {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemoSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Memo = mongoose.models.Memo || mongoose.model<IMemo>('Memo', MemoSchema);

export default Memo;
