'use client';

import { ADD_EVENT_BUTTON_CLASSES } from '@/constants/styles';

interface AddEventButtonProps {
  onClick: () => void;
  positioning?: 'fixed' | 'centered';
}

export default function AddEventButton({ onClick, positioning = 'fixed' }: AddEventButtonProps) {
  const buttonClasses =
    positioning === 'fixed'
      ? ADD_EVENT_BUTTON_CLASSES.FIXED_POSITIONING
      : ADD_EVENT_BUTTON_CLASSES.CENTERED_POSITIONING;

  return (
    <div className={buttonClasses}>
      <button
        onClick={onClick}
        className={ADD_EVENT_BUTTON_CLASSES.BUTTON_BASE}
        aria-label="Add new event"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={ADD_EVENT_BUTTON_CLASSES.ICON}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
