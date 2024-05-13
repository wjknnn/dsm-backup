'use client';

import React, { ComponentProps } from 'react';
import { IconName, IconSet } from './icons';
import { colors } from './colors';
import { useRouter } from 'next/navigation';

type Props = ComponentProps<'svg'> & {
  name: IconName;
  size?: number;
  clickable?: boolean;
  back?: boolean;
  color?: keyof typeof colors;
};

export const Icon = ({
  name,
  size,
  clickable,
  className,
  color = 'black',
  back,
  ...props
}: Props) => {
  const router = useRouter();
  const onClick = (e: any) => {
    props.onClick?.(e);
    if (back) router.back();
  };
  return (
    <svg
      height={size ?? 18}
      viewBox="0 0 24 24"
      fill={colors[color]}
      xmlns="http://www.w3.org/2000/svg"
      className={`${clickable || back ? 'cursor-pointer ' : ''}${
        className ?? ''
      }`}
      {...props}
      onClick={onClick}
    >
      <path d={IconSet[name].path} />
    </svg>
  );
};
