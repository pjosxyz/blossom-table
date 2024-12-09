import { PaginationProps } from "@/components/servers-table/types"
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Pagination({ tableData, itemsPerPage, onItemsPerPageChange }: PaginationProps) {
  return (
    <div className="flex justify-between flex-end px-2 sm:px-4 lg:px-0">
      <div className="flex items-center gap-2">
        <p className="text-sm grow-1 text-slate-600 whitespace-nowrap hidden sm:block">
          Items per page:
        </p>
        <Select onValueChange={onItemsPerPageChange}>
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

export default Pagination