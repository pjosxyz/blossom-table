import { PropsWithChildren } from "react";
import { FiltersType } from "../../types";
import ServerNameSearch from "../server-search";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SlidersHorizontal } from "lucide-react";

export default function MobileServersTableFilters({
  serverNameFilter,
  onSearchChange,
  children,
}: PropsWithChildren<FiltersType>) {
  return (
    <div className="flex justify-between px-2 sm:px-4 gap-9">
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
