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
        onChange={(e) => {
          if (number) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            if (+e.target.value > 10) e.target.value = e.target.value.slice(1);
            if (+e.target.value === 0) e.target.value = '1';
          }
        }}
        {...props}
      />
    </div>
  );
};
