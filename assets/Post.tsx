import { IconProps } from './iconProp';

export const Post = ({ size = 24, className = '', ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      {...props}
    >
      <path fill="currentColor" d="M3 4h18v7H3V4ZM3 13h18v7H3v-7Z" />
    </svg>
  );
};
