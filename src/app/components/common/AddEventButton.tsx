"use client";

interface AddEventButtonProps {
  onClick: () => void; // 클릭 이벤트 핸들러 추가
}

export default function AddEventButton({ onClick }: AddEventButtonProps) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={onClick} // onClick 핸들러 연결
        className="flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        aria-label="Add new event"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}
