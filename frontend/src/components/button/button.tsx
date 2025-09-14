import clsx from 'clsx';
import Iconify from '../iconify';
import { ButtonProps } from './types';

export default function Button({
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  children,
  ...other
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        'cursor-pointer inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        { 'w-full': fullWidth },
        { 'cursor-not-allowed': loading },
        'h-[44px] px-4 text-base',
        'bg-gray-900 hover:bg-gray-800 text-white border-transparent',
        className
      )}
      data-testid="button"
      {...other}
    >
      {loading && (
        <Iconify
          icon="line-md:loading-twotone-loop"
          width={20}
          className="-ml-1 mr-2"
          data-testid="button-loading-indicator"
        />
      )}
      {children}
    </button>
  );
}
