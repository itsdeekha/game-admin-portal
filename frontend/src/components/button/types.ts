import { ComponentPropsWithRef, ReactNode } from 'react';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}
