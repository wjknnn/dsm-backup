import { type ComponentProps } from 'react';

type KindType = 'primary' | 'gray' | 'white' | 'outline';
type SizeType = 'small' | 'medium' | 'large';

type Props = ComponentProps<'button'> & {
  kind?: KindType;
  size?: SizeType;
  disable?: boolean;
};

export const Button = ({
  kind = 'primary',
  size = 'medium',
  disable,
  children,
  ...props
}: Props) => {
  const KIND_STYLE: {
    [key in KindType]: { enabled: string; disabled: string };
  } = {
    primary: {
      enabled:
        'bg-black dark:bg-white text-white dark:text-black hover:bg-grayDark2 dark:hover:bg-grayLight1',
      disabled: 'bg-grayDark15 dark:bg-grayBase text-grayDark1',
    },
    gray: {
      enabled:
        'bg-grayLight2 dark:bg-grayDark2 text-grayDark2 dark:text-grayLight2 hover:bg-grayLight1 hover:text-black dark:hover:bg-grayDark15 dark:hover:text-white',
      disabled:
        'bg-grayLight2 dark:bg-grayDark2 text-grayBase dark:text-grayDark15',
    },
    white: {
      enabled:
        'bg-white hover:bg-grayLight2 dark:bg-grayDark3 dark:hover:bg-grayDark2 text-grayDark2 hover:text-black dark:text-grayBase dark:hover:text-white',
      disabled: 'text-grayBase dark:text-grayDark15',
    },
    outline: {
      enabled:
        'border border-grayDark1 hover:border-black dark:border-grayBase dark:hover:border-white text-grayDark2 hover:text-black dark:text-grayLight1 dark:hover:text-white hover:bg-grayLight2 dark:bg-grayDark3 dark:hover:bg-grayDark2',
      disabled:
        'border border-grayBase text-grayBase dark:border-grayDark15 dark:text-grayDark15',
    },
  };
  const SIZE_STYLE: {
    [key in SizeType]: string;
  } = {
    small: 'p-[8px_16px]',
    medium: 'p-[12px_24px]',
    large: 'p-[16px_32px]',
  };

  return (
    <button
      className={`${
        disable
          ? KIND_STYLE[kind].disabled + ' cursor-not-allowed'
          : KIND_STYLE[kind].enabled
      } ${SIZE_STYLE[size]} flex items-center justify-center rounded-[12px]`}
      {...props}
    >
      <p className="text-bodyLarge">{children}</p>
    </button>
  );
};
