import { CalendarViewProps, EventType } from '@/types';

import React from 'react';

import { ChevronDownIcon, ChevronRightIcon, LoadingSpinner } from '@/components/atoms/Icons';
import DateGroup from '@/components/molecules/DateGroup';

import { ADD_MODAL, TOAST_MESSAGES } from '@/constants/messages';
import { LAYOUT_CLASSES } from '@/constants/styles';

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
  handleWeeklyReportModalOpen,
  weeklyReports,
  handleGenerateReport,
  consolidatedReport,
  showConsolidatedReport,
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

  const weekDays = ['월', '화', '수', '목', '금'];
  const allReportsSubmitted = Object.keys(weeklyReports).length === 5;

  return (
    <main className={LAYOUT_CLASSES.DEFAULT_MAIN}>
      <div className="p-4 relative">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {weekDays.map((day) => (
                <th key={day} className="border border-gray-300 p-2 bg-gray-100">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {[...Array(5)].map((_, colIndex) => (
                <td key={colIndex} className="border border-gray-300 p-2 h-24 text-center">
                  <button
                    onClick={() => handleWeeklyReportModalOpen(colIndex)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {weeklyReports[colIndex] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    )}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        {allReportsSubmitted && (
          <button
            onClick={handleGenerateReport}
            className="absolute top-1/2 right-0 -mr-12 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {showConsolidatedReport && (
        <div className="p-4">
          <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md">{consolidatedReport}</div>
        </div>
      )}

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
