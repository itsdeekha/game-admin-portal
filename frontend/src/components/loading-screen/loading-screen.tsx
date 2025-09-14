import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';
import Iconify from '../iconify';

interface Props extends ComponentPropsWithRef<'div'> {
  className?: string;
}

export default function LoadingScreen({ className, ...other }: Props) {
  return (
    <div
      className={clsx(
        'px-20 w-full flex-1 min-h-screen flex items-center justify-center',
        className
      )}
      {...other}
    >
      <Iconify icon="line-md:loading-twotone-loop" width={60} />
    </div>
  );
}
