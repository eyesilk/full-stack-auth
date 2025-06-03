"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { AlertProvider } from "./AlertProvider";

const queryClient = new QueryClient();

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <AlertProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AlertProvider>
  );
};

export default AppProvider;
