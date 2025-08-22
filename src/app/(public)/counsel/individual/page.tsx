"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import { DecoratedHeading } from "@/components/common/DecoratedHeading";

export default function IndividualPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    infoDescription: false,
    recommendHeading: false,
    guideHeading: false,
    crisisNotice: false,
  });

  // "상담 안내 및 신청 방법" 카드가 제목보다 늦게 뜨도록 지연 게이팅
  const [guideCardsArmed, setGuideCardsArmed] = useState(false);

  // 스크롤 이벤트 처리
  const infoDescRef = useRef<HTMLDivElement | null>(null);
  const recommendHeadingRef = useRef<HTMLDivElement | null>(null);
  const guideHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const crisisTextRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 안내 문구 실제 가시성 계산
      let infoInView = false;
      let recommendInView = false;
      let guideInView = false;
      let crisisInView = false;
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

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 300,
        infoDescription: infoInView,
        recommendHeading: recommendInView,
        guideHeading: guideInView,
        crisisNotice: crisisInView,
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
                무엇을 하나요?
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
              <Text as="span" fontWeight="bold">
                전문상담자와 1:1
              </Text>
              로 만나 나의 감정·생각을 이해하고 해결 실마리를 찾습니다. 진로,
              관계, 감정, 자아 등 대학 생활 전반의 고민을 함께 다룹니다.
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
                  text="이런 때 권해요"
                  inView={animations.recommendHeading}
                />
                {/* 1x4 카드 그리드 */}
                <Flex
                  wrap={{ base: "wrap", md: "nowrap" }}
                  w="100%"
                  justify={{ base: "flex-start", md: "space-between" }}
                  gap={{ base: 3, md: 5 }}
                >
                  {/* 카드 공통 스타일 */}
                  {[
                    {
                      title: "성격·감정",
                      icon: "/images/icons/emotion.png",
                      items: [
                        "감정 기복이 심하거나 내 마음을 모르겠을 때",
                        "사소한 일에도 불안하거나 예민해질 때",
                        "부정적 생각의 고리를 끊고 싶을 때",
                      ],
                    },
                    {
                      title: "관계·소통",
                      icon: "/images/icons/relationship.png",
                      items: [
                        "친구·교수·가족 등과의 관계가 반복해서 어려울 때",
                        "혼자가 편하지만 동시에 외롭다고 느껴질 때",
                        "가족 갈등·지속되는 상처로 지칠 때",
                      ],
                    },
                    {
                      title: "학업·진로",
                      icon: "/images/icons/study.png",
                      items: [
                        "집중이 잘 안 되고 미루기가 늘어날 때",
                        "성적 부담·불안이 큰 때",
                        "나의 관심/강점을 찾고 싶을 때",
                        "진로 결정이 막막할 때",
                      ],
                    },
                    {
                      title: "마음 건강",
                      icon: "/images/icons/mental.png",
                      items: [
                        "이유 없이 무기력하고 의욕이 떨어질 때",
                        "잠이 안 오거나 일상이 무겁게 느껴질 때",
                        "그냥 누군가에게 털어놓고 싶을 때",
                      ],
                    },
                  ].map((card, idx) => (
                    <Box
                      key={idx}
                      flex={{ base: "1 1 100%", md: "0 0 calc(25% - 10px)" }}
                      maxW={{ base: "100%", md: "calc(25% - 10px)" }}
                      flexShrink={0}
                      bg="#ffffff"
                      borderRadius="12px"
                      border="1px solid #E5E7EB"
                      boxShadow="0 8px 16px rgba(0,0,0,0.04)"
                      p={{ base: 4, md: 5 }}
                      pt={{ base: "100px", md: "120px" }}
                      pb={{ base: "30px", md: "70px" }}
                      minH={{ base: "auto", md: "200px" }}
                      display="flex"
                      flexDirection="column"
                      gap={3}
                      position="relative"
                      cursor="default"
                      willChange="transform, box-shadow, border-color"
                      _hover={{
                        transform: cardVisible[idx]
                          ? "translateY(-4px)"
                          : "translateY(24px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                        borderColor: "#e2e8f0",
                      }}
                      transition={`all 0.6s ease-out ${0.2 + idx * 0.1}s`}
                      transform={
                        recommendCardsArmed && cardVisible[idx]
                          ? "translateY(0)"
                          : "translateY(24px)"
                      }
                      opacity={recommendCardsArmed && cardVisible[idx] ? 1 : 0}
                    >
                      {/* 상단 아이콘 박스 */}
                      <Box
                        position="absolute"
                        top={8}
                        left={4}
                        w={{ base: "36px", md: "40px" }}
                        h={{ base: "36px", md: "40px" }}
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
                        userSelect="none"
                        pointerEvents="none"
                      ></Box>
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
                      title: "진행 안내",
                      icon: "/images/icons/counsels.png",
                      items: [
                        "일시/시간: 주 1회·회기당 50분 · 총 10회기",
                        "비밀보장: 상담 내용은 관련 법과 윤리 기준에 따라 철저히 보호됩니다.",
                      ],
                    },
                    {
                      title: "개인상담 신청 방법",
                      icon: "/images/icons/onePerson.png",
                      items: [
                        "1. UC CLOVER > 상담신청 접속",
                        "2. 개인정보 수집/이용 동의",
                        "3. 상담실 개별 연락으로 일정 확정",
                        "4. 예약일자 개인상담 진행",
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
                  ref={crisisTextRef}
                  fontSize={{ base: "14px", md: "18px" }}
                  mt={5}
                  textAlign="justify"
                  transition="all 0.8s ease 0.2s"
                  transform={
                    animations.crisisNotice
                      ? "translateY(0)"
                      : "translateY(40px)"
                  }
                  opacity={animations.crisisNotice ? 1 : 0}
                >
                  <Text as="span" fontWeight="bold" color="#0D344E">
                    * 위급할 땐 바로 연락하세요.
                  </Text>
                  <Box as="br" />
                  24시간 위기상담: 1588-9191(생명의 전화) /
                  1577-1099(정신건강위기상담전화)
                </Text>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
