import React from "react";

const TLCommunicationEmail = ({
  className,
  size = "40",
}: {
  className?: string;
  size?: string;
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0007 15.0001L16.3027 19.2014C18.542 20.6943 21.4593 20.6943 23.6987 19.2014L24.5159 18.6566M23.0051 6.66675H10.0007C6.31875 6.66675 3.33398 9.65152 3.33398 13.3334V30.0001C3.33398 33.682 6.31875 36.6667 10.0007 36.6667H30.0007C33.6826 36.6667 36.6673 33.682 36.6673 30.0001V20.3289M36.6673 11.6667C36.6673 14.4282 34.4287 16.6667 31.6673 16.6667C28.9059 16.6667 26.6673 14.4282 26.6673 11.6667C26.6673 8.90532 28.9059 6.66675 31.6673 6.66675C34.4287 6.66675 36.6673 8.90532 36.6673 11.6667Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TLCommunicationEmail;
