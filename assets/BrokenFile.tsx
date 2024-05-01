import { IconProps } from './iconProp';

export const BrokenFile = ({
  size = 24,
  className = '',
  ...props
}: IconProps) => {
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
        d="M19 9.00012H14V4.00012H5V11.8572L6.5 13.2501L10 9.50012L13 14.5001L15 12.0001L18 15.0001L15 14.5001L13 17.0001L10 13.0001L7 16.5001L5 15.2501V20.0001H19V9.00012ZM21 8.00012V20.9933C21 21.5502 20.5552 22.0001 20.0066 22.0001H3.9934C3.44495 22.0001 3 21.5561 3 21.0083V2.99192C3 2.45543 3.4487 2.00012 4.00221 2.00012H14.9968L21 8.00012Z"
        fill="currentColor"
      />
    </svg>
  );
};
