"use client";

import * as Toast from "@radix-ui/react-toast";

import { AuthProvider } from "@/lib/context/authContext";
import { BasketProvider } from "@/lib/context/basketContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <BasketProvider>
        <Toast.Provider swipeDirection="right">{children}</Toast.Provider>
      </BasketProvider>
    </AuthProvider>
  );
}
