import { ServerData } from "@/types";
import { ColumnFiltersState, Table } from "@tanstack/react-table";
import { createContext } from "react";

export type TableContextType = {
  table: Table<ServerData>;
  serverNameFilter: string;
  itemsPerPage: number;
  columnFilters: ColumnFiltersState;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  handleServerNameFilterChange: (value: string) => void;
  handleItemsPerPageChange: (value: string) => void;
  handleRatingFilterChange: (value: number) => void;
  handleReviewFilterChange: (value: number[]) => void;
  handleResetReviewRatingFilters: () => void;
  rating: number;
  numReviews: number[];
};

export const TableContext = createContext<TableContextType | null>(null);
