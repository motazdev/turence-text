import React from "react";

const TLTelegram = ({
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
      <path
        d="M3.25744 9.246L16.0813 3.70382C16.6844 3.44319 17.3378 3.95034 17.235 4.59921L15.4816 15.6625C15.3733 16.3459 14.5276 16.6073 14.0526 16.1042L11.2746 13.1416C10.7103 12.5439 10.6661 11.624 11.1704 10.9749L13.1027 8.27472C13.2188 8.12524 13.0354 7.9286 12.8782 8.03405L8.83878 10.7439C8.1533 11.2038 7.32157 11.3929 6.50463 11.2748L3.46875 10.8357C2.6371 10.7154 2.48609 9.57936 3.25744 9.246Z"
        stroke="#404040"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TLTelegram;
