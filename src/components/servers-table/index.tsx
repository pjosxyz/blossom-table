import Pagination from "@/components/servers-table/components/pagination";
import MobileTable from "./components/mobile-servers-table/mobile-table";
import { ServersTableProps } from "./types";
import DesktopTable from "./components/desktop-servers-table/desktop-table";
import { TableProvider } from "./context/table-provider";

export default function ServersTable({ data, columns }: ServersTableProps) {
  return (
    // TODO: move to wrap tabs too in App
    <div className="flex flex-col h-[90dvh] gap-4">
      <TableProvider data={data} columns={columns}>
        <MobileTable />
        <DesktopTable />
        <Pagination />
      </TableProvider>
    </div>
  );
}
