"use client"; // 클라이언트 컴포넌트로 전환

import { useRouter, useSearchParams } from "next/navigation";
import { menuApi } from "@/lib/api/menu";
import { articleApi } from "@/lib/api/article";
import { PageDetailsDto } from "@/types/menu";
import { BoardArticleCommon, Post, FileDto, BoardMaster } from "@/types/api"; // FileDto 임포트 추가
import { PaginationData } from "@/types/common";
import { findMenuByPath } from "@/lib/menu-utils"; // Import findMenuByPath
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react"; // Chakra UI 컴포넌트 임포트
import React, { useState, useEffect, useCallback } from "react"; // React 훅 임포트
import NextLink from "next/link"; // NextLink import 경로 수정

// 스킨 컴포넌트 임포트
import BasicBoardSkin from "@/components/bbsSkins/BasicBoardSkin";
import FaqBoardSkin from "@/components/bbsSkins/FaqBoardSkin";
import QnaBoardSkin from "@/components/bbsSkins/QnaBoardSkin";
import PressBoardSkin from "@/components/bbsSkins/PressBoardSkin";
import FormBoardSkin from "@/components/bbsSkins/FormBoardSkin";
import BoardControls from "@/components/bbsCommon/BoardControls";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { getBbsComments } from "@/lib/api/bbs-comment";
import ContentsHeading from "@/components/layout/ContentsHeading";
import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";

interface BoardPageProps {
  params: Promise<{ id: string }>; // params is a Promise again
  // searchParams는 props로 받지 않고, useSearchParams() 훅을 사용하므로 제거 가능
}

interface BoardPageData {
  pageDetails: PageDetailsDto;
  posts: Post[]; // Skins expect Post[]
  pagination: PaginationData;
}

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SORT_ORDER = "createdAt,desc"; // Default sort for articles

// Helper to map Article to Post
function mapArticleToPost(article: BoardArticleCommon): Post {
  // Explicitly type attachments to satisfy Post.attachments?: FileDto[] | null
  const mappedAttachments: FileDto[] | null = article.attachments
    ? article.attachments.map((att): FileDto => {
        // Use the imported FileDto type for the return type of the map callback
        const savedNameDerived =
          att.downloadUrl.substring(att.downloadUrl.lastIndexOf("/") + 1) ||
          att.originName;
        return {
          // Fields from AttachmentInfoDto
          fileId: att.fileId,
          originName: att.originName,
          mimeType: att.mimeType,
          size: att.size,
          ext: att.ext,
          downloadUrl: att.downloadUrl, // downloadUrl 추가

          // Fields from File interface requiring mapping/defaults (이제 FileDto에 맞게 조정)
          // menu: "BBS", // FileDto에는 없음
          // menuId: article.menuId, // FileDto에는 없음
          // savedName: savedNameDerived, // FileDto에는 없음
          // version: 1, // FileDto에는 없음
          // publicYn: "Y", // FileDto에는 없음
          // fileOrder: 0, // FileDto에는 없음

          // Audit fields (FileDto에는 없음)
          // createdBy: null,
          // createdDate: null,
          // createdIp: null,
          // updatedBy: null,
          // updatedDate: null,
          // updatedIp: null,
        };
      })
    : null;

  return {
    no: article.no,
    nttId: article.nttId,
    bbsId: article.bbsId,
    parentNttId: article.parentNttId,
    threadDepth: article.threadDepth,
    writer: article.writer,
    title: article.title,
    content: article.content,
    hasImageInContent: article.hasImageInContent,
    hasAttachment: article.hasAttachment,
    noticeState: article.noticeState as "Y" | "N" | "P",
    noticeStartDt: article.noticeStartDt,
    noticeEndDt: article.noticeEndDt,
    publishState: article.publishState as "Y" | "N" | "P",
    publishStartDt: article.publishStartDt,
    publishEndDt: article.publishEndDt,
    externalLink: article.externalLink,
    hits: article.hits,
    displayWriter: article.displayWriter || "",
    postedAt: article.postedAt || "",
    createdAt: article.createdAt,
    updatedAt: article.updatedAt,
    thumbnailUrl: article.thumbnailUrl,
    status: article.status,
    attachments: mappedAttachments, // Use the correctly typed variable
    categories: article.categories || [],
    answerContent: article.answerContent,
    answerCreatedAt: (article as Post).answerCreatedAt,
    answerUpdatedAt: (article as Post).answerUpdatedAt,
    answerUserEmail: (article as Post).answerUserEmail,
    answerUserNickname: (article as Post).answerUserNickname,
  };
}

