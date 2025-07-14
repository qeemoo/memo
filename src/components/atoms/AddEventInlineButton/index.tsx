'use client';

import { ADD_EVENT_INLINE_BUTTON_CLASSES } from '@/constants/styles';

interface AddEventInlineButtonProps {
  onClick: () => void;
}

export default function AddEventInlineButton({ onClick }: AddEventInlineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={ADD_EVENT_INLINE_BUTTON_CLASSES.BUTTON_BASE}
      aria-label="Add new event"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={ADD_EVENT_INLINE_BUTTON_CLASSES.ICON}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}
