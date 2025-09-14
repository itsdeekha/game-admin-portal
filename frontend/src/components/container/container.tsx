import clsx from 'clsx';
import { ContainerProps } from './types';

export default function Container({
  maxWidth = 'xl',
  disableGutters = false,
  fixed = false,
  className = '',
  children,
  ...other
}: ContainerProps) {
  const gutterClasses = disableGutters ? '' : 'px-4 sm:px-6';

  const getMaxWidthClasses = () => {
    if (maxWidth === false) return '';

    const maxWidthMap = {
      xs: 'max-w-sm',
      sm: 'max-w-xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
    };

    return maxWidthMap[maxWidth] || 'max-w-7xl';
  };

  const getFixedWidthClasses = () => {
    if (!fixed || maxWidth === false) return '';

    const fixedWidthMap = {
      xs: 'sm:w-sm',
      sm: 'sm:w-xl',
      md: 'md:w-4xl',
      lg: 'lg:w-6xl',
      xl: 'xl:w-7xl',
    };

    return fixedWidthMap[maxWidth] || '';
  };

  const containerClasses = [
    gutterClasses,
    getMaxWidthClasses(),
    getFixedWidthClasses(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={clsx('w-full mx-auto', containerClasses)} {...other}>
      {children}
    </div>
  );
}
