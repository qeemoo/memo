"use client";

import { useState, useEffect, useCallback } from "react";
import AddEventButton from "@/components/atoms/AddEventButton";
import CalendarDayHeader from "@/components/molecules/CalendarDayHeader";
import EventListItem from "@/components/molecules/EventListItem";
import AddEventModal from "@/components/organisms/AddModal";
import AddEventInlineButton from "@/components/atoms/AddEventInlineButton";
import EditEventModal from "@/components/organisms/EditModal";
import Toast from "@/components/atoms/Toast";
import MemoButton from "@/components/atoms/MemoButton";
import MemoModal from "@/components/organisms/MemoModal";

import ChevronRightIcon from "@/components/atoms/Icons/ChevronRightIcon";
import ChevronDownIcon from "@/components/atoms/Icons/ChevronDownIcon";
import LoadingSpinner from "@/components/atoms/Icons/LoadingSpinner";

import { TOAST_MESSAGES, ADD_MODAL } from "@/constants/messages";
import { EventType } from "@/types";

export default function HomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
  const [collapsedStates, setCollapsedStates] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState<boolean>(false);
  const [memoContent, setMemoContent] = useState<string>("");
  const [initialMemoContentOnOpen, setInitialMemoContentOnOpen] = useState<string>("");

  const showToast = useCallback((message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
  }, [setToast]);

  const hideToast = () => {
    setToast(null);
  };

  const [selectedDateForModal, setSelectedDateForModal] = useState<Date | undefined>(undefined);

  const handleAddButtonClick = (date?: Date) => {
    setSelectedDateForModal(date);
    setIsModalOpen(true);
  };

  const handleToggleCollapse = async (dateKey: string) => {
    const newCollapsedState = !collapsedStates[dateKey];
    setCollapsedStates(prevState => ({
      ...prevState,
      [dateKey]: newCollapsedState
    }));

    try {
      const response = await fetch("/api/display-states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dateKey, isCollapsed: newCollapsedState }),
      });
      if (!response.ok) {
        console.error(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_FAILURE);
        showToast(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_FAILURE, "error");
      }
    } catch (error) {
      console.error(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_ERROR, error);
      showToast(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_ERROR, "error");
    }
  };

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
  };

  const fetchMemo = useCallback(async () => {
    try {
      const response = await fetch("/api/memo");
      if (response.ok) {
        const data = await response.json();
        if (data && data.content) {
          setMemoContent(data.content);
        }
      }
    } catch (error) {
      console.error(TOAST_MESSAGES.MEMO_FETCH_ERROR, error);
    }
  }, [setMemoContent]);

  const handleSaveMemo = useCallback(async (content: string) => {
    console.log("Attempting to save memo:", content);
    try {
      const response = await fetch("/api/memo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        setMemoContent(content);
        showToast(TOAST_MESSAGES.MEMO_SAVE_SUCCESS, "info");
      } else {
        showToast(TOAST_MESSAGES.MEMO_SAVE_FAILURE, "error");
      }
    } catch (error) {
      console.error("Error saving memo:", error);
      showToast(TOAST_MESSAGES.MEMO_SAVE_ERROR, "error");
    }
  }, [setMemoContent, showToast]);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchEvents();
      try {
        const response = await fetch("/api/display-states");
        if (response.ok) {
          const data = await response.json();
          setCollapsedStates(data);
        }
      } catch (error) {
        console.error(TOAST_MESSAGES.INITIAL_DISPLAY_STATE_FETCH_ERROR, error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!isMemoModalOpen && memoContent !== initialMemoContentOnOpen) {
      handleSaveMemo(memoContent);
    }
  }, [isMemoModalOpen, memoContent, initialMemoContentOnOpen, handleSaveMemo]);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEventAdded = () => {
    fetchEvents();
    showToast(TOAST_MESSAGES.EVENT_ADD_SUCCESS, "success");
  };

  const handleDeleteEvent = (deletedId: string) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== deletedId)
    );
    showToast(TOAST_MESSAGES.EVENT_DELETE_SUCCESS, "error");
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
    showToast(TOAST_MESSAGES.EVENT_UPDATE_SUCCESS, "info");
  };

  const handleEditClick = (event: EventType) => {
    setEventToEdit(event);
    setIsEditModalOpen(true);
  };

  const handleEventUpdated = () => {
    fetchEvents();
    showToast(TOAST_MESSAGES.EVENT_EDIT_SUCCESS, "info");
  };

  const handleMemoButtonClick = async () => {
    await fetchMemo();
    setInitialMemoContentOnOpen(memoContent);
    setIsMemoModalOpen((prev) => !prev);
  };

  const handleMemoModalClose = () => {
    setIsMemoModalOpen(false);
  };

  const groupEventsByDate = (events: EventType[]) => {
    const grouped: Record<string, EventType[]> = {};
    events.forEach((event) => {
      const dateKey = new Date(event.startDate).toISOString().split("T")[0];
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

  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  if (loading) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl text-center flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner />
          <p className="text-xl text-gray-700">{TOAST_MESSAGES.EVENTS_LOADING}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl text-center">
        <p className="text-xl text-red-600">{TOAST_MESSAGES.EVENTS_LOAD_ERROR} {error}</p>
      </main>
    );
  }

  return (
    <>
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        {sortedDates.length > 0 ? (
          sortedDates.map((dateKey) => (
            <div key={dateKey} className="mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col gap-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CalendarDayHeader date={new Date(dateKey)} />
                  <div className="ml-2">
                    <AddEventInlineButton onClick={() => handleAddButtonClick(new Date(dateKey))} />
                  </div>
                </div>
                <button
                  onClick={() => handleToggleCollapse(dateKey)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label={collapsedStates[dateKey] ? ADD_MODAL.SHOW_EVENTS : ADD_MODAL.HIDE_EVENTS}
                >
                  {collapsedStates[dateKey] ? (
                    <ChevronRightIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className={`flex flex-col gap-y-2 ${collapsedStates[dateKey] ? 'hidden' : ''}`}>
                {groupedEvents[dateKey].map((event) => (
                  <EventListItem
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    isCompleted={event.isCompleted}
                    onDelete={handleDeleteEvent}
                    onToggleComplete={handleToggleCompleteEvent}
                    onEdit={handleEditClick}
                    event={event}
                  />
                ))}
                {groupedEvents[dateKey].length === 0 && (
                  <div className="p-4 text-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
                    {TOAST_MESSAGES.NO_EVENTS}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          null
        )}
      </main>

      <AddEventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEventAdded={handleEventAdded}
        initialDate={selectedDateForModal}
      />

      {eventToEdit && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          onEventUpdated={handleEventUpdated}
          event={eventToEdit}
        />
      )}

      {sortedDates.length > 0 ? (
        <AddEventButton onClick={() => handleAddButtonClick(undefined)} positioning="fixed" />
      ) : (
        <AddEventButton onClick={() => handleAddButtonClick(undefined)} positioning="centered" />
      )}

      <MemoButton onClick={handleMemoButtonClick} />

      {isMemoModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent z-40"
            onClick={handleMemoModalClose}
          ></div>
          <div className="fixed right-6 z-50 w-[30rem]"
               style={{ top: '33.33%', bottom: '6rem' }}>
            <MemoModal
              isOpen={isMemoModalOpen}
              onClose={handleMemoModalClose}
              memoContent={memoContent}
              setMemoContent={setMemoContent}
            />
          </div>
        </>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </>
  );
}
