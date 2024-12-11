import React, { useState } from "react";
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
  const [serverNameFilter, setServerNameFilter] = useState<string>("");

  const [itemsPerPage, setItemsPerPage] = React.useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );

  // const [ratingFilter, setRatingFilter] = React.useState<number>(0);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

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
    setColumnFilters([
      {
        id: "serverDetail",
        value: value,
      },
    ]);
  }

  function handleItemsPerPageChange(value: string) {
    const numItems = Number(value);
    setItemsPerPage(numItems);
    setPagination((prev) => ({
      ...prev,
      pageSize: numItems,
    }));
  }

  function handleRatingFilterChange(value: number) {
    setColumnFilters([
      {
        id: "rating",
        value,
      },
    ]);
  }

  return (
    // TODO: move to wrap tabs too in App
    <div className="flex flex-col h-[90dvh] gap-4">
      <MobileTable
        tableData={table}
        serverNameFilter={serverNameFilter}
        onServerNameFilterChange={handleServerNameFilterChange}
        onRatingFilterChange={handleRatingFilterChange}
        />
      <DesktopTable
        tableData={table}
        serverNameFilter={serverNameFilter}
        onServerNameFilterChange={handleServerNameFilterChange}
        onRatingFilterChange={handleRatingFilterChange}
      />
      <Pagination
        tableData={table}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
