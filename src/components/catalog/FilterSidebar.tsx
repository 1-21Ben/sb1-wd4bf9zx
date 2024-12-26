import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface FilterSection {
  id: string;
  title: string;
  options: { id: string; label: string; count: number }[];
}

interface FilterSidebarProps {
  filters: FilterSection[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (sectionId: string, value: string) => void;
}

export function FilterSidebar({ filters, selectedFilters, onFilterChange }: FilterSidebarProps) {
  const { isDarkMode } = useThemeStore();
  const [expandedSections, setExpandedSections] = React.useState<string[]>(
    filters.map(f => f.id)
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className={`w-64 flex-shrink-0 ${
      isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {filters.map((section) => (
        <div key={section.id} className="mb-6">
          <button
            onClick={() => toggleSection(section.id)}
            className="flex items-center justify-between w-full mb-2"
          >
            <h3 className="font-semibold">{section.title}</h3>
            {expandedSections.includes(section.id) ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.includes(section.id) && (
            <div className="space-y-2">
              {section.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFilters[section.id]?.includes(option.id)}
                    onChange={() => onFilterChange(section.id, option.id)}
                    className={`rounded border-2 ${
                      isDarkMode
                        ? 'border-deep-400 text-deep-400'
                        : 'border-primary-400 text-primary-500'
                    }`}
                  />
                  <span className="flex-1">{option.label}</span>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-deep-400' : 'text-primary-400'
                  }`}>
                    ({option.count})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}