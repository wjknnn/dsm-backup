'use client';

import { typography, typographyKeyOfType } from './typography';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  typo?: typographyKeyOfType;
}

export const Txt = ({ typo = 'bodyMedium', ...props }: Props) => {
  return (
    <span
      style={{
        ...typography[typo],
        wordBreak: 'keep-all',
        pointerEvents: 'none',
      }}
      {...props}
    />
  );
};
