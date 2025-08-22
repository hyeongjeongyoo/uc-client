"use client";

import React from "react";
import { Box, Text, Flex, Button, Badge } from "@chakra-ui/react";
import { useColors } from "@/styles/theme";
import { Menu } from "@/types/api";

interface MenuPreviewProps {
  selectedMenu: Menu | null;
}

export function MenuPreview({ selectedMenu }: MenuPreviewProps) {
  const colors = useColors();
  const [iframeKey, setIframeKey] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadError, setLoadError] = React.useState<string | null>(null);

  // 메뉴 타입에 따른 URL 생성
  const getPreviewUrl = (menu: Menu): string | null => {
    if (!menu) return null;

    // 기본 URL이 있는 경우 우선 사용
    if (menu.url) {
      // 외부 URL인지 확인 (http:// 또는 https://로 시작)
      if (menu.url.startsWith("http://") || menu.url.startsWith("https://")) {
        return menu.url;
      }
      // 내부 경로인 경우 그대로 사용
      return menu.url;
    }

    switch (menu.type) {
      case "LINK":
        // 링크 타입이지만 URL이 없는 경우
        return null;

      case "BOARD":
        // 게시판인 경우 /bbs/{targetId} 경로
        if (menu.targetId) {
          return `/bbs/${menu.targetId}`;
        }
        return null;

      case "CONTENT":
        // 콘텐츠인 경우 targetId를 기반으로 추정
        // 실제 콘텐츠 라우팅 구조에 따라 조정 필요
        if (menu.targetId) {
          return `/content/${menu.targetId}`;
        }
        return null;

      case "FOLDER":
        // 폴더인 경우 메인 페이지
        return "/";

      case "POPUP":
        // 팝업인 경우 일반적으로 URL이 설정되어야 함
        return null;

      case "PROGRAM":
        // 프로그램인 경우 특별한 경로가 있을 수 있음
        return null;

      default:
        return null;
    }
  };

  const previewUrl = selectedMenu ? getPreviewUrl(selectedMenu) : null;

  // 새로고침 함수
  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
    setIsLoading(true);
    setLoadError(null);
  };

  // 아이프레임 로드 완료
  const handleIframeLoad = () => {
    setIsLoading(false);
    setLoadError(null);
  };

  // 아이프레임 로드 에러
  const handleIframeError = () => {
    setIsLoading(false);
    setLoadError("페이지를 로드할 수 없습니다.");
  };

  // 선택된 메뉴가 변경될 때 상태 초기화
  React.useEffect(() => {
    if (selectedMenu && previewUrl) {
      setIsLoading(true);
      setLoadError(null);
    }
  }, [selectedMenu, previewUrl]);

  if (!selectedMenu) {
    return (
      <Flex
        align="center"
        justify="center"
        h="100%"
        direction="column"
        gap={4}
        color={colors.text.secondary}
      >
        <Text fontSize="lg" fontWeight="medium">
          메뉴를 선택해주세요
        </Text>
        <Text fontSize="sm" textAlign="center">
          왼쪽 메뉴 목록에서 메뉴를 선택하면
          <br />
          해당 페이지의 미리보기를 볼 수 있습니다.
        </Text>
      </Flex>
    );
  }

  if (!previewUrl) {
    return (
      <Flex
        align="center"
        justify="center"
        h="100%"
        direction="column"
        gap={4}
        color={colors.text.secondary}
      >
        <Text fontSize="lg" fontWeight="medium">
          미리보기를 사용할 수 없습니다
        </Text>
        <Text fontSize="sm" textAlign="center">
          선택된 메뉴 &quot;{selectedMenu.name}&quot;은
          <br />
          미리보기 URL이 설정되지 않았습니다.
        </Text>
        <Badge colorScheme="orange" px={2} py={1}>
          {selectedMenu.type}
        </Badge>
      </Flex>
    );
  }

  return (
    <Box h="100%">
      <Box position="relative" h="calc(100% - 24px)" overflow="hidden">
        {/* 로딩 상태 */}
        {isLoading && (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            align="center"
            justify="center"
            bg="rgba(255, 255, 255, 0.9)"
            zIndex={10}
          >
            <Text color={colors.text.secondary}>로딩 중...</Text>
          </Flex>
        )}

        {/* 에러 상태 */}
        {loadError && (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            align="center"
            justify="center"
            direction="column"
            gap={4}
            bg="rgba(255, 255, 255, 0.9)"
            zIndex={10}
          >
            <Text color={colors.text.secondary} fontSize="lg">
              {loadError}
            </Text>
            <Button size="sm" onClick={handleRefresh}>
              다시 시도
            </Button>
          </Flex>
        )}

        <iframe
          key={iframeKey}
          src={previewUrl}
          style={{
            width: "100%",
            height: "100vh",
            border: "none",
            backgroundColor: "white",
          }}
          title={`Preview of ${selectedMenu.name}`}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      </Box>
    </Box>
  );
}
