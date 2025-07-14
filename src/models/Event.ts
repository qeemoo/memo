import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  isCompleted: boolean;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isAllDay: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    location: { type: String },
  },
  {
    timestamps: true,
  },
);

export default (mongoose.models.Event ||
  mongoose.model<IEvent>('Event', EventSchema)) as mongoose.Model<IEvent>;
