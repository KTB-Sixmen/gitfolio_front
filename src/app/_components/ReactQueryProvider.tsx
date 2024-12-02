"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function ReactQueryProviders({
  children,
}: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: true, // 윈도우가 다시 포커스되었을때 데이터를 refetch
          refetchOnMount: true, // 데이터가 stale 상태이면 컴포넌트가 마운트될 때 refetch
          retryOnMount: false,
          refetchOnReconnect: true,
          retry: 1, //// API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
          retryDelay: 1000,
          staleTime: 1000 * 60 * 10, // 10분 동안 데이터가 stale 상태이면 refetch
          gcTime: 1000 * 60 * 60,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  );
}
