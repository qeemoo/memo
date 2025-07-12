"use client";

interface AddEventInlineButtonProps {
  onClick: () => void;
}

export default function AddEventInlineButton({ onClick }: AddEventInlineButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 cursor-pointer"
      aria-label="Add new event"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
}
