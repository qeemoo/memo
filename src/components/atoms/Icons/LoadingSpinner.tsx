import { IconProps } from '@/types';

import React from 'react';

const LoadingSpinner: React.FC<IconProps> = ({ className }) => (
  <div
    className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 ${className}`}
  ></div>
);

export default LoadingSpinner;
