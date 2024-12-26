import React from 'react';
import { Filter, X } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const { isDarkMode } = useThemeStore();
  const [expanded, setExpanded] = React.useState<string[]>(
    filters.map((f) => f.id)
  );

  const hasActiveFilters = Object.values(selectedFilters).some(
    (values) => values.length > 0
  );

  const toggleGroup = (groupId: string) => {
    setExpanded((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  return (
    <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-medium">Filtres</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-500 hover:text-primary-600 flex items-center space-x-1"
          >
            <X className="h-4 w-4" />
            <span>Réinitialiser</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filters.map((group) => (
          <div key={group.id} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex items-center justify-between w-full py-2"
            >
              <span className="font-medium">{group.name}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expanded.includes(group.id) ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expanded.includes(group.id) && (
              <div className="mt-2 space-y-2">
                {group.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[group.id]?.includes(option.id)}
                      onChange={() => onFilterChange(group.id, option.id)}
                      className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm">
                      {option.label}
                      {option.count !== undefined && (
                        <span className="ml-1 text-gray-500">
                          ({option.count})
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}