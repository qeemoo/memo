'use client';

import { MEMO_BUTTON_CLASSES } from '@/constants/styles';

interface MemoButtonProps {
  onClick: () => void;
}

export default function MemoButton({ onClick }: MemoButtonProps) {
  return (
    <div className={MEMO_BUTTON_CLASSES.CONTAINER}>
      <button onClick={onClick} className={MEMO_BUTTON_CLASSES.BUTTON_BASE} aria-label="Open memo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={MEMO_BUTTON_CLASSES.ICON}
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
