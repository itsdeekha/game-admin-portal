import clsx from 'clsx';
import { memo } from 'react';
import { NavSectionProps } from '../types';
import NavItem from './nav-item';

function NavSectionVertical({ data, className, ...other }: NavSectionProps) {
  return (
    <div className={clsx('px-4', className)} {...other}>
      {data.map((item) => (
        <NavItem key={item.title + item.path} item={item} />
      ))}
    </div>
  );
}

export default memo(NavSectionVertical);
