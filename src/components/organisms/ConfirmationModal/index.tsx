'use client';

import { ConfirmationModalProps } from '@/types';

import { useEffect, useRef } from 'react';

import { CONFIRMATION_MODAL } from '@/constants/messages';
import { CONFIRMATION_MODAL_CLASSES, MODAL_CLASSES } from '@/constants/styles';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  confirmText = CONFIRMATION_MODAL.DELETE_BUTTON,
  cancelText = CONFIRMATION_MODAL.CANCEL_BUTTON,
}: ConfirmationModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={MODAL_CLASSES.OVERLAY} onClick={handleBackdropClick}>
      <div
        ref={modalContentRef}
        className={CONFIRMATION_MODAL_CLASSES.CONTAINER}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={CONFIRMATION_MODAL_CLASSES.TITLE}>{CONFIRMATION_MODAL.TITLE}</h3>
        <p className={CONFIRMATION_MODAL_CLASSES.MESSAGE}>{message}</p>

        <div className={CONFIRMATION_MODAL_CLASSES.BUTTON_CONTAINER}>
          <button
            type="button"
            onClick={onClose}
            className={CONFIRMATION_MODAL_CLASSES.CANCEL_BUTTON}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={CONFIRMATION_MODAL_CLASSES.CONFIRM_BUTTON}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
