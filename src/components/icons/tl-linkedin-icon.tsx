import React from "react";

const TLLinkedIn = ({
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
      <circle
        cx="3.33335"
        cy="3.33334"
        r="1.66667"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M1.66669 7.08333H5.00002V18.3333H1.66669V7.08333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 18.3333H10.8333V12.5C10.8333 11.5795 11.5795 10.8333 12.5 10.8333C13.4205 10.8333 14.1667 11.5795 14.1667 12.5V18.3333H17.5V12.5C17.5 9.73857 15.2614 7.49999 12.5 7.49999C11.9156 7.49999 11.3546 7.60025 10.8333 7.7845V7.08333H7.5V18.3333ZM7.5 18.3333V12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TLLinkedIn;
