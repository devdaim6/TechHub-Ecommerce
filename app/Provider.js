"use client";
import { store } from "@/utils/store";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";

/**
 * The `StoreProvider` component is a wrapper that provides the Redux store to its children components.
 * @returns The `StoreProvider` component is returning the `ReduxProvider` component with the `store`
 * prop set to the `store` variable. The `children` prop is also being passed to the `ReduxProvider`
 * component.
 */
export const StoreProvider = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

/**
 * The AuthProvider function is a wrapper component that provides authentication functionality to its
 * children components.
 * @returns The AuthProvider component is returning the SessionProvider component with the children
 * prop passed in.
 */
export const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

 /* The code block is creating a new instance of the `QueryClient` class from the
 `@tanstack/react-query` library. The `QueryClient` is a client-side data fetching and caching
 library for JavaScript applications. */
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

/**
 * The NextProvider component is a wrapper that provides the NextUIProvider to its children.
 * @returns The NextProvider component is returning the NextUIProvider component with the children prop
 * passed as its children.
 */
export const NextProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
