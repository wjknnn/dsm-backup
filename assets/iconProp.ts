import { ComponentProps } from 'react';

export type IconProps = ComponentProps<'svg'> & {
  size?: number;
  className?: string;
};
