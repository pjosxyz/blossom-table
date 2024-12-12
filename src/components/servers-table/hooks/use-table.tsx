import { useContext } from "react";
import { TableContext, TableContextType } from "../context/table-context";

export function useTable(): TableContextType {
  const context = useContext(TableContext);
  if (context === null) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
}
