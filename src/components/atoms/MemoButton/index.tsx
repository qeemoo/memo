'use client';

import { MemoButtonProps } from '@/types';

import { ClipboardListIcon } from '@/components/atoms/Icons';

import { MEMO_BUTTON_CLASSES } from '@/constants/styles';

export default function MemoButton({ onClick }: MemoButtonProps) {
  return (
    <div className={MEMO_BUTTON_CLASSES.CONTAINER}>
      <button onClick={onClick} className={MEMO_BUTTON_CLASSES.BUTTON_BASE} aria-label="Open memo">
        <ClipboardListIcon className={MEMO_BUTTON_CLASSES.ICON} />
      </button>
    </div>
  );
}
