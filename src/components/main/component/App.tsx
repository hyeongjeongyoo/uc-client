"use client";

import { Box } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PopupManager } from "@/components/common/PopupManager";
import MainSection from "./MainSection";
import { Header } from "@/components/layout/view/Header/Header";
import type { Menu } from "@/types/api";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  // 백단 메뉴 호출 비활성화: 하드코딩된 메뉴 사용
  const hardcodedMenus: Menu[] = [
    {
      id: 3,
      name: "센터 소개",
      type: "LINK",
      url: "/uc/center",
      displayPosition: "HEADER",
      visible: true,
      sortOrder: 1,
      parentId: null,
      children: [
        {
          id: 31,
          name: "센터소개",
          type: "LINK",
          url: "/uc/center",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 1,
          parentId: 3,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 32,
          name: "찾아오시는 길",
          type: "LINK",
          url: "/uc/location",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 2,
          parentId: 3,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 33,
          name: "위기 상황별 대응 및 연계기관 안내",
          type: "LINK",
          url: "/uc/info",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 3,
          parentId: 3,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 1,
      name: "개인상담",
      type: "LINK",
      url: "/counsel/individual",
      displayPosition: "HEADER",
      visible: true,
      sortOrder: 2,
      parentId: null,
      children: [
        {
          id: 11,
          name: "개인상담 안내",
          type: "LINK",
          url: "/counsel/individual",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 1,
          parentId: 1,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 12,
          name: "집단상담 안내",
          type: "LINK",
          url: "/counsel/group",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 2,
          parentId: 1,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 13,
          name: "장애학생심리지원상담 안내",
          type: "LINK",
          url: "/counsel/disability",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 3,
          parentId: 1,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 2,
      name: "심리검사",
      type: "LINK",
      url: "/therapy/therapy",
      displayPosition: "HEADER",
      visible: true,
      sortOrder: 3,
      parentId: null,
      children: [
        {
          id: 21,
          name: "자가진단",
          type: "LINK",
          url: "/therapy/therapy",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 1,
          parentId: 2,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 22,
          name: "심리검사 안내",
          type: "LINK",
          url: "/therapy/counseling",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 2,
          parentId: 2,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 5,
      name: "성고충상담",
      type: "LINK",
      url: "/sexualcounseling/sexualcounseling",
      displayPosition: "HEADER",
      visible: true,
      sortOrder: 4,
      parentId: null,
      children: [
        {
          id: 51,
          name: "성고충상담 안내",
          type: "LINK",
          url: "/sexualcounseling/sexualcounseling",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 1,
          parentId: 5,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
    {
      id: 4,
      name: "공지/소식",
      type: "BOARD",
      url: "/bbs/notices",
      displayPosition: "HEADER",
      visible: true,
      sortOrder: 5,
      parentId: null,
      children: [
        {
          id: 41,
          name: "공지사항",
          type: "LINK",
          url: "/bbs/notices",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 1,
          parentId: 4,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 42,
          name: "상담센터 이야기",
          type: "LINK",
          url: "/bbs/resources",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 2,
          parentId: 4,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
        {
          id: 43,
          name: "마음건강 가이드",
          type: "LINK",
          url: "/bbs/gallery",
          displayPosition: "HEADER",
          visible: true,
          sortOrder: 3,
          parentId: 4,
          children: [],
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
  ];

  return (
    <Box className="app">
      <Header currentPage="메인" menus={hardcodedMenus} isPreview={false} />
      <PopupManager />
      <Global
        styles={{
          "@font-face": {
            fontFamily: "Tenada",
            src: "url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Tenada.woff2') format('woff2')",
            fontWeight: "normal",
            fontStyle: "normal",
          },
        }}
      />
      <MainSection />
    </Box>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
