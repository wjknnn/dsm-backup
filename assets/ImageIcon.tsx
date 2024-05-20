import { IconProps } from './iconProp';

export const ImageIcon = ({
  size = 24,
  className = '',
  ...props
}: IconProps) => {
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
      <path
        fill="currentColor"
        d="m19.576 14.576-3.869-3.869a1 1 0 0 0-1.414 0l-7.428 7.428a8 8 0 1 1 12.711-3.559ZM12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm-1-12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      />
    </svg>
  );
};
