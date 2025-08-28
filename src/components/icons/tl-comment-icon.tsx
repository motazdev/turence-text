import React from "react";

const TLComment = ({
  size = "24",
  className,
}: {
  size?: string;
  className?: string;
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
        opacity="0.4"
        d="M13 3H11C6.02944 3 2 7.02944 2 12V17C2 19.2091 3.79086 21 6 21H13C17.9706 21 22 16.9706 22 12C22 7.02944 17.9706 3 13 3Z"
        fill="white"
      />
      <circle cx="12" cy="12" r="1" fill="white" />
      <circle cx="16" cy="12" r="1" fill="white" />
      <circle cx="8" cy="12" r="1" fill="white" />
    </svg>
  );
};

export default TLComment;
