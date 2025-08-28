import React from "react";

const TLArrowRight = ({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <svg
      fill="currentColor"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 16L18 12M18 12L14 8M18 12L6 12"
        strokeWidth="1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TLArrowRight;
