'use client';

import { AddEventInlineButtonProps } from '@/types';

import { PlusIcon } from '@/components/atoms/Icons';

import { ADD_EVENT_INLINE_BUTTON_CLASSES } from '@/constants/styles';

export default function AddEventInlineButton({ onClick }: AddEventInlineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={ADD_EVENT_INLINE_BUTTON_CLASSES.BUTTON_BASE}
      aria-label="Add new event"
    >
      <PlusIcon className={ADD_EVENT_INLINE_BUTTON_CLASSES.ICON} />
    </button>
  );
}
