"use client";

import { RecoilRoot } from "recoil";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AuthInitializer } from "@/components/auth/AuthInitializer";

// Devtools는 개발 환경에서만 클라이언트 사이드로 동적 로딩
const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then((m) => m.ReactQueryDevtools),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchOnReconnect: true,
            retry: 1,
          },
        },
      })
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider>{children}</ColorModeProvider>
        </ChakraProvider>
        {process.env.NODE_ENV !== "production" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </RecoilRoot>
  );
}
