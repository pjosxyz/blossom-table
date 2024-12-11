import StarRating from "@/components/star-rating";
import { MobileRowProps } from "@/components/servers-table/types";
import { PropsWithChildren } from "react";
import {
  BodyProps,
  CellProps,
} from "@/components/servers-table/components/mobile-servers-table/types";
import Reviewers from "@/components/servers-table/components/reviewers";
import ActionButtons from "../action-buttons";
import CopyURLButton from "../copy-url-button";
import ServerDetail from "../server-detail";

function MobileDataCard({
  serverDetail,
  rating,
  reviewedBy,
  description,
  url,
}: MobileRowProps) {
  return (
    <article className="text-sm border border-slate-300 bg-white shadow-sm rounded-md shrink-0 overflow-hidden">
      <Header
        serverDetail={serverDetail}
        rating={rating}
        numReviews={reviewedBy.length}
      />
      <Body
        reviewedBy={reviewedBy}
        description={description}
        url={url}
      />
      <Footer />
    </article>
  );
}

function Footer() {
  return (
    <footer className="border-l flex p-2 justify-center items-center gap-4 border-slate-200">
      <ActionButtons />
    </footer>
  );
}

function Header({
  serverDetail,
  rating,
  numReviews,
}: {
  serverDetail: { serverName: string; isPaidServer: boolean };
  rating: number;
  numReviews: number;
}) {
  return (
    <header className=" px-3 py-3 border-b  border-slate-200 flex items-center justify-between">
      <ServerDetail serverDetail={serverDetail} />

      <div className="text-xs flex items-center gap-1 text-slate-500">
        <StarRating serverRating={rating} />
        {numReviews} review{numReviews > 1 || numReviews === 0 ? "s" : ""}
      </div>
    </header>
  );
}

function Body({ reviewedBy, description, url }: BodyProps) {
  return (
    <div>
      <div className="flex flex-col">
        <Cell label="Reviewed by">
          <Reviewers reviewedBy={reviewedBy} />
        </Cell>
        <Cell label="Description">
          <p className="text-slate-950">{description}</p>
        </Cell>
        <Cell label="URL">
          <CopyURLButton url={url} />
        </Cell>
      </div>
    </div>
  );
}

function Cell({ children, label }: PropsWithChildren<CellProps>) {
  return (
    <div className="flex flex-col gap-2 p-3 border-b border-slate-300">
      <p className="text-xs text-slate-400">{label}</p>
      {children}
    </div>
  );
}

export default MobileDataCard;
