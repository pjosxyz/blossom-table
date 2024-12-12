import { DEFAULT_ITEMS_PER_PAGE } from "@/consts";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PropsWithChildren, useState } from "react";
import { ServersTableProps } from "../types";
import { TableContext } from "./table-context";

/**
 * Provides the context for the ServersTable component.
 * 
 * @param {PropsWithChildren<ServersTableProps>} props - The props for the component.
 * @returns The JSX element for the component.
 */
export function TableProvider({
  children,
  data,
  columns,
}: PropsWithChildren<ServersTableProps>) {
  const [serverName, setServerName] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: itemsPerPage,
  });
  const [rating, setRating] = useState<number>(0);
  const [numReviews, setNumReviews] = useState<number[]>([0]);

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

  /**
   * Updates UI state for filtering table by server name
   * Calls Tanstack table filtering function, defined in App.tsx
   * 
   * @param value returned from input value change in server-search.tsx
   * @see {@link /src/components/servers-table/components/filters/server-search.tsx}
   * @example
   * handleServerNameFilterChange("serverName"); // Updates the table to show only rows with serverName
   */
  function handleServerNameFilterChange(value: string) {
    setServerName(value);
    setColumnFilters((prev) => {
      const remaining = prev.filter((filter) => filter.id !== "serverDetail");
      return [
        ...remaining,
        {
          id: "serverDetail",
          value: value,
        },
      ];
    });
  }

  /**
   * Updates UI state for changing items per page
   * Calls Tanstack table pagination function, defined in App.tsx
   * 
   * @param value returned from select value change in pagination.tsx
   * @see {@link /src/components/servers-table/components/pagination.tsx}
   * @example
   * handleItemsPerPageChange("10"); // Updates the table to show 10 items per page
   */
  function handleItemsPerPageChange(value: string) {
    const numItems = Number(value);
    setItemsPerPage(numItems); // update UI
    setPagination((prev) => ({ // update table filter
      ...prev,
      pageSize: numItems,
    }));
  }

  /**
   * Updates the UI state for filtering the table by rating.
   * Calls the Tanstack Table filtering function defined in `App.tsx`.
   *
   * @param {number} value - The value returned from the star rating component in `rating-filter.tsx`.
   * @see {@link /src/components/servers-table/components/filters/rating-filter.tsx}
   * @example
   * handleRatingFilterChange(4); // Filters the table to show rows with a rating of 4 or highter
   */
  function handleRatingFilterChange(value: number) {
    setRating(value);
    setColumnFilters((prev) => {
      // Remove old rating filter if exists
      const remaining = prev.filter((filter) => filter.id !== "rating");
      // Add new rating filter
      return [
        ...remaining,
        {
          id: "rating",
          value: value,
        },
      ];
    });
  }

  /**
   * Updates the UI state for filtering the table by the number of reviews.
   * Calls the Tanstack Table filtering function defined in `App.tsx`.
   * 
   * @param {number[]} value - The value returned from the number of reviews component in `reviews-filter.tsx`.
   * @see {@link /src/components/servers-table/components/filters/reviews-filter.tsx}
   * @example
   * handleReviewFilterChange([5]); // Filters the table to show rows with 5 reviews
   */
  function handleReviewFilterChange(value: number[]) {
    setNumReviews(value);

    const [num] = value;
    setColumnFilters((prev) => {
      // Remove old review filter if exists
      const remaining = prev.filter((filter) => filter.id !== "reviewedBy");
      // Add new review filter
      return [
        ...remaining,
        {
          id: "reviewedBy",
          value: num,
        },
      ];
    });
  }

  function handleResetReviewRatingFilters() {
    setNumReviews([0]);
    setRating(0);
    setColumnFilters([
      {
        id: "rating",
        value: 0,
      },
      {
        id: "reviewedBy",
        value: 0,
      },
    ]);
  }

  const context = {
    table,
    serverNameFilter: serverName,
    itemsPerPage,
    columnFilters,
    pagination,
    handleServerNameFilterChange,
    handleItemsPerPageChange,
    handleRatingFilterChange,
    handleReviewFilterChange,
    handleResetReviewRatingFilters,
    rating,
    numReviews,
  };

  return (
    <TableContext.Provider value={context}>{children}</TableContext.Provider>
  );
}
