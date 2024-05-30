import { Close } from '@/assets';
import { type ComponentProps } from 'react';

type Props = ComponentProps<'button'> & {
  tagName: string;
  editable?: boolean;
};

export const Tag = ({ tagName, editable, ...props }: Props) => (
  <button
    key={tagName}
    className="p-[8px_12px] flex gap-1 items-center rounded-full bg-grayLight2 dark:bg-grayDark2 text-bodyLarge text-grayDark15 dark:text-grayLight1 hover:bg-grayLight1 dark:hover:bg-grayDark15"
    {...props}
  >
    #{tagName}
    {editable && <Close size={20} className="text-grayDark15" />}
  </button>
);
