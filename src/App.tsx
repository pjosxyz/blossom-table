import BaseLayout from "@/components/layout/base-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServersTable from "@/components/servers-table";
import mData from "@/data/MOCK_DATA.json";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import type { ReviewedBy, ServerData } from "./types";
import ActionButtons from "./components/servers-table/components/action-buttons";
import CopyURLButton from "./components/servers-table/components/copy-url-button";
import StarRating from "./components/star-rating";
import Reviewers from "./components/servers-table/components/reviewers";
import ServerDetail from "./components/servers-table/components/server-detail";
function App() {
  const data: ServerData[] = React.useMemo(() => mData, []);

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
        cell: (info) => <StarRating serverRating={info.getValue<number>()} />,
        filterFn: (row, _columnId, filterValue: number) => {
          return row.original.rating <= filterValue;
        },
      },
      {
        accessorKey: "reviewedBy",
        header: "Reviewed by",
        cell: (info) => (
          <Reviewers reviewedBy={info.getValue<ReviewedBy[]>()} />
        ),
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
