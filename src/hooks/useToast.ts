import { useCallback, useState } from 'react';

type ToastState = {
  message: string;
  type: 'success' | 'error' | 'info';
} | null;

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showToast, hideToast };
};
