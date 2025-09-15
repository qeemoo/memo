import { useEffect, useState } from 'react';

interface WeeklyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string) => void;
  initialText: string;
}

const WeeklyReportModal: React.FC<WeeklyReportModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialText,
}) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-1/2">
        <textarea
          className="w-full h-64 p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            취소
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReportModal;
