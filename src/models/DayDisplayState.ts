import mongoose, { Document, Schema } from 'mongoose';

export interface IDayDisplayState extends Document {
  date: string; // YYYY-MM-DD format
  isCollapsed: boolean;
}

const DayDisplayStateSchema: Schema = new Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  isCollapsed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const DayDisplayState =
  mongoose.models.DayDisplayState ||
  mongoose.model<IDayDisplayState>('DayDisplayState', DayDisplayStateSchema);

export default DayDisplayState;
