"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span className="inline-flex">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = value >= i + 1;
          const half = !filled && value > i + 0.4;
          return (
            <Star
              key={i}
              style={{ width: size, height: size }}
              className={cn(
                filled ? "text-amber-400 fill-amber-400" : half ? "text-amber-400/60 fill-amber-400/40" : "text-white/15"
              )}
            />
          );
        })}
      </span>
      {showValue && (
        <span className="text-[12px] font-medium text-white/70">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}
