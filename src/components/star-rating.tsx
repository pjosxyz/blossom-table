import { Star } from "lucide-react";

function StarRating({ serverRating }: { serverRating: number }) {
  const rating = Math.round(serverRating);
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < rating
              ? "fill-amber-500 stroke-none"
              : " fill-slate-400 stroke-none"
          }
          // fill={index < rating ? "gold" : "none"}
        />
      ))}
    </div>
  );
}

export default StarRating;
