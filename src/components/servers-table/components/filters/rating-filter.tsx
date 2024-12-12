import { Button } from "@/components/ui/button";
import { MAX_RATING } from "@/consts";
import { cn, range } from "@/lib/utils";
import { Star } from "lucide-react";
import FilterCard from "@/components/servers-table/components/filters/filter-card";
import { useTable } from "../../hooks/use-table";

export default function RatingFilter() {
  const { handleRatingFilterChange, rating } = useTable();
  const annotation =
    rating < 1
      ? "None selected"
      : rating === MAX_RATING
      ? `${MAX_RATING} out of ${MAX_RATING}`
      : `${rating} and up`;

  return (
    <FilterCard title="Minimum Rating" info={annotation}>
      <div className="flex justify-between">
        {range(1, MAX_RATING + 1).map((num) => (
          <Button
            key={num}
            className={cn(
              num <= rating ? "border border-slate-400" : "",
              "size-9"
            )}
            onClick={() => handleRatingFilterChange(num)}
          >
            <Star
              size={20}
              className={cn(
                num <= rating ? "fill-amber-500" : "fill-slate-300",
                "stroke-none"
              )}
            />
          </Button>
        ))}
      </div>
    </FilterCard>
  );
}
