import React from "react";

const TLMessangerLine = ({
  size = "24",
  className,
}: {
  className?: string;
  size?: string;
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5229 22 22 17.5228 22 12C22 6.47715 17.5229 2 12 2C6.47718 2 2.00003 6.47715 2.00003 12C2.00003 13.5114 2.33535 14.9446 2.93565 16.229L2.22301 20.6245C2.1135 21.3 2.69954 21.8834 3.37452 21.7709L7.72984 21.045C9.02483 21.6575 10.4724 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path d="M10 9L6 15L10 12L14 15L18 9L14 12L10 9Z" fill="currentColor" />
    </svg>
  );
};

export default TLMessangerLine;
