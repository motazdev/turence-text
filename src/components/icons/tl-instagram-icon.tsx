import React from "react";

const TLinstagram = ({
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.66669"
        y="1.66667"
        width="16.6667"
        height="16.6667"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="15"
        cy="5.00001"
        rx="0.833333"
        ry="0.833333"
        fill="currentColor"
      />
      <circle
        cx="9.99998"
        cy="10"
        r="4.16667"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default TLinstagram;
