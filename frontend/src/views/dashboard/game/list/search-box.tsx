import clsx from 'clsx';
import { ChangeEvent, useEffect, useState } from 'react';
import Iconify from '~/components/iconify';
import { useBoolean } from '~/hooks/use-boolean';

export interface SearchBoxProps {
  searchQuery: string;
  onSearchChange(query: string): void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  debounceDelay?: number;
}

export default function SearchBox({
  searchQuery = '',
  onSearchChange,
  placeholder = 'Search games by name, title, category, or provider...',
  className = '',
  disabled = false,
  debounceDelay = 800,
}: SearchBoxProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const focused = useBoolean();

  useEffect(() => {
    if (disabled) return;

    const timer = setTimeout(() => {
      if (onSearchChange && localQuery !== searchQuery) {
        onSearchChange(localQuery);
      }
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [localQuery, onSearchChange, searchQuery, debounceDelay, disabled]);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      setLocalQuery(e.target.value);
    }
  };

  return (
    <div className={clsx('w-full max-w-lg h-[44px]', className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Iconify
            icon="mingcute:search-line"
            className={clsx(
              'h-5 w-5 transition-colors duration-200',
              { 'text-blue-500': focused.value },
              { 'text-gray-400': !focused.value }
            )}
          />
        </div>

        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          onFocus={focused.onTrue}
          onBlur={focused.onFalse}
          disabled={disabled}
          className={clsx(
            'block w-full pl-10 pr-12 py-[10px] border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 text-sm shadow-sm transition-all duration-200',
            {
              'outline-none ring-2 ring-blue-500 border-blue-500 placeholder-gray-400':
                focused.value,
            },
            { 'hover:border-gray-400': !focused.value },
            { 'bg-gray-100 cursor-not-allowed opacity-60': disabled },
            { 'pr-20': localQuery },
            { 'pr-12': !localQuery }
          )}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
