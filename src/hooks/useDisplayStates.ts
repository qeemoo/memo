import { UseDisplayStatesProps } from '@/types';

import { useCallback, useEffect, useState } from 'react';

import { TOAST_MESSAGES } from '@/constants/messages';

export const useDisplayStates = ({ showToast }: UseDisplayStatesProps) => {
  const [collapsedStates, setCollapsedStates] = useState<Record<string, boolean>>({});

  const fetchDisplayStates = useCallback(async () => {
    try {
      const response = await fetch('/api/display-states');
      if (response.ok) {
        const data = await response.json();
        setCollapsedStates(data);
      }
    } catch (error) {
      console.error(TOAST_MESSAGES.INITIAL_DISPLAY_STATE_FETCH_ERROR, error);
    }
  }, []);

  const handleToggleCollapse = useCallback(
    async (dateKey: string) => {
      const newCollapsedState = !collapsedStates[dateKey];
      setCollapsedStates((prevState) => ({
        ...prevState,
        [dateKey]: newCollapsedState,
      }));

      try {
        const response = await fetch('/api/display-states', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date: dateKey, isCollapsed: newCollapsedState }),
        });
        if (!response.ok) {
          console.error(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_FAILURE);
          showToast(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_FAILURE, 'error');
        }
      } catch (error) {
        console.error(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_ERROR, error);
        showToast(TOAST_MESSAGES.DISPLAY_STATE_UPDATE_ERROR, 'error');
      }
    },
    [collapsedStates, showToast],
  );

  useEffect(() => {
    fetchDisplayStates();
  }, [fetchDisplayStates]);

  return { collapsedStates, handleToggleCollapse };
};