async function getBoardPageData(
  menuId: number,
  currentPage: number,
  requestedPageSize?: number,
  keyword?: string, // Add keyword parameter
  categoryId?: number
): Promise<BoardPageData | null> {
  const pageSizeToUse = requestedPageSize || DEFAULT_PAGE_SIZE;
  try {
    const pageDetails = await menuApi.getPageDetails(menuId);

    if (
      !pageDetails ||
      pageDetails.menuType !== "BOARD" ||
      typeof pageDetails.boardId !== "number" // Ensure boardId is a number
    ) {
      console.warn(
        `Invalid pageDetails or boardId for menuId ${menuId}:`,
        pageDetails
      );
      return null;
    }

    // Use articleApi.getArticles
    const response = await articleApi.getArticles({
      bbsId: pageDetails.boardId,
      menuId: menuId, // Pass menuId as well
      page: currentPage - 1, // API is 0-indexed
      size: pageSizeToUse,
      keyword: keyword, // Pass keyword
      sort: DEFAULT_SORT_ORDER, // Add sort order
      categoryId: categoryId,
    });

    const apiResponse = response.data; // .data를 추출

    if (!apiResponse.success || !apiResponse.data) {
      console.error(
        `Failed to fetch articles for menuId ${menuId}, bbsId ${pageDetails.boardId}:`,
        apiResponse.message || "No data in response"
      );
      return null;
    }

    const articlesData = apiResponse.data; // This is ArticleListResponse

    let articles = articlesData.content || [];

    // '고객의 소리' 게시판(QNA 스킨)인 경우에만 답변(댓글) 정보를 가져옵니다.
    if (pageDetails.boardSkinType === "QNA") {
      articles = await Promise.all(
        articles.map(async (article: BoardArticleCommon) => {
          try {
            const comments = await getBbsComments(article.nttId);
            return {
              ...article,
              answerContent: comments.length > 0 ? comments[0].content : "",
            };
          } catch (error) {
            return { ...article, answerContent: "" };
          }
        })
      );
    }

    // Map Article[] to Post[]
    const posts: Post[] = articles.map(mapArticleToPost);

    // Correctly access pageable properties and totalElements
    const { pageNumber, pageSize } = articlesData.pageable || {
      pageNumber: 0,
      pageSize: pageSizeToUse,
    };
    const totalElements = articlesData.totalElements || 0;

    const totalPages = Math.ceil(totalElements / pageSize) || 1;

    const pagination: PaginationData = {
      currentPage: pageNumber + 1, // UI is 1-indexed
      totalPages,
      pageSize,
      totalElements,
    };

    return { pageDetails, posts, pagination };
  } catch (error) {
    console.error(
      `Error fetching data for board page (menuId: ${menuId}, page: ${currentPage}, size: ${pageSizeToUse}, keyword: ${keyword}):`,
      error
    );
    return null;
  }
}

