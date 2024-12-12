import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTable } from "../hooks/use-table";

function Pagination() {
const {table, handleItemsPerPageChange, itemsPerPage } = useTable()
  return (
    <div className="flex justify-between flex-end px-2 sm:px-4 lg:px-0">
      <div className="flex items-center gap-2">
        <p className="text-sm grow-1 text-slate-600 whitespace-nowrap hidden sm:block">
          Items per page:
        </p>
        <Select onValueChange={handleItemsPerPageChange}>
          <SelectTrigger className="self-start">
            <SelectValue placeholder={itemsPerPage} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="16">16</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-1">
        <Button onClick={() => table.setPageIndex(0)}>First</Button>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
          Last
        </Button>
      </div>
    </div>
  );
}

export default Pagination