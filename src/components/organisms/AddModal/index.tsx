'use client';

import DatePicker from 'react-datepicker';

import { useEffect, useRef, useState } from 'react';

import { ADD_MODAL } from '@/constants/messages';
import { MODAL_CLASSES } from '@/constants/styles';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventAdded: () => void;
  initialDate?: Date;
}

export default function AddEventModal({
  isOpen,
  onClose,
  onEventAdded,
  initialDate,
}: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || new Date());
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setSelectedDate(initialDate || new Date());
    }
  }, [isOpen, initialDate]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !selectedDate) {
      alert(ADD_MODAL.VALIDATION_ERROR);
      return;
    }

    try {
      const startDate = selectedDate;
      const endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999);

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          isAllDay: true,
        }),
      });

      if (!response.ok) {
        let errorMessage = ADD_MODAL.ADD_FAILURE;
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {}
        throw new Error(errorMessage);
      }

      const newEvent = await response.json();
      console.log('새 일정 추가 완료:', newEvent);

      onEventAdded();
      onClose();
    } catch (error) {
      console.error(ADD_MODAL.ADD_ERROR, error);
      if (error instanceof Error) {
        alert(ADD_MODAL.ADD_ERROR_ALERT(error.message));
      } else {
        alert(ADD_MODAL.UNKNOWN_ADD_ERROR);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={MODAL_CLASSES.OVERLAY} onClick={handleBackdropClick}>
      <div
        ref={modalContentRef}
        className={MODAL_CLASSES.CONTAINER}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={MODAL_CLASSES.TITLE}>{ADD_MODAL.TITLE}</h2>
        <form onSubmit={handleSubmit}>
          <div className={MODAL_CLASSES.FORM_GROUP_MB4}>
            <label htmlFor="title" className={MODAL_CLASSES.LABEL}>
              {ADD_MODAL.TODO_LABEL}
            </label>
            <input
              type="text"
              id="title"
              className={MODAL_CLASSES.INPUT}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={ADD_MODAL.TODO_PLACEHOLDER}
              required
            />
          </div>

          <div className={MODAL_CLASSES.FORM_GROUP_MB6}>
            <label htmlFor="date" className={MODAL_CLASSES.LABEL}>
              {ADD_MODAL.DATE_LABEL}
            </label>
            <div className={MODAL_CLASSES.DATEPICKER_CONTAINER}>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className={MODAL_CLASSES.DATEPICKER_INPUT}
                wrapperClassName={MODAL_CLASSES.DATEPICKER_WRAPPER}
                calendarClassName={MODAL_CLASSES.DATEPICKER_CALENDAR}
              />
              <div className={MODAL_CLASSES.DATEPICKER_ICON_CONTAINER}>
                <svg
                  className={MODAL_CLASSES.DATEPICKER_ICON}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className={MODAL_CLASSES.BUTTON_CONTAINER}>
            <button type="button" onClick={onClose} className={MODAL_CLASSES.CANCEL_BUTTON}>
              {ADD_MODAL.CANCEL_BUTTON}
            </button>
            <button type="submit" className={MODAL_CLASSES.CONFIRM_BUTTON}>
              {ADD_MODAL.CONFIRM_BUTTON}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
