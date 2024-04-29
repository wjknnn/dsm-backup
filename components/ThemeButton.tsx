'use client';

import { Theme } from '@/assets';
import { useTheme } from 'next-themes';

export const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const changeDark = () => {
    if (resolvedTheme === 'dark') setTheme('light');
    if (resolvedTheme === 'light') setTheme('dark');
  };

  return (
    <button
      onClick={changeDark}
      className="flex items-center gap-[12px] p-[8px_12px] rounded-[12px] hover:bg-grayLight2 dark:hover:bg-grayDark2 w-full"
    >
      <div className="size-[36px] rounded-[8px] border border-grayLight1 dark:border-grayDark15 flex justify-center items-center">
        <Theme size={20} className="text-grayDark1" />
      </div>
      <p className="text-body2">테마 변경</p>
    </button>
  );
};
