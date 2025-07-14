import { EventType } from '@/types';

import React from 'react';

import ChevronDownIcon from '@/components/atoms/Icons/ChevronDownIcon';
import ChevronRightIcon from '@/components/atoms/Icons/ChevronRightIcon';
import LoadingSpinner from '@/components/atoms/Icons/LoadingSpinner';
import DateGroup from '@/components/molecules/DateGroup';

import { ADD_MODAL, TOAST_MESSAGES } from '@/constants/messages';
import { LAYOUT_CLASSES } from '@/constants/styles';

interface CalendarViewProps {
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
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  loading,
  error,
  groupedEvents,
  sortedDates,
  collapsedStates,
  handleToggleCollapse,
  handleAddButtonClick,
  handleEditClick,
  handleDeleteEvent,
  handleToggleCompleteEvent,
}) => {
  if (loading) {
    return (
      <main className={LAYOUT_CLASSES.LOADING_MAIN}>
        <div className={LAYOUT_CLASSES.LOADING_SPINNER_CONTAINER}>
          <LoadingSpinner />
          <p className="text-xl text-gray-700">{TOAST_MESSAGES.EVENTS_LOADING}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={LAYOUT_CLASSES.ERROR_MAIN}>
        <p className="text-xl text-red-600">
          {TOAST_MESSAGES.EVENTS_LOAD_ERROR} {error}
        </p>
      </main>
    );
  }

  return (
    <main className={LAYOUT_CLASSES.DEFAULT_MAIN}>
      {sortedDates.length > 0
        ? sortedDates.map((dateKey) => (
            <DateGroup
              key={dateKey}
              dateKey={dateKey}
              groupedEvents={groupedEvents}
              collapsedStates={collapsedStates}
              handleToggleCollapse={handleToggleCollapse}
              handleAddButtonClick={handleAddButtonClick}
              handleEditClick={handleEditClick}
              handleDeleteEvent={handleDeleteEvent}
              handleToggleCompleteEvent={handleToggleCompleteEvent}
            />
          ))
        : null}
    </main>
  );
};

export default CalendarView;
