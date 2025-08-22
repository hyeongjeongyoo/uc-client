"use client";

import { Box, Text, Heading, Stack, Container, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";
import { CounselingBoxes } from "@/components/sections/CounselingBoxes";
import { Flex } from "@chakra-ui/react";
import { DecoratedHeading } from "@/components/common/DecoratedHeading";

export default function SexualCounselingPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    infoDescription: false,
    visitHeading: false,
    visitText: false,
    visitBoxes: false,
    recommendHeading: false,
    violenceHeading: false,
    violenceText: false,
    harassHeading: false,
    harassText: false,
    applySection: false,
    processSection: false,
  });

  // 스크롤 이벤트 처리
  const infoDescRef = useRef<HTMLDivElement | null>(null);
  const recommendHeadingRef = useRef<HTMLDivElement | null>(null);
  const visitHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const visitTextRef = useRef<HTMLParagraphElement | null>(null);
  const visitBoxesRef = useRef<HTMLDivElement | null>(null);
  const violenceHeadingRef = useRef<HTMLDivElement | null>(null);
  const violenceTextRef = useRef<HTMLParagraphElement | null>(null);
  const harassHeadingRef = useRef<HTMLDivElement | null>(null);
  const harassTextRef = useRef<HTMLParagraphElement | null>(null);
  const applySectionRef = useRef<HTMLDivElement | null>(null);
  const processSectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 안내 문구 실제 가시성 계산
      let infoInView = false;
      let recommendInView = false;
      let vHeadingInView = false;
      let vTextInView = false;
      let vBoxesInView = false;
      let vioHeadingInView = false;
      let vioTextInView = false;
      let harHeadingInView = false;
      let harTextInView = false;
      let applyInView = false;
      let processInView = false;
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
      if (visitHeadingRef.current) {
        const rect = visitHeadingRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        vHeadingInView = rect.top < viewportH - 80;
      }
      if (visitTextRef.current) {
        const rect = visitTextRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        vTextInView = rect.top < viewportH - 80;
      }
      if (visitBoxesRef.current) {
        const rect = visitBoxesRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        vBoxesInView = rect.top < viewportH - 80;
      }
      if (violenceHeadingRef.current) {
        const rect = violenceHeadingRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        vioHeadingInView = rect.top < viewportH - 80;
      }
      if (violenceTextRef.current) {
        const rect = violenceTextRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        vioTextInView = rect.top < viewportH - 80;
      }
      if (harassHeadingRef.current) {
        const rect = harassHeadingRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        harHeadingInView = rect.top < viewportH - 80;
      }
      if (harassTextRef.current) {
        const rect = harassTextRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        harTextInView = rect.top < viewportH - 80;
      }
      if (applySectionRef.current) {
        const rect = applySectionRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        applyInView = rect.top < viewportH - 80;
      }
      if (processSectionRef.current) {
        const rect = processSectionRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        processInView = rect.top < viewportH - 80;
      }

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 250,
        infoDescription: infoInView,
        recommendHeading: recommendInView,
        visitHeading: vHeadingInView,
        visitText: vTextInView,
        visitBoxes: vBoxesInView,
        violenceHeading: vioHeadingInView,
        violenceText: vioTextInView,
        harassHeading: harHeadingInView,
        harassText: harTextInView,
        applySection: applyInView,
        processSection: processInView,
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
                성고충상담 안내
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
              textAlign="justify"
              transition="all 0.8s ease-out"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              성희롱·성폭력·성차별 등 성 관련 어려움을 안전하고 비밀이 보장된
              환경에서 상담합니다. 피해를 당했을 때는 물론, 목격했거나
              불안·스트레스가 클 때도 도움을 요청할 수 있어요.
            </Text>
          </Box>
        </Stack>
      </PageContainer>
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
                  text="무엇을 지원하나요?"
                  inView={animations.recommendHeading}
                />
                {/* 1x4 카드 그리드 (아이콘 + 제목 + 설명) */}
                <Flex
                  wrap={{ base: "wrap", md: "nowrap" }}
                  w="100%"
                  justify={{ base: "flex-start", md: "space-between" }}
                  gap={{ base: 3, md: 5 }}
                >
                  {[
                    {
                      title: "1:1 상담",
                      iconType: "chat",
                      desc: "상황 정리, 감정 돌봄, 대처 방법 함께 찾기",
                    },
                    {
                      title: "정보 제공",
                      iconType: "clipboard",
                      desc: "학교 내 절차, 보호 조치, 학사 지원(안내·연계)",
                    },
                    {
                      title: "외부 연계",
                      iconType: "group",
                      desc: "의료·법률·수사 기관(예: 해바라기센터, 1366)과 연결 지원",
                    },
                    {
                      title: "비밀보장",
                      iconType: "shield",
                      desc: "관련 법·윤리에 따라 철저히 보호(자·타해 위험 등 제한적 예외는 사전 안내)",
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
                        position="absolute"
                        top={8}
                        left={4}
                        w={{ base: "36px", md: "40px" }}
                        h={{ base: "36px", md: "40px" }}
                      >
                        {(() => {
                          const gradId = `scGrad_${idx}`;
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
                          if (card.iconType === "chat") {
                            return (
                              <svg
                                viewBox="0 0 24 24"
                                width="100%"
                                height="100%"
                                fill="none"
                              >
                                {Gradient}
                                <path
                                  d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          }
                          if (card.iconType === "group") {
                            return (
                              <svg
                                viewBox="0 0 24 24"
                                width="100%"
                                height="100%"
                                fill="none"
                              >
                                {Gradient}
                                <path
                                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          }
                          if (card.iconType === "clipboard") {
                            return (
                              <svg
                                viewBox="0 0 24 24"
                                width="100%"
                                height="100%"
                                fill="none"
                              >
                                {Gradient}
                                <path
                                  d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9 3h6v4H9z"
                                  stroke={`url(#${gradId})`}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            );
                          }
                          // shield
                          return (
                            <svg
                              viewBox="0 0 24 24"
                              width="100%"
                              height="100%"
                              fill="none"
                            >
                              {Gradient}
                              <path
                                d="M12 2l7 3v6c0 5-3.5 9.5-7 11-3.5-1.5-7-6-7-11V5l7-3z"
                                stroke={`url(#${gradId})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          );
                        })()}
                      </Box>
                      <Heading as="h3" fontSize={{ base: "16px", md: "18px" }}>
                        {card.title}
                      </Heading>
                      <Text
                        color="#555"
                        fontSize={{ base: "14px", md: "16px" }}
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
      {/* 이럴 때 찾아오세요 섹션 (uc/center와 동일 패턴) */}
      <Box
        backgroundColor="white"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box>
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
              이런 경우 바로 상담하세요!
            </Heading>
            <Box
              ref={visitBoxesRef}
              transition="all 0.8s ease 0.3s"
              transform={
                animations.visitBoxes ? "translateY(0)" : "translateY(40px)"
              }
              opacity={animations.visitBoxes ? 1 : 0}
            >
              <CounselingBoxes />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 새 섹션: 성폭력이란? */}
      <Box
        backgroundColor="#fafafa"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box position="relative" mb={5} ref={violenceHeadingRef}>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              lineHeight="1.3"
              transition="all 0.8s ease 0.1s"
              transform={
                animations.violenceHeading
                  ? "translateY(0)"
                  : "translateY(50px)"
              }
              opacity={animations.violenceHeading ? 1 : 0}
              position="relative"
              zIndex={1}
            >
              성폭력이란?
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
              display={{ base: "none", md: "block" }}
            />
          </Box>
          <Text
            ref={violenceTextRef}
            fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
            textAlign="justify"
            transition="all 0.8s ease 0.2s"
            transform={
              animations.violenceText ? "translateY(0)" : "translateY(50px)"
            }
            opacity={animations.violenceText ? 1 : 0}
          >
            성폭력은 개인의 성적 자기결정권을 침해하는 모든 행위를 말하며,
            신체적·정신적 폭력뿐 아니라 상대방의 동의 없이 이루어지는 성적
            언행을 포함합니다. 강간, 강제추행뿐 아니라 몰래카메라 촬영, 성적
            사진·영상 유포 등도 해당되며, 연인 관계나 권력 관계(교수-학생
            등)에서 발생하는 경우도 포함됩니다.
          </Text>
        </Container>
      </Box>

      {/* 새 섹션: 성희롱이란? */}
      <Box
        backgroundColor="white"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
      >
        <Container maxW="1300px">
          <Box position="relative" mb={5} ref={harassHeadingRef}>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              lineHeight="1.3"
              transition="all 0.8s ease 0.1s"
              transform={
                animations.harassHeading ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.harassHeading ? 1 : 0}
              position="relative"
              zIndex={1}
            >
              성희롱이란?
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
              display={{ base: "none", md: "block" }}
            />
          </Box>
          <Text
            ref={harassTextRef}
            fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
            textAlign="justify"
            transition="all 0.8s ease 0.2s"
            transform={
              animations.harassText ? "translateY(0)" : "translateY(50px)"
            }
            opacity={animations.harassText ? 1 : 0}
          >
            성희롱은 상대방이 원하지 않는 성적 언행으로 인해 성적 굴욕감 또는
            불쾌감을 주는 모든 행위를 말합니다. 언어, 행동, 시각적 표현 등
            다양한 형태로 나타나며, 성적 자기결정권을 침해하고 건강한 캠퍼스
            환경을 해치는 행위입니다.
          </Text>
        </Container>
      </Box>

      {/* 새 섹션: 성고충상담 신청방법 / 위급할 땐 */}
      <Box
        backgroundColor="#fafafa"
        pt={{ base: "60px", sm: "80px", md: "120px" }}
        pb={{ base: "60px", sm: "80px", md: "120px" }}
        ref={applySectionRef}
        transition="all 0.8s ease 0.2s"
        style={{
          transform: animations.applySection
            ? "translateY(0)"
            : "translateY(50px)",
          opacity: animations.applySection ? 1 : 0,
        }}
      >
        <Container maxW="1300px">
          <Box mb={5}>
            <DecoratedHeading
              text="성고충상담 신청 및 긴급 안내"
              inView={animations.applySection}
            />
          </Box>
          <Flex wrap={{ base: "wrap", md: "nowrap" }} gap={{ base: 4, md: 6 }}>
            {/* 왼쪽 카드: 성고충상담 신청방법 */}
            <Box
              flex={{ base: "1 1 100%", md: "0 0 calc(50% - 12px)" }}
              maxW={{ base: "100%", md: "calc(50% - 12px)" }}
              bg="#ffffff"
              borderRadius="18px"
              boxShadow="0 10px 24px rgba(0,0,0,0.06)"
              position="relative"
              p={{ base: 4, md: 5 }}
              pt={{ base: "80px", md: "100px" }}
              pb={{ base: "15px", md: "30px" }}
              minH={{ base: "auto", md: "180px" }}
              display="flex"
              flexDirection="column"
              gap={3}
              cursor="default"
              willChange="transform, box-shadow, border-color"
              transitionProperty="transform, box-shadow, border-color"
              transitionDuration="0.6s"
              transitionTimingFunction="ease-out"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                borderColor: "#e2e8f0",
              }}
            >
              {/* 상단 아이콘 */}
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
              >
                <Image
                  src="/images/icons/onePerson.png"
                  alt="icon"
                  w="70%"
                  h="auto"
                  filter="brightness(0) invert(1)"
                />
              </Box>
              <Heading as="h3" fontSize={{ base: "18px", md: "22px" }} mb={4}>
                성고충상담 신청방법
              </Heading>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                fontSize={{ base: "14px", md: "16px" }}
                color="#333"
                textAlign="justify"
              >
                <Text>
                  · 전화상담: 학생상담센터 052-230-0777~0778,
                  010-7354-0153(서예지), 010-9010-2965(황남섭)
                </Text>
                <Text>
                  · 온라인 상담신청(온라인 상담 신청 시, 담당 상담사가 확인 후
                  개별 연락드립니다.)
                </Text>
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

            {/* 오른쪽 카드: 위급할 땐 */}
            <Box
              flex={{ base: "1 1 100%", md: "0 0 calc(50% - 12px)" }}
              maxW={{ base: "100%", md: "calc(50% - 12px)" }}
              bg="#ffffff"
              borderRadius="18px"
              boxShadow="0 10px 24px rgba(0,0,0,0.06)"
              p={{ base: 4, md: 5 }}
              pt={{ base: "80px", md: "100px" }}
              pb={{ base: "15px", md: "30px" }}
              minH={{ base: "auto", md: "180px" }}
              position="relative"
              display="flex"
              flexDirection="column"
              gap={3}
              cursor="default"
              willChange="transform, box-shadow, border-color"
              transitionProperty="transform, box-shadow, border-color"
              transitionDuration="0.6s"
              transitionTimingFunction="ease-out"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                borderColor: "#e2e8f0",
              }}
            >
              {/* 상단 아이콘 */}
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
              >
                <Image
                  src="/images/icons/siren.png"
                  alt="icon"
                  w="60%"
                  h="auto"
                  filter="brightness(0) invert(1)"
                />
              </Box>
              <Heading as="h3" fontSize={{ base: "18px", md: "22px" }} mb={4}>
                위급할 땐
              </Heading>
              <Box
                as="ul"
                pl={2}
                color="#555"
                fontSize={{ base: "14px", md: "16px" }}
              >
                <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                  112(긴급) / 여성긴급전화 1366 / 울산해바라기센터 052-250-1366
                </Text>
                <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                  자세한 번호는 센터 페이지의 ‘위기 상황별 연락처’를 확인하세요.
                </Text>
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
          </Flex>
        </Container>
      </Box>

      {/* 새 섹션: 사건 처리 절차 (프로세스 표) */}
      <Box
        backgroundColor="white"
        pt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        pb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }}
        ref={processSectionRef}
        transition="all 0.8s ease 0.2s"
        style={{
          transform: animations.processSection
            ? "translateY(0)"
            : "translateY(50px)",
          opacity: animations.processSection ? 1 : 0,
        }}
      >
        <Container maxW="1300px">
          <Box mb={5}>
            <DecoratedHeading
              text="사건 처리 절차"
              inView={animations.processSection}
            />
          </Box>

          {/* 캡슐형 프로세스 다이어그램 */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="flex-start"
            gap={{ base: 8, md: 10 }}
          >
            {/* 좌측 단계 1~3 */}
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              w={{ base: "100%", md: "300px" }}
            >
              {[
                "1. 사건발생",
                "2. 성고충상담",
                "3. 상담 접수 및 면담 실시",
              ].map((t, i, arr) => (
                <React.Fragment key={i}>
                  <Box
                    bg="#E9EFF8"
                    color="#0D344E"
                    borderRadius="9999px"
                    px={5}
                    py={3}
                    fontWeight="600"
                    boxShadow="inset 0 1px 0 rgba(255,255,255,0.6)"
                    border="1px solid #dbe4f3"
                  >
                    {t}
                  </Box>
                  {i < arr.length - 1 && (
                    <Box
                      display="flex"
                      justifyContent="center"
                      aria-hidden="true"
                    >
                      <Box as="span">
                        <svg
                          width="24"
                          height="14"
                          viewBox="0 0 24 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 3l9 8 9-8"
                            stroke="#0D344E"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    </Box>
                  )}
                </React.Fragment>
              ))}
              <Box
                bg="#ffffff"
                border="1px solid #E5E7EB"
                borderRadius="12px"
                p={4}
                boxShadow="0 6px 16px rgba(0,0,0,0.04)"
              >
                <Box
                  as="ul"
                  pl={3}
                  color="#555"
                  fontSize={{ base: "14px", md: "15px" }}
                >
                  <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                    상담 참여여부와 고지할 사항 안내
                  </Text>
                  <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                    고충처리부서에서 제공할 수 있는 서비스 등 지원 안내
                  </Text>
                  <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                    사건 경위·증거 확인
                  </Text>
                  <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                    각 이해관계인에 대한 안전 조치
                  </Text>
                  <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                    비밀 보장 범위 및 관련 내 법·절차 안내
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* 우측: 질문 + YES/NO를 함께 나열하는 컬럼 */}
            <Box
              display="flex"
              flexDirection="column"
              gap={5}
              flex="1"
              minW={{ base: "100%", md: "0" }}
            >
              {/* 질문 박스 (우측 컬럼 상단 가득) */}
              <Box
                bg="#E9EFF8"
                color="#0D344E"
                borderRadius="25px"
                px={5}
                py={3}
                fontWeight="700"
                border="1px solid #dbe4f3"
                boxShadow="inset 0 1px 0 rgba(255,255,255,0.6)"
              >
                4. 조사 필요성이 있는가?
              </Box>
              {/* 아래 YES/NO 나란히 */}
              <Flex
                direction={{ base: "row", md: "row" }}
                align="flex-start"
                gap={{ base: 6, md: 8 }}
              >
                {/* YES 영역 */}
                <Box flex="1">
                  <Flex align="center" gap={3} mb={3}>
                    <Box
                      bg="#297D83"
                      color="#fff"
                      borderRadius="9999px"
                      px={3}
                      py={1}
                      fontWeight="700"
                      fontSize="12px"
                    >
                      YES
                    </Box>
                    <Box flex="1" h="1px" bg="#dbe4f3" />
                  </Flex>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={3}
                    textAlign="center"
                  >
                    {[
                      "사건 신고 및 접수",
                      "조사개시",
                      "보고서 작성",
                      "위반행위 판단",
                      "사안 심의·의결",
                      "심의결과 통보",
                      "사건 종료 및 재발 예방 모니터링",
                    ].map((t, i, arr) => (
                      <React.Fragment key={i}>
                        <Box
                          border="1px solid #E5E7EB"
                          bg="#fff"
                          borderRadius="9999px"
                          px={5}
                          py={2}
                          boxShadow="0 4px 10px rgba(0,0,0,0.04)"
                          w="100%"
                        >
                          {t}
                        </Box>
                        {i < arr.length - 1 && (
                          <Box
                            display="flex"
                            justifyContent="center"
                            aria-hidden="true"
                          >
                            <Box as="span">
                              <svg
                                width="24"
                                height="14"
                                viewBox="0 0 24 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 3l9 8 9-8"
                                  stroke="#0D344E"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Box>
                          </Box>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Box>
                {/* NO 영역 */}
                <Box flex="1">
                  <Flex align="center" gap={3} mb={3}>
                    <Box
                      bg="#889C3F"
                      color="#fff"
                      borderRadius="9999px"
                      px={3}
                      py={1}
                      fontWeight="700"
                      fontSize="12px"
                    >
                      NO
                    </Box>
                    <Box flex="1" h="1px" bg="#889C3F" />
                  </Flex>
                  <Box
                    bg="#ffffff"
                    border="1px solid #E5E7EB"
                    borderRadius="12px"
                    p={4}
                    boxShadow="0 6px 16px rgba(0,0,0,0.04)"
                    mb={4}
                  >
                    <Text fontWeight="600" mb={2}>
                      상담 종결
                    </Text>
                    <Box
                      as="ul"
                      pl={3}
                      color="#555"
                      fontSize={{ base: "14px", md: "15px" }}
                    >
                      <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                        상담인의 상담 종결 판단
                      </Text>
                      <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                        필요 시 심리상담 연계
                      </Text>
                    </Box>
                  </Box>
                  <Box
                    bg="#ffffff"
                    border="1px solid #E5E7EB"
                    borderRadius="12px"
                    p={4}
                    boxShadow="0 6px 16px rgba(0,0,0,0.04)"
                  >
                    <Text fontWeight="600" mb={2}>
                      당사자 간 협의 중재
                    </Text>
                    <Box
                      as="ul"
                      pl={3}
                      color="#555"
                      fontSize={{ base: "14px", md: "15px" }}
                    >
                      <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                        합의 성립 여부 확인
                      </Text>
                      <Text as="li" mb={1} style={{ listStyleType: "'· '" }}>
                        합의 이행 여부 모니터링
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
