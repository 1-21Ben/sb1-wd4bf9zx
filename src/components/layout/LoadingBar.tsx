import React, { useEffect } from 'react';
import { useLoadingStore } from '../../stores/loadingStore';
import { useThemeStore } from '../../stores/themeStore';

export function LoadingBar() {
  const { isDarkMode } = useThemeStore();
  const { isLoading, progress } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="h-0.5 w-full relative overflow-hidden">
      <div
        className={`h-full transition-all duration-300 ease-out ${
          isDarkMode ? 'bg-deep-400' : 'bg-pastel-500'
        }`}
        style={{
          width: `${progress}%`,
          transition: 'width 0.3s ease-in-out',
        }}
      />
    </div>
  );
}