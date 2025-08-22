import React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  Container,
  Link,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { keyframes } from "@emotion/react";
import { usePageHero } from "@/hooks/usePageHero";
// Removed unused Chakra hooks that caused type errors in v3

import dynamic from "next/dynamic";
// 커스텀 OGL Threads 컴포넌트 동적 로딩 (브라우저 전용)
// 경로 별칭 관련 이슈를 피하기 위해 상대 경로로 로드하고, 클라이언트 전용으로 비SSR 처리
const Threads = dynamic(
  () => import("../visual/Threads").then((m) => m.default),
  { ssr: false, loading: () => null }
);

// Ken Burns zoom-in 애니메이션 정의
const kenBurnsZoomIn = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
`;

// Ken Burns zoom-out 애니메이션 정의
const kenBurnsZoomOut = keyframes`
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Ken Burns pan-right 애니메이션 정의
const kenBurnsPanRight = keyframes`
  0% { transform: scale(1.1) translateX(0); }
  100% { transform: scale(1.1) translateX(3%); }
`;

// 페이드인 효과 정의 (zoom-in용)
const fadeInZoom = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// 페이드인 효과 정의 (zoom-out용)
const fadeInZoomOut = keyframes`
  0% {
    opacity: 0;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// 페이드인 효과 정의 (pan-right용)
const fadeInPanRight = keyframes`
  0% {
    opacity: 0;
    transform: scale(1.1) translateX(-2%);
  }
  100% {
    opacity: 1;
    transform: scale(1.1) translateX(0);
  }
