import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
