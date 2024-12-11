import { useContext } from "react";
import { TableContext, TableContextType } from "@/contexts/table-context/table-context";

export const useTableContext = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within TableProvider");
  }
  return context;
};
