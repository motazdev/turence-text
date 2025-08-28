import React from "react";

const TlArrowClick = ({
  className,
  size = "20",
}: {
  className?: string;
  size?: string;
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.8649 8.94026C13.2475 7.4118 11.7497 6.33334 10 6.33334C7.69883 6.33334 5.83335 8.19882 5.83335 10.5C5.83335 12.2497 6.91182 13.7475 8.44027 14.3649M9.92965 18.833C5.35968 18.7952 1.66669 15.0789 1.66669 10.5C1.66669 5.89763 5.39765 2.16667 10 2.16667C14.5789 2.16667 18.2953 5.85966 18.3331 10.4296M10.0478 11.6863L12.225 18.2179C12.4985 19.0385 13.6592 19.0385 13.9328 18.2179L14.7367 15.806C14.8263 15.5372 15.0372 15.3263 15.306 15.2367L17.7179 14.4328C18.5385 14.1592 18.5385 12.9985 17.7179 12.7249L11.1863 10.5478C10.4826 10.3132 9.81321 10.9826 10.0478 11.6863Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TlArrowClick;
