import { IconProps } from './iconProp';

export const HeartLine = ({
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
        d="M12 4.53a6 6 0 0 1 8.48 8.46L12 21.5l-8.48-8.5A6 6 0 0 1 12 4.53Zm6.83 1.64a4 4 0 0 0-5.5-.15L12 7.22l-1.33-1.2a4 4 0 0 0-5.69 5.6L12 18.65l7.02-7.03a4 4 0 0 0-.2-5.45Z"
      />
    </svg>
  );
};
