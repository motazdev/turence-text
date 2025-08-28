"use client";

import React from "react";

const LinearProgress01 = ({ value }: { value: number }) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative w-full h-4 bg-[#E6E6E6] transition-all duration-300 ease-in-out max-w-lg rounded-full overflow-hidden">
      <div
        className="absolute w-full h-4 bg-[#404040] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default LinearProgress01;
