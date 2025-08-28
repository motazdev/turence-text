import React from "react";

const TLTwitterLine = ({
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
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_121_3159)">
        <path
          d="M9.48938 6.775L15.3176 0H13.9364L8.87588 5.8825L4.83388 0H0.171875L6.28412 8.8955L0.171875 16H1.55312L6.89738 9.78788L11.1659 16H15.8279L9.489 6.775H9.48938ZM7.59763 8.97375L6.97825 8.088L2.05075 1.03975H4.17225L8.14863 6.728L8.76787 7.61375L13.937 15.0075H11.8158L7.59763 8.97412V8.97375Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_121_3159">
          <rect width={size} height={size} fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default TLTwitterLine;
