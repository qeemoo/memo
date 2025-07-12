"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const getColors = () => {
    switch (type) {
      case "success": // 일정 추가 (파란색)
        return { bgColor: "bg-blue-100", textColor: "text-blue-800" };
      case "error": // 일정 삭제 (빨간색)
        return { bgColor: "bg-red-100", textColor: "text-red-800" };
      case "info": // 일정 수정 체크 (초록색)
        return { bgColor: "bg-green-100", textColor: "text-green-800" };
      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-800" };
    }
  };

  const { bgColor, textColor } = getColors();

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 rounded-md shadow-md text-sm flex items-center space-x-2 transition-all duration-300 transform ${bgColor} ${textColor} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      role="alert"
    >
      <span>{message}</span>
    </div>
  );
}
