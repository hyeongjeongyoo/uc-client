import { Suspense } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import Layout from "@/components/layout/view/Layout";

export default async function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 백단 메뉴 호출 비활성화: 하드코딩된 메뉴를 사용하는 Layout 내부 로직을 활용합니다.

  return (
    <Box>
      <Suspense
        fallback={
          <Center h="100vh">
            <Spinner size="xl" />
          </Center>
        }
      >
        <Layout>{children}</Layout>
      </Suspense>
      {/* <FloatingButtons /> */}
    </Box>
  );
}
