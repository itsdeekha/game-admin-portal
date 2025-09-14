import { Icon } from '@iconify/react';

import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';
import { IconifyProps } from './types';

interface Props extends ComponentPropsWithRef<'svg'> {
  icon: IconifyProps;
  width?: number | string;
  height?: number | string;
}

export default function Iconify({
  icon,
  width = 20,
  height,
  className = '',
  style,
  ...other
}: Props) {
  const iconHeight = height || width;

  const iconStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof iconHeight === 'number' ? `${iconHeight}px` : iconHeight,
    ...style,
  };

  return (
    <Icon
      icon={icon}
      className={clsx('component-iconify inline-block', className)}
      style={iconStyle}
      {...other}
      mode="svg"
      onLoad={(_) => {}}
      rotate={0}
    />
  );
}
