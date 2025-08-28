"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  steps: { title: string; description: string }[];
}

export function TimelineProgress07({
  value,
  steps,
  className,
  ...props
}: TimelineProps) {
  const t = useTranslations();
  return (
    <div
      className={cn("flex flex-col items-start w-full", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < value;
        const isCurrent = index === value;
        const isNext = index === value + 1;
        const isUpcoming = index > value + 1;

        const hasConnector = index < steps.length - 1;
        // const isConnectorFullyCompleted = index < value - 1;
        // const isConnectorAfterLastCompleted = index === value - 1;

        return (
          <React.Fragment key={index}>
            <div className="flex items-start">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full text-white font-medium text-lg",
                    isCompleted && "bg-main",
                    isCurrent && "bg-white text-[#020202]",
                    isNext && " bg-white  text-[#020202]",
                    isUpcoming && " bg-white text-[#020202] "
                  )}
                >
                  {isCompleted ? <Check /> : String(index + 1).padStart(2, "0")}
                </div>
                {hasConnector && (
                  <div
                    className={cn("w-[2px] h-10 bg-[rgba(140,140,140,1)]")}
                  />
                )}
              </div>
              <div className="ms-4 mt-2">
                <div className={cn("text-white")}>
                  <h6 className="font-medium">{t(step.title)}</h6>
                  <p className="max-w-xl text-sm mt-2 font-light">
                    {t(step.description)}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
