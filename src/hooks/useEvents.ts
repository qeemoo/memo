import { EventType, UseEventsProps } from '@/types';

import { useCallback, useEffect, useState } from 'react';

import { TOAST_MESSAGES } from '@/constants/messages';

export const useEvents = ({ showToast }: UseEventsProps) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: EventType[] = await response.json();

      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateA - dateB;
      });
      setEvents(sortedData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEventAdded = useCallback(() => {
    fetchEvents();
    showToast(TOAST_MESSAGES.EVENT_ADD_SUCCESS, 'success');
  }, [fetchEvents, showToast]);

  const handleDeleteEvent = useCallback(
    (deletedId: string) => {
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== deletedId));
      showToast(TOAST_MESSAGES.EVENT_DELETE_SUCCESS, 'error');
    },
    [showToast],
  );

  const handleToggleCompleteEvent = useCallback(
    (id: string, newCompletedState: boolean) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === id ? { ...event, isCompleted: newCompletedState } : event,
        ),
      );
      showToast(TOAST_MESSAGES.EVENT_UPDATE_SUCCESS, 'info');
    },
    [showToast],
  );

  const handleEventUpdated = useCallback(() => {
    fetchEvents();
    showToast(TOAST_MESSAGES.EVENT_EDIT_SUCCESS, 'info');
  }, [fetchEvents, showToast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    handleEventAdded,
    handleDeleteEvent,
    handleToggleCompleteEvent,
    handleEventUpdated,
  };
};
