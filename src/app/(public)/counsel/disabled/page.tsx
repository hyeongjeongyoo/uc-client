"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { DecoratedHeading } from "@/components/common/DecoratedHeading";

export default function DisabledPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    infoDescription: false,
    recommendHeading: false,
    guideHeading: false,
    bottomNotice: false,
  });

  // "상담 안내 및 신청 방법" 카드가 제목보다 늦게 뜨도록 지연 게이팅
  const [guideCardsArmed, setGuideCardsArmed] = useState(false);

  // 스크롤 이벤트 처리
  const infoDescRef = useRef<HTMLDivElement | null>(null);
  const recommendHeadingRef = useRef<HTMLDivElement | null>(null);
  const guideHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const bottomTextRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 안내 문구 실제 가시성 계산
      let infoInView = false;
      let recommendInView = false;
      let guideInView = false;
      let bottomInView = false;
      if (infoDescRef.current) {
        const rect = infoDescRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        infoInView = rect.top < viewportH - 80;
      }
      if (recommendHeadingRef.current) {
        const rect = recommendHeadingRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        recommendInView = rect.top < viewportH - 80;
      }
      if (guideHeadingRef.current) {
        const rect = guideHeadingRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        guideInView = rect.top < viewportH - 80;
      }
      if (bottomTextRef.current) {
        const rect = bottomTextRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        bottomInView = rect.top < viewportH - 80;
      }

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 300,
        infoDescription: infoInView,
        recommendHeading: recommendInView,
        guideHeading: guideInView,
        bottomNotice: bottomInView,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // "이런 때 권해요" 카드가 제목보다 늦게 뜨도록 지연 게이팅
  const [recommendCardsArmed, setRecommendCardsArmed] = useState(false);
  useEffect(() => {
    let timeoutId: number | undefined;
    if (animations.recommendHeading) {
      timeoutId = window.setTimeout(() => setRecommendCardsArmed(true), 400);
    } else {
      setRecommendCardsArmed(false);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [animations.recommendHeading]);

  // 제목(inView) 후 일정 시간 지난 뒤에만 카드가 등장하도록 제어
  useEffect(() => {
    let timeoutId: number | undefined;
    if (animations.guideHeading) {
      timeoutId = window.setTimeout(() => setGuideCardsArmed(true), 400); // 0.4s 지연
    } else {
      setGuideCardsArmed(false);
    }
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [animations.guideHeading]);

  // 하단 4개 카드 등장 애니메이션 (기존 스크롤 방식 참고: scrollY 기준)
  const [cardVisible, setCardVisible] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const handleScrollCards = () => {
      const y = window.scrollY;
      // 페이지 구성에 맞춰 임계값을 순차적으로 증가
      const thresholds = [400, 450, 550, 600];
      setCardVisible(thresholds.map((t) => y > t));
    };

    window.addEventListener("scroll", handleScrollCards);
    handleScrollCards();
    return () => window.removeEventListener("scroll", handleScrollCards);
  }, []);

  // 상담 안내 및 신청 방법 카드 가시성 (2장)
  const [guideCardsVisible, setGuideCardsVisible] = useState<boolean[]>([
    false,
    false,
  ]);
  const guideCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute("data-guide-index");
          const idx = indexAttr ? parseInt(indexAttr, 10) : -1;
          if (idx >= 0) {
            setGuideCardsVisible((prev) => {
              const next = [...prev];
              next[idx] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    guideCardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner autoMode={true} />

      <PageContainer>
        <Stack>
          {/* 장애학생 심리지원 상담 섹션 */}
          <Box>
            <Box position="relative">
              <Heading
                as="h2"
                fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                fontWeight="bold"
                mb={5}
                lineHeight="1.3"
                transition="all 0.6s ease 0.2s"
                transform={
                  animations.mainHeading ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.mainHeading ? 1 : 0}
                position="relative"
                zIndex={1}
              >
                장애학생 심리지원 상담
              </Heading>
              <Image
                src="/images/sub/textLine.png"
                alt="heading decoration"
                position="absolute"
                top="50%"
                left="calc(50% - 50vw)"
                transform="translateY(-55%)"
                w="auto"
                h="auto"
                pointerEvents="none"
                zIndex={0}
              />
            </Box>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              textAlign="justify"
              transition="all 0.8s ease-out"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              장애학생 심리지원 상담은 전문상담사가 1:1로 안전하게 함께하며,
              비밀은 철저히 보장됩니다. 말하기가 어렵다면 글로 표현해도
              좋습니다. 당신의 속도를 존중하며, 문제 해결과 마음 회복의 길을
              함께 찾아드립니다.
            </Text>
          </Box>
        </Stack>
      </PageContainer>
      {/* 무엇을 다루나요? 섹션 */}
      <Box
        p={8}
        backgroundColor="#fafafa"
        position="relative"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px" paddingInline="0">
          <Box paddingInline="0">
            <Stack>
              <Box ref={recommendHeadingRef}>
                <DecoratedHeading
                  text="무엇을 다루나요?"
                  inView={animations.recommendHeading}
                />
                {/* 무엇을 지원하나요? 1x4 카드 디자인으로 통일 */}
                <Flex
                  wrap={{ base: "wrap", md: "nowrap" }}
                  w="100%"
                  justify={{ base: "flex-start", md: "space-between" }}
                  gap={{ base: 3, md: 5 }}
                >
                  {[
                    {
                      title: "학업",
                      desc: "집중, 과제·시험 스트레스, 공부 방법",
                      iconType: "study",
                    },
                    {
                      title: "대인관계",
                      desc: "친구·교수·가족과의 갈등, 소통 방법",
                      iconType: "relation",
                    },
                    {
                      title: "진로",
                      desc: "관심·강점 탐색, 진로 결정 고민",
                      iconType: "career",
                    },
                    {
                      title: "생활 적응",
                      desc: "학교생활 리듬, 감정 조절, 스트레스 대처",
                      iconType: "adapt",
                    },
                  ].map((card, idx) => (
                    <Box
                      key={idx}
                      flex={{ base: "1 1 100%", md: "0 0 calc(25% - 10px)" }}
                      maxW={{ base: "100%", md: "calc(25% - 10px)" }}
                      flexShrink={0}
                      bg="#ffffff"
                      borderRadius="xl"
                      boxShadow="0 8px 16px rgba(0,0,0,0.04)"
                      p={{ base: 6, md: 8 }}
                      minH={{ base: "auto", md: "300px" }}
                      display="flex"
                      justifyContent="center"
                      flexDirection="column"
                      gap={3}
                      position="relative"
                      transition={`all 0.6s ease-out ${0.2 + idx * 0.1}s`}
                      transform={
                        animations.recommendHeading
                          ? "translateY(0)"
                          : "translateY(24px)"
                      }
                      opacity={animations.recommendHeading ? 1 : 0}
                      cursor="default"
                      willChange="transform, box-shadow, border-color"
                      _hover={{
                        transform: animations.recommendHeading
                          ? "translateY(-4px)"
                          : "translateY(24px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                        borderColor: "#e2e8f0",
                      }}
                    >
                      {/* 상단 아이콘 (배경 없음, 그라데이션 스트로크) */}
                      <Box
                        w={{ base: "30px", md: "40px" }}
                        h={{ base: "30px", md: "40px" }}
                        mb={10}
                      >
                        {(() => {
                          const gradId = `disabledGrad_${idx}`;
                          const Gradient = (
                            <defs>
                              <linearGradient
                                id={gradId}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#297D83" />
                                <stop offset="100%" stopColor="#48AF84" />
                              </linearGradient>
                            </defs>
                          );
                          if (card.iconType === "study") {
                            return (
                              <svg
                                viewBox="0 0 24 24"
                                width="100%"
                                height="100%"
                                fill="none"
                              >
                                {Gradient}
                                <path
                                  d="M3 21l3-1 11-11-2-2L4 18l-1 3z"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M14 5l2 2"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            );
                          }
                          if (card.iconType === "relation") {
                            return (
                              <svg
                                viewBox="0 0 24 24"
                                width="100%"
                                height="100%"
                                fill="none"
                              >
                                {Gradient}
                                <path
                                  d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4A4 4 0 0 1 4 15V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v8z"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          }
                          if (card.iconType === "career") {
                            return (
                              <svg
                                viewBox="0 0 24 24"
                                width="100%"
                                height="100%"
                                fill="none"
                              >
                                {Gradient}
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="9"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                />
                                <path
                                  d="M10 14l4-4-2 6-2-2z"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          }
                          return (
                            <svg
                              viewBox="0 0 24 24"
                              width="100%"
                              height="100%"
                              fill="none"
                            >
                              {Gradient}
                              <path
                                d="M12 21s-6.5-4.35-9-7.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9 7.5c-2.5 3.15-9 7.5-9 7.5z"
                                stroke={`url(#${gradId})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          );
                        })()}
                      </Box>
                      <Text
                        fontSize={{ base: "16px", md: "24px" }}
                        fontWeight="bold"
                        color="#333"
                      >
                        {card.title}
                      </Text>
                      <Text
                        fontSize={{ base: "14px", md: "16px" }}
                        lineHeight="1.5"
                      >
                        {card.desc}
                      </Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        p={8}
        backgroundColor="#ffffff"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px" paddingInline="0">
          <Box paddingInline="0">
            <Stack>
              <Box>
                <Box ref={guideHeadingRef}>
                  <DecoratedHeading
                    text="상담 안내"
                    inView={animations.guideHeading}
                  />
                </Box>
                {/* 2장 카드 그리드 */}
                <Flex
                  wrap={{ base: "wrap", md: "nowrap" }}
                  gap={{ base: 4, md: 6 }}
                  w="100%"
                  justify={{ base: "flex-start", md: "space-between" }}
                >
                  {[
                    {
                      title: "어떻게 진행되나요?",
                      icon: "/images/icons/counsels.png",
                      items: [
                        <>
                          전문상담사와&nbsp;
                          <Text as="span" fontWeight="900">
                            1:1 대면 상담 혹은 비대면 상담
                          </Text>
                          으로 진행됩니다.
                        </>,
                        <>
                          말하기가 어려우면&nbsp;
                          <Text as="span" fontWeight="900">
                            필담(글로 쓰기)
                          </Text>{" "}
                          &nbsp;등 편한 방식으로 소통할 수 있어요.
                        </>,
                        <>
                          개인 상황에 맞춰&nbsp;
                          <Text as="span" fontWeight="900">
                            시간·방식 조정
                          </Text>{" "}
                          을 도와드립니다(가능한 범위).
                        </>,
                      ],
                    },
                    {
                      title: "꼭 알아두세요!",
                      icon: "/images/icons/exmark.png",
                      items: [
                        <>
                          <Text as="span" fontWeight="900">
                            비밀 보장: &nbsp;
                          </Text>
                          상담 내용은 법·윤리 기준에 따라 철저히 보호됩니다.
                        </>,
                        <>
                          <Text as="span" fontWeight="900">
                            무료 이용: &nbsp;
                          </Text>{" "}
                          모든 서비스는 무료입니다.
                        </>,
                        <>
                          <Text as="span" fontWeight="900">
                            연계 지원: &nbsp;
                          </Text>{" "}
                          필요하면 교내·외 지원기관과 연결해 드립니다.
                        </>,
                      ],
                    },
                  ].map((card, idx) => (
                    <Box
                      key={idx}
                      flex={{ base: "1 1 100%", md: "0 0 calc(50% - 12px)" }}
                      maxW={{ base: "100%", md: "calc(50% - 12px)" }}
                      bg="#ffffff"
                      borderRadius="18px"
                      border="1px solid #E5E7EB"
                      boxShadow="0 10px 24px rgba(0,0,0,0.06)"
                      p={{ base: 4, md: 5 }}
                      pt={{ base: "80px", md: "100px" }}
                      pb={{ base: "15px", md: "30px" }}
                      minH={{ base: "auto", md: "180px" }}
                      display="flex"
                      flexDirection="column"
                      gap={3}
                      position="relative"
                      ref={(el: HTMLDivElement | null) =>
                        (guideCardRefs.current[idx] = el)
                      }
                      data-guide-index={idx}
                      transition={`all 0.6s ease-out ${0.3 + idx * 0.15}s`}
                      transform={
                        guideCardsArmed && guideCardsVisible[idx]
                          ? "translateY(0)"
                          : "translateY(24px)"
                      }
                      opacity={
                        guideCardsArmed && guideCardsVisible[idx] ? 1 : 0
                      }
                      cursor="default"
                      willChange="transform, box-shadow, border-color"
                      _hover={{
                        transform:
                          guideCardsArmed && guideCardsVisible[idx]
                            ? "translateY(-4px)"
                            : "translateY(24px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                        borderColor: "#e2e8f0",
                      }}
                    >
                      {/* 상단 아이콘 박스 */}
                      <Box
                        position="absolute"
                        top={8}
                        left={4}
                        w={{ base: "32px", md: "36px" }}
                        h={{ base: "32px", md: "36px" }}
                        borderRadius="8px"
                        bg="#267987"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        overflow="hidden"
                      >
                        <Image
                          src={card.icon}
                          alt="icon"
                          w="70%"
                          h="auto"
                          filter="brightness(0) invert(1)"
                        />
                      </Box>
                      <Heading as="h3" fontSize={{ base: "16px", md: "18px" }}>
                        {card.title}
                      </Heading>
                      <Box
                        as="ul"
                        pl={2}
                        color="#555"
                        fontSize={{ base: "14px", md: "16px" }}
                      >
                        {card.items.map((text, i) => (
                          <Text
                            as="li"
                            key={i}
                            mb={1}
                            style={{ listStyleType: "'· '" }}
                          >
                            {text}
                          </Text>
                        ))}
                      </Box>
                      <Box
                        position="absolute"
                        right={{ base: 3, md: 6 }}
                        bottom={{ base: 3, md: 6 }}
                      >
                        <Image
                          src="/images/logo/big_logo.png"
                          alt="UC 워터마크"
                          opacity={0.15}
                          w={{ base: "64px", md: "96px" }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Flex>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
