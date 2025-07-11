interface CalendarDayHeaderProps {
  date: Date;
}

export default function CalendarDayHeader({ date }: CalendarDayHeaderProps) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const formattedDate = date.toLocaleDateString("ko-KR", options);

  return (
    <div className="text-left text-gray-700 text-lg font-semibold mb-2">
      {formattedDate}
    </div>
  );
}
