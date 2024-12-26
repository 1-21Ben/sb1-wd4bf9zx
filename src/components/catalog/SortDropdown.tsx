import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface SortOption {
  id: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  selectedOption: string;
  onSelect: (optionId: string) => void;
}

export function SortDropdown({ options, selectedOption, onSelect }: SortDropdownProps) {
  const { isDarkMode } = useThemeStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedLabel = options.find(opt => opt.id === selectedOption)?.label;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          isDarkMode
            ? 'bg-deep-700 hover:bg-deep-600 text-white'
            : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
        }`}
      >
        <span>Trier par: {selectedLabel}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-20 ${
            isDarkMode ? 'bg-deep-700' : 'bg-white'
          }`}>
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 first:rounded-t-lg last:rounded-b-lg ${
                  isDarkMode
                    ? 'hover:bg-deep-600 text-white'
                    : 'hover:bg-gray-50 text-gray-900'
                } ${option.id === selectedOption ? 'font-semibold' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}