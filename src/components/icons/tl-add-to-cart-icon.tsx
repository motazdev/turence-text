import React from "react";

const TLAddToCart = ({
  className,
  size = "24",
}: {
  className?: string;
  size?: string;
}) => {
  return (
    <svg
      width={size}
      className={className}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.562 9.50386C4.81221 7.50215 6.51381 6 8.53111 6H15.4688C17.4861 6 19.1877 7.50215 19.438 9.50386L20.438 17.5039C20.7364 19.8913 18.8748 22 16.4688 22H7.53111C5.12511 22 3.26357 19.8913 3.562 17.5039L4.562 9.50386Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 14H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11L12 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TLAddToCart;
