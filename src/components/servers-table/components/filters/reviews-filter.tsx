import { Slider } from "@/components/ui/slider";
import FilterCard from "./filter-card";
import { useTable } from "../../hooks/use-table";
// import { useState } from "react";

export default function ReviewsFilter() {
  const {numReviews, handleReviewFilterChange} = useTable()
  const highestNumReviews = 4; // TODO: get from actual array of reviews...

  return (
    <FilterCard
      title="Total reviews"
      info={`${numReviews} review${
        numReviews[0] > 1 || numReviews[0] === 0 ? "s" : ""
      } and up`}
    >
      <Slider
        max={highestNumReviews}
        defaultValue={numReviews}
        step={1}
        value={numReviews}
        onValueChange={(value) => handleReviewFilterChange(value)} 
      />
    </FilterCard>
  );
}
