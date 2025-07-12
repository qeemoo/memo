"use client";

import { useRef, useEffect } from "react";

interface MemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  memoContent: string;
  setMemoContent: (content: string) => void;
}

export default function MemoModal({
  isOpen,
  onClose,
  memoContent,
  setMemoContent,
}: MemoModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      textareaRef.current?.focus();
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-white rounded-lg shadow-xl p-0 transform transition-all duration-300 scale-100 opacity-100 border border-gray-400 flex flex-col h-full cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <textarea
        ref={textareaRef}
        className="w-full h-full flex-grow p-4 text-gray-700 leading-tight focus:outline-none resize-none overflow-y-auto border-none focus:ring-0"
        value={memoContent}
        onChange={(e) => setMemoContent(e.target.value)}
        placeholder="메모를 작성하세요..."
      ></textarea>
    </div>
  );
}
