import React from "react";

const TLContactUs = ({
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
        d="M15 14.6667H12.5M15 12.1667H12.5M5.00002 18H15C16.841 18 18.3334 16.5076 18.3334 14.6667V6.33333C18.3334 4.49238 16.841 3 15 3H5.00002C3.15907 3 1.66669 4.49238 1.66669 6.33333V14.6667C1.66669 16.5076 3.15907 18 5.00002 18ZM6.66669 6.33333H8.33335C9.25383 6.33333 10 7.07953 10 8C10 8.92047 9.25383 9.66667 8.33335 9.66667H6.66669C5.74621 9.66667 5.00002 8.92047 5.00002 8C5.00002 7.07953 5.74621 6.33333 6.66669 6.33333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TLContactUs;
