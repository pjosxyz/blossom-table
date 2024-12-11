import { Slider } from "@/components/ui/slider";
import FilterCard from "./filter-card";
import { useState } from "react";

export default function ReviewsFilter() {
  const highestNumReviews = 8;
  const [sliderValue, setSliderValue] = useState<number[]>([
    highestNumReviews / 2,
  ]);

  return (
    <FilterCard
      title="Total reviews"
      info={`${sliderValue} review${sliderValue[0] > 1 || sliderValue[0] === 0 ? "s" : ""}`}
    >
      <Slider
        max={highestNumReviews}
        defaultValue={[highestNumReviews / 2]}
        step={1}
        value={sliderValue}
        onValueChange={(value) => setSliderValue(value)}
      />
    </FilterCard>
  );
}
