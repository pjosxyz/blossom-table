import "./App.css";
import BaseLayout from "@/components/layout/base-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServerTable from "@/components/tables/server-table";

function App() {
  return (
    <BaseLayout>
      <Tabs defaultValue="servers" className="w-full">
        <TabsList>
          <TabsTrigger value="servers">Servers</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="servers">
          <ServerTable />
        </TabsContent>
        <TabsContent value="reviews">
          List of reviews in a table
        </TabsContent>
      </Tabs>
    </BaseLayout>
  );
}

export default App;
