import React from "react";

const TLCommunicationLocation = ({
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
        d="M23.334 15C23.334 16.841 21.8416 18.3334 20.0007 18.3334C18.1597 18.3334 16.6673 16.841 16.6673 15C16.6673 13.1591 18.1597 11.6667 20.0007 11.6667C21.8416 11.6667 23.334 13.1591 23.334 15Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M31.6673 14.7619C31.6673 18.5692 28.8374 23.3278 25.738 26.5047C23.6992 28.5946 21.5438 30 20.0007 30C18.4575 30 16.3021 28.5946 14.2633 26.5047C11.1639 23.3278 8.33398 18.5692 8.33398 14.7619C8.33398 8.45012 13.5573 3.33337 20.0007 3.33337C26.444 3.33337 31.6673 8.45012 31.6673 14.7619Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M25.257 26.9823C30.9483 27.6923 35 29.5217 35 31.6666C35 34.428 28.2843 36.6666 20 36.6666C11.7157 36.6666 5 34.428 5 31.6666C5 29.5217 9.05168 27.6923 14.743 26.9823"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TLCommunicationLocation;
