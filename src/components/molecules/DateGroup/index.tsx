import { EventType } from '@/types';

import React from 'react';

import AddEventInlineButton from '@/components/atoms/AddEventInlineButton';
import ChevronDownIcon from '@/components/atoms/Icons/ChevronDownIcon';
import ChevronRightIcon from '@/components/atoms/Icons/ChevronRightIcon';
import CalendarDayHeader from '@/components/molecules/CalendarDayHeader';
import EventListItem from '@/components/molecules/EventListItem';

import { ADD_MODAL, TOAST_MESSAGES } from '@/constants/messages';
import { LAYOUT_CLASSES } from '@/constants/styles';

interface DateGroupProps {
  dateKey: string;
  groupedEvents: Record<string, EventType[]>;
  collapsedStates: Record<string, boolean>;
  handleToggleCollapse: (dateKey: string) => void;
  handleAddButtonClick: (date?: Date) => void;
  handleEditClick: (event: EventType) => void;
  handleDeleteEvent: (deletedId: string) => void;
  handleToggleCompleteEvent: (id: string, newCompletedState: boolean) => void;
}

const DateGroup: React.FC<DateGroupProps> = ({
  dateKey,
  groupedEvents,
  collapsedStates,
  handleToggleCollapse,
  handleAddButtonClick,
  handleEditClick,
  handleDeleteEvent,
  handleToggleCompleteEvent,
}) => {
  return (
    <div key={dateKey} className={LAYOUT_CLASSES.DATE_GROUP_CONTAINER}>
      <div className={LAYOUT_CLASSES.DATE_HEADER_BUTTON_CONTAINER}>
        <div className={LAYOUT_CLASSES.DATE_HEADER_ADD_BUTTON_CONTAINER}>
          <CalendarDayHeader date={new Date(dateKey)} />
          <div className={LAYOUT_CLASSES.ADD_INLINE_BUTTON_MARGIN}>
            <AddEventInlineButton onClick={() => handleAddButtonClick(new Date(dateKey))} />
          </div>
        </div>
        <button
          onClick={() => handleToggleCollapse(dateKey)}
          className={LAYOUT_CLASSES.COLLAPSE_BUTTON}
          aria-label={collapsedStates[dateKey] ? ADD_MODAL.SHOW_EVENTS : ADD_MODAL.HIDE_EVENTS}
        >
          {collapsedStates[dateKey] ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={`${LAYOUT_CLASSES.EVENT_LIST_CONTAINER} ${collapsedStates[dateKey] ? 'hidden' : ''}`}
      >
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
          <div className={LAYOUT_CLASSES.NO_EVENTS_MESSAGE}>{TOAST_MESSAGES.NO_EVENTS}</div>
        )}
      </div>
    </div>
  );
};

export default DateGroup;
