import { useTable } from "../../hooks/use-table";
import MobileDataCard from "./mobile-data-card";
import MobileServersTableFilters from "./mobile-servers-filters";

export default function MobileTable() {
  const {table} = useTable()
  const rowData = table.getRowModel().rows.map((row) => row.original);

  return (
    <>
      <div className="lg:hidden flex flex-col h-[80%]  gap-4">
        <MobileServersTableFilters
        />
        <div className=" gap-2 flex flex-col bg-slate-100 border-t border-b border-slate-300 p-2 sm:p-4 flex-1 overflow-y-auto">
          {rowData.map((row) => {
            return (
              <MobileDataCard
                key={row.id}
                serverDetail={row.serverDetail}
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
