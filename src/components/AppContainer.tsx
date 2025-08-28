import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const AppContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-3", className)}
    >
      {children}
    </div>
  );
};

export default AppContainer;
