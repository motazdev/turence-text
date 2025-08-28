import { Loader2 } from "lucide-react";

export default function LoadingSpinner({
  size = 20,
  className = "",
}: {
  size?: number | string;
  className?: string;
}) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 width={size} height={size} className={`animate-spin`} />
    </div>
  );
}
