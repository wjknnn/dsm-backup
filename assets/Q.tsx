import { IconProps } from './iconProp';

export const Q = ({ size = 24, className = '', ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="4"
        d="M6.763 26.945c-1.385-1.382-.462-8.186 4.617-6.344 5.54 2.01 3.232 6.91 9.695 7.37 3.232.231 4.617-.92 6.925-4.606M17.843 2.175C11.03.938 3.532 6.325 2.146 16.01 1.25 22.282 4.455 28.46 12.303 27.972c7.848-.49 11.243-10.579 11.542-15.651.299-5.073-.923-9.223-6.002-10.146Z"
      />
    </svg>
  );
};
