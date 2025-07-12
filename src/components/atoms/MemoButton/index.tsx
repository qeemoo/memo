"use client";

interface MemoButtonProps {
  onClick: () => void;
}

export default function MemoButton({ onClick }: MemoButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className="flex items-center justify-center w-14 h-14 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded-full shadow-lg transition-transform transform hover:scale-105 cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
        aria-label="Open memo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </button>
    </div>
  );
}