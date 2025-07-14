import { EventType } from '@/types';

export const groupEventsByDate = (events: EventType[]) => {
  const grouped: Record<string, EventType[]> = {};
  events.forEach((event) => {
    const dateKey = new Date(event.startDate).toISOString().split('T')[0];
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(event);
  });
  for (const dateKey in grouped) {
    grouped[dateKey].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  }
  return grouped;
};
