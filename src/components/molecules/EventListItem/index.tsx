'use client';

import { EventListItemProps, EventType } from '@/types';

import { useEffect, useState } from 'react';

import { CheckIcon, PencilIcon, SpinnerIcon, TrashIcon } from '@/components/atoms/Icons';
import ConfirmationModal from '@/components/organisms/ConfirmationModal';

import { EVENT_LIST_ITEM } from '@/constants/messages';
import { EVENT_LIST_ITEM_CLASSES } from '@/constants/styles';

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
          {localIsCompleted && <CheckIcon className={EVENT_LIST_ITEM_CLASSES.CHECKBOX_ICON} />}
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
        <PencilIcon className={EVENT_LIST_ITEM_CLASSES.EDIT_BUTTON_ICON} />
      </button>
      <button
        onClick={handleOpenConfirmModal}
        className={EVENT_LIST_ITEM_CLASSES.DELETE_BUTTON}
        disabled={isDeleting}
        aria-label={`Delete event: ${title}`}
      >
        {isDeleting ? (
          <SpinnerIcon className={EVENT_LIST_ITEM_CLASSES.DELETE_BUTTON_LOADING_SPINNER} />
        ) : (
          <TrashIcon className={EVENT_LIST_ITEM_CLASSES.DELETE_BUTTON_ICON} />
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
