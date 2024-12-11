import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RatingFilter from "@/components/servers-table/components/rating-filter";
import ReviewsFilter from "../reviews-filter";

export default function DesktopTableFilters() {
  return (
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent>
        <RatingFilter />
        <ReviewsFilter />
      </PopoverContent>
    </Popover>
  );
}
