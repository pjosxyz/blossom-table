import { Button } from "@/components/ui/button";
import { MAX_RATING } from "@/consts";
import { cn, range } from "@/lib/utils";
import { Star } from "lucide-react";
import React from "react";
import FilterCard from "@/components/servers-table/components/filters/filter-card";

export default function RatingFilter({
  onRatingFilterChange,
}: {
  onRatingFilterChange: (value: number) => void;
}) {
  const [selectedRating, setSelectedRating] = React.useState<number>(0);

  function handleSelectedRatingChange(value: number) {
    if (selectedRating === value) {
      // deselecting
      setSelectedRating(-1);
      onRatingFilterChange(MAX_RATING + 1);
      return;
    }
    setSelectedRating(value);
    onRatingFilterChange(value);
  }

  const annotation =
    selectedRating < 1
      ? "None selected"
      : selectedRating === MAX_RATING
      ? `${MAX_RATING} out of ${MAX_RATING}`
      : `${selectedRating} and up`;

  return (
    <FilterCard title="Rating" info={annotation}>
      <div className="flex justify-between">
        {range(1, MAX_RATING + 1).map((num) => (
          <Button
            key={num}
            className={cn(
              num <= selectedRating ? "border border-slate-400" : "",
              "size-9"
            )}
            onClick={() => handleSelectedRatingChange(num)}
          >
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
    </FilterCard>
  );
}
