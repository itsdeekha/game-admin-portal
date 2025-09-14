import { ComponentPropsWithRef, ReactNode } from 'react';

type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface ContainerProps extends ComponentPropsWithRef<'div'> {
  maxWidth?: MaxWidth;
  disableGutters?: boolean;
  fixed?: boolean;
  children?: ReactNode;
  className?: string;
}
