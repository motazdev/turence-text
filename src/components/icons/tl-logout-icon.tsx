import React from "react";

const TlLogout = ({
  className,
  size = "24",
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
        d="M9 10.2664L10.2929 11.5593C10.6834 11.9498 10.6834 12.5829 10.2929 12.9735L9 14.2664M10 12.2664L4 12.2664M20 17.2663V7.26633M8 17.2663C8 18.3709 8.89543 19.2663 10 19.2663H14M8 7.26633C8 6.16176 8.89543 5.26633 10 5.26633H14M19.1094 19.8601L17.1094 21.1934C15.7803 22.0795 14 21.1267 14 19.5293V5.00336C14 3.40597 15.7803 2.45319 17.1094 3.33926L19.1094 4.6726C19.6658 5.04353 20 5.66799 20 6.3367V18.196C20 18.8647 19.6658 19.4891 19.1094 19.8601Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TlLogout;
