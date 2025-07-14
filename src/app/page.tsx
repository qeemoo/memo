'use client';

import { useEffect } from 'react';

import AddEventButton from '@/components/atoms/AddEventButton';
import MemoButton from '@/components/atoms/MemoButton';
import Toast from '@/components/atoms/Toast';
import AddEventModal from '@/components/organisms/AddModal';
import CalendarView from '@/components/organisms/CalendarView';
import EditEventModal from '@/components/organisms/EditModal';
import MemoModal from '@/components/organisms/MemoModal';

import { ADD_MODAL, TOAST_MESSAGES } from '@/constants/messages';
import { LAYOUT_CLASSES } from '@/constants/styles';

import { useDisplayStates } from '@/hooks/useDisplayStates';
import { useEvents } from '@/hooks/useEvents';
import { useMemoLogic } from '@/hooks/useMemoLogic';
import { useModals } from '@/hooks/useModals';
import { useToast } from '@/hooks/useToast';

import { groupEventsByDate } from '@/utils/eventUtils';

export default function HomePage() {
  const { toast, showToast, hideToast } = useToast();
  const {
    events,
    loading,
    error,
    fetchEvents,
    handleEventAdded,
    handleDeleteEvent,
    handleToggleCompleteEvent,
    handleEventUpdated,
  } = useEvents({ showToast });
  const {
    memoContent,
    setMemoContent,
    fetchMemo,
    handleSaveMemo,
    initialMemoContentOnOpen,
    setInitialMemoContentOnOpen,
  } = useMemoLogic({ showToast });
  const { collapsedStates, handleToggleCollapse } = useDisplayStates({ showToast });
  const {
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
  } = useModals();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (!isMemoModalOpen && memoContent !== initialMemoContentOnOpen) {
      handleSaveMemo(memoContent);
    }
  }, [isMemoModalOpen, memoContent, initialMemoContentOnOpen, handleSaveMemo]);

  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  return (
    <>
      <CalendarView
        events={events}
        loading={loading}
        error={error}
        groupedEvents={groupedEvents}
        sortedDates={sortedDates}
        collapsedStates={collapsedStates}
        handleToggleCollapse={handleToggleCollapse}
        handleAddButtonClick={handleAddButtonClick}
        handleEditClick={handleEditClick}
        handleDeleteEvent={handleDeleteEvent}
        handleToggleCompleteEvent={handleToggleCompleteEvent}
      />

      <AddEventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEventAdded={handleEventAdded}
        initialDate={selectedDateForModal}
      />

      {eventToEdit && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          onEventUpdated={handleEventUpdated}
          event={eventToEdit}
        />
      )}

      {sortedDates.length > 0 ? (
        <AddEventButton onClick={() => handleAddButtonClick(undefined)} positioning="fixed" />
      ) : (
        <AddEventButton onClick={() => handleAddButtonClick(undefined)} positioning="centered" />
      )}

      <MemoButton
        onClick={() => handleMemoButtonClick(fetchMemo, setInitialMemoContentOnOpen, memoContent)}
      />

      {isMemoModalOpen && (
        <>
          <div className={LAYOUT_CLASSES.MEMO_MODAL_BACKDROP} onClick={handleMemoModalClose}></div>
          <div
            className={LAYOUT_CLASSES.MEMO_MODAL_CONTAINER}
            style={{ top: '33.33%', bottom: '6rem' }}
          >
            <MemoModal
              isOpen={isMemoModalOpen}
              onClose={handleMemoModalClose}
              memoContent={memoContent}
              setMemoContent={setMemoContent}
            />
          </div>
        </>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </>
  );
}
