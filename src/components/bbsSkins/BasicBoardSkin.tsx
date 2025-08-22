"use client";

import React, { useMemo, useRef, useCallback } from "react";
import {
  Box,
  Text,
  Flex,
  Badge,
  HStack,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { useColors } from "@/styles/theme";
import { useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { LuExternalLink, LuImage } from "react-icons/lu";

import { PageDetailsDto } from "@/types/menu";
import { Post } from "@/types/api";
import { PaginationData } from "@/types/common";
import { LuEye } from "react-icons/lu";

// Import GenericArticleCard and the mapping function
import GenericArticleCard from "@/components/common/cards/GenericArticleCard";
import { mapPostToCommonCardData } from "@/lib/card-utils";
import { CustomPagination } from "@/components/common/CustomPagination";
import PostTitleDisplay from "@/components/common/PostTitleDisplay";

interface BasicBoardSkinProps {
  pageDetails: PageDetailsDto;
  posts: Post[];
  pagination: PaginationData;
  currentPathId: string;
  viewMode: "list" | "card";
}

const BasicBoardSkin: React.FC<BasicBoardSkinProps> = ({
  pageDetails,
  posts,
  pagination,
  currentPathId,
  viewMode,
}) => {
  const router = useRouter();
  const colors = useColors();
  const { colorMode } = useColorMode();

  // 반응형 제목 글자수 제한
  const titleMaxLength =
    useBreakpointValue({
      base: 5, // 모바일: 15자
      md: 20, // 태블릿: 25자
      lg: 30, // 데스크톱: 35자
    }) || 15;

  // 제목 자르기 함수
  const truncateTitle = (title: string, maxLength: number) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };

  const handlePageChange = (page: number) => {
    router.push(
      `/bbs/${currentPathId}?page=${page + 1}&size=${pagination.pageSize}`
    );
  };

  const handlePageSizeChange = (newSize: number) => {
    router.push(`/bbs/${currentPathId}?page=1&size=${newSize}`);
  };

  const handleRowClick = (post: Post) => {
    // 외부 링크가 있는 경우 해당 링크로 이동
    if (post.externalLink) {
      const trimmed = post.externalLink.trim();
      const externalUrl = trimmed.startsWith("http")
        ? trimmed
        : `https://${trimmed}`;
      window.open(externalUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // 내부 상세 페이지로 이동
    router.push(`/bbs/${currentPathId}/read/${post.nttId}`);
  };

  // "공지" 카테고리 글을 최상단으로 정렬
  const sortedPosts = useMemo(() => {
    if (!posts || posts.length === 0) return posts;

    // "공지" 카테고리인지 확인하는 함수
    const isNoticeCategory = (post: Post) => {
      return (
        post.categories &&
        post.categories.some(
          (cat) => cat.name === "공지" || cat.code === "NOTICE"
        )
      );
    };

    // 정렬: 공지 카테고리 → 일반 공지사항 → 일반 글
    return [...posts].sort((a, b) => {
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
  }, [posts]);

  // 카드 뷰 렌더링
  if (viewMode === "card") {
    return (
      <Box maxW="1300px" mx="auto" mt={10} p={0}>
        {sortedPosts && sortedPosts.length > 0 ? (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} mb={8}>
              {sortedPosts.map((post) => {
                const cardData = mapPostToCommonCardData(post, currentPathId);
                return (
                  <GenericArticleCard key={post.nttId} cardData={cardData} />
                );
              })}
            </SimpleGrid>
            <Flex justify="center" mt={8}>
              <CustomPagination
                currentPage={pagination.currentPage - 1}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                pageSize={pagination.pageSize}
                onPageSizeChange={handlePageSizeChange}
              />
            </Flex>
          </>
        ) : (
          <Flex
            justify="center"
            align="center"
            h="30vh"
            borderWidth="1px"
            borderRadius="md"
            p={10}
          >
            <Text>표시할 게시물이 없습니다.</Text>
          </Flex>
        )}
      </Box>
    );
  }

  // 리스트 뷰 렌더링 (새로운 테이블 스타일)
  return (
    <Box maxW="1300px" mx="auto" p={0}>
      {sortedPosts && sortedPosts.length > 0 ? (
        <>
          <Box overflow="auto">
            <Box
              as="table"
              w="100%"
              borderCollapse="collapse"
              bg={colorMode === "dark" ? "gray.800" : "white"}
              p={0}
            >
              {/* 헤더 */}
              <Box as="thead">
                <Box as="tr" borderBottom="2px solid" borderColor="#333">
                  <Box
                    as="th"
                    textAlign="center"
                    width="80px"
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight="600"
                    py={6}
                    px={4}
                  >
                    번호
                  </Box>
                  <Box
                    as="th"
                    fontSize={{ base: "14px", md: "18px" }}
                    textAlign="center"
                    fontWeight="600"
                    py={6}
                    px={4}
                  >
                    제목
                  </Box>
                  <Box
                    as="th"
                    textAlign="center"
                    width="120px"
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight="600"
                    py={6}
                    px={4}
                  >
                    작성자
                  </Box>
                  <Box
                    as="th"
                    textAlign="center"
                    width="120px"
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight="600"
                    py={6}
                    px={4}
                  >
                    작성일
                  </Box>
                  {/* <Box
                    as="th"
                    textAlign="center"
                    width="80px"
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight="600"
                    py={6}
                    px={4}
                  >
                    조회
                  </Box> */}
                </Box>
              </Box>

              {/* 본문 */}
              <Box as="tbody">
                {sortedPosts.map((post, index) => {
                  // "공지" 카테고리인지 확인
                  const isNoticeCategory =
                    post.categories &&
                    post.categories.some(
                      (cat) => cat.name === "공지" || cat.code === "NOTICE"
                    );

                  return (
                    <Box
                      as="tr"
                      key={post.nttId}
                      borderBottom="1px solid"
                      borderColor="gray.300"
                      _hover={{
                        bg: colorMode === "dark" ? "gray.700" : "gray.50",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRowClick(post)}
                      transition="all 0.2s ease"
                    >
                      <Box
                        as="td"
                        color="#666"
                        textAlign="center"
                        fontSize={{ base: "14px", md: "18px" }}
                        py={4}
                        px={2}
                      >
                        {post.noticeState === "Y" ||
                        post.no === 0 ||
                        isNoticeCategory ? (
                          <Badge
                            bg={isNoticeCategory ? "#267987" : "red.500"}
                            color="white"
                            variant="solid"
                            fontSize="12px"
                            px={3}
                            py={1}
                          >
                            공지
                          </Badge>
                        ) : (
                          pagination.totalElements -
                          (pagination.currentPage - 1) * pagination.pageSize -
                          index
                        )}
                      </Box>
                      <Box
                        as="td"
                        color="#666"
                        fontSize={{ base: "14px", md: "18px" }}
                        py={4}
                        px={2}
                        textAlign="center"
                      >
                        <Flex align="center" justify="center" gap={2}>
                          <Text
                            color={isNoticeCategory ? "#267987" : "#666"}
                            _hover={{ color: "blue.500" }}
                            transition="color 0.2s ease"
                            fontWeight={isNoticeCategory ? "600" : "normal"}
                            title={post.title}
                          >
                            <PostTitleDisplay
                              title={truncateTitle(post.title, titleMaxLength)}
                              postData={{
                                hasImageInContent: post.hasImageInContent,
                                hasAttachment: post.hasAttachment,
                              }}
                            />
                          </Text>

                          {post.externalLink && (
                            <Icon
                              as={LuExternalLink}
                              color="blue.400"
                              fontSize={{ base: "14px", md: "18px" }}
                              flexShrink={0}
                            />
                          )}
                        </Flex>
                      </Box>
                      <Box
                        as="td"
                        textAlign="center"
                        color="#666"
                        fontSize={{ base: "14px", md: "18px" }}
                        py={4}
                        px={2}
                      >
                        {post.displayWriter || post.writer || "-"}
                      </Box>
                      <Box
                        as="td"
                        textAlign="center"
                        color="#666"
                        fontSize={{ base: "14px", md: "18px" }}
                        py={4}
                        px={2}
                      >
                        {post.postedAt
                          ? dayjs(post.postedAt).format("YYYY.MM.DD")
                          : "-"}
                      </Box>
                      {/* <Box
                        as="td"
                        color="#666"
                        textAlign="center"
                        fontSize={{ base: "14px", md: "18px" }}
                        py={4}
                        px={2}
                      >
                        {post.hits || 0}
                      </Box> */}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          <Flex justify="center" mt={8}>
            <CustomPagination
              currentPage={pagination.currentPage - 1}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              pageSize={pagination.pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </Flex>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          h="30vh"
          borderWidth="1px"
          borderRadius="md"
          p={10}
        >
          <Text>표시할 게시물이 없습니다.</Text>
        </Flex>
      )}
    </Box>
  );
};

export default BasicBoardSkin;
