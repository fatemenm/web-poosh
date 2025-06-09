import { ReactNode, createContext, useContext, useState } from "react";

import { BreadCrumbItem } from "@/components/layout/breadcrumb";

export type breadcrumbContextType = {
  items: BreadCrumbItem[];
  setItems: (items: BreadCrumbItem[]) => void;
};

const breadcrumbContext = createContext<breadcrumbContextType | null>(null);

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BreadCrumbItem[]>([]);
  return (
    <breadcrumbContext.Provider value={{ items, setItems }}>
      {children}
    </breadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(breadcrumbContext);
  if (!context)
    throw new Error("useBreadcrumb must be used within a breadcrumbProvider");
  return context;
}
