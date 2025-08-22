"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";
import { Flex } from "@chakra-ui/react";

export default function LocationPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    infoDescription: false,
  });

  // 스크롤 이벤트 처리
  const infoDescRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 안내 문구 실제 가시성 계산
      let infoInView = false;
      if (infoDescRef.current) {
        const rect = infoDescRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        infoInView = rect.top < viewportH - 80;
      }

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 250,
        infoDescription: infoInView,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner autoMode={true} />

      <PageContainer>
        <Stack>
          {/* 안내 섹션 */}
          <Box>
            <Box position="relative" mb={5}>
              <Heading
                as="h2"
                fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                fontWeight="bold"
                lineHeight="1.3"
                transition="all 0.6s ease 0.2s"
                transform={
                  animations.mainHeading ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.mainHeading ? 1 : 0}
                position="relative"
                zIndex={1}
              >
                위기 상황별 정보
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
              mb={5}
              transition="all 0.8s ease-out"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              울산과학대학교 학생상담센터의 위기 상황별 대응 및 연계기관을
              안내드립니다.
            </Text>
          </Box>
          {/* 2x2 카드 그리드 */}
          <Flex wrap="wrap" gap={{ base: 4, md: 6 }} w="100%">
            {/* 카드 공통 스타일 */}
            {[
              {
                title: "생명·정신건강 위기 (24시간)",
                items: [
                  "생명의 전화: 1588-9191 (24시간 자살 위기, 극심한 절망감 등)",
                  "정신건강위기상담전화: 1577-0199 (장관·불안·우울·알코올 의존 등 24시간 상담)",
                ],
              },
              {
                title: "보건·복지 연계",
                items: [
                  "보건복지콜센터: 129 (국번없이) (복지·의료 정보 안내 및 연계)",
                ],
              },
              {
                title: "지역(울산) 정신건강 지원",
                items: [
                  "울산광역시정신건강복지센터: 052-220-4930",
                  "동구정신건강복지센터: 052-233-1040",
                  "중구정신건강복지센터: 052-245-5570",
                  "북구정신건강복지센터: 052-255-1534",
                ],
              },
              {
                title: "성폭력·성고충 지원",
                items: [
                  "여성긴급전화 1366 (주간·야간·가정폭력 긴급 상담)",
                  "울산해바라기센터: 052-250-1366 (성폭력·가정폭력·디지털성범죄 의료·법률·상담)",
                  "충북해바라기센터(남성): 052-244-1366 (성폭력 피해 남성 지원)",
                ],
              },
            ].map((card, idx) => (
              <Box
                key={idx}
                flex={{ base: "1 1 100%", md: "1 1 calc(50% - 12px)" }}
                bg="#ffffff"
                borderRadius="12px"
                border="1px solid #eee"
                boxShadow="0 8px 16px rgba(0,0,0,0.04)"
                p={{ base: 5, md: 6 }}
                minH={{ base: "auto", md: "200px" }}
                display="flex"
                flexDirection="column"
                gap={3}
                position="relative"
                transition="all 0.6s ease-out"
                transform={
                  cardVisible[idx] ? "translateY(0)" : "translateY(24px)"
                }
                opacity={cardVisible[idx] ? 1 : 0}
                cursor="default"
                willChange="transform, box-shadow, border-color"
                _hover={{
                  transform: cardVisible[idx]
                    ? "translateY(-4px)"
                    : "translateY(24px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  borderColor: "#e2e8f0",
                }}
              >
                <Heading as="h3" fontSize={{ base: "16px", md: "20px" }}>
                  {card.title}
                </Heading>
                <Box
                  as="ul"
                  pl={3}
                  color="#555"
                  fontSize={{ base: "14px", md: "18px" }}
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
                >
                  <Image
                    src="/images/logo/big_logo.png"
                    alt="UC 로고 워터마크"
                    w={{ base: "64px", md: "96px" }}
                    h="auto"
                    opacity={0.2}
                  />
                </Box>
              </Box>
            ))}
          </Flex>
          <Text
            fontSize={{ base: "14px", md: "18px" }}
            mt={5}
            transition="all 0.6s ease-out"
            transform={
              animations.infoDescription ? "translateY(0)" : "translateY(50px)"
            }
            opacity={animations.infoDescription ? 1 : 0}
            ref={infoDescRef}
          >
            <Text as="span" fontWeight="bold" color="#0D344E">
              * 급한 상황일수록 가장 먼저 24시간 상담 번호로 연락하세요.
            </Text>
            <Box as="br" />* 통화가 어려우면 가까운 사람에게 도움을 요청하고,
            가능한 안전한 장소로 이동하세요.
          </Text>
        </Stack>
      </PageContainer>
    </Box>
  );
}
