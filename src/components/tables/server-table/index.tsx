import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_ITEMS_PER_PAGE, MAX_REVIEWER_USERNAMES } from "@/consts";
import { Copy, SlidersHorizontal, SquareArrowOutUpRight } from "lucide-react";
import React, { PropsWithChildren } from "react";

import { Star } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import type { ServerData } from "@/types";

// interface ServerData {
//   id: number;
//   serverName: string;
//   rating: number;
//   reviewedBy: {
//     id: number;
//     username: string;
//     address: string;
//   }[];
//   description: string;
//   url: string;
// }
type ServersTableProps = {
  data: ServerData[];
  columns: ColumnDef<ServerData>[];
};
export default function ServersTable({ data, columns }: ServersTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [serverNameFilter, setServerNameFilter] = React.useState<string>("");
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(
    DEFAULT_ITEMS_PER_PAGE
  );

  function handleServerNameFilterChange(value: string) {
    console.log("handling search change");
    setServerNameFilter(value);
  }

  function handleItemsPerPageChange(value: string) {
    setItemsPerPage(+value);
  }

  return (
    // TODO: move to wrap tabs too in App
    <div className="flex flex-col h-[90dvh] gap-4">
      <MobileTable
        tableData={table}
        serverNameFilter={serverNameFilter}
        onServerNameFilterChange={handleServerNameFilterChange}
      />
      <div className="hidden md:block">
        <h1>I'm not a mobile screen</h1>
      </div>
      <Pagination
        tableData={table}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

type MobileTableProps = {
  tableData: Table<ServerData>;
  serverNameFilter: string;
  onServerNameFilterChange: (value: string) => void;
  // itemsPerPage: number;
  // onItemsPerPageChange: (value: string) => void; // value coming from input so is a string...
};

function MobileTable({
  tableData,
  serverNameFilter,
  onServerNameFilterChange,
}: MobileTableProps) {
  const rowData = tableData.getRowModel().rows.map((row) => row.original);

  return (
    <>
      <div className="md:hidden flex flex-col h-[80%]  gap-4">
        <MobileFilters
          serverNameFilter={serverNameFilter}
          onSearchChange={onServerNameFilterChange}
        >
          {/* drawer content here */}
        </MobileFilters>
        <div className=" gap-2 flex flex-col bg-slate-100 border-t border-b border-slate-300 p-2 flex-1 overflow-y-auto">
          {rowData.map((row) => {
            return (
              <MobileRow
                key={row.id}
                serverName={row.serverName}
                rating={row.rating}
                reviewedBy={row.reviewedBy}
                description={row.description}
                url={row.url}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

type MobileRowProps = Omit<ServerData, "id"> & { key: number };

function MobileRow({
  serverName,
  rating,
  reviewedBy,
  description,
  url,
}: MobileRowProps) {
  return (
    <article className="text-sm border border-slate-300 bg-white shadow-sm rounded-md shrink-0 overflow-hidden">
      <header className=" px-3 py-3 border-b  border-slate-200 flex items-center justify-between">
        <p className="capitalize text-lg max-w-[60%] leading-tight font-medium text-slate-950">
          {serverName}
        </p>
        <div className="text-xs flex items-center gap-1 text-slate-500">
          <StarRating serverRating={rating} />1 review{" "}
          {/* TODO: Derive from relay data, update ServerData interface */}
        </div>
      </header>

      <div className="">
        <div className="flex flex-col">
          <div className="flex flex-col border-b border-slate-00 gap-2 p-3">
            <p className=" text-slate-400 text-xs">Reviewed by</p>
            <div className="flex gap-1 flex-wrap text-slate-950">
              {reviewedBy.map((reviewer, i) => {
                // stop rendering new items if max items already rendered
                if (i > MAX_REVIEWER_USERNAMES) return null;
                return (
                  <>
                    {i ===
                    MAX_REVIEWER_USERNAMES /* TODO: make this a popover or link to full reviews view? */ ? (
                      <p className="text-slate-500" key={reviewer.id}>
                        and {reviewedBy.length - MAX_REVIEWER_USERNAMES} more...
                      </p>
                    ) : (
                      <a
                        key={reviewer.id}
                        href={`https://primal.net/p/npub` + reviewer.address}
                        className="text-slate-950 visited:text-slate-500 underline"
                      >
                        {reviewer.username}
                        {i + 1 === reviewedBy.length ? "" : ","}
                      </a>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3 border-b border-slate-00">
            <p className="text-xs text-slate-400">Description</p>
            <p className="text-slate-950">{description}</p>
          </div>
          <div className="flex flex-col gap-2 p-3 border-b border-slate-00">
            <p className="text-xs text-slate-400">URL</p>
            <Button variant="outline" size="sm" className="self-start">
              {url} <Copy size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="border-l flex p-2 justify-center items-center gap-4 border-slate-200">
        <Button variant="link">
          Open <SquareArrowOutUpRight />
        </Button>
        <Button>Add review</Button>
      </div>
    </article>
  );
}
/* MobileRow v1 */
// function MobileRow({
//   serverName,
//   rating,
//   reviewedBy,
//   description,
//   url,
// }: MobileRowProps) {
//   return (
//     <article className="text-sm border border-slate-300 bg-white shadow-sm rounded-md shrink-0 overflow-hidden">
//       <header className=" px-3 py-3 border-b  border-slate-300 flex items-center justify-between">
//         <p className="capitalize text-lg max-w-[60%] leading-tight font-medium text-slate-950">
//           {serverName}
//         </p>
//         <div className="text-xs flex flex-col items-center gap-1 text-slate-500">
//           <StarRating serverRating={rating} />1 review{" "}
//           {/* TODO: Derive from relay data, update ServerData interface */}
//         </div>
//       </header>

//       <div className="grid grid-cols-[2.5fr_1fr] ">
//         <div className="flex flex-col">
//           <div className="flex flex-col border-b border-slate-200 gap-1 p-3">
//             <p className=" text-slate-400 text-xs">Reviewed by:</p>
//             <div className="flex gap-1 flex-wrap text-slate-950">
//               {reviewedBy.map((reviewer, i) => {
//                 // stop rendering new items if max items already rendered
//                 if (i > MAX_REVIEWER_USERNAMES) return null;
//                 return (
//                   <>
//                     {i ===
//                     MAX_REVIEWER_USERNAMES /* TODO: make this a popover or link to full reviews view? */ ? (
//                       <p className="text-slate-500" key={reviewer.id}>
//                         and {reviewedBy.length - MAX_REVIEWER_USERNAMES} more...
//                       </p>
//                     ) : (
//                       <a
//                         key={reviewer.id}
//                         href={`https://primal.net/p/npub` + reviewer.address}
//                         className="text-slate-950 visited:text-slate-500 underline"
//                       >
//                         {reviewer.username}
//                         {i + 1 === reviewedBy.length ? "" : ","}
//                       </a>
//                     )}
//                   </>
//                 );
//               })}
//             </div>
//           </div>
//           <div className="flex flex-col gap-1 p-3 border-b border-slate-200">
//             <p className="text-xs text-slate-400">Description:</p>
//             <p className="text-slate-950">{description}</p>
//           </div>
//           <div className="flex flex-col gap-1 p-3 border-b border-slate-200">
//             <p className=" text-slate-400">URL:</p>
//             <span className="flex items-center gap-1">
//               {url} <Copy size={16} />
//             </span>
//           </div>
//         </div>
//         <div className="border-l bg-slate-50 flex flex-col px-4 justify-center items-center gap-4 border-slate-200">
//           <Button variant="link">
//             Open <SquareArrowOutUpRight />
//           </Button>
//           <Button>Add review</Button>
//         </div>
//       </div>
//     </article>
//   );
// }

function StarRating({ serverRating }: { serverRating: number }) {
  const rating = Math.round(serverRating);
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < rating
              ? "fill-amber-500 stroke-none"
              : " fill-slate-400 stroke-none"
          }
          // fill={index < rating ? "gold" : "none"}
        />
      ))}
    </div>
  );
}

type PaginationProps = {
  tableData: Table<ServerData>;
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
};

function Pagination({ tableData, itemsPerPage, onItemsPerPageChange }: PaginationProps) {
  return (
    <div className="flex justify-between flex-end px-2">
      <div className="flex items-center">
        <p className="text-sm grow-1 whitespace-nowrap hidden sm:block">
          Items per page:
        </p>
        <Select onValueChange={onItemsPerPageChange}>
          <SelectTrigger className="self-start">
            <SelectValue placeholder={itemsPerPage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-1">
        <Button onClick={() => tableData.setPageIndex(0)}>First</Button>
        <Button
          onClick={() => tableData.previousPage()}
          disabled={!tableData.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => tableData.nextPage()}
          disabled={!tableData.getCanNextPage()}
        >
          Next
        </Button>
        <Button onClick={() => tableData.setPageIndex(tableData.getPageCount() - 1)}>
          Last
        </Button>
      </div>
    </div>
  );
}

type FiltersType = {
  serverNameFilter: string;
  onSearchChange: (value: string) => void;
};

function MobileFilters({
  serverNameFilter,
  onSearchChange,
  children,
}: PropsWithChildren<FiltersType>) {
  return (
    <div className="flex justify-between px-2 gap-9">
      <ServerNameSearch
        serverNameFilter={serverNameFilter}
        onSearchChange={onSearchChange}
      />
      <Drawer>
        <DrawerTrigger className="bg-white rounded-lg flex gap-1 items-center min-h-10 border border-slate-300 shadow-sm px-3 px-1-5">
          <SlidersHorizontal size={16} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription className="sr-only">
              Filter table results by review score
            </DrawerDescription>
            {/* drop filter components here */}
            {children}
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function ServerNameSearch({ serverNameFilter, onSearchChange }: FiltersType) {
  return (
    <Input
      placeholder="Filter by server name"
      value={serverNameFilter}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
