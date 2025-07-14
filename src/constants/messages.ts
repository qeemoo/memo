export const TOAST_MESSAGES = {
  DISPLAY_STATE_UPDATE_FAILURE: "표시 상태 업데이트에 실패했습니다.",
  DISPLAY_STATE_UPDATE_ERROR: "표시 상태 업데이트 중 오류 발생.",
  MEMO_SAVE_SUCCESS: "메모가 성공적으로 저장되었습니다.",
  MEMO_SAVE_FAILURE: "메모 저장에 실패했습니다.",
  MEMO_SAVE_ERROR: "메모 저장 중 오류 발생.",
  EVENT_ADD_SUCCESS: "일정이 성공적으로 추가되었습니다.",
  EVENT_DELETE_SUCCESS: "일정이 성공적으로 삭제되었습니다.",
  EVENT_UPDATE_SUCCESS: "일정 상태가 업데이트되었습니다.",
  EVENT_EDIT_SUCCESS: "일정이 성공적으로 수정되었습니다.",
  EVENTS_LOADING: "일정을 불러오는 중입니다...",
  EVENTS_LOAD_ERROR: "오류 발생:",
  NO_EVENTS: "일정이 없습니다.",
  MEMO_FETCH_ERROR: "메모를 불러오는 중 오류 발생.",
  INITIAL_DISPLAY_STATE_FETCH_ERROR: "초기 표시 상태를 불러오는 중 오류 발생.",
};

export const EVENT_LIST_ITEM = {
  STATUS_UPDATE_FAILURE: "상태 업데이트에 실패했습니다.",
  STATUS_UPDATE_ERROR: "일정 상태 업데이트 중 오류 발생:",
  STATUS_UPDATE_ERROR_ALERT: (message: string) =>
    `상태 업데이트 중 오류가 발생했습니다: ${message}`,
  UNKNOWN_STATUS_UPDATE_ERROR:
    "상태 업데이트 중 알 수 없는 오류가 발생했습니다.",
  DELETE_FAILURE: "일정 삭제에 실패했습니다.",
  DELETE_ERROR: "일정 삭제 중 오류 발생:",
  DELETE_ERROR_ALERT: (message: string) =>
    `일정 삭제 중 오류가 발생했습니다: ${message}`,
  UNKNOWN_DELETE_ERROR: "일정 삭제 중 알 수 없는 오류가 발생했습니다.",
  CONFIRM_DELETE: (title: string) =>
    `"${title}" 일정을 정말로 삭제하시겠습니까?`,
};

export const ADD_MODAL = {
  TITLE: "새 일정 추가",
  TODO_PLACEHOLDER: "예: 팀 회의 준비",
  ADD_FAILURE: "일정 추가에 실패했습니다.",
  ADD_ERROR: "일정 추가 중 오류 발생:",
  ADD_ERROR_ALERT: (message: string) =>
    `일정 추가 중 오류가 발생했습니다: ${message}`,
  UNKNOWN_ADD_ERROR: "일정 추가 중 알 수 없는 오류가 발생했습니다.",
  TODO_LABEL: "할 일",
  DATE_LABEL: "날짜 선택",
  CANCEL_BUTTON: "취소",
  CONFIRM_BUTTON: "확인",
  VALIDATION_ERROR: "할 일과 날짜를 입력해주세요.",
  SHOW_EVENTS: "일정 보이기",
  HIDE_EVENTS: "일정 숨기기",
};

export const EDIT_MODAL = {
  TITLE: "일정 수정",
  TODO_PLACEHOLDER: "예: 팀 회의 준비",
  EDIT_FAILURE: "일정 수정에 실패했습니다.",
  EDIT_ERROR: "일정 수정 중 오류 발생:",
  EDIT_ERROR_ALERT: (message: string) =>
    `일정 수정 중 오류가 발생했습니다: ${message}`,
  UNKNOWN_EDIT_ERROR: "일정 수정 중 알 수 없는 오류가 발생했습니다.",
  TODO_LABEL: "할 일",
  DATE_LABEL: "날짜 선택",
  CANCEL_BUTTON: "취소",
  CONFIRM_BUTTON: "수정",
  VALIDATION_ERROR: "할 일과 날짜를 입력해주세요.",
};

export const CONFIRMATION_MODAL = {
  TITLE: "확인",
  DELETE_BUTTON: "삭제",
  CANCEL_BUTTON: "취소",
};

export const MEMO_MODAL = {
  PLACEHOLDER: "메모를 작성하세요...",
};

export const TOAST_TYPES = {
  SUCCESS: "success", // 일정 추가 (파란색)
  ERROR: "error", // 일정 삭제 (빨간색)
  INFO: "info", // 일정 수정 체크 (초록색)
};
