import { Input } from "@/components/ui/input";
import { useTable } from "../../hooks/use-table";

export default function ServerNameSearch() {
  const { serverNameFilter, handleServerNameFilterChange } = useTable();
  return (
    <Input
      placeholder="Filter by server name"
      className="max-w-96 border border-slate-300"
      value={serverNameFilter}
      onChange={(e) => handleServerNameFilterChange(e.target.value)}
      // onChange={(e) => console.log(e.target.value)}
    />
  );
}
