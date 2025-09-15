'use client';

import { IWeeklyReport } from '@/types';

import { useEffect, useState } from 'react';

import AddEventButton from '@/components/atoms/AddEventButton';
import MemoButton from '@/components/atoms/MemoButton';
import Toast from '@/components/atoms/Toast';
import AddEventModal from '@/components/organisms/AddModal';
import CalendarView from '@/components/organisms/CalendarView';
import EditEventModal from '@/components/organisms/EditModal';
import MemoModal from '@/components/organisms/MemoModal';
import WeeklyReportModal from '@/components/organisms/WeeklyReportModal';

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

  const [isWeeklyReportModalOpen, setIsWeeklyReportModalOpen] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState<{ [key: number]: string }>({});
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [consolidatedReport, setConsolidatedReport] = useState('');
  const [showConsolidatedReport, setShowConsolidatedReport] = useState(false);

  const handleWeeklyReportModalOpen = (dayOfWeek: number) => {
    setSelectedDay(dayOfWeek);
    setIsWeeklyReportModalOpen(true);
  };

  const handleWeeklyReportModalClose = () => {
    setIsWeeklyReportModalOpen(false);
    setSelectedDay(null);
  };

  useEffect(() => {
    const fetchWeeklyReports = async () => {
      try {
        const response = await fetch('/api/weekly-report');
        if (response.ok) {
          const reports: IWeeklyReport[] = await response.json();
          const reportsMap = reports.reduce(
            (acc, report) => {
              acc[report.dayOfWeek] = report.text;
              return acc;
            },
            {} as { [key: number]: string },
          );
          setWeeklyReports(reportsMap);
        }
      } catch (error) {
        console.error('Failed to fetch weekly reports:', error);
      }
    };
    fetchWeeklyReports();
  }, []);

  const handleSaveWeeklyReport = async (text: string) => {
    if (selectedDay === null) return;

    try {
      const response = await fetch('/api/weekly-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, dayOfWeek: selectedDay }),
      });
      if (response.ok) {
        setWeeklyReports((prev) => ({ ...prev, [selectedDay]: text }));
        handleWeeklyReportModalClose();
        showToast('저장되었습니다.', 'success');
      } else {
        showToast('저장에 실패했습니다.', 'error');
      }
    } catch (error) {
      showToast('저장에 실패했습니다.', 'error');
    }
  };

  const getWeekDates = (): Date[] => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));

    const dates: Date[] = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleGenerateReport = () => {
    const weekDates = getWeekDates();
    const weekDayNames = ['월요일', '화요일', '수요일', '목요일', '금요일'];
    let report = '';
    weekDates.forEach((date, index) => {
      const dateString = `${date.getMonth() + 1}/${date.getDate()}`;
      const reportText = weeklyReports[index] || '';
      report += `${dateString} ${weekDayNames[index]}\n${reportText}\n\n`;
    });
    setConsolidatedReport(report);
    setShowConsolidatedReport(true);
  };

  useEffect(() => {
    if (showConsolidatedReport) {
      const timer = setTimeout(() => {
        setShowConsolidatedReport(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showConsolidatedReport]);

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
        handleWeeklyReportModalOpen={handleWeeklyReportModalOpen}
        weeklyReports={weeklyReports}
        handleGenerateReport={handleGenerateReport}
        consolidatedReport={consolidatedReport}
        showConsolidatedReport={showConsolidatedReport}
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

      <WeeklyReportModal
        isOpen={isWeeklyReportModalOpen}
        onClose={handleWeeklyReportModalClose}
        onSave={handleSaveWeeklyReport}
        initialText={selectedDay !== null ? weeklyReports[selectedDay] || '' : ''}
      />

      {!loading && sortedDates.length > 0 && (
        <AddEventButton onClick={() => handleAddButtonClick(undefined)} positioning="fixed" />
      )}
      {!loading && sortedDates.length === 0 && (
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
