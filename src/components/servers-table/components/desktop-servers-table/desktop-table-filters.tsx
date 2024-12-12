import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RatingFilter from "@/components/servers-table/components/filters/rating-filter";
import ReviewsFilter from "../filters/reviews-filter";
import { Button } from "@/components/ui/button";
import { useTable } from "../../hooks/use-table";

export default function DesktopTableFilters() {
  const { handleResetReviewRatingFilters, rating, numReviews } = useTable();
  const disableResetButton = rating === 0 && numReviews[0] === 0;

  function handleResetFilters() {
    handleResetReviewRatingFilters();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Filters</Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col" align="end">
        <RatingFilter />
        <ReviewsFilter />
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
