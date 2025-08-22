"use client";

import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  HStack,
  Badge,
  Icon,
  Stack,
  Link as ChakraLink,
  Spinner,
  Tabs,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { useColors } from "@/styles/theme";
import {
  BoardMaster,
  Menu,
  BoardArticleCommon,
  BoardCategory,
} from "@/types/api";
import { AgGridReact } from "ag-grid-react";
import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  type ColDef,
  ModuleRegistry,
  AllCommunityModule,
  type ICellRendererParams,
  type ValueFormatterParams,
  type RowClickedEvent,
  type CellStyle,
} from "ag-grid-community";
import {
  LuSearch,
  LuEye,
  LuList,
  LuGrip,
  LuRefreshCw,
  LuExternalLink,
} from "react-icons/lu";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/styles/ag-grid-custom.css";
import Layout from "@/components/layout/view/Layout";
import { menuKeys, menuApi, sortMenus } from "@/lib/api/menu";
import { useQuery } from "@tanstack/react-query";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { HERO_DATA } from "@/lib/constants/heroSectionData";
import ContentsHeading from "@/components/layout/ContentsHeading";
import { articleApi, type ArticleListResponse } from "@/lib/api/article";
import React from "react";
import { ArticleDetailDrawer } from "./ArticleDetailDrawer";
import { ArticleWriteDrawer } from "./ArticleWriteDrawer";
import { useRecoilValue } from "recoil";
import { authState } from "@/stores/auth";
import { LucideEdit } from "lucide-react";
import CustomPagination from "@/components/common/CustomPagination";
import { toaster } from "@/components/ui/toaster";
import dayjs from "dayjs";
import PostTitleDisplay from "@/components/common/PostTitleDisplay";
import { getBbsComments } from "@/lib/api/bbs-comment";
import GenericArticleCard from "@/components/common/cards/GenericArticleCard";
import { mapArticleToCommonCardData } from "@/lib/card-utils";
import { boardApi } from "@/lib/api/board";

type ArticleWithAnswer = BoardArticleCommon & {
  answerContent?: string;
};

ModuleRegistry.registerModules([AllCommunityModule]);

const NoticeNumberRenderer = (
  params: ICellRendererParams<ArticleWithAnswer>
) => {
  const { data } = params;

  // "공지" 카테고리인지 확인
  const isNoticeCategory =
    data?.categories &&
    data.categories.some((cat) => cat.name === "공지" || cat.code === "NOTICE");

  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      {(data && data.no === 0) || isNoticeCategory ? (
        <Badge
          bg={isNoticeCategory ? "#267987" : "orange.500"}
          color="white"
          variant="solid"
          fontSize="12px"
          px={3}
          py={1}
        >
          공지
        </Badge>
      ) : (
        <span>{params.value}</span>
      )}
    </Flex>
  );
};

const ViewsRenderer = (params: ICellRendererParams<ArticleWithAnswer>) => (
  <span
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LuEye style={{ marginRight: "4px" }} />
    {params.value}
  </span>
);

const dateFormatter = (params: ValueFormatterParams<BoardArticleCommon>) => {
  if (!params.value) return "";
  return dayjs(params.value).format("YYYY.MM.DD");
};

const PressTitleRenderer_Preview: React.FC<
  ICellRendererParams<ArticleWithAnswer>
