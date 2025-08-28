import React from "react";

const TLHomeFill = ({
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
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 8.95861V15.4724C17.5 17.3286 16.0076 18.8333 14.1667 18.8333H5.83333C3.99238 18.8333 2.5 17.3286 2.5 15.4724V8.95861C2.5 7.94948 2.9497 6.99375 3.72488 6.35544L7.89155 2.92446C9.11859 1.91408 10.8814 1.91407 12.1084 2.92446L16.2751 6.35544C17.0503 6.99375 17.5 7.94948 17.5 8.95861ZM8.33333 14.875C7.98816 14.875 7.70833 15.1548 7.70833 15.5C7.70833 15.8452 7.98816 16.125 8.33333 16.125H11.6667C12.0118 16.125 12.2917 15.8452 12.2917 15.5C12.2917 15.1548 12.0118 14.875 11.6667 14.875H8.33333Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TLHomeFill;
