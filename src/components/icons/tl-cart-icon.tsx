import React from "react";

const TLCartIcon = ({ size = "24" }: { size?: string }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 6C16 3.79086 14.2091 2 12 2C9.79085 2 7.99999 3.79086 7.99999 6M6.8197 22H17.1803C19.6848 22 21.5733 19.7245 21.1118 17.2628L19.6118 9.26285C19.257 7.37095 17.6051 6 15.6803 6H8.3197C6.39484 6 4.74294 7.37096 4.38821 9.26285L2.88821 17.2628C2.42665 19.7245 4.31515 22 6.8197 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TLCartIcon;
