import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RatingFilter from "@/components/servers-table/components/filters/rating-filter";
import ReviewsFilter from "../filters/reviews-filter";

export default function DesktopTableFilters() {
  return (
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent className="p-2 flex flex-col gap-2">
        <RatingFilter />
        <ReviewsFilter />
      </PopoverContent>
    </Popover>
  );
}
