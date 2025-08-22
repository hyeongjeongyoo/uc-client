"use client";

import { Box } from "@chakra-ui/react";
import { Header } from "./Header/Header";
import Footer from "@/components/main/component/Footer";
import { usePathname } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { menuApi, menuKeys, sortMenus } from "@/lib/api/menu";
// import { MenuApiResponse } from "@/types/api-response";
import type { Menu } from "@/types/api";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const currentPage = pathname || "/";

  // 메뉴 데이터 가져오기
  // 백엔드 메뉴 로딩 일시 중단: 주석 처리
  // const { data: menuResponse } = useQuery<MenuApiResponse>({
  //   queryKey: menuKeys.lists(),
  //   queryFn: async () => {
  //     const response = await menuApi.getPublicMenus();
  //     return response.data;
  //   },
  //   retry: 1,
  // });
  // const sortedMenus = sortMenus(menuResponse?.data || []);

  // 하드코딩 메뉴 (임시)
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
          url: "/counsel/disabled",
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

  const sortedMenus = hardcodedMenus;

  const hideChrome = pathname?.startsWith("/therapy/assessment");

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {!hideChrome && <Header currentPage={currentPage} menus={sortedMenus} />}
      <Box flex="1">{children}</Box>
      {!hideChrome && pathname !== "/" && <Footer />}
    </Box>
  );
};

export default Layout;
