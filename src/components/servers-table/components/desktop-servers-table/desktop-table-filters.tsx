import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RatingFilter from "@/components/servers-table/components/filters/rating-filter";
import ReviewsFilter from "../filters/reviews-filter";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DesktopTableFilters({
  onRatingFilterChange,
  onReviewFilterChange,
  onResetReviewRatingFilters,
}: {
  onRatingFilterChange: (value: number) => void;
  onReviewFilterChange: (value: number) => void;
  onResetReviewRatingFilters: () => void;
}) {
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [reviewSliderValue, setReviewSliderValue] = useState<number[]>([0]);

  const disableResetButton = ratingValue === 0 && reviewSliderValue[0] === 0;

  function handleRatingValueChange(value: number) {
    setRatingValue(value);
    onRatingFilterChange(value);
  }

  function handleReviewSliderValueChange(value: number[]) {
    const [num] = value;
    setReviewSliderValue(value);
    onReviewFilterChange(num);
  }

  function handleResetFilters() {
    setRatingValue(0);
    setReviewSliderValue([0]);
    onResetReviewRatingFilters();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Filters</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col" align="end">
        <RatingFilter
          onRatingFilterChange={handleRatingValueChange}
          rating={ratingValue}
        />
        <ReviewsFilter
          onReviewFilterChange={handleReviewSliderValueChange}
          numReviews={reviewSliderValue}
        />
        <div className="p-3 flex ">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleResetFilters}
            disabled={disableResetButton}
          >
            Reset filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
