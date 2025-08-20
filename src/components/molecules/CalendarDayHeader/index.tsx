import { CalendarDayHeaderProps } from '@/types';

export default function CalendarDayHeader({ date }: CalendarDayHeaderProps) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  const formattedDate = date.toLocaleDateString('ko-KR', options);

  return <div className="text-left text-gray-700 text-2xl font-semibold">{formattedDate}</div>;
}
