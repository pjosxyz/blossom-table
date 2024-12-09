import BaseLayout from "@/components/layout/base-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServersTable from "@/components/tables/server-table";
import mData from "@/data/MOCK_DATA.json";
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import type { ServerData } from "./types";
function App() {
  const data = React.useMemo(() => mData, []);

    // TODO: need to memoise...
    const columns: ColumnDef<ServerData>[] = [
      {
        accessorKey: "serverName",
        header: "Server Name",
      },
      {
        accessorKey: "rating",
        header: "Rating",
      },
      {
        accessorKey: "reviewedBy",
        header: "Reviewed by",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "url",
        header: "URL",
      },
    ];
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
