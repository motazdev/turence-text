import React from "react";

const TLFaqs = ({
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
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99996 7.16667V8M9.99996 10.5V13.8333M9.16662 3H10.8333C14.9754 3 18.3333 6.35786 18.3333 10.5C18.3333 14.6421 14.9754 18 10.8333 18H4.99996C3.15901 18 1.66663 16.5076 1.66663 14.6667V10.5C1.66663 6.35786 5.02449 3 9.16662 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TLFaqs;
