import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IWeeklyReport extends Document {
  text: string;
  dayOfWeek: number; // 0: Monday, 1: Tuesday, ..., 4: Friday
  weekId: string; // YYYY-WW format
}

const WeeklyReportSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    dayOfWeek: { type: Number, required: true },
    weekId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

WeeklyReportSchema.index({ weekId: 1, dayOfWeek: 1 }, { unique: true });

const WeeklyReport: Model<IWeeklyReport> =
  mongoose.models.WeeklyReport || mongoose.model<IWeeklyReport>('WeeklyReport', WeeklyReportSchema);

export default WeeklyReport;
