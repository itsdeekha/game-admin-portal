import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import { useActiveLink } from '~/routes/hook';
import { NavItemProps } from '../types';

export default function NavItem({ item, onClick, ...other }: NavItemProps) {
  const { title, path, icon } = item;
  const active = useActiveLink(path, false);

  return (
    <Link to={path}>
      <button
        className={clsx(
          'w-full flex items-center gap-3 text-left transition-all duration-200 rounded-lg mb-1 min-h-[44px] px-3 py-2 cursor-pointer',
          { 'text-gray-500 hover:bg-gray-100': !active },
          { 'text-gray-50 hover:bg-gray-800 bg-gray-900': active }
        )}
        onClick={onClick}
        {...other}
      >
        {icon && (
          <span className="flex items-center justify-center w-6 h-6 text-2xl">
            {icon}
          </span>
        )}

        <div className="flex-1 min-w-0">
          <div className="text-sm capitalize truncate font-semibold">
            {title}
          </div>
        </div>
      </button>
    </Link>
  );
}