export default function BoardPage({
  params, // params is a Promise again
}: BoardPageProps) {
  const router = useRouter();
  const searchParamsHook = useSearchParams(); // hook 사용

  const [awaitedParams, setAwaitedParams] = useState<{ id: string } | null>(
    null
  );
  const [keywordInput, setKeywordInput] = useState("");
  const [currentMenuPath, setCurrentMenuPath] = useState<string | null>(null);
  const [boardData, setBoardData] = useState<BoardPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);

  // 컴포넌트 마운트 및 params 변경 시 awaitedParams 설정, currentMenuPath 설정 및 keyword 초기화
  useEffect(() => {
    async function resolveAndSetParams() {
      const resolvedParams = await params;
      setAwaitedParams(resolvedParams);
      if (resolvedParams && resolvedParams.id) {
        setCurrentMenuPath(`/bbs/${resolvedParams.id}`);
        // URL에서 keyword 가져와 검색창 초기화
        setKeywordInput(searchParamsHook.get("keyword") || "");
      }
    }
    resolveAndSetParams();
  }, [params, searchParamsHook]);

  // 검색 실행 함수
  const handleSearch = useCallback(() => {
    if (currentMenuPath) {
      const query = new URLSearchParams();
      query.set("page", "1");
      if (keywordInput.trim()) {
        query.set("keyword", keywordInput.trim());
      }
      const currentSize =
        searchParamsHook.get("size") || String(DEFAULT_PAGE_SIZE);
      query.set("size", currentSize);
      router.push(`${currentMenuPath}?${query.toString()}`);
    }
  }, [router, currentMenuPath, keywordInput, searchParamsHook]);

  // 검색 초기화 함수
  const handleClearSearch = useCallback(() => {
    if (currentMenuPath) {
      setKeywordInput("");
      const query = new URLSearchParams();
      query.set("page", "1");
      const currentSize =
        searchParamsHook.get("size") || String(DEFAULT_PAGE_SIZE);
      query.set("size", currentSize);
      router.push(`${currentMenuPath}?${query.toString()}`);
    }
  }, [router, currentMenuPath, searchParamsHook]);

  const currentPathId = awaitedParams?.id; // Use awaitedParams
  const currentPageFromUrl = parseInt(searchParamsHook.get("page") || "1", 10);
  const requestedPageSizeFromUrl = parseInt(
    searchParamsHook.get("size") || String(DEFAULT_PAGE_SIZE),
    10
  );
  const currentKeyword = searchParamsHook.get("keyword") || undefined;
  const categoryIdFromUrl = searchParamsHook.get("category");

  useEffect(() => {
    async function fetchData() {
      if (!awaitedParams || !currentPathId || !currentMenuPath) {
        // Check awaitedParams
        setBoardData(null);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      const menu = await findMenuByPath(currentMenuPath); // currentMenuPath is checked above
      if (!menu || !menu.id) {
        console.warn(`[BoardPage] Menu not found for path: ${currentMenuPath}`);
        setBoardData(null); // No menu found
        setIsLoading(false); // Stop loading
        return;
      }
      const menuIdToUse = menu.id;
      const categoryIdToFetch = categoryIdFromUrl
        ? Number(categoryIdFromUrl)
        : undefined;
      setIsLoading(true);
      setError(null);
      getBoardPageData(
        menuIdToUse,
        currentPageFromUrl,
        requestedPageSizeFromUrl,
        currentKeyword,
        categoryIdToFetch
      )
        .then((data) => {
          if (data) {
            setBoardData(data);
            const initialSkinType = data.pageDetails.boardSkinType;
            if (initialSkinType === "PRESS") {
              setViewMode("card");
            } else {
              setViewMode("list");
            }
          } else {
            setError(
              `게시판 정보를 가져오지 못했습니다. (경로: ${currentMenuPath})`
            );
            console.error(
              `[BoardPage] No board data found for menuId: ${menuIdToUse} at path ${currentMenuPath}`
            );
          }
        })
        .catch((e) => {
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
          console.error(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    fetchData();
  }, [
    awaitedParams, // Add awaitedParams to dependency array
    currentPathId,
    currentPageFromUrl,
    requestedPageSizeFromUrl,
    currentKeyword,
    currentMenuPath,
    categoryIdFromUrl,
  ]);

  // 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // 100px 이상 스크롤했을 때 isScrolled true
      setIsScrolled(scrollPosition > 100);

      // 헤더 섹션이 뷰포트에서 200px 아래로 내려가면 visible
      setIsHeaderVisible(scrollPosition > 200);

      // 컨트롤 섹션이 뷰포트에서 300px 아래로 내려가면 visible
      setIsControlsVisible(scrollPosition > 300);

      // 테이블 섹션이 뷰포트에서 400px 아래로 내려가면 visible
      setIsTableVisible(scrollPosition > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // 초기 상태 설정
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Pagination Handlers
  const handlePageChange = useCallback(
    (page: number) => {
      // page is 0-indexed from CustomPagination
      if (currentMenuPath) {
        const query = new URLSearchParams(searchParamsHook.toString());
        query.set("page", String(page + 1)); // URL is 1-indexed
        router.push(`${currentMenuPath}?${query.toString()}`);
      }
    },
    [router, currentMenuPath, searchParamsHook]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      if (currentMenuPath) {
        const query = new URLSearchParams(searchParamsHook.toString());
        query.set("page", "1"); // Reset to first page
        query.set("size", String(newPageSize));
        router.push(`${currentMenuPath}?${query.toString()}`);
      }
    },
    [router, currentMenuPath, searchParamsHook]
  );

  // awaitedParams가 설정될 때까지 로딩 상태 등을 표시할 수 있음
  if (!awaitedParams || !currentMenuPath || isLoading) {
    // Restore check for awaitedParams
    return (
      <Flex justify="center" align="center" h="100vh">
        <Box
          width="40px"
          height="40px"
          border="4px solid"
          borderColor="blue.500"
          borderTopColor="transparent"
          borderRadius="full"
          animation="spin 1s linear infinite"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Flex justify="center" align="center" minH="400px">
          <Box textAlign="center">
            <Heading size="md" color="red.500">
              오류
            </Heading>
            <Text mt={2}>{error}</Text>
          </Box>
        </Flex>
      </PageContainer>
    );
  }

  if (!boardData) {
    return (
      <PageContainer>
        <Flex justify="center" align="center" minH="400px">
          <Heading size="md">게시판 정보를 찾을 수 없습니다.</Heading>
        </Flex>
      </PageContainer>
    );
  }

  const { pageDetails, posts, pagination } = boardData;
  const showViewModeToggle =
    pageDetails.boardSkinType === "BASIC" ||
    pageDetails.boardSkinType === "PRESS";
  const isNoticesPage = currentPathId === "notices";
  const currentCategoryId = categoryIdFromUrl
    ? Number(categoryIdFromUrl)
    : null;

  // 게시판 유형에 따른 설정
  const getBoardConfig = () => {
    switch (currentPathId) {
      case "notices":
        return {
          title: "공지/소식",
          titleGradient: {
            from: "#297D83",
            to: "#48AF84",
          },
          subtitle: "울산과학대학교 학생상담센터의 공지사항을 확인하세요",
          subtitleColor: "#0D344E",
          backgroundImage: "/images/sub/privacy_bg.jpg",
          menuItems: [
            { name: "공지/소식", href: "/bbs/notices" },
            { name: "공지/소식", href: "/bbs/notices" },
          ],
        };
      case "ir":
        return {
          title: "IR",
          titleGradient: {
            from: "#297D83",
            to: "#48AF84",
          },
          subtitle: "울산과학대학교 학생상담센터의 IR 정보를 확인하세요",
          subtitleColor: "#0D344E",
          backgroundImage: "/images/sub/privacy_bg.jpg",
          menuItems: [
            { name: "IR", href: "/bbs/ir" },
            { name: "IR", href: "/bbs/ir" },
          ],
        };
      case "resources":
        return {
          title: "공지/소식",
          subtitle: "울산과학대학교 학생상담센터의 이야기를 전해드립니다",
          subtitleColor: "#0D344E",
          backgroundImage: "/images/sub/privacy_bg.jpg",
          menuItems: [
            { name: "공지/소식", href: "/bbs/resources" },
            { name: "상담센터 이야기", href: "/bbs/resources" },
          ],
        };
      case "gallery":
        return {
          title: "공지/소식",
          subtitle:
            "울산과학대학교 학생상담센터의 마음건강 이야기를 확인하세요",
          subtitleColor: "#0D344E",
          backgroundImage: "/images/sub/privacy_bg.jpg",
          menuItems: [
            { name: "공지/소식", href: "/bbs/gallery" },
            { name: "마음건강 이야기", href: "/bbs/gallery" },
          ],
        };
      default:
        return {
          title: "게시판",
          subtitle: "게시판입니다",
          subtitleColor: "#0D344E",
          backgroundImage: "/images/bbs/privacy_bg.jpg",
          menuItems: [
            { name: "PR", href: `/bbs/${currentPathId}` },
            { name: "게시판", href: `/bbs/${currentPathId}` },
          ],
        };
    }
  };

  const boardConfig = getBoardConfig();

  return (
    <Box>
      {/* 상단 배너 */}
      <PageHeroBanner
        title={boardConfig.title}
        subtitle={boardConfig.subtitle}
        subtitleColor={boardConfig.subtitleColor}
        backgroundImage={boardConfig.backgroundImage}
        height="500px"
        menuType="custom"
        customMenuItems={boardConfig.menuItems}
        animationType="zoom-in"
      />

      <PageContainer>
        {/* 상단 제목 섹션 */}
        <Box
          mb={{ base: "30px", lg: "50px" }}
          transform={isHeaderVisible ? "translateY(0)" : "translateY(30px)"}
          opacity={isHeaderVisible ? 1 : 0}
          transition="all 0.6s ease-out"
        >
          <Box
            transform={isHeaderVisible ? "translateY(0)" : "translateY(20px)"}
            opacity={isHeaderVisible ? 1 : 0}
            transition="all 0.8s ease-out 0.4s"
          >
            <ContentsHeading
              textAlign="left"
              title={(() => {
                switch (currentPathId) {
                  case "notices":
                    return "공지/소식";
                  case "resources":
                    return "상담센터 이야기";
                  case "gallery":
                    return "마음건강 이야기";
                  default:
                    return "게시판";
                }
              })()}
            />
          </Box>
        </Box>

        {/* Use BoardControls component */}
        <Box
          transform={isControlsVisible ? "translateY(0)" : "translateY(30px)"}
          opacity={isControlsVisible ? 1 : 0}
          transition="all 0.8s ease-out"
          mb={{ base: "20px", md: "30px" }}
        >
          <BoardControls
            pageDetails={pageDetails}
            pagination={pagination}
            currentPathId={currentPathId!}
            keywordInput={keywordInput}
            onKeywordChange={setKeywordInput}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch} // Pass the new handler
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            currentKeyword={currentKeyword} // Pass currentKeyword for clear button logic
            requestedPageSize={requestedPageSizeFromUrl} // Pass for clear button
            defaultPageSize={DEFAULT_PAGE_SIZE} // Pass for clear button
          />
        </Box>

        {/* 스킨 렌더링 ... */}
        <Box
          transform={isTableVisible ? "translateY(0)" : "translateY(40px)"}
          opacity={isTableVisible ? 1 : 0}
          transition="all 1s ease-out 0.2s"
        >
          {(() => {
            // resources와 ir 페이지는 강제로 BasicBoardSkin 사용 (notices와 동일한 테이블 스타일)
            if (currentPathId === "resources" || currentPathId === "ir") {
              return (
                <BasicBoardSkin
                  pageDetails={pageDetails}
                  posts={posts}
                  pagination={pagination}
                  currentPathId={currentPathId!}
                  viewMode={viewMode}
                />
              );
            }

            switch (pageDetails.boardSkinType) {
              case "BASIC":
                return (
                  <BasicBoardSkin
                    pageDetails={pageDetails}
                    posts={posts}
                    pagination={pagination}
                    currentPathId={currentPathId!}
                    viewMode={viewMode}
                  />
                );
              case "FAQ":
                return (
                  <FaqBoardSkin
                    pageDetails={pageDetails}
                    posts={posts}
                    pagination={pagination}
                    currentPathId={currentPathId!}
                  />
                );
              case "QNA":
                return (
                  <QnaBoardSkin
                    pageDetails={pageDetails}
                    posts={posts}
                    pagination={pagination}
                    currentPathId={currentPathId!}
                  />
                );
              case "PRESS":
                return (
                  <PressBoardSkin
                    pageDetails={pageDetails}
                    posts={posts}
                    pagination={pagination}
                    currentPathId={currentPathId!}
                    viewMode={viewMode}
                  />
                );
              case "FORM":
                return (
                  <FormBoardSkin
                    pageDetails={pageDetails}
                    posts={posts}
                    pagination={pagination}
                    currentPathId={currentPathId!}
                  />
                );
              default:
                console.warn(
                  `[BoardPage] Unknown or unsupported boardSkin: "${pageDetails.boardSkinType}" for menuId: ${pageDetails.menuId}. Falling back to BasicBoardSkin.`
                );
                return (
                  <BasicBoardSkin
                    pageDetails={pageDetails}
                    posts={posts}
                    pagination={pagination}
                    currentPathId={currentPathId!}
                    viewMode={viewMode}
                  />
                );
            }
          })()}
        </Box>
      </PageContainer>
    </Box>
  );
}
