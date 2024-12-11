import { Button } from "@/components/ui/button";
import { MAX_RATING } from "@/consts";
import { cn, range } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";

export default function RatingFilter() {
  const [selectedRating, setSelectedRating] = React.useState<number>(0);

  const annotation =
    selectedRating < 1
      ? "None selected"
      : selectedRating === MAX_RATING
      ? `${MAX_RATING} out of ${MAX_RATING}`
      : `${selectedRating} and up`;

  return (
    <div className="bg-slate-100 p-4 flex flex-col gap-3 rounded">
      <div className="flex justify-between">
        <p className="text-sm">By rating</p>
        <p className="text-sm text-slate-500">{annotation}</p>
      </div>
      <div className="flex justify-between">
        {range(1, MAX_RATING + 1).map((num) => (
          <Button key={num} className="size-9" onClick={() => setSelectedRating(num)}>
            <Star
              size={20}
              className={cn(
                num <= selectedRating ? "fill-amber-500" : "fill-slate-300",
                "stroke-none"
              )}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
