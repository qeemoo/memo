import { useCallback, useEffect, useState } from 'react';

import { TOAST_MESSAGES } from '@/constants/messages';

interface UseMemoProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const useMemoLogic = ({ showToast }: UseMemoProps) => {
  const [memoContent, setMemoContent] = useState<string>('');
  const [initialMemoContentOnOpen, setInitialMemoContentOnOpen] = useState<string>('');

  const fetchMemo = useCallback(async () => {
    try {
      const response = await fetch('/api/memo');
      if (response.ok) {
        const data = await response.json();
        if (data && data.content) {
          setMemoContent(data.content);
        }
      }
    } catch (error) {
      console.error(TOAST_MESSAGES.MEMO_FETCH_ERROR, error);
    }
  }, [setMemoContent]);

  const handleSaveMemo = useCallback(
    async (content: string) => {
      console.log('Attempting to save memo:', content);
      try {
        const response = await fetch('/api/memo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });
        if (response.ok) {
          setMemoContent(content);
          showToast(TOAST_MESSAGES.MEMO_SAVE_SUCCESS, 'info');
        } else {
          showToast(TOAST_MESSAGES.MEMO_SAVE_FAILURE, 'error');
        }
      } catch (error) {
        console.error(TOAST_MESSAGES.MEMO_SAVE_ERROR, error);
        showToast(TOAST_MESSAGES.MEMO_SAVE_ERROR, 'error');
      }
    },
    [setMemoContent, showToast],
  );

  return {
    memoContent,
    setMemoContent,
    fetchMemo,
    handleSaveMemo,
    initialMemoContentOnOpen,
    setInitialMemoContentOnOpen,
  };
};
