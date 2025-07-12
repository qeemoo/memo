"use client";

import { useState, useEffect } from "react";
import ConfirmationModal from "@/src/components/organisms/ConfirmationModal";

import { EventType } from "@/src/types";

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
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: newCompletedState }),
      });

      if (!response.ok) {
        setLocalIsCompleted(previousCompletedState);
        const errorData = await response.json();
        throw new Error(errorData.message || "상태 업데이트에 실패했습니다.");
      }

      onToggleComplete(id, newCompletedState);
    } catch (error) {
      console.error("일정 상태 업데이트 중 오류 발생:", error);
      setLocalIsCompleted(previousCompletedState);
      if (error instanceof Error) {
        alert(`상태 업데이트 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert("상태 업데이트 중 알 수 없는 오류가 발생했습니다.");
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
        method: "DELETE",
      });

      if (!response.ok) {
        let errorMessage = "일정 삭제에 실패했습니다.";
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
      console.error("일정 삭제 중 오류 발생:", error);
      if (error instanceof Error) {
        alert(`일정 삭제 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert("일정 삭제 중 알 수 없는 오류가 발생했습니다.");
      }
    }
  finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`flex items-center p-4 rounded-lg shadow ${
        localIsCompleted ? "bg-red-50" : "bg-blue-50"
      }`}
    >
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={localIsCompleted}
          onChange={handleToggleComplete}
          className="hidden"
        />
        <div
          className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-200
            ${
              localIsCompleted
                ? "bg-green-500 border-green-500"
                : "bg-white border-gray-300"
            }`}
        >
          {localIsCompleted && (
            <svg
              className="w-4 h-4 text-white"
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
        className={`ml-4 text-lg flex-grow ${
          localIsCompleted ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        {title}
      </span>
      <button
        onClick={() => onEdit(event)}
        className="ml-4 p-2 text-gray-500 hover:text-gray-700 rounded-md flex items-center justify-center
                   transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 cursor-pointer"
        aria-label={`Edit event: ${title}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
      <button
        onClick={handleOpenConfirmModal}
        className="ml-2 p-2 text-red-500 hover:text-red-600 rounded-md flex items-center justify-center
                   transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 cursor-pointer"
        disabled={isDeleting}
        aria-label={`Delete event: ${title}`}
      >
        {isDeleting ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
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
            className="h-5 w-5"
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
        message={`"${title}" 일정을 정말로 삭제하시겠습니까?`}
      />
    </div>
  );
}