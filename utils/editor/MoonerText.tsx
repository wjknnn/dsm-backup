import React, { CSSProperties, HTMLAttributes } from 'react';
import { colors, colorsKeyOfType } from './components/colors';
import { motion, MotionProps } from 'framer-motion';
import { FontStyles, keyOfFontStyles } from '@/utils/editor/MoonerFont';
import styled from 'styled-components';

type Props = HTMLAttributes<HTMLSpanElement> &
  MotionProps & {
    typography?: keyOfFontStyles;
    style?: CSSProperties;
    color?: colorsKeyOfType;
    margin?: string;
    $lineHeight?: string;
  };

export const MoonerText = ({
  typography = 'P',
  color = 'black',
  style,
  margin,
  $lineHeight,
  ...props
}: Props) => {
  const innerStyle: CSSProperties = {
    color: colors[color],
    wordBreak: 'keep-all',
    ...FontStyles[typography],
    ...style,
  };

  return (
    <NativeSpan
      style={innerStyle}
      $lineHeight={$lineHeight}
      $margin={margin}
      {...props}
    />
  );
};

const NativeSpan = styled(motion.span)<{
  $lineHeight?: string;
  $margin?: string;
}>`
  margin: ${(props) => props.$margin ?? '0'};
  padding: 0;
  line-height: ${(props) => props.$lineHeight ?? '1.2'};
`;
