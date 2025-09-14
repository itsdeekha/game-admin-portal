import clsx from 'clsx';
import { ComponentPropsWithRef, ReactNode } from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange(page: number): void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-8 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-4 sm:mb-0">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to&nbsp;
          <span className="font-medium">{endItem}</span> of&nbsp;
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
        >
          ««
        </Button>

        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </Button>

        <div className="flex items-center space-x-1">
          {visiblePages[0] > 1 && (
            <>
              <Button onClick={() => onPageChange(1)}>1</Button>
              {visiblePages[0] > 2 && (
                <span className="px-2 py-2 text-gray-400">...</span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              className={clsx(
                {
                  'text-gray-50! hover:bg-gray-800 bg-gray-900':
                    page === currentPage,
                },
                { 'text-gray-600 hover:bg-gray-100': page !== currentPage }
              )}
            >
              {page}
            </Button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-2 py-2 text-gray-400">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="cursor-pointer w-[36px] h-[36px] rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 transition-colors"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </Button>

        <Button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          »»
        </Button>
      </div>
    </div>
  );
}

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  children: ReactNode;
}

function Button({
  disabled,
  children,
  onClick,
  className,
  ...other
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'cursor-pointer w-[36px] h-[36px] rounded-md text-sm font-medium transition-colors',
        { 'text-gray-400 cursor-not-allowed': disabled },
        { 'text-gray-600 hover:bg-gray-100': !disabled },
        className
      )}
      {...other}
    >
      {children}
    </button>
  );
}
