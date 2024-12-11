import BaseLayout from "@/components/layout/base-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServersTable from "@/components/servers-table";
import mData from "@/data/MOCK_DATA.json";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import type { ServerData } from "./types";
import ActionButtons from "./components/servers-table/components/action-buttons";
import CopyURLButton from "./components/servers-table/components/copy-url-button";
import StarRating from "./components/star-rating";
import Reviewers from "./components/servers-table/components/reviewers";
import ServerDetail from "./components/servers-table/components/server-detail";
function App() {
  const data: ServerData[] = React.useMemo(() => mData, []);

  /**
   * Any components passed here will only show in the desktop table
   * (mobile table needs to be updated separately)
   */
  const columns = React.useMemo<ColumnDef<ServerData>[]>(
    () => [
      {
        accessorKey: "serverDetail",
        header: "Server Name",
        cell: ({ row }) => {
          const serverDetail = row.original.serverDetail;
          return <ServerDetail serverDetail={serverDetail} />;
        },
        filterFn: (row, _columnId, filterValue: string) => {
          return row.original.serverDetail.serverName
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
      },
      {
        accessorKey: "rating",
        header: "Rating",
        cell: (info) => {
          const reviewedBy = info.row.original.reviewedBy;
          const numReviews = reviewedBy.length;
          return (
            <>
              <StarRating serverRating={info.getValue<number>()} />
              <span className="text-sm">
                {numReviews} review
                {numReviews > 1 || numReviews === 0 ? "s" : ""}
              </span>
            </>
          );
        },
        filterFn: (row, _columnId, filterValue: number) => {
          return row.original.rating >= filterValue;
        },
      },
      {
        accessorKey: "reviewedBy",
        header: "Reviewed by",
        cell: ({ row }) => {
          const reviewedBy = row.original.reviewedBy;
          return (
            <div>
              <Reviewers reviewedBy={reviewedBy} />
              <span>({reviewedBy.length})</span>
            </div>
          );
        },
        filterFn: (row, _columnId, filterValue: number) => {
          return row.original.reviewedBy.length >= filterValue;
        },
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "url",
        header: "URL",
        cell: (info) => <CopyURLButton url={info.getValue<string>()} />,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: () => <ActionButtons />,
      },
    ],
    []
  );

  return (
    <BaseLayout>
      <Tabs defaultValue="servers" className="w-full">
        <TabsList>
          <TabsTrigger value="servers">Servers</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="servers">
          <ServersTable data={data} columns={columns} />
        </TabsContent>
        <TabsContent value="reviews">List of reviews in a table</TabsContent>
      </Tabs>
    </BaseLayout>
  );
}

export default App;
