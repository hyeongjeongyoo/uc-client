"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { DecoratedHeading } from "@/components/common/DecoratedHeading";

export default function GroupPage() {
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
          {/* 안내 섹션 */}
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
                집단상담이란?
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
              비슷한 관심사나 주제를 가진 학생들이 전문상담자와 함께 모여 서로의
              경험과 생각을 나누는 프로그램입니다. 이야기와 활동을 통해 나를
              새롭게 이해하고, 대인관계·의사소통·문제해결·감정 조절 능력을
              키웁니다.
            </Text>
          </Box>
        </Stack>
      </PageContainer>
      {/* 이럴 때 권해요 섹션 */}
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
                  text="이런 분께 추천해요"
                  inView={animations.recommendHeading}
                />
                {/* 추천 리스트 (2열, 아이콘 + 텍스트) */}
                <Flex
                  wrap={{ base: "wrap", md: "wrap" }}
                  gap={{ base: 5, md: 5 }}
                  w="100%"
                >
                  {[
                    "사람들과 편하게 소통하는 법을 연습하고 싶어요.",
                    "관계에서 반복되는 어려움을 바꾸고 싶어요.",
                    "나와 다른 생각을 안전하게 듣고 배우고 싶어요.",
                    "스트레스·불안을 다루는 방법을 익히고 싶어요.",
                    "진로·학업 동기를 함께 점검하고 싶어요.",
                  ].map((txt, idx) => (
                    <Flex
                      key={idx}
                      align="center"
                      bg="#ffffff"
                      boxShadow="0 8px 16px rgba(0,0,0,0.04)"
                      borderRadius="12px"
                      p={{ base: 3, md: 4 }}
                      gap={3}
                      flex={{ base: "1 1 100%", md: "0 0 calc(50% - 12px)" }}
                      maxW={{ base: "100%", md: "calc(50% - 12px)" }}
                      transition={`all 0.6s ease-out ${0.15 + idx * 0.05}s`}
                      transform={
                        animations.recommendHeading
                          ? "translateY(0)"
                          : "translateY(16px)"
                      }
                      opacity={animations.recommendHeading ? 1 : 0}
                      _hover={{
                        transform: animations.recommendHeading
                          ? "translateY(-2px)"
                          : "translateY(16px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                      }}
                    >
                      <Box
                        w={{ base: "28px", md: "32px" }}
                        h={{ base: "28px", md: "32px" }}
                        borderRadius="8px"
                        bg="#267987"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Image
                          src="/images/icons/check900.png"
                          alt="check900"
                          w="70%"
                          h="auto"
                          filter="brightness(0) invert(1)"
                        />
                      </Box>
                      <Text fontSize={{ base: "14px", md: "18px" }}>{txt}</Text>
                    </Flex>
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
                    text="상담 안내 및 신청 방법"
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
                      title: "진행 방식",
                      icon: "/images/icons/counsels.png",
                      items: [
                        <>
                          <Text as="span" fontWeight="900">
                            소규모 그룹
                          </Text>
                          으로, 주제별로 진행됩니다.
                        </>,
                        <>
                          서로를 존중하는{" "}
                          <Text as="span" fontWeight="900">
                            안전한 규칙
                          </Text>{" "}
                          안에서 대화와 활동을 합니다.
                        </>,
                        <>
                          일정과 횟수는{" "}
                          <Text as="span" fontWeight="900">
                            학기별 안내
                          </Text>{" "}
                          로 공지됩니다.
                        </>,
                        <>
                          집단에서 나눈 모든 이야기는{" "}
                          <Text as="span" fontWeight="900">
                            비밀이 보장
                          </Text>{" "}
                          됩니다.
                        </>,
                      ],
                    },
                    {
                      title: "집단상담 신청 방법",
                      icon: "/images/icons/group.png",
                      items: [
                        "1. UC CLOVER > 심리상담 접속",
                        "2. 집단상담 주제 선택 및 예약하기",
                        "3. 센터의 개별 연락으로 일정 확인 후 참여",
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
                <Text
                  ref={bottomTextRef}
                  fontSize={{ base: "14px", md: "18px" }}
                  mt={5}
                  textAlign="justify"
                  transition="all 0.8s ease 0.2s"
                  transform={
                    animations.bottomNotice
                      ? "translateY(0)"
                      : "translateY(40px)"
                  }
                  opacity={animations.bottomNotice ? 1 : 0}
                >
                  <Text as="span" fontWeight="bold" color="#0D344E">
                    * 집단상담은 학기별 안내에 따라 신청 가능합니다.
                  </Text>
                </Text>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