> = (params) => {
  const { data: post } = params;
  const { colorMode } = useColorMode();
  const colors = useColors();
  if (!post) return null;

  let externalLinkHref: string | undefined = undefined;
  if (post.externalLink) {
    const trimmedExternalLink = post.externalLink.trim();
    if (
      trimmedExternalLink.startsWith("http://") ||
      trimmedExternalLink.startsWith("https://")
    ) {
      externalLinkHref = trimmedExternalLink;
    } else if (trimmedExternalLink) {
      externalLinkHref = `http://${trimmedExternalLink}`;
    }
  }

  // "공지" 카테고리인지 확인
  const isNoticeCategory =
    post.categories &&
    post.categories.some((cat) => cat.name === "공지" || cat.code === "NOTICE");

  const titleColor = isNoticeCategory
    ? "#267987" // 공지 카테고리는 파란색
    : colorMode === "dark"
    ? colors.text?.primary || "#E2E8F0"
    : colors.text?.primary || "#2D3748";
  const titleHoverColor = colorMode === "dark" ? "#75E6DA" : "blue.500";
  const iconColor =
    colorMode === "dark"
      ? colors.text?.secondary || "gray.500"
      : colors.text?.secondary || "gray.600";

  return (
    <HStack
      gap={1}
      alignItems="center"
      justifyContent="flex-start"
      w="100%"
      h="100%"
      overflow="hidden"
      title={post.title}
    >
      <Box
        flex={1}
        minW={0}
        display="flex"
        alignItems="center"
        color={titleColor}
        fontWeight={isNoticeCategory ? "600" : "normal"} // 공지 카테고리는 굵게
        _hover={{
          textDecoration: "underline",
          color: titleHoverColor,
        }}
      >
        <HStack gap={0.5} alignItems="center" w="100%">
          <PostTitleDisplay title={post.title} postData={post} />
          {externalLinkHref && (
            <ChakraLink
              href={externalLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-flex"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open external link: ${externalLinkHref}`}
            >
              <Icon
                as={LuExternalLink}
                color={iconColor}
                _hover={{ color: titleHoverColor }}
                cursor="pointer"
                boxSize={4}
                flexShrink={0}
              />
            </ChakraLink>
          )}
        </HStack>
      </Box>
    </HStack>
  );
};

const pressDateFormatter = (
  params: ValueFormatterParams<BoardArticleCommon, string>
) => {
  if (!params.value) return "";
  return dayjs(params.value).format("YYYY.MM.DD");
};

const StatusRenderer = (params: ICellRendererParams<ArticleWithAnswer>) => {
  const hasAnswer =
    params.data?.answerContent && params.data.answerContent.trim() !== "";
  const badgeColor = hasAnswer ? "pink" : "gray";
  const statusText = hasAnswer ? "답변완료" : "답변대기";

  return (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Badge colorPalette={badgeColor} variant="subtle" px={2} py={1}>
        {statusText}
      </Badge>
    </Flex>
  );
};

export interface BoardPreviewProps {
  menu: Menu | null;
  board: BoardMaster | null;
  menus?: Menu[];
  onAddArticleClick?: () => void;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode: string | null;
  stackTrace: string | null;
}

const BoardPreview = React.memo(function BoardPreview({
  menu,
  board,
  onAddArticleClick,
}: BoardPreviewProps) {
  const gridRef = useRef<AgGridReact<ArticleWithAnswer>>(null);
  const { colorMode } = useColorMode();
  const colors = useColors();
  const [searchInputText, setSearchInputText] = useState("");
  const [activeFilterKeyword, setActiveFilterKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [refreshKey, setRefreshKey] = useState(0);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [selectedArticleForDetail, setSelectedArticleForDetail] =
    useState<ArticleWithAnswer | null>(null);
  const { user, isAuthenticated } = useRecoilValue(authState);
  const [previousArticleInDrawer, setPreviousArticleInDrawer] =
    useState<ArticleWithAnswer | null>(null);
  const [nextArticleInDrawer, setNextArticleInDrawer] =
    useState<ArticleWithAnswer | null>(null);
  const [isWriteDrawerOpen, setIsWriteDrawerOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<ArticleWithAnswer | null>(
    null
  );
  const [categories, setCategories] = useState<BoardCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const handleRefresh = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  const initialViewMode = useMemo(() => {
    const initialSkinType = board?.skinType;
    return initialSkinType === "BASIC" || initialSkinType === "PRESS"
      ? "card"
      : "list";
  }, [board?.skinType]);
  const [viewMode, setViewMode] = useState<"list" | "card">(initialViewMode);

  const { data: menuResponse, isLoading: isMenusLoading } = useQuery<Menu[]>({
    queryKey: menuKeys.list(""),
    queryFn: async () => {
      const response = await menuApi.getMenus();
      return response.data.data;
    },
  });

  const menus = useMemo(() => {
    try {
      const responseData = menuResponse;
      if (!responseData) return [];
      if (Array.isArray(responseData)) return sortMenus(responseData);
      const menuData = responseData;
      if (!menuData) return [];
      return Array.isArray(menuData) ? sortMenus(menuData) : [menuData];
    } catch (error) {
      console.error("Error processing menu data:", error);
      return [];
    }
  }, [menuResponse]);

  const menuId = menu?.id;
  const bbsId = board?.bbsId;

  useEffect(() => {
    const fetchCategories = async () => {
      if (board?.bbsName === "공지사항" && bbsId) {
        try {
          const response = await boardApi.getBoardCategories(bbsId);
          if (response.success && response.data) {
            setCategories(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      } else {
        setCategories([]);
      }
    };
    fetchCategories();
  }, [board?.bbsName, bbsId]);

  const handleTabChange = (details: { value: string | number }) => {
    if (details.value === "all") {
      setSelectedCategoryId(null);
    } else {
      setSelectedCategoryId(Number(details.value));
    }
    setCurrentPage(0);
  };

  const handleSearch = useCallback(() => {
    setActiveFilterKeyword(searchInputText);
    setCurrentPage(0);
  }, [searchInputText]);

  const {
    data: articlesApiResponse,
    isLoading: isArticlesLoading,
    isFetching: isArticlesFetching,
  } = useQuery<ApiResponse<ArticleListResponse>>({
    queryKey: [
      "articles",
      bbsId,
      menuId,
      currentPage,
      pageSize,
      activeFilterKeyword,
      refreshKey,
      selectedCategoryId,
    ],
    queryFn: async (): Promise<ApiResponse<ArticleListResponse>> => {
      if (!bbsId || !menuId) {
        return {
          success: true,
          message: "",
          data: { content: [], totalElements: 0, totalPages: 0 } as any,
          errorCode: null,
          stackTrace: null,
        };
      }
      const response = await articleApi.getArticles({
        bbsId,
        menuId,
        page: currentPage,
        size: pageSize,
        keyword: activeFilterKeyword,
        categoryId: selectedCategoryId ?? undefined,
      });
      return response.data; // .data를 추출하여 반환
    },
    enabled: !!bbsId && !!menuId,
  });

  const baseArticles = useMemo(
    () => articlesApiResponse?.data?.content || [],
    [articlesApiResponse]
  );

  const {
    data: articlesWithComments,
    isLoading: isCommentsLoading,
    isFetching: isCommentsFetching,
  } = useQuery<ArticleWithAnswer[]>({
    queryKey: [
      "articlesWithComments",
      baseArticles.map((a) => a.nttId),
      refreshKey,
    ],
    queryFn: async () => {
      if (menu?.url !== "/bbs/voice" || baseArticles.length === 0) {
        return baseArticles;
      }
      return Promise.all(
        baseArticles.map(async (article) => {
          try {
            const comments = await getBbsComments(article.nttId);
            return {
              ...article,
              answerContent: comments.length > 0 ? comments[0].content : "",
            };
          } catch (error) {
            console.error(
              `Error fetching comments for article ${article.nttId}:`,
              error
            );
            return { ...article, answerContent: "" };
          }
        })
      );
    },
    enabled: baseArticles.length > 0,
  });

  // PageHeroBanner를 사용하므로 heroData 불필요

  useEffect(() => {
    const currentArticles = articlesWithComments || [];
    if (selectedArticleForDetail && currentArticles.length > 0) {
      const currentIndex = currentArticles.findIndex(
        (article) => article.nttId === selectedArticleForDetail.nttId
      );
      if (currentIndex !== -1) {
        setPreviousArticleInDrawer(
          currentIndex > 0 ? currentArticles[currentIndex - 1] : null
        );
        setNextArticleInDrawer(
          currentIndex < currentArticles.length - 1
            ? currentArticles[currentIndex + 1]
            : null
        );
      }
    } else {
      setPreviousArticleInDrawer(null);
      setNextArticleInDrawer(null);
    }
  }, [selectedArticleForDetail, articlesWithComments]);

  useEffect(() => {
    const skinType = board?.skinType;
    setViewMode("list"); // 항상 리스트형으로 초기 로딩
  }, [board?.skinType]);

  const agGridContext = useMemo(
    () => ({
      menuUrl: menu?.url || "",
      pagination: {
        totalElements: articlesApiResponse?.data?.totalElements || 0,
        currentPage: currentPage,
        pageSize: pageSize,
      },
    }),
    [articlesApiResponse, currentPage, pageSize, menu?.url]
  );

  const bg = colorMode === "dark" ? "#1A202C" : "white";
  const textColor = colorMode === "dark" ? "#E2E8F0" : "#2D3748";
  const borderColor = colorMode === "dark" ? "#2D3748" : "#E2E8F0";
  const primaryColor = colors.primary?.default || "red";
  const agGridTheme =
    colorMode === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz";

  const colDefs = useMemo<ColDef<ArticleWithAnswer>[]>(() => {
    // BasicBoardSkin 스타일과 동일하게 설정
    const baseCellTextStyle: CellStyle = {
      fontWeight: "normal",
      color: textColor,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      display: "flex",
      alignItems: "center",
      height: "100%",
      padding: "16px 8px",
    };
    const centeredCellTextStyle: CellStyle = {
      ...baseCellTextStyle,
      justifyContent: "center",
    };
    const numberCellStyle: CellStyle = {
      ...centeredCellTextStyle,
      color: "#666", // BasicBoardSkin의 번호 컬럼 색상
    };

    if (board?.skinType === "PRESS") {
      return [
        {
          headerName: "번호",
          field: "no",
          width: 80,

          cellRenderer: NoticeNumberRenderer,
          cellStyle: numberCellStyle,
        },
        {
          headerName: "제목",
          field: "title",
          flex: 1,

          cellRenderer: PressTitleRenderer_Preview,
          cellStyle: {
            ...baseCellTextStyle,
            paddingLeft: "16px", // BasicBoardSkin px={4}와 동일
            paddingRight: "16px", // BasicBoardSkin px={4}와 동일
          },
          minWidth: 300,
        },
        {
          headerName: "작성자",
          field: "displayWriter",
          width: 120,

          cellStyle: centeredCellTextStyle,
          valueGetter: (params) => {
            return params.data?.displayWriter || params.data?.writer;
          },
        },
        {
          headerName: "등록일",
          field: "postedAt",
          width: 120,
          valueFormatter: pressDateFormatter,

          cellStyle: centeredCellTextStyle,
        },
      ];
    }
    const skin = board?.skinType;
    if (skin === "QNA") {
      const qnaCols: ColDef<ArticleWithAnswer>[] = [
        {
          headerName: "번호",
          field: "no",
          width: 80,

          cellRenderer: NoticeNumberRenderer,
          cellStyle: numberCellStyle,
        },
        {
          headerName: "상태",
          field: "answerContent",
          width: 100,

          cellRenderer: StatusRenderer,
          cellStyle: centeredCellTextStyle,
        },
        {
          headerName: "제목",
          field: "title",
          flex: 1,
          cellRenderer: PressTitleRenderer_Preview,
          minWidth: 300,
          cellStyle: {
            ...baseCellTextStyle,
            paddingLeft: "16px", // BasicBoardSkin px={4}와 동일
            paddingRight: "16px", // BasicBoardSkin px={4}와 동일
          },
        },
        {
          headerName: "작성자",
          field: "displayWriter",
          width: 120,
          cellStyle: centeredCellTextStyle,
          valueGetter: (params) => {
            return params.data?.displayWriter || params.data?.writer;
          },
        },
        {
          headerName: "등록일",
          field: "postedAt",
          width: 120,
          valueFormatter: dateFormatter,
          cellStyle: centeredCellTextStyle,
        },
      ];
      return qnaCols;
    }

    const baseColDefs: ColDef<ArticleWithAnswer>[] = [
      {
        headerName: "번호",
        field: "no",
        width: 80,
        sortable: true,
        cellRenderer: NoticeNumberRenderer,
        cellStyle: numberCellStyle,
      },
      {
        headerName: "제목",
        field: "title",
        flex: 1,
        sortable: true,
        cellRenderer: PressTitleRenderer_Preview,
        cellStyle: {
          ...baseCellTextStyle,
          paddingLeft: "10px",
          paddingRight: "10px",
          justifyContent: "flex-start",
        },
        minWidth: 300,
      },
      {
        headerName: "작성자",
        field: "displayWriter",
        width: 120,
        sortable: true,
        cellStyle: centeredCellTextStyle,
        valueGetter: (params) => {
          return params.data?.displayWriter || params.data?.writer;
        },
      },
      {
        headerName: "등록일",
        field: "postedAt",
        width: 120,
        valueFormatter: pressDateFormatter,
        sortable: true,
        cellStyle: centeredCellTextStyle,
      },
    ];

    if (board?.skinType === "QNA" || board?.skinType === "FORM") {
      return [
        {
          headerName: "번호",
          field: "no",
          width: 80,
          valueGetter: (params) => {
            if (params.data?.no === 0) {
              return "공지";
            }
            const totalElements = articlesApiResponse?.data?.totalElements || 0;
            const roxIndex = params.node?.rowIndex;
            if (typeof roxIndex !== "number") {
              return "";
            }
            return totalElements - currentPage * pageSize - roxIndex;
          },
        },
        {
          headerName: "제목",
          field: "title",
          flex: 1,

          cellRenderer: PressTitleRenderer_Preview,
          cellStyle: {
            ...baseCellTextStyle,
            paddingLeft: "10px", // BasicBoardSkin px={4}와 동일
            paddingRight: "10px", // BasicBoardSkin px={4}와 동일
          },
          minWidth: 300,
        },
        {
          headerName: "작성자",
          field: "displayWriter",
          width: 120,
          cellStyle: numberCellStyle,
          valueGetter: (params) => {
            return params.data?.displayWriter || params.data?.writer;
          },
        },
        {
          headerName: "등록일",
          field: "postedAt",
          width: 120,
          valueFormatter: pressDateFormatter,

          cellStyle: numberCellStyle,
        },
      ];
    }
    return baseColDefs;
  }, [
    board?.skinType,
    colors.text,
    textColor,
    articlesApiResponse,
    currentPage,
    pageSize,
  ]);

  const defaultColDef = useMemo(
    () => ({
      filter: false, // 필터 비활성화
      resizable: false, // 크기 조절 비활성화
      sortable: false, // 정렬 비활성화
      cellStyle: {
        fontSize: "14px", // 이미지와 동일한 폰트 크기
        lineHeight: "1.5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // 가운데 정렬
        padding: "16px", // 이미지와 동일한 적당한 패딩
        color: "#333", // 이미지와 동일한 진한 회색 텍스트
      },
    }),
    []
  );

  const handleRowClick = useCallback(
    (event: RowClickedEvent | { data: ArticleWithAnswer }) => {
      setSelectedArticleForDetail(event.data);
      setDetailDrawerOpen(true);
    },
    []
  );

  const handleDetailDrawerClose = useCallback(
    (open: boolean) => {
      setDetailDrawerOpen(open);
      if (!open) {
        handleRefresh();
      }
    },
    [handleRefresh]
  );

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(0);
  }, []);

  const handleWriteNewInPreview = useCallback(
    (currentBbsId?: number, currentMenuId?: number) => {
      const targetBbsId = currentBbsId ?? bbsId;
      const targetMenuId = currentMenuId ?? menuId;

      if (typeof targetBbsId !== "number" || typeof targetMenuId !== "number") {
        toaster.error({
          title: "오류",
          description:
            "게시판 정보를 확인할 수 없어 글쓰기를 시작할 수 없습니다.",
        });
        return;
      }
      setArticleToEdit(null);
      setIsWriteDrawerOpen(true);
      setDetailDrawerOpen(false);
    },
    [bbsId, menuId]
  );

  const handleEditArticleInPreview = useCallback(
    (article: ArticleWithAnswer) => {
      setArticleToEdit(article);
      setIsWriteDrawerOpen(true);
      setDetailDrawerOpen(false);
    },
    []
  );

  const handleDeleteArticleInPreview = useCallback(
    async (articleToDelete: ArticleWithAnswer) => {
      if (!articleToDelete || typeof articleToDelete.nttId !== "number") {
        toaster.error({
          title: "오류",
          description: "삭제할 게시글 정보가 올바르지 않습니다.",
        });
        return;
      }
      try {
        await articleApi.deleteArticle(articleToDelete.nttId);
        toaster.success({
          title: "삭제 완료",
          description: `'${articleToDelete.title}' 게시글이 삭제되었습니다.`,
        });
        setDetailDrawerOpen(false);
        setSelectedArticleForDetail(null);
        handleRefresh();
      } catch (error) {
        console.error("Error deleting article:", error);
        toaster.error({
          title: "삭제 실패",
          description: "게시글 삭제 중 오류가 발생했습니다.",
        });
      }
    },
    [handleRefresh]
  );

  const isLoadingCombined =
    isMenusLoading ||
    isArticlesLoading ||
    isArticlesFetching ||
    isCommentsLoading ||
    isCommentsFetching;

  const currentSkinType = board?.skinType;
  const articlesData = articlesApiResponse?.data;

  // "공지" 카테고리 글을 최상단으로 정렬 (/bbs/notices와 동일한 로직)
  const finalArticles = useMemo(() => {
    const articles = articlesWithComments || [];
    if (!articles.length) return articles;

    // "공지" 카테고리인지 확인하는 함수
    const isNoticeCategory = (article: ArticleWithAnswer) => {
      return (
        article.categories &&
        article.categories.some(
          (cat) => cat.name === "공지" || cat.code === "NOTICE"
        )
      );
    };

    // 정렬: 공지 카테고리 → 일반 공지사항 → 일반 글
    return [...articles].sort((a, b) => {
      const aIsNoticeCategory = isNoticeCategory(a);
      const bIsNoticeCategory = isNoticeCategory(b);
      const aIsNoticeState = a.noticeState === "Y";
      const bIsNoticeState = b.noticeState === "Y";

      // 1순위: "공지" 카테고리
      if (aIsNoticeCategory && !bIsNoticeCategory) return -1;
      if (!aIsNoticeCategory && bIsNoticeCategory) return 1;

      // 2순위: 일반 공지사항 (noticeState === "Y")
      if (aIsNoticeState && !bIsNoticeState) return -1;
      if (!aIsNoticeState && bIsNoticeState) return 1;

      // 3순위: 원래 순서 유지 (최신순)
      return 0;
    });
  }, [articlesWithComments]);

  if (!menu) {
    return (
      <Box p={4} textAlign="center">
        <Text color={colors.text?.secondary || textColor}>
          게시판을 선택하세요
        </Text>
      </Box>
    );
  }

  const tabStyles = {
    fontWeight: "normal",
    color: "gray.500",
    _selected: {
      color: "blue.600",
      fontWeight: "bold",
      _before: { display: "none" },
      _after: { display: "none" },
    },
    _focus: {
      boxShadow: "none",
      borderBottom: "none",
    },
    _hover: {
      color: "blue.500",
    },
  };

  return (
    <Layout>
      <Box
        css={{
          "& > div:first-of-type": {
            marginTop: "0 !important",
          },
        }}
      >
        <PageHeroBanner
          autoMode={false}
          height="500px"
          animationType="zoom-in"
          title={(() => {
            const heroData = HERO_DATA[menu?.url || ""];
            return heroData?.title || "게시판";
          })()}
          subtitle={(() => {
            const heroData = HERO_DATA[menu?.url || ""];
            return heroData?.subtitle || "게시판입니다";
          })()}
          backgroundImage={(() => {
            const heroData = HERO_DATA[menu?.url || ""];
            return heroData?.backgroundImage || "/images/sub/bbs_bg.jpg";
          })()}
          customMenuItems={(() => {
            const heroData = HERO_DATA[menu?.url || ""];
            return (
              heroData?.menuItems?.map((item) => ({
                name: item.name,
                href: item.href,
              })) || []
            );
          })()}
        />
      </Box>
      <Box px={8} py={8} minH="800px">
        {/* 콘텐츠 영역 - HeroSection과 별도 영역 */}
        <Box mb={{ base: "30px", lg: "50px" }}>
          <ContentsHeading
            title={(() => {
              const pathParts = (menu?.url ?? "").split("/");
              const boardId =
                pathParts[pathParts.length - 1] ||
                pathParts[pathParts.length - 2];

              switch (boardId) {
                case "notices":
                  return "공지사항";
                case "resources":
                  return "뉴스 / 보도자료";
                case "ir":
                  return "IR";
                default:
                  return "게시판";
              }
            })()}
          />
        </Box>
        {categories.length > 0 &&
          (() => {
            // 게시판 ID 추출
            const pathParts = (menu?.url ?? "").split("/");
            const boardId =
              pathParts[pathParts.length - 1] ||
              pathParts[pathParts.length - 2];

            // 공지사항과 IR 게시판에서는 카테고리 탭 숨김
            return boardId !== "notices" && boardId !== "ir";
          })() && (
            <Tabs.Root
              defaultValue="all"
              onValueChange={handleTabChange}
              mb={8}
            >
              <Tabs.List
                justifyContent="center"
                gap={2}
                borderBottom="none"
                alignItems="center"
              >
                <Tabs.Trigger value="all" {...tabStyles}>
                  전체
                </Tabs.Trigger>
                {categories.map((cat) => (
                  <React.Fragment key={cat.categoryId}>
                    <Text as="span" color="gray.300" userSelect="none">
                      |
                    </Text>
                    <Tabs.Trigger value={String(cat.categoryId)} {...tabStyles}>
                      {cat.name}
                    </Tabs.Trigger>
                  </React.Fragment>
                ))}
              </Tabs.List>
            </Tabs.Root>
          )}
        <Flex
          direction={{ base: "column", md: "row" }}
          flexWrap="wrap"
          gap={2}
          mb={2}
        >
          <Box
            flex={{ base: "unset", md: "1 1 0%" }}
            mb={{ base: 2, md: 0 }}
            width={{ base: "100%", md: "50%" }}
          >
            <HStack gap={1}>
              <Text fontSize="sm" color="#267987" whiteSpace="nowrap" mr={2}>
                총 {articlesData?.totalElements ?? 0}건
              </Text>
              <Input
                placeholder="검색어를 입력해주세요"
                size="sm"
                bg={bg}
                color={textColor}
                border={`1px solid ${borderColor}`}
                width="100%"
                value={searchInputText}
                onChange={(e) => setSearchInputText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button
                size="sm"
                bg={borderColor}
                color={textColor}
                minWidth="32px"
                px={2}
                onClick={handleSearch}
              >
                <LuSearch />
              </Button>
            </HStack>
          </Box>
          <Box
            flex={{ base: "unset", md: "1 1 0%" }}
            width={{ base: "100%", md: "50%" }}
          >
            <HStack justify="flex-end" gap={1}>
              <Button
                size="sm"
                bg={borderColor}
                color={textColor}
                minWidth="32px"
                px={2}
                onClick={handleRefresh}
                disabled={isLoadingCombined}
                aria-label="Refresh article list"
              >
                {isLoadingCombined ? <Spinner size="sm" /> : <LuRefreshCw />}
              </Button>
              <Button
                size="sm"
                bg={borderColor}
                color={textColor}
                minWidth="32px"
                px={2}
                onClick={onAddArticleClick}
                disabled={!onAddArticleClick}
              >
                글쓰기
                <LucideEdit />
              </Button>
              {(() => {
                // 게시판 ID 추출
                const pathParts = (menu?.url ?? "").split("/");
                const boardId =
                  pathParts[pathParts.length - 1] ||
                  pathParts[pathParts.length - 2];

                // 뉴스/보도자료 게시판에서만 view mode toggle 버튼 표시
                return (
                  boardId === "resources" &&
                  (currentSkinType === "BASIC" ||
                    currentSkinType === "FORM" ||
                    currentSkinType === "PRESS")
                );
              })() && (
                <>
                  <Button
                    size="sm"
                    bg={viewMode === "list" ? primaryColor : borderColor}
                    color={viewMode === "list" ? "white" : textColor}
                    minWidth="32px"
                    px={2}
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                  >
                    <LuList />
                  </Button>
                  <Button
                    size="sm"
                    bg={viewMode === "card" ? primaryColor : borderColor}
                    color={viewMode === "card" ? "white" : textColor}
                    minWidth="32px"
                    px={2}
                    onClick={() => setViewMode("card")}
                    aria-label="Card view"
                  >
                    <LuGrip />
                  </Button>
                </>
              )}
            </HStack>
          </Box>
        </Flex>
        {viewMode === "list" && (
          <Box
            className={agGridTheme}
            style={{
              width: "100%",
              background: "white", // 이미지와 동일한 깔끔한 흰색 배경
            }}
            css={{
              // 이미지와 동일한 깔끔한 테이블 스타일
              "& .ag-header": {
                borderTop: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
              },
              "& .ag-header-row": {
                fontSize: "15px",
                fontWeight: "600",
                backgroundColor: "white",
                borderBottom: "2px solid #333 !important", // 헤더 아래 굵은 검은색 선
                borderTop: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
              },
              "& .ag-header-cell": {
                padding: "16px", // 적당한 패딩
                fontSize: "15px",
                fontWeight: "600",
                backgroundColor: "white",
                justifyContent: "center !important",
                alignItems: "center !important",
                display: "flex !important",
                border: "none !important",
                borderTop: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
              },
              // 정렬 아이콘 숨기기
              "& .ag-header-cell .ag-icon": {
                display: "none !important",
              },
              "& .ag-sort-indicator-container": {
                display: "none !important",
              },
              // 전체 그리드 테두리 제거
              "& .ag-root-wrapper": {
                border: "none !important",
              },
              "& .ag-root": {
                backgroundColor: "white !important",
                border: "none !important",
              },
              // 행 스타일 (이미지와 동일)
              "& .ag-row": {
                backgroundColor: "white !important",
                borderBottom: "1px solid #E5E5E5 !important", // 얇은 회색 선
                borderTop: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
                transition: "all 0.2s ease !important",
              },
              "& .ag-row:hover": {
                backgroundColor: "#F8F9FA !important", // 연한 회색 호버
                cursor: "pointer !important",
              },
              // 셀 스타일 (이미지와 동일)
              "& .ag-cell": {
                border: "none !important",
                borderTop: "none !important",
                borderLeft: "none !important",
                borderRight: "none !important",
                justifyContent: "center !important",
                alignItems: "center !important",
                display: "flex !important",
                padding: "16px !important", // 적당한 패딩
                fontSize: "14px !important", // 약간 작은 폰트
                color: "#333 !important", // 진한 회색 텍스트
              },
              // AG Grid 내부 컨텐츠 가운데 정렬
              "& .ag-cell-wrapper": {
                justifyContent: "center !important",
                width: "100% !important",
              },
              "& .ag-cell-value": {
                width: "100% !important",
              },
            }}
          >
            {isLoadingCombined && !(articlesWithComments || []).length ? (
              <Flex p={4} w="full" minH="400px" justify="center" align="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <AgGridReact<ArticleWithAnswer>
                ref={gridRef}
                rowData={finalArticles}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                domLayout="autoHeight"
                headerHeight={50} // 이미지와 동일한 깔끔한 높이
                rowHeight={50} // 이미지와 동일한 깔끔한 높이
                suppressCellFocus
                enableCellTextSelection={true}
                getRowStyle={(params) => ({
                  color: "#333", // 이미지와 동일한 진한 회색 텍스트
                  background: "white", // 이미지와 동일한 흰색 배경
                  display: "flex",
                  fontSize: "14px", // 이미지와 동일한 폰트 크기
                })}
                rowSelection="single"
                onRowClicked={handleRowClick}
                context={agGridContext}
              />
            )}
          </Box>
        )}
        {viewMode === "card" &&
          (currentSkinType === "BASIC" ||
            currentSkinType === "PRESS" ||
            currentSkinType === "FORM") && (
            <Stack direction="row" wrap="wrap" gap={4} mt={4}>
              {finalArticles.map((article) => {
                return (
                  <Box
                    key={article.nttId}
                    width={{
                      base: "100%",
                      sm: "calc(50% - 0.5rem)",
                      md: "calc(33.33% - 0.67rem)",
                      lg: "calc(25% - 0.75rem)",
                    }}
                    onClick={() =>
                      handleRowClick({
                        data: article,
                      } as RowClickedEvent<ArticleWithAnswer>)
                    }
                    cursor="pointer"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                    transition="all 0.2s"
                  >
                    <GenericArticleCard
                      cardData={mapArticleToCommonCardData(
                        article,
                        menu?.url || ""
                      )}
                      disableNavigation={true}
                    />
                  </Box>
                );
              })}
            </Stack>
          )}
        <CustomPagination
          currentPage={currentPage}
          totalPages={articlesData?.totalPages || 0}
          onPageChange={setCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </Box>
      <ArticleDetailDrawer
        open={detailDrawerOpen}
        onOpenChange={handleDetailDrawerClose}
        article={selectedArticleForDetail}
        isFaq={currentSkinType === "FAQ"}
        isQna={currentSkinType === "QNA"}
        previousArticle={previousArticleInDrawer}
        nextArticle={nextArticleInDrawer}
        onNavigateToPrevious={() => {
          if (previousArticleInDrawer) {
            setSelectedArticleForDetail(previousArticleInDrawer);
          }
        }}
        onNavigateToNext={() => {
          if (nextArticleInDrawer) {
            setSelectedArticleForDetail(nextArticleInDrawer);
          }
        }}
        onWriteNew={() =>
          handleWriteNewInPreview(
            selectedArticleForDetail?.bbsId,
            selectedArticleForDetail?.menuId
          )
        }
        onEditArticle={handleEditArticleInPreview}
        onDeleteArticle={handleDeleteArticleInPreview}
        canWrite={board?.writeAuth !== undefined}
        canEdit={
          !!(
            board?.writeAuth &&
            selectedArticleForDetail &&
            isAuthenticated &&
            (user?.username === selectedArticleForDetail.writer ||
              user?.role === "ADMIN")
          )
        }
        canDelete={
          !!(
            board?.writeAuth &&
            selectedArticleForDetail &&
            isAuthenticated &&
            (user?.username === selectedArticleForDetail.writer ||
              user?.role === "ADMIN")
          )
        }
      />
      {isWriteDrawerOpen && bbsId && menuId && (
        <ArticleWriteDrawer
          bbsId={articleToEdit ? articleToEdit.bbsId : bbsId}
          menuId={articleToEdit ? articleToEdit.menuId : menuId}
          initialData={articleToEdit ? articleToEdit : undefined}
          showCategory={menu?.url === "/bbs/notices"}
          onOpenChange={(openState) => {
            if (!openState) {
              setIsWriteDrawerOpen(false);
              setArticleToEdit(null);
              handleRefresh();
            }
          }}
        />
      )}
    </Layout>
  );
});

export { BoardPreview };
