export interface EventType {
  _id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  isAllDay: boolean;
  isCompleted: boolean;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDayDisplayState extends Document {
  date: string; // YYYY-MM-DD format
  isCollapsed: boolean;
}

export interface IMemo extends Document {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
