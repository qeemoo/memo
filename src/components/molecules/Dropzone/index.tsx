'use client';

import { DragEvent, useState } from 'react';

interface DropzoneProps {
  isConfirmed: boolean;
  onDrop: (file: File) => void;
}

const Dropzone = ({ isConfirmed, onDrop }: DropzoneProps) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.epub')) {
        onDrop(file);
      } else {
        alert('Please drop an .epub file.');
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-md p-10 text-center transition-colors ${isOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
    >
      {isConfirmed ? (
        <p className="text-green-500">확인 되었습니다</p>
      ) : (
        <p>Drag and drop an .epub file here</p>
      )}
    </div>
  );
};

export default Dropzone;
