import React from "react";

const TLHome = ({
  size = "20",
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
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.625 14.2238V8.03569C16.625 7.07701 16.1978 6.16907 15.4614 5.56267L11.503 2.30324C10.3373 1.34338 8.66266 1.34338 7.49697 2.30324L3.53864 5.56267C2.80222 6.16907 2.375 7.07701 2.375 8.03569V14.2238C2.375 15.9872 3.79276 17.4167 5.54167 17.4167H13.4583C15.2072 17.4167 16.625 15.9872 16.625 14.2238Z"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M7.91797 14.25H11.0846"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TLHome;
