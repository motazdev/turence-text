"use client";

import { cn } from "@/lib/utils";
import { OTPInput, SlotProps } from "input-otp";
import { useId } from "react";
interface ForgetOtpInputProps {
  value: string;
  onChange: (value: string) => void;
}
export default function ForgetOtpInput({
  value,
  onChange,
}: ForgetOtpInputProps) {
  const id = useId();
  return (
    <div className="space-y-2">
      <OTPInput
        id={id}
        value={value}
        onChange={onChange}
        containerClassName="flex items-center gap-3 w-full has-[:disabled]:opacity-50 justify-center"
        maxLength={6}
        render={({ slots }) => (
          <div className="flex gap-2">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center md:rounded-2xl rounded-xl text-lg border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow",
        "  md:w-16 md:h-16 h-14 w-14 ",

        { "z-10 border border-ring ": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
