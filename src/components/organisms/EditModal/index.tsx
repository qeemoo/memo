"use client";

import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";

import { EventType } from "@/src/types";

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventUpdated: () => void;
  event: EventType;
}

export default function EditEventModal({
  isOpen,
  onClose,
  onEventUpdated,
  event,
}: EditEventModalProps) {
  const [title, setTitle] = useState(event.title);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(event.startDate)
  );
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && event) {
      setTitle(event.title);
      setSelectedDate(new Date(event.startDate));
    }
  }, [isOpen, event]);

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
      alert("할 일과 날짜를 입력해주세요.");
      return;
    }

    try {
      const startDate = selectedDate;
      const endDate = new Date(selectedDate);
      endDate.setHours(23, 59, 59, 999);

      const response = await fetch(`/api/events/${event._id}`, {
        method: "PATCH",
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
        let errorMessage = "일정 수정에 실패했습니다.";
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {}
        throw new Error(errorMessage);
      }

      const updatedEvent = await response.json();
      console.log("일정 수정 완료:", updatedEvent);

      onEventUpdated();
      onClose();
    } catch (error) {
      console.error("일정 수정 중 오류 발생:", error);
      if (error instanceof Error) {
        alert(`일정 수정 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert("일정 수정 중 알 수 없는 오류가 발생했습니다.");
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
          일정 수정
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              할 일
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 팀 회의 준비"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              날짜 선택
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
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              수정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
