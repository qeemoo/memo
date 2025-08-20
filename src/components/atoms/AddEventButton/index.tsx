'use client';

import { AddEventButtonProps } from '@/types';

import { PlusIcon } from '@/components/atoms/Icons';

import { ADD_EVENT_BUTTON_CLASSES } from '@/constants/styles';

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
        <PlusIcon className={ADD_EVENT_BUTTON_CLASSES.ICON} />
      </button>
    </div>
  );
}
