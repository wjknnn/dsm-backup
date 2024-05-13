import React from 'react';
import { MoonerText } from '@/utils/editor/MoonerText';
import { colorsKeyOfType } from '../components/colors';

export class EditorBlockReplacer {
  private str: string;
  private readonly arr: (string | React.ReactElement)[];

  constructor(str: string) {
    this.str = str;
    this.arr = [];
  }

  replace = (target: string, color: colorsKeyOfType): EditorBlockReplacer => {
    const index = this.str.indexOf(target);
    this.arr.push(this.str.substring(0, index));
    this.arr.push(
      <MoonerText key={Math.random()} color={color}>
        {target}
      </MoonerText>
    );
    this.str = this.str.substring(index);
    return this;
  };

  build = (): (string | React.ReactElement)[] => {
    if (this.str.length > 0) this.arr.push(this.str);
    return this.arr;
  };
}
