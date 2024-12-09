import { Input } from "@/components/ui/input";
import { FiltersType } from "@/components/servers-table/types";

export default function ServerNameSearch({
  serverNameFilter,
  onSearchChange,
}: FiltersType) {
  return (
    <Input
      placeholder="Filter by server name"
      className="max-w-96 border border-slate-300"
      value={serverNameFilter}
      onChange={(e) => onSearchChange(e.target.value)}
      // onChange={(e) => console.log(e.target.value)}
    />
  );
}
