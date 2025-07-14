"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ADD_MODAL } from "@/constants/messages";

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
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || new Date()
  );
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setSelectedDate(initialDate || new Date());
    }
  }, [isOpen, initialDate]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
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

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      console.log("새 일정 추가 완료:", newEvent);

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
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-[100]"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalContentRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-100 opacity-100 border border-gray-400"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {ADD_MODAL.TITLE}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {ADD_MODAL.TODO_LABEL}
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={ADD_MODAL.TODO_PLACEHOLDER}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              {ADD_MODAL.DATE_LABEL}
            </label>
            <div className="relative w-full">
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                wrapperClassName="w-full"
                calendarClassName="modern-datepicker"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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

          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 cursor-pointer"
            >
              {ADD_MODAL.CANCEL_BUTTON}
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              {ADD_MODAL.CONFIRM_BUTTON}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}