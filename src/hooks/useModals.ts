import { EventType } from '@/types';

import { useCallback, useState } from 'react';

export const useModals = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [eventToEdit, setEventToEdit] = useState<EventType | null>(null);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState<boolean>(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState<Date | undefined>(undefined);

  const handleAddButtonClick = useCallback((date?: Date) => {
    setSelectedDateForModal(date);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleEditClick = useCallback((event: EventType) => {
    setEventToEdit(event);
    setIsEditModalOpen(true);
  }, []);

  const handleEditModalClose = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const handleMemoModalClose = useCallback(() => {
    setIsMemoModalOpen(false);
  }, []);

  const handleMemoButtonClick = useCallback(
    async (
      fetchMemo: () => Promise<void>,
      setInitialMemoContentOnOpen: (content: string) => void,
      memoContent: string,
    ) => {
      await fetchMemo();
      setInitialMemoContentOnOpen(memoContent);
      setIsMemoModalOpen((prev) => !prev);
    },
    [],
  );

  return {
    isModalOpen,
    handleModalClose,
    isEditModalOpen,
    handleEditModalClose,
    eventToEdit,
    handleEditClick,
    isMemoModalOpen,
    handleMemoModalClose,
    selectedDateForModal,
    handleAddButtonClick,
    handleMemoButtonClick,
    setIsMemoModalOpen,
  };
};
