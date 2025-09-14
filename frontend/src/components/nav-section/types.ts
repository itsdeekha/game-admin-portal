import { ComponentPropsWithRef, ReactElement } from 'react';

export interface NavData {
  title: string;
  path: string;
  icon?: ReactElement;
}

export interface NavItemProps extends ComponentPropsWithRef<'button'> {
  item: NavData;
}

export interface NavSectionProps extends ComponentPropsWithRef<'div'> {
  data: Array<NavData>;
}
