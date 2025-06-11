"use client";

import * as Toast from "@radix-ui/react-toast";

import { AuthProvider } from "@/lib/context/authContext";
import { BasketProvider } from "@/lib/context/basketContext";
import { BreadcrumbProvider } from "@/lib/context/breadcrumbContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BasketProvider>
        <Toast.Provider swipeDirection="right">
          <BreadcrumbProvider>{children}</BreadcrumbProvider>
        </Toast.Provider>
      </BasketProvider>
    </AuthProvider>
  );
}
