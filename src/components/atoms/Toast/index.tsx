'use client';

import { useEffect, useState } from 'react';

import { TOAST_TYPES } from '@/constants/messages';
import { TOAST_CLASSES } from '@/constants/styles';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const getColors = () => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return { bgColor: 'bg-blue-100', textColor: 'text-blue-800' };
      case TOAST_TYPES.ERROR:
        return { bgColor: 'bg-red-100', textColor: 'text-red-800' };
      case TOAST_TYPES.INFO:
        return { bgColor: 'bg-green-100', textColor: 'text-green-800' };
      default:
        return { bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
    }
  };

  const { bgColor, textColor } = getColors();

  if (!isVisible) return null;

  return (
    <div
      className={`${TOAST_CLASSES.CONTAINER} ${bgColor} ${textColor} ${isVisible ? TOAST_CLASSES.VISIBLE : TOAST_CLASSES.HIDDEN}`}
      role="alert"
    >
      <span>{message}</span>
    </div>
  );
}
