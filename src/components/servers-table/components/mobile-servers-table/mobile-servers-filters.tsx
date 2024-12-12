import ServerNameSearch from "../filters/server-search";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SlidersHorizontal } from "lucide-react";
import RatingFilter from "../filters/rating-filter";
import ReviewsFilter from "../filters/reviews-filter";

export default function MobileServersTableFilters() {
  return (
    <div className="flex justify-between px-2 sm:px-4 gap-9">
      <ServerNameSearch
      />
      <Drawer>
        <DrawerTrigger className="bg-white rounded-lg flex gap-1 items-center min-h-10 border border-slate-300 shadow-sm px-3 px-1-5">
          <SlidersHorizontal size={16} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription className="sr-only">
              Filter table results by review score
            </DrawerDescription>
          </DrawerHeader>
          <RatingFilter />
          <ReviewsFilter />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
