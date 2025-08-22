"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { DecoratedHeading } from "@/components/common/DecoratedHeading";

export default function TherapyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    infoDescription: false,
    recommendHeading: false,
    guideHeading: false,
    crisisNotice: false,
    assessHeading: false,
  });

  // "상담 안내 및 신청 방법" 카드가 제목보다 늦게 뜨도록 지연 게이팅
  const [guideCardsArmed, setGuideCardsArmed] = useState(false);

  // 스크롤 이벤트 처리
  const infoDescRef = useRef<HTMLDivElement | null>(null);
  const recommendHeadingRef = useRef<HTMLDivElement | null>(null);
  const guideHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const crisisTextRef = useRef<HTMLParagraphElement | null>(null);
  const assessHeadingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 안내 문구 실제 가시성 계산
      let infoInView = false;
      let recommendInView = false;
      let guideInView = false;
      let crisisInView = false;
      let assessInView = false;
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
      if (crisisTextRef.current) {
        const rect = crisisTextRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        crisisInView = rect.top < viewportH - 80;
      }
      if (assessHeadingRef.current) {
        const rect = assessHeadingRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        assessInView = rect.top < viewportH - 80;
      }

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 300,
        infoDescription: infoInView,
        recommendHeading: recommendInView,
        guideHeading: guideInView,
        crisisNotice: crisisInView,
        assessHeading: assessInView,
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
                심리검사란?
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
              transition="all 0.8s ease-out"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
              textAlign="justify"
            >
              나의 성격·감정·관계·진로 등을 이해하도록 돕는 평가 도구예요.
              현재 상태를 객관적으로 살펴보고, 이후 상담과 목표 설정에 활용합니다.
            </Text>
          </Box>
        </Stack>
      </PageContainer>
      {/* 이런 분께 추천해요 섹션 */}
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
                    "내 강점/특성을 알고 싶을 때",
                    "진로·적성이 헷갈릴 때",
                    "집중·학습 습관을 점검하고 싶을 때",
                    "우울·불안·스트레스 정도를 확인하고 싶을 때",
                    "상담을 시작하기 전, 나를 객관적으로 정리하고 싶을 때",
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
                    text="진행 순서 및 안내 사항"
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
                      title: "진행 안내",
                      icon: "/images/icons/counsels.png",
                      items: [
                        "1. UC CLOVER > 심리상담에서 심리검사 신청",
                        "2. 상담자와 검사 종류·일정 확정",
                        "3. 검사 실시(온라인/오프라인, 검사에 따라 소요시간 상이)",
                        "4. 해석상담 필수: 결과 의미 이해 → 맞춤 상담 방향과 성장 목표 함께 세우기",
                      ],
                    },
                    {
                      title: "안내 사항",
                      icon: "/images/icons/onePerson.png",
                      items: [
                        "· 해석상담은 반드시 진행합니다. 개인마다 결과의 의미가 다를 수 있어요.",
                        "· 검사 결과는 의학적 진단이 아닙니다. 치료가 필요하면 연계기관을 안내해 드립니다.",
                        "· 비밀보장: 모든 내용은 법·윤리 기준에 따라 안전하게 보호됩니다.",
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
                          <Text as="li" key={i} mb={1}>
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
      {/* 심리검사 안내 섹션 (표 형태) - 별도 섹션으로 분리 */}
      <Box
        p={8}
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px" paddingInline="0">
          <Box paddingInline="0">
            <Stack>
              <Box>
                <Box ref={assessHeadingRef}>
                  <DecoratedHeading
                    text="심리검사 안내"
                    inView={animations.assessHeading}
                  />
                </Box>
                <Stack gap={{ base: 8, md: 10 }} mt={{ base: 6, md: 8 }}>
                  {/* 블록 1: 나의 성격이 궁금할 때? */}
                  <Box
                    border="1px solid #CBD5E1"
                    borderRadius="12px"
                    bg="#fff"
                    overflow="hidden"
                    transition="all 0.9s ease-out 0.2s"
                    transform={
                      animations.assessHeading
                        ? "translateY(0)"
                        : "translateY(24px)"
                    }
                    opacity={animations.assessHeading ? 1 : 0}
                  >
                    <Box
                      px={{ base: 4, md: 6 }}
                      py={{ base: 3, md: 4 }}
                      bg="#F8FAFC"
                      borderBottom="1px solid #E2E8F0"
                    >
                      <Text
                        fontWeight="bold"
                        color="#0D344E"
                        fontSize={{ base: "16px", md: "18px" }}
                      >
                        나의 성격이 궁금할 때?
                      </Text>
                    </Box>
                    <Box overflowX="auto">
                      <Box
                        display="grid"
                        gridTemplateColumns={{
                          base: "200px 140px 600px",
                          md: "200px 140px 1fr",
                        }}
                        minW={{ base: "940px", md: "auto" }}
                      >
                        {/* 헤더 */}
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderRight={{
                            base: "none",
                            md: "1px solid #E2E8F0",
                          }}
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            검사명
                          </Text>
                        </Box>
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderRight={{
                            base: "none",
                            md: "1px solid #E2E8F0",
                          }}
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            소요시간
                          </Text>
                        </Box>
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            설명
                          </Text>
                        </Box>

                        {/* 본문 행 */}
                        {[
                          {
                            name: "MBTI(성격선호도 검사)",
                            time: "약 30~40분",
                            desc: "나의 성격 유형과 행동·생각 습관을 알아보고, 대인관계나 학업·진로 선택에 도움을 줍니다.",
                          },
                          {
                            name: "TCI(기질 및 성격검사)",
                            time: "약 30~40분",
                            desc: "타고난 기질과 성격 특성을 파악해, 나의 장점과 보완할 점을 쉽게 이해할 수 있습니다.",
                          },
                          {
                            name: "CST(성격강점 검사)",
                            time: "약 30~40분",
                            desc: "나의 대표 강점과 긍정적 자원을 찾아, 자기이해와 자기계발 방향을 세울 수 있습니다.",
                          },
                        ].map((row, i) => (
                          <React.Fragment key={i}>
                            <Box
                              px={4}
                              py={3}
                              borderRight={{
                                base: "none",
                                md: "1px solid #E2E8F0",
                              }}
                              borderBottom={{
                                base: i === 2 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.name}</Text>
                            </Box>
                            <Box
                              px={4}
                              py={3}
                              borderRight={{
                                base: "none",
                                md: "1px solid #E2E8F0",
                              }}
                              borderBottom={{
                                base: i === 2 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.time}</Text>
                            </Box>
                            <Box
                              px={4}
                              py={3}
                              borderBottom={{
                                base: i === 2 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.desc}</Text>
                            </Box>
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  {/* 블록 2: 나의 정서가 궁금할 때? */}
                  <Box
                    border="1px solid #CBD5E1"
                    borderRadius="12px"
                    bg="#fff"
                    overflow="hidden"
                    transition="all 1.0s ease-out 0.5s"
                    transform={
                      animations.assessHeading
                        ? "translateY(0)"
                        : "translateY(24px)"
                    }
                    opacity={animations.assessHeading ? 1 : 0}
                  >
                    <Box
                      px={{ base: 4, md: 6 }}
                      py={{ base: 3, md: 4 }}
                      bg="#F8FAFC"
                      borderBottom="1px solid #E2E8F0"
                    >
                      <Text
                        fontWeight="bold"
                        color="#0D344E"
                        fontSize={{ base: "16px", md: "18px" }}
                      >
                        나의 정서가 궁금할 때?
                      </Text>
                    </Box>
                    <Box overflowX="auto">
                      <Box
                        display="grid"
                        gridTemplateColumns={{
                          base: "200px 140px 600px",
                          md: "200px 140px 1fr",
                        }}
                        minW={{ base: "940px", md: "auto" }}
                      >
                        {/* 헤더 */}
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderRight={{
                            base: "none",
                            md: "1px solid #E2E8F0",
                          }}
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            검사명
                          </Text>
                        </Box>
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderRight={{
                            base: "none",
                            md: "1px solid #E2E8F0",
                          }}
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            소요시간
                          </Text>
                        </Box>
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            설명
                          </Text>
                        </Box>

                        {/* 본문 행 */}
                        {[
                          {
                            name: "MMPI-2(다면적 인성검사)",
                            time: "약 60분~",
                            desc: "나의 성격 특성과 현재 마음 상태를 종합적으로 살펴, 고민이나 어려움의 원인을 이해하는 데 도움을 줍니다.",
                          },
                          {
                            name: "PAI(성격평가 질문지)",
                            time: "약 60분~",
                            desc: "정서과 마음 상태를 종합해 고민의 원인과 해결 방향을 찾는 검사",
                          },
                        ].map((row, i) => (
                          <React.Fragment key={i}>
                            <Box
                              px={4}
                              py={3}
                              borderRight={{
                                base: "none",
                                md: "1px solid #E2E8F0",
                              }}
                              borderBottom={{
                                base: i === 1 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.name}</Text>
                            </Box>
                            <Box
                              px={4}
                              py={3}
                              borderRight={{
                                base: "none",
                                md: "1px solid #E2E8F0",
                              }}
                              borderBottom={{
                                base: i === 1 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.time}</Text>
                            </Box>
                            <Box
                              px={4}
                              py={3}
                              borderBottom={{
                                base: i === 1 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.desc}</Text>
                            </Box>
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  {/* 블록 3: 나의 진로·학습이 궁금할 때? */}
                  <Box
                    border="1px solid #CBD5E1"
                    borderRadius="12px"
                    bg="#fff"
                    overflow="hidden"
                    transition="all 1.1s ease-out 1s"
                    transform={
                      animations.assessHeading
                        ? "translateY(0)"
                        : "translateY(24px)"
                    }
                    opacity={animations.assessHeading ? 1 : 0}
                  >
                    <Box
                      px={{ base: 4, md: 6 }}
                      py={{ base: 3, md: 4 }}
                      bg="#F8FAFC"
                      borderBottom="1px solid #E2E8F0"
                    >
                      <Text
                        fontWeight="bold"
                        color="#0D344E"
                        fontSize={{ base: "16px", md: "18px" }}
                      >
                        나의 진로·학습이 궁금할 때?
                      </Text>
                    </Box>
                    <Box overflowX="auto">
                      <Box
                        display="grid"
                        gridTemplateColumns={{
                          base: "200px 140px 600px",
                          md: "200px 140px 1fr",
                        }}
                        minW={{ base: "940px", md: "auto" }}
                      >
                        {/* 헤더 */}
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderRight={{
                            base: "none",
                            md: "1px solid #E2E8F0",
                          }}
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            검사명
                          </Text>
                        </Box>
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderRight={{
                            base: "none",
                            md: "1px solid #E2E8F0",
                          }}
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            소요시간
                          </Text>
                        </Box>
                        <Box
                          px={4}
                          py={2}
                          bg="#F1F5F9"
                          borderBottom="1px solid #E2E8F0"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="600"
                            fontSize={{ base: "14px", md: "16px" }}
                          >
                            설명
                          </Text>
                        </Box>

                        {/* 본문 행 */}
                        {[
                          {
                            name: "홀랜드 적성탐색검사",
                            time: "약 40~50분",
                            desc: "내가 좋아하는 활동과 잘 맞는 직업·진로 유형을 찾아줍니다.",
                          },
                          {
                            name: "CTI(진로사고검사)",
                            time: "약 20~30분",
                            desc: "진로를 선택할 때의 생각 습관과 태도를 점검해, 의사결정에 도움을 줍니다.",
                          },
                          {
                            name: "MLST(자기조절 학습검사)",
                            time: "약 30~40분",
                            desc: "학습 습관을 점검하고 공부 방법을 분석해, 더 효과적인 학습 전략을 세울 수 있습니다.",
                          },
                          {
                            name: "U&I 진로 탐색검사",
                            time: "약 40~50분",
                            desc: "흥미, 성격, 가치관을 함께 고려해, 나와 잘 맞는 진로와 학습 방향을 제시해 줍니다.",
                          },
                        ].map((row, i) => (
                          <React.Fragment key={i}>
                            <Box
                              px={4}
                              py={3}
                              borderRight={{
                                base: "none",
                                md: "1px solid #E2E8F0",
                              }}
                              borderBottom={{
                                base: i === 3 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.name}</Text>
                            </Box>
                            <Box
                              px={4}
                              py={3}
                              borderRight={{
                                base: "none",
                                md: "1px solid #E2E8F0",
                              }}
                              borderBottom={{
                                base: i === 3 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.time}</Text>
                            </Box>
                            <Box
                              px={4}
                              py={3}
                              borderBottom={{
                                base: i === 3 ? "none" : "1px solid #E2E8F0",
                              }}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              textAlign="center"
                            >
                              <Text>{row.desc}</Text>
                            </Box>
                          </React.Fragment>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
