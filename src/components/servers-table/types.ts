import { ServerData } from "@/types";
import { ColumnDef, Table } from "@tanstack/react-table";

export type ServersTableProps = {
  data: ServerData[];
  columns: ColumnDef<ServerData>[];
};

export type TableProps = {
  tableData: Table<ServerData>;
  serverNameFilter: string;
  onServerNameFilterChange: (value: string) => void;
  onRatingFilterChange: (value: number) => void;
  onReviewFilterChange: (value: number) => void;
  onResetReviewRatingFilters: () => void;
};

export type MobileRowProps = Omit<ServerData, "id"> & { key: number };

export type PaginationProps = {
  tableData: Table<ServerData>;
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
};

export type FiltersType = {
  serverNameFilter: string;
  onSearchChange: (value: string) => void;
};

export type ServerDetailProps = {
  serverDetail: { serverName: string; isPaidServer: boolean };
};
