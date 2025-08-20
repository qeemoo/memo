'use client';

import { MemoModalProps } from '@/types';

import { useEffect, useRef } from 'react';

import { MEMO_MODAL } from '@/constants/messages';
import { MEMO_MODAL_CLASSES } from '@/constants/styles';

export default function MemoModal({
  isOpen,
  onClose,
  memoContent,
  setMemoContent,
}: MemoModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      textareaRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={MEMO_MODAL_CLASSES.CONTAINER} onClick={(e) => e.stopPropagation()}>
      <textarea
        ref={textareaRef}
        className={MEMO_MODAL_CLASSES.TEXTAREA}
        value={memoContent}
        onChange={(e) => setMemoContent(e.target.value)}
        placeholder={MEMO_MODAL.PLACEHOLDER}
      ></textarea>
    </div>
  );
}
