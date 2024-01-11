"use client"
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/utils/store";
export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
