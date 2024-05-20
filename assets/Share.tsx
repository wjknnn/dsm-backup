import { IconProps } from './iconProp';

export const Share = ({ size = 24, className = '', ...props }: IconProps) => {
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
        d="m12 2.586 6.207 6.207-1.414 1.414L13 6.414V16h-2V6.414l-3.793 3.793-1.414-1.414L12 2.586ZM3 18v-4h2v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4h2v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3Z"
      />
    </svg>
  );
};
