"use client";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import React from "react";

const Stepper02 = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex flex-row gap-x-8 items-center bg-[#F5F5F5] rounded-lg w-fit p-2">
      <div
        onClick={() => {
          if (step === 1) return;
          setStep(step - 1);
        }}
        className={cn(
          "cursor-pointer flex justify-center items-center p-2 bg-white rounded-lg transition active:scale-90",
          step === 1 && "opacity-50 pointer-events-none"
        )}
      >
        <Minus size={18} />
      </div>

      <h3 className="text-xl select-none">
        {step.toString().padStart(2, "0")}
      </h3>

      <div
        onClick={() => setStep(step + 1)}
        className="cursor-pointer flex justify-center items-center p-2 bg-white rounded-lg transition active:scale-90"
      >
        <Plus size={18} />
      </div>
    </div>
  );
};

export default Stepper02;
