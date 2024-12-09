import { Button } from "@/components/ui/button";
import { TableProps } from "../../types";
import ServerNameSearch from "../server-search";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export default function DesktopTable({
  tableData,
  serverNameFilter,
  onServerNameFilterChange,
}: TableProps) {
  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-between mb-4">
        <ServerNameSearch
          onSearchChange={onServerNameFilterChange}
          serverNameFilter={serverNameFilter}
        />
        <Button>Filters</Button>
      </div>
      <div className="rounded-xl border border-slate-300 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            {tableData.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((headers, index) => (
                  <TableHead
                    key={headers.id}
                    // first cell doesn't get a border-left
                    className={index > 0 ? "border-l border-slate-300" : ""}
                  >
                    {/* TableHead children typed as React.Node so wrapped in fragment to keep TS happy */}
                    <>{headers.column.columnDef.header}</>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableData.getRowModel().rows.map((row) => (
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