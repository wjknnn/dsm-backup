'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  number?: boolean;
}

export const Input = ({
  title,
  placeholder = '입력...',
  error,
  number,
  ...props
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-[8px]">
      {title && <p className="text-bodyLarge">{title}</p>}
      <input
        className={`${
          error
            ? 'bg-criticalBackground border-critical text-critical'
            : 'bg-grayLight2 dark:bg-grayDark2 border-grayLight1 dark:border-grayDark15'
        } rounded-[12px] border text-bodyLarge placeholder:text-grayDark1 p-[15px]`}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e) =>
          number
            ? (e.target.value = e.target.value.replace(/[^1-3]/g, ''))
            : null
        }
        {...props}
      />
    </div>
  );
};
