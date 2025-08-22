"use client";

import {
  Box,
  Text,
  Heading,
  Stack,
  Container,
  Image,
  Flex,
} from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { CenterServices } from "@/components/sections/CenterServices";
import { QuoteBoxes } from "@/components/sections/QuoteBoxes";
import React, { useState, useEffect, useRef } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";

export default function CompanyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    servicesHeading: false,
    visionHeading: false,
    visionCircles: false,
    visitHeading: false,
    visitText: false,
    visitBoxes: false,
    usageHeading: false,
  });

  // 스크롤 이벤트 처리
  const visitHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const visitTextRef = useRef<HTMLParagraphElement | null>(null);
  const visitBoxesRef = useRef<HTMLDivElement | null>(null);
  const usageHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const servicesContentRef = useRef<HTMLDivElement | null>(null);
  const usageCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [usageCardsVisible, setUsageCardsVisible] = useState<boolean[]>([
    false,
    false,
  ]);
  const [usageCardsArmed, setUsageCardsArmed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const viewportH =
        window.innerHeight || document.documentElement.clientHeight;
      const isInView = (el: HTMLElement | null) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < viewportH - 80 && rect.bottom > 80;
      };

      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 300,
        servicesHeading: isInView(servicesHeadingRef.current),
        visionHeading: isInView(servicesHeadingRef.current),
        visionCircles: isInView(servicesContentRef.current),
        visitHeading: isInView(
          visitHeadingRef.current as unknown as HTMLElement
        ),
        visitText: isInView(visitTextRef.current as unknown as HTMLElement),
        visitBoxes: isInView(visitBoxesRef.current as unknown as HTMLElement),
        usageHeading: isInView(
          usageHeadingRef.current as unknown as HTMLElement
        ),
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true } as any);
    handleScroll(); // 초기 실행

    return () => {
      window.removeEventListener("scroll", handleScroll as any);
    };
  }, []);

  // 이용시간 안내 카드 가시성(2장) - 개별 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const indexAttr = entry.target.getAttribute("data-usage-index");
          const idx = indexAttr ? parseInt(indexAttr, 10) : -1;
          if (idx >= 0) {
            setUsageCardsVisible((prev) => {
              const next = [...prev];
              next[idx] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    usageCardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 제목 보임 후 약간 지연 후 카드 무장(등장 허용)
  useEffect(() => {
    let t: number | undefined;
    if (animations.usageHeading) {
      t = window.setTimeout(() => setUsageCardsArmed(true), 400);
    } else {
      setUsageCardsArmed(false);
    }
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [animations.usageHeading]);

  // 불필요한 중복 감지 제거: 단순 스크롤 핸들러로 일원화

  const heroData = HERO_DATA["/uc/center"];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title={heroData.title}
        subtitle={heroData.subtitle}
        subtitleColor={heroData.subtitleColor}
        backgroundImage={heroData.backgroundImage}
        height={heroData.height}
        menuType="custom"
        customMenuItems={heroData.menuItems}
        animationType={heroData.animationType}
      />

      <PageContainer>
        <Stack>
          {/* 회사 개요 섹션 */}
          <Box position="relative">
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              lineHeight="1.3"
              transition="all 0.8s ease 0.2s"
              transform={
                animations.mainHeading ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.mainHeading ? 1 : 0}
              position="relative"
              zIndex={1}
            >
              언제든 여러분의 소중한 이야기를 들려주세요.
            </Heading>
            <Image
              src="/images/sub/textLine.png"
              alt="heading decoration"
              position="absolute"
              top="10%"
              left="calc(50% - 50vw)"
              transform="translateY(-55%)"
              w="auto"
              h="auto"
              pointerEvents="none"
              zIndex={0}
            />
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              transition="all 0.8s ease 0.4s"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              혼자 버티지 말고, 함께 이야기해요. <br />
              <br />
              학생상담센터는 여러분이 건강한 마음으로 대학생활에 적응하고
              성장하도록 돕는 공간입니다.{" "}
              <Box
                as="br"
                display={{ base: "none", md: "none", lg: "block" }}
              />
              무엇이든 편하게 와서 이야기하세요. 우리는 듣고, 함께 방법을
              찾습니다.
            </Text>
          </Box>
        </Stack>
      </PageContainer>
      <Box
        p={8}
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box paddingInline="0">
            <Stack>
              {/* 회사 개요 섹션 */}
              <Box position="relative">
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                  fontWeight="bold"
                  mb={5}
                  lineHeight="1.3"
                  ref={servicesHeadingRef}
                  transition="all 0.8s ease 1.0s"
                  transform={
                    animations.servicesHeading
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.servicesHeading ? 1 : 0}
                >
                  제공 서비스
                </Heading>
                <Image
                  src="/images/sub/textLine.png"
                  alt="heading decoration"
                  position="absolute"
                  top="8%"
                  left="calc(50% - 50vw)"
                  transform="translateY(-55%)"
                  w="auto"
                  h="auto"
                  pointerEvents="none"
                  zIndex={0}
                />
                <Box
                  width="100%"
                  ref={servicesContentRef}
                  transition="all 0.8s ease 1.2s"
                  transform={
                    animations.visionCircles
                      ? "translateY(0)"
                      : "translateY(50px)"
                  }
                  opacity={animations.visionCircles ? 1 : 0}
                >
                  <CenterServices />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        backgroundColor="white"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box position="relative">
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              ref={visitHeadingRef}
              transition="all 0.8s ease 0.1s"
              transform={
                animations.visitHeading ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.visitHeading ? 1 : 0}
            >
              이럴 때 찾아오세요
            </Heading>
            <Image
              src="/images/sub/textLine.png"
              alt="heading decoration"
              position="absolute"
              top="1%"
              left="calc(50% - 50vw)"
              transform="translateY(-55%)"
              w="auto"
              h="auto"
              pointerEvents="none"
              zIndex={0}
            />
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              mb={6}
              ref={visitTextRef}
              transition="all 0.8s ease 0.2s"
              transform={
                animations.visitText ? "translateY(0)" : "translateY(40px)"
              }
              opacity={animations.visitText ? 1 : 0}
            >
              울산과학대학교 재학생이라면 누구나 이용할 수 있으며,상담 내용은
              철저히 비밀이 보장됩니다. 학생상담센터는 여러분 곁에서, 여러분의
              마음을 함께합니다.
            </Text>
            <Box
              ref={visitBoxesRef}
              transition="all 0.8s ease 0.3s"
              transform={
                animations.visitBoxes ? "translateY(0)" : "translateY(40px)"
              }
              opacity={animations.visitBoxes ? 1 : 0}
            >
              <QuoteBoxes />
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        position="relative"
        p={8}
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box paddingInline="0" position="relative">
            <Stack>
              {/* 회사 개요 섹션 */}
              <Box position="relative">
                <Heading
                  as="h2"
                  fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
                  fontWeight="bold"
                  mb={5}
                  lineHeight="1.3"
                  ref={usageHeadingRef}
                  transition="all 0.8s ease 0.1s"
                  transform={
                    animations.usageHeading
                      ? "translateY(0)"
                      : "translateY(40px)"
                  }
                  opacity={animations.usageHeading ? 1 : 0}
                >
                  이용시간 안내
                </Heading>
                <Image
                  src="/images/sub/textLine.png"
                  alt="heading decoration"
                  position="absolute"
                  top="8%"
                  left="calc(50% - 50vw)"
                  transform="translateY(-55%)"
                  w="auto"
                  h="auto"
                  pointerEvents="none"
                  zIndex={0}
                />
                {/* 2장 카드 그리드 */}
                <Flex
                  wrap={{ base: "wrap", md: "nowrap" }}
                  gap={{ base: 4, md: 6 }}
                  w="100%"
                  justify={{ base: "flex-start", md: "space-between" }}
                >
                  {[
                    {
                      title: "이용시간",
                      icon: "/images/icons/time.png",
                      items: ["월~금: 09:00~18:00 (점심시간 12:00~13:00)"],
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
                        (usageCardRefs.current[idx] = el)
                      }
                      data-usage-index={idx}
                      transition={`all 0.6s ease-out ${0.3 + idx * 0.15}s`}
                      transform={
                        usageCardsArmed && usageCardsVisible[idx]
                          ? "translateY(0)"
                          : "translateY(40px)"
                      }
                      opacity={
                        usageCardsArmed && usageCardsVisible[idx] ? 1 : 0
                      }
                      cursor="default"
                      willChange="transform, box-shadow, border-color"
                      _hover={{
                        transform: "translateY(-4px)",
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
    </Box>
  );
}
