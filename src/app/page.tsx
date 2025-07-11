"use client";

import { useState, useEffect } from "react";
import AddEventButton from "./components/common/AddEventButton";
import CalendarDayHeader from "./components/calender/CalendarDayHeader.tsx";
import EventListItem from "./components/calender/EventListItem";
import AddEventModal from "./components/common/AddModal";

interface EventType {
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

export default function HomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: EventType[] = await response.json();
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        if (dateA !== dateB) {
          return dateA - dateB;
        }
        return a.createdAt.localeCompare(b.createdAt);
      });
      setEvents(sortedData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEventAdded = () => {
    fetchEvents();
  };

  const handleDeleteEvent = (deletedId: string) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== deletedId)
    );
  };

  const handleToggleCompleteEvent = (
    id: string,
    newCompletedState: boolean
  ) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === id ? { ...event, isCompleted: newCompletedState } : event
      )
    );
  };

  const groupEventsByDate = (events: EventType[]) => {
    const grouped: Record<string, EventType[]> = {};
    events.forEach((event) => {
      const dateKey = event.startDate.split("T")[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  if (loading) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl text-center">
        <p className="text-xl text-gray-700">일정을 불러오는 중입니다...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl text-center">
        <p className="text-xl text-red-600">오류 발생: {error}</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        {sortedDates.length > 0 ? (
          sortedDates.map((dateKey) => (
            <div key={dateKey} className="mb-8">
              <CalendarDayHeader date={new Date(dateKey)} />
              <div className="mt-4">
                {groupedEvents[dateKey].map((event) => (
                  <EventListItem
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    isCompleted={event.isCompleted}
                    onDelete={handleDeleteEvent}
                    onToggleComplete={handleToggleCompleteEvent}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">
            일정이 없습니다. 새 일정을 추가해보세요!
          </p>
        )}
      </main>

      <AddEventButton onClick={handleAddButtonClick} />

      <AddEventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEventAdded={handleEventAdded}
      />
    </>
  );
}
