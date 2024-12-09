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
import mData from "@/data/MOCK_DATA.json";
import { Star } from "lucide-react";

export default function ServerTable() {
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
    <>
      <div className="md:hidden">
        <MobileFilters
          serverNameFilter={serverNameFilter}
          onSearchChange={handleServerNameFilterChange}
        >
          {/* drawer content here */}
        </MobileFilters>
        {/* mobile table (actually a grid) */}
        <MobileTable />
        <Pagination
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <div className="hidden md:block">
        <h1>I'm not a mobile screen</h1>
      </div>
    </>
  );
}

const DUMMY_ROW_DATA = mData[1];

function MobileTable() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <MobileRow />
    </div>
  );
}

function MobileRow() {
  return (
    <div className="text-sm">
      <header className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
        <p className="capitalize text-sm font-semibold text-slate-950">
          {DUMMY_ROW_DATA.serverName}
        </p>
        <div className="text-xs flex items-center gap-1 text-slate-500">
          <StarRating />1 review
        </div>
      </header>

      <div className="grid grid-cols-[2.5fr_1fr]">
        <div className="flex flex-col gap-2 py-4">
          <div className="flex flex-col gap-1 px-4">
            <p className=" text-slate-400">Reviewed by:</p>
            <div className="flex gap-1 flex-wrap text-slate-950">
              {DUMMY_ROW_DATA.reviewedBy.map((reviewer, i) => {
                // stop rendering new items if max items already rendered
                if (i > MAX_REVIEWER_USERNAMES) return null;
                return (
                  <>
                    {i === MAX_REVIEWER_USERNAMES ? (
                      <p className="text-slate-500" key={reviewer.id}>
                        and{" "}
                        {DUMMY_ROW_DATA.reviewedBy.length -
                          MAX_REVIEWER_USERNAMES}{" "}
                        more...
                      </p>
                    ) : (
                      <a
                        key={reviewer.id}
                        href={`https://primal.net/p/npub` + reviewer.address}
                        className="text-slate-950"
                      >
                        {reviewer.username}
                        {i + 1 === DUMMY_ROW_DATA.reviewedBy.length ? "" : ","}
                      </a>
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-1 px-4">
            <p className=" text-slate-400">Description:</p>
            <p className="text-slate-950">{DUMMY_ROW_DATA.description}</p>
          </div>
          <div className="flex justify-between items-center px-4">
            <p className=" text-slate-400">URL:</p>
            <Button variant="tertiary" size="sm">
              {DUMMY_ROW_DATA.url} <Copy size={10} />
            </Button>
          </div>
        </div>
        <div className="border-l flex-col content-center items-center gap-4 border-slate-200">
          <Button variant="link">
            Open <SquareArrowOutUpRight />
          </Button>
          <Button>Add review</Button>
        </div>
      </div>
    </div>
  );
}

function StarRating() {
  const rating = Math.round(DUMMY_ROW_DATA.rating);
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "gold" : "none"}
          color={index < rating ? "gold" : "gray"}
        />
      ))}
    </div>
  );
}

type PaginationProps = {
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
};

function Pagination({ itemsPerPage, onItemsPerPageChange }: PaginationProps) {
  return (
    <div className="flex justify-between">
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
        <Button>Previous</Button>
        <Button>Next</Button>
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
    <div className="flex justify-between gap-9">
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
