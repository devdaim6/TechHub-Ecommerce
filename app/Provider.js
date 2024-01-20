"use client";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/utils/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextUIProvider } from "@nextui-org/react";
export const StoreProvider = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
    enabled: false,
  },
});
export const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
export const NextProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
