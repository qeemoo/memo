export interface CalendarDayHeaderProps {
  date: Date;
}

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

export interface IWeeklyReport {
  _id: string;
  text: string;
  dayOfWeek: number;
  weekId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddEventButtonProps {
  onClick: () => void;
  positioning?: 'fixed' | 'centered';
}

export interface AddEventInlineButtonProps {
  onClick: () => void;
}

export interface IconProps {
  className?: string;
}

export interface MemoButtonProps {
  onClick: () => void;
}

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export interface EventListItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, newCompletedState: boolean) => void;
  onEdit: (event: EventType) => void;
  event: EventType;
}

export interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventAdded: () => void;
  initialDate?: Date;
}

export interface CalendarViewProps {
  events: EventType[];
  loading: boolean;
  error: string | null;
  groupedEvents: Record<string, EventType[]>;
  sortedDates: string[];
  collapsedStates: Record<string, boolean>;
  handleToggleCollapse: (dateKey: string) => void;
  handleAddButtonClick: (date?: Date) => void;
  handleEditClick: (event: EventType) => void;
  handleDeleteEvent: (deletedId: string) => void;
  handleToggleCompleteEvent: (id: string, newCompletedState: boolean) => void;
  handleWeeklyReportModalOpen: (dayOfWeek: number) => void;
  weeklyReports: { [key: number]: string };
  handleGenerateReport: () => void;
  consolidatedReport: string;
  showConsolidatedReport: boolean;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventUpdated: () => void;
  event: EventType;
}

export interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoContent: string;
  setMemoContent: (content: string) => void;
}

export interface UseDisplayStatesProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export interface UseEventsProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export interface UseMemoProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface IDayDisplayState {
  date: string; // YYYY-MM-DD format
  isCollapsed: boolean;
}

export interface IMemo {
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DateGroupProps {
  dateKey: string;
  groupedEvents: Record<string, EventType[]>;
  collapsedStates: Record<string, boolean>;
  handleToggleCollapse: (dateKey: string) => void;
  handleAddButtonClick: (date?: Date) => void;
  handleEditClick: (event: EventType) => void;
  handleDeleteEvent: (deletedId: string) => void;
  handleToggleCompleteEvent: (id: string, newCompletedState: boolean) => void;
}
