import { MAX_REVIEWER_USERNAMES } from "@/consts";
import { ReviewersProps } from "./mobile-servers-table/types";

export default function Reviewers({ reviewedBy }: ReviewersProps) {
  return (
    <div className="flex gap-1 flex-wrap text-slate-950">
      {reviewedBy.map((reviewer, i) => {
        // stop rendering new items if max items already rendered
        if (i > MAX_REVIEWER_USERNAMES) return null;
        return (
          <div key={reviewer.id}> {/* TODO: Fix key */}
            {i ===
            MAX_REVIEWER_USERNAMES /* TODO: make this a popover or link to full reviews view? */ ? (
              <p className="text-slate-500" key={reviewer.id}>
                and {reviewedBy.length - MAX_REVIEWER_USERNAMES} more...
              </p>
            ) : (
              <a
                key={reviewer.id}
                href={`https://primal.net/p/npub` + reviewer.address}
                className="text-slate-950 visited:text-slate-500 underline"
              >
                {reviewer.username}
                {i + 1 === reviewedBy.length ? "" : ","}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
