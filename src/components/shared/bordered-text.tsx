import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface BorderedTextProps {
  text?: string;
  className?: string;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
  translated?: string;
}

export default function BorderedText({
  text,
  translated,
  className,
  // strokeWidth = 30,
  // strokeColor = "darkgrey",
  fillColor = "transparent",
}: BorderedTextProps) {
  // const createStrokeEffect = () => {
  //   const shadows = [];
  //   const radius = strokeWidth;
  //   for (let x = -radius; x <= radius; x++) {
  //     for (let y = -radius; y <= radius; y++) {
  //       if (x * x + y * y <= radius * radius) {
  //         shadows.push(`${x}px ${y}px 0 ${strokeColor}`);
  //       }
  //     }
  //   }
  //   return shadows.join(", ");
  // };
  const t = useTranslations();
  return (
    <div
      className={cn(
        "md:text-[4em] sm:text-[2.4em] text-[2em] font-bold relative",
        className
      )}
    >
      {/* <span
        className="absolute"
        style={{
          WebkitTextStroke: "1px #0000000D",
          WebkitTextFillColor: "transparent",
          textShadow: createStrokeEffect(),
          zIndex: -1,
        }}
      >
        {text}
      </span> */}

      <span
        className=""
        style={{
          color: fillColor,
          position: "relative",
          WebkitTextStroke: "1px #0000000D",
          WebkitTextFillColor: "transparent",
        }}
      >
        {translated ? translated : text ? t(text) : ""}
      </span>
    </div>
  );
}
