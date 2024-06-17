import { IconProps } from './iconProp';

export const Send = ({ size = 24, className = '', ...props }: IconProps) => {
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
        d="M3 13h6v-2H3V1.85a.5.5 0 0 1 .74-.44L22.2 11.56a.5.5 0 0 1 0 .88L3.74 22.59a.5.5 0 0 1-.74-.44V13Z"
      />
    </svg>
  );
};
