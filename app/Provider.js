"use client";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/utils/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


export const StoreProvider = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
const queryClient=new QueryClient();
export const QueryProvider = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
