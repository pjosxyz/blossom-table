import { flexRender } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ServerNameSearch from "@/components/servers-table/components/filters/server-search";
import DesktopTableFilters from "@/components/servers-table/components/desktop-servers-table/desktop-table-filters";
import { useTable } from "../../hooks/use-table";

export default function DesktopTable() {
  const { table } = useTable();
  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-between mb-4">
        <ServerNameSearch />
        <DesktopTableFilters />
      </div>
      <div className="rounded-xl border border-slate-300 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((headers, index) => (
                  <TableHead
                    key={headers.id}
                    // first cell doesn't get a border-left
                    className={index > 0 ? "border-l border-slate-300" : ""}
                  >
                    {/* TableHead children typed as React.Node so wrapped in fragment */}
                    <>{headers.column.columnDef.header}</>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={index > 0 ? "border-l border-slate-300" : ""}
                  >
                    <div className="flex flex-col gap-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
