import React from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Pagination from "@/components/servers-table/components/pagination";
import MobileTable from "./components/mobile-servers-table/mobile-table";
import { ServersTableProps } from "./types";
import { DEFAULT_ITEMS_PER_PAGE } from "@/consts";
import DesktopTable from "./components/desktop-servers-table/desktop-table";

export default function ServersTable({ data, columns }: ServersTableProps) {
  const [serverNameFilter, setServerNameFilter] = React.useState<string>("");
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([
    {
      id: "serverName",
      value: serverNameFilter,
    },
  ]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: itemsPerPage,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  function handleServerNameFilterChange(value: string) {
    setServerNameFilter(value);
    table.getColumn("serverName")?.setFilterValue(value);
  }

  function handleItemsPerPageChange(value: string) {
    const numItems = Number(value);
    setItemsPerPage(numItems);
    setPagination((prev) => ({
      ...prev,
      pageSize: numItems,
    }));
  }

  return (
    // TODO: move to wrap tabs too in App
    <div className="flex flex-col h-[90dvh] gap-4">
      <MobileTable
        tableData={table}
        serverNameFilter={serverNameFilter}
        onServerNameFilterChange={handleServerNameFilterChange}
      />
      <DesktopTable
        tableData={table}
        serverNameFilter={serverNameFilter}
        onServerNameFilterChange={handleServerNameFilterChange}
      />
      <Pagination
        tableData={table}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
