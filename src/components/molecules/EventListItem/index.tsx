'use client';

import { EventType } from '@/types';

import { useEffect, useState } from 'react';

import ConfirmationModal from '@/components/organisms/ConfirmationModal';

import { EVENT_LIST_ITEM } from '@/constants/messages';
import { EVENT_LIST_ITEM_CLASSES } from '@/constants/styles';

interface EventListItemProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, newCompletedState: boolean) => void;
  onEdit: (event: EventType) => void;
  event: EventType;
}

export default function EventListItem({
  id,
  title,
  isCompleted,
  onDelete,
  onToggleComplete,
  onEdit,
  event,
}: EventListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [localIsCompleted, setLocalIsCompleted] = useState(isCompleted);

  useEffect(() => {
    setLocalIsCompleted(isCompleted);
  }, [isCompleted]);

  const handleToggleComplete = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const previousCompletedState = localIsCompleted;
    const newCompletedState = !localIsCompleted;
    setLocalIsCompleted(newCompletedState);

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: newCompletedState }),
      });

      if (!response.ok) {
        setLocalIsCompleted(previousCompletedState);
        const errorData = await response.json();
        throw new Error(errorData.message || EVENT_LIST_ITEM.STATUS_UPDATE_FAILURE);
      }

      onToggleComplete(id, newCompletedState);
    } catch (error) {
      console.error(EVENT_LIST_ITEM.STATUS_UPDATE_ERROR, error);
      setLocalIsCompleted(previousCompletedState);
      if (error instanceof Error) {
        alert(EVENT_LIST_ITEM.STATUS_UPDATE_ERROR_ALERT(error.message));
      } else {
        alert(EVENT_LIST_ITEM.UNKNOWN_STATUS_UPDATE_ERROR);
      }
    }
  };

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    setIsConfirmModalOpen(false);
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        let errorMessage = EVENT_LIST_ITEM.DELETE_FAILURE;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {}
        throw new Error(errorMessage);
      }

      onDelete(id);
    } catch (error) {
      console.error(EVENT_LIST_ITEM.DELETE_ERROR, error);
      if (error instanceof Error) {
        alert(EVENT_LIST_ITEM.DELETE_ERROR_ALERT(error.message));
      } else {
        alert(EVENT_LIST_ITEM.UNKNOWN_DELETE_ERROR);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`${EVENT_LIST_ITEM_CLASSES.CONTAINER_BASE} ${
        localIsCompleted
          ? EVENT_LIST_ITEM_CLASSES.COMPLETED_BG
          : EVENT_LIST_ITEM_CLASSES.INCOMPLETE_BG
      }`}
    >
      <label className={EVENT_LIST_ITEM_CLASSES.CHECKBOX_LABEL}>
        <input
          type="checkbox"
          checked={localIsCompleted}
          onChange={handleToggleComplete}
          className={EVENT_LIST_ITEM_CLASSES.CHECKBOX_INPUT}
        />
        <div
          className={`${EVENT_LIST_ITEM_CLASSES.CHECKBOX_CUSTOM_BASE}
            ${
              localIsCompleted
                ? EVENT_LIST_ITEM_CLASSES.CHECKBOX_COMPLETED
                : EVENT_LIST_ITEM_CLASSES.CHECKBOX_INCOMPLETE
            }`}
        >
          {localIsCompleted && (
            <svg
              className={EVENT_LIST_ITEM_CLASSES.CHECKBOX_ICON}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </div>
      </label>
      <span
        className={`${EVENT_LIST_ITEM_CLASSES.TITLE_BASE} ${
          localIsCompleted
            ? EVENT_LIST_ITEM_CLASSES.TITLE_COMPLETED
            : EVENT_LIST_ITEM_CLASSES.TITLE_INCOMPLETE
        }`}
      >
        {title}
      </span>
      <button
        onClick={() => onEdit(event)}
        className={EVENT_LIST_ITEM_CLASSES.EDIT_BUTTON}
        aria-label={`Edit event: ${title}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={EVENT_LIST_ITEM_CLASSES.EDIT_BUTTON_ICON}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <button
        onClick={handleOpenConfirmModal}
        className={EVENT_LIST_ITEM_CLASSES.DELETE_BUTTON}
        disabled={isDeleting}
        aria-label={`Delete event: ${title}`}
      >
        {isDeleting ? (
          <svg
            className={EVENT_LIST_ITEM_CLASSES.DELETE_BUTTON_LOADING_SPINNER}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={EVENT_LIST_ITEM_CLASSES.DELETE_BUTTON_ICON}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
      </button>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleDeleteConfirmed}
        message={EVENT_LIST_ITEM.CONFIRM_DELETE(title)}
      />
    </div>
  );
}