`;

// 오버레이용 단순 페이드인
const fadeInSimple = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

// 텍스트 슬라이드업 효과
const titleSlideUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const subtitleSlideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 메뉴바 페이드인 효과
const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

interface MenuItem {
  name: string;
  href: string;
}

interface PageHeroBannerProps {
  // 자동 데이터 매핑 관련
  autoMode?: boolean; // 자동 모드 활성화 (기본값: true)

  // 수동 설정 (기존 방식, optional)
  title?: string;
  titleGradient?: {
    from: string;
    to: string;
  };
  subtitle?: string;
  subtitleColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  height?: string;
  showMenuBar?: boolean;
  customMenuItems?: MenuItem[];
  menuType?: "custom" | "none";
  animationType?: "zoom-in" | "zoom-out" | "pan-right";
}

export function PageHeroBanner({
  // 자동 데이터 매핑 관련
  autoMode = true,

  // 수동 설정 (기존 방식)
  title: manualTitle,
  subtitle: manualSubtitle,
  subtitleColor: manualSubtitleColor,
  backgroundImage: manualBackgroundImage,
  height: manualHeight,
  showMenuBar: manualShowMenuBar,
  customMenuItems: manualCustomMenuItems,
  menuType: manualMenuType,
  animationType: manualAnimationType,
}: PageHeroBannerProps) {
  // 자동 모드인 경우 현재 경로 기반으로 데이터 가져오기
  const autoHeroData = usePageHero();

  // 자동 모드 vs 수동 모드 결정
  const isManualMode = !autoMode || manualTitle !== undefined;

  // 최종 사용할 데이터 결정
  const finalData = isManualMode
    ? {
        title: manualTitle || "K&D ENERGEN",
        subtitle: manualSubtitle,
        subtitleColor: manualSubtitleColor,
        backgroundImage: manualBackgroundImage || "/images/main/hero-image.jpg",
        height: manualHeight || "500px",
        showMenuBar: manualShowMenuBar ?? true,
        customMenuItems: manualCustomMenuItems || [],
        menuType: manualMenuType || "custom",
        animationType: manualAnimationType || "zoom-in",
        titleGradient: undefined,
      }
    : {
        title: autoHeroData.title,
        subtitle: autoHeroData.subtitle,
        subtitleColor: (autoHeroData as any).subtitleColor,
        backgroundImage: autoHeroData.backgroundImage,
        height: autoHeroData.height || "500px",
        showMenuBar: true,
        customMenuItems: autoHeroData.menuItems,
        menuType: "custom" as const,
        animationType: autoHeroData.animationType || "zoom-in",
        titleGradient: autoHeroData.titleGradient,
      };

  // 렌더링할 메뉴 아이템들 결정
  const getMenuItems = () => {
    if (finalData.menuType === "custom") {
      const items = (finalData as any).customMenuItems;
      return Array.isArray(items) ? items : [];
    }
    return [];
  };

  const menuItems = getMenuItems();

  // subtitle 내의 <br /> 토큰을 모바일에서만 줄바꿈으로 반영
  const renderMobileOnlyBreaks = (raw?: string) => {
    if (!raw) return null;
    const parts = raw.split(/<br\s*\/?>(?:\s*)?/i);
    const nodes: React.ReactNode[] = [];
    parts.forEach((seg, idx) => {
      nodes.push(seg);
      if (idx < parts.length - 1) {
        nodes.push(
          <Box
            as="br"
            key={`mob-br-${idx}`}
            display={{
              base: "inline",
              md: (finalData as any).subtitleBrAlways ? "inline" : "none",
            }}
          />
        );
      }
    });
    return nodes;
  };

  // 애니메이션 타입에 따른 Ken Burns 효과 선택
  const kenBurnsAnimation =
    finalData.animationType === "zoom-out"
      ? kenBurnsZoomOut
      : finalData.animationType === "pan-right"
      ? kenBurnsPanRight
      : kenBurnsZoomIn;

  // 애니메이션 타입에 따른 페이드인 효과 선택
  const fadeInAnimation =
    finalData.animationType === "zoom-out"
      ? fadeInZoomOut
      : finalData.animationType === "pan-right"
      ? fadeInPanRight
      : fadeInZoom;

  return (
    <Box
      height={finalData.height}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* 배경: react-bits Threads (서브 페이지 전역 적용) */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        animation={`${fadeInAnimation} 1.2s ease-out`}
      >
        {/* 배경색은 히어로 데이터의 그라디언트 톤과 어울리는 딥 블루/그린 계열 */}
        <Threads
          color={(finalData.titleGradient?.from as string) || "#297D83"}
          style={{ width: "100%", height: "100%" }}
        />
      </Box>

      {/* 오버레이 */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        animation={`${fadeInSimple} 1.5s ease-out`}
      />

      {/* 텍스트 내용 */}
      <Box
        position="relative"
        zIndex={2}
        textAlign="center"
        color="white"
        mb={finalData.showMenuBar ? 8 : 0}
        animation={`${titleSlideUp} 1s ease-out 0.5s both`}
      >
        <Heading
          as="h1"
          fontSize={{ base: "32px", md: "48px", lg: "72px" }}
          fontWeight="900"
          mb={7}
          lineHeight="1.2"
          backgroundImage={
            finalData.titleGradient
              ? `linear-gradient(90deg, ${finalData.titleGradient.from} 0%, ${finalData.titleGradient.to} 100%)`
              : "linear-gradient(90deg, #0D6473 0%, #48AF84 100%)"
          }
          bgClip="text"
          color="transparent"
        >
          {finalData.title}
        </Heading>
        {finalData.subtitle && (
          <Box
            fontSize={{ base: "lg", md: "xl" }}
            opacity={0.9}
            color={(finalData as any).subtitleColor || undefined}
            animation={`${subtitleSlideUp} 1s ease-out 0.8s both`}
          >
            {renderMobileOnlyBreaks(finalData.subtitle)}
          </Box>
        )}
      </Box>

      {/* 메뉴바 */}
      {finalData.showMenuBar && (
        <Box
          position="relative"
          zIndex={3}
          animation={`${fadeInScale} 1s ease-out 1s both`}
        >
          <Container maxW="800px">
            <Flex
              bg="rgba(255, 255, 255, 0.15)"
              backdropFilter="blur(10px)"
              borderRadius="50px"
              align="center"
              justify="center"
              gap={2}
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
              flexWrap="wrap"
              color="#0D344E"
            >
              {/* 홈 버튼 */}
              <Box>
                <Link as={NextLink} href="/">
                  <Box
                    bg="rgba(255, 255, 255, 0.2)"
                    color="#0D344E"
                    borderRadius="full"
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: "rgba(255, 255, 255, 0.3)",
                      transform: "scale(1.05)",
                    }}
                    transition="all 0.2s ease"
                    cursor="pointer"
                  >
                    {/* 홈 아이콘 SVG */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 9.5L12 2L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 21V12H15V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                </Link>
              </Box>

              {/* 동적 메뉴 아이템들 */}
              {menuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <Box>
                    <Link as={NextLink} href={item.href}>
                      <Button
                        bg="transparent"
                        color="#0D344E"
                        fontWeight="medium"
                        fontSize={{ base: "sm", md: "md" }}
                        borderRadius="full"
                        _hover={{
                          bg: "rgba(255, 255, 255, 0.15)",
                        }}
                        transition="all 0.2s ease"
                        variant="ghost"
                        mx={1}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  </Box>

                  {/* 첫 번째 메뉴(대메뉴) 다음에 > 구분자 추가 */}
                  {index === 0 && menuItems.length > 1 && (
                    <Box
                      display="flex"
                      alignItems="center"
                      color="#0D344E"
                      opacity={0.7}
                      mx={2}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </Flex>
          </Container>
        </Box>
      )}
    </Box>
  );
}
