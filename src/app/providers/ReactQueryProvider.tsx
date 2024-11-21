"use client";
import { queryClient } from "@/shared/react-query";
import { QueryClientProvider, QueryClient, Query } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";

export default function ReactQueryProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
        errorTypes={[
          {
            name: "Error",
            initializer: errorInitializer(new Error("Error message")),
          },
          {
            name: "Axios Error",
            initializer: errorInitializer(new AxiosError("Axios error")),
          },
        ]}
      />
    </QueryClientProvider>
  );
}

function errorInitializer(error: Error) {
  return (query: Query) => {
    query.reset();
    return error;
  };
}
