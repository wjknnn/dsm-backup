interface InputProps {
  title?: string;
  placeholder?: string;
  error?: boolean;
}

export const Input = ({
  title,
  placeholder = '입력...',
  error,
}: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-[8px]">
      {title && <p className="text-bodyLarge">{title}</p>}
      <input
        className={`${
          error
            ? 'bg-criticalBackground border-critical text-critical'
            : 'bg-grayLight2 dark:bg-grayDark2 border-grayLight1 dark:border-grayDark15'
        } rounded-[12px] outline-offset-4 border text-bodyLarge placeholder:text-grayDark1 p-[15px]`}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};
