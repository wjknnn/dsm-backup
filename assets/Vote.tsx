import { IconProps } from './iconProp';

export const Vote = ({ size = 24, className = '', ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M21 3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455L2 22.5V4a1 1 0 0 1 1-1h18Zm-1 2H4v13.385L5.763 17H20V5Zm-7 2v8h-2V7h2Zm4 2v6h-2V9h2Zm-8 2v4H7v-4h2Z"
        fill="currentColor"
      />
    </svg>
  );
};
