export const LAYOUT_CLASSES = {
  DEFAULT_PAGE_LAYOUT: 'flex flex-col min-h-screen bg-gray-50 text-gray-900',
  LOADING_MAIN:
    'flex-grow container mx-auto px-4 py-8 max-w-2xl text-center flex items-center justify-center h-screen',
  ERROR_MAIN: 'flex-grow container mx-auto px-4 py-8 max-w-2xl text-center',
  DEFAULT_MAIN: 'flex-grow container mx-auto px-4 py-12 max-w-3xl',
  LOADING_SPINNER_CONTAINER: 'flex flex-col items-center space-y-4',
  DATE_GROUP_CONTAINER: 'mb-8 p-4 bg-white rounded-lg shadow-md flex flex-col gap-y-4',
  DATE_HEADER_BUTTON_CONTAINER: 'flex justify-between items-center',
  DATE_HEADER_ADD_BUTTON_CONTAINER: 'flex items-center',
  ADD_INLINE_BUTTON_MARGIN: 'ml-2',
  COLLAPSE_BUTTON:
    'text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer',
  EVENT_LIST_CONTAINER: 'flex flex-col gap-y-2',
  NO_EVENTS_MESSAGE:
    'p-4 text-center text-gray-400 border border-dashed border-gray-300 rounded-lg',
  MEMO_MODAL_BACKDROP: 'fixed inset-0 bg-transparent z-40',
  MEMO_MODAL_CONTAINER: 'fixed right-6 z-50 w-[30rem]',
};

export const TOAST_CLASSES = {
  CONTAINER:
    'fixed top-4 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 rounded-md shadow-md text-sm flex items-center space-x-2 transition-all duration-300 transform',
  VISIBLE: 'translate-y-0 opacity-100',
  HIDDEN: '-translate-y-full opacity-0',
};

export const EVENT_LIST_ITEM_CLASSES = {
  CONTAINER_BASE: 'flex items-center p-4 rounded-lg shadow',
  COMPLETED_BG: 'bg-red-50',
  INCOMPLETE_BG: 'bg-blue-50',
  CHECKBOX_LABEL: 'flex items-center cursor-pointer',
  CHECKBOX_INPUT: 'hidden',
  CHECKBOX_CUSTOM_BASE:
    'w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-200',
  CHECKBOX_COMPLETED: 'bg-green-500 border-green-500',
  CHECKBOX_INCOMPLETE: 'bg-white border-gray-300',
  CHECKBOX_ICON: 'w-4 h-4 text-white',
  TITLE_BASE: 'ml-4 text-lg flex-grow',
  TITLE_COMPLETED: 'line-through text-gray-500',
  TITLE_INCOMPLETE: 'text-gray-800',
  EDIT_BUTTON:
    'ml-4 p-2 text-gray-500 hover:text-gray-700 rounded-md flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 cursor-pointer',
  EDIT_BUTTON_ICON: 'h-5 w-5',
  DELETE_BUTTON:
    'ml-2 p-2 text-red-500 hover:text-red-600 rounded-md flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 cursor-pointer',
  DELETE_BUTTON_LOADING_SPINNER: 'animate-spin h-5 w-5 text-white',
  DELETE_BUTTON_ICON: 'h-5 w-5',
};

export const MODAL_CLASSES = {
  OVERLAY: 'fixed inset-0 flex items-center justify-center p-4 z-[100]',
  CONTAINER:
    'bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative transform transition-all duration-300 scale-100 opacity-100 border border-gray-400',
  TITLE: 'text-2xl font-bold mb-6 text-gray-800 text-center',
  FORM_GROUP_MB4: 'mb-4',
  FORM_GROUP_MB6: 'mb-6',
  LABEL: 'block text-gray-700 text-sm font-bold mb-2',
  INPUT:
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
  DATEPICKER_CONTAINER: 'relative w-full',
  DATEPICKER_INPUT:
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10',
  DATEPICKER_WRAPPER: 'w-full',
  DATEPICKER_CALENDAR: 'modern-datepicker',
  DATEPICKER_ICON_CONTAINER:
    'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none',
  DATEPICKER_ICON: 'h-5 w-5 text-gray-400',
  BUTTON_CONTAINER: 'flex items-center justify-end',
  CANCEL_BUTTON:
    'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 cursor-pointer',
  CONFIRM_BUTTON:
    'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer',
};

export const CONFIRMATION_MODAL_CLASSES = {
  CONTAINER:
    'bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative transform transition-all duration-300 scale-100 opacity-100 border border-gray-400',
  TITLE: 'text-xl font-bold mb-4 text-gray-800 text-center',
  MESSAGE: 'text-gray-700 text-center mb-6',
  BUTTON_CONTAINER: 'flex justify-end gap-3',
  CANCEL_BUTTON:
    'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer',
  CONFIRM_BUTTON:
    'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer',
};

export const MEMO_MODAL_CLASSES = {
  CONTAINER:
    'bg-white rounded-lg shadow-xl p-0 transform transition-all duration-300 scale-100 opacity-100 border border-gray-400 flex flex-col h-full cursor-default',
  TEXTAREA:
    'w-full h-full flex-grow p-4 text-gray-700 leading-tight focus:outline-none resize-none overflow-y-auto border-none focus:ring-0',
};

export const ADD_EVENT_BUTTON_CLASSES = {
  FIXED_POSITIONING: 'fixed top-6 right-6 z-50',
  CENTERED_POSITIONING: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  BUTTON_BASE:
    'flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer',
  ICON: 'h-8 w-8',
};

export const ADD_EVENT_INLINE_BUTTON_CLASSES = {
  BUTTON_BASE:
    'inline-flex items-center justify-center w-6 h-6 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 cursor-pointer',
  ICON: 'h-3 w-3',
};

export const MEMO_BUTTON_CLASSES = {
  CONTAINER: 'fixed bottom-6 right-6 z-50',
  BUTTON_BASE:
    'flex items-center justify-center w-14 h-14 bg-yellow-300 hover:bg-yellow-400 text-gray-800 rounded-full shadow-lg transition-transform transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75',
  ICON: 'h-8 w-8',
};
