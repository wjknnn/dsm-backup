import { IconProps } from './iconProp';

export const Star = ({ size = 24, className = '', ...props }: IconProps) => {
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
        d="m17 1.2 1.32 2.48L20.79 5l-2.47 1.32L17 8.79l-1.32-2.47L13.21 5l2.47-1.32L17 1.21ZM8 4.34l2.67 5 5 2.67-5 2.67-2.67 5-2.67-5-5-2.67 5-2.67 2.67-5Zm11.67 12L18 13.21l-1.67 3.12L13.21 18l3.12 1.67L18 22.79l1.67-3.12L22.79 18l-3.12-1.67Z"
      />
    </svg>
  );
};
