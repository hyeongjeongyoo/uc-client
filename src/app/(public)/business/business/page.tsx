"use client";

import { useRef, useState, useEffect } from "react";
import { Box, Text, Heading, Stack, Flex, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";

export default function ProcessPage() {
  // 각 제품 섹션의 ref 생성
  const business01Ref = useRef<HTMLDivElement>(null);
  const business02Ref = useRef<HTMLDivElement>(null);
  const business03Ref = useRef<HTMLDivElement>(null);

  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    descriptionText: false,
    description: false,
    navigation: false,
    business01: false,
    business02: false,
    business03: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        descriptionText: scrollY > 200,
        description: scrollY > 230,
        navigation: scrollY > 300,
        business01: scrollY > 400,
        business02: scrollY > 1000,
        business03: scrollY > 1500,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 스크롤 이동 함수
  const scrollToProduct = (productRef: React.RefObject<HTMLDivElement>) => {
    productRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const businessMenuItems = [
    { name: "사업분야", href: "/business/business" },
    { name: "사업분야", href: "/business/business" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="BUSINESS"
        subtitle="K&D Energen의 사업 분야를 소개합니다"
        backgroundImage="/images/sub/business_bg.jpg"
        height="600px"
        menuType="custom"
        customMenuItems={businessMenuItems}
        animationType="zoom-out"
      />

      <PageContainer>
        <Stack>
          {/* 회사 개요 섹션 */}
          <Box>
            <Text
              fontSize={{ base: "16px", lg: "20px", xl: "24px" }}
              fontWeight="bold"
              mb={10}
              textAlign="center"
              color="#267987"
              letterSpacing="2"
              transition="all 0.8s ease"
              transform={
                animations.titleText ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.titleText ? 1 : 0}
            >
              BUSINESS
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              lineHeight="1.3"
              textAlign="center"
              transition="all 0.8s ease 0.2s"
              transform={
                animations.descriptionText
                  ? "translateY(0)"
                  : "translateY(50px)"
              }
              opacity={animations.descriptionText ? 1 : 0}
            >
              첨단 수소 및 친환경 에너지 솔루션 사업
            </Heading>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              mb={5}
              textAlign="center"
              transition="all 0.8s ease 0.4s"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}>
              99.99% 고순도 수소의 대량 생산과 석유화학·제철·반도체 등 산업별 맞춤형 공급, 부산물의 자원화(스팀·액화탄산 생산), 그리고 수소 생산 과정에서 발생하는 탄소의 포집 및 재활용을 통해, 환경친화적이고 지속가능한 에너지 생태계를 실현합니다.
            </Text>

            {/* 사업 네비게이션 버튼 */}
            <Box
              position="relative"
              mt={{ base: "30px", lg: "80px", xl: "100px" }}
              mb={{ base: "30px !important", lg: "50px", xl: "80px" }}
              border={{ base: "3px solid #4A7CD5", lg: "5px solid #4A7CD5" }}
              w={{ base: "320px", lg: "420px" }}
              h={{ base: "100px", lg: "130px" }}
              margin="auto"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="100px"
              transition="all 0.8s ease 0.4s"
              transform={
                animations.navigation ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.navigation ? 1 : 0}
              p="5px"
            >
              <Box
                bg="rgb(255, 255, 255)"
                backdropFilter="blur(10px)"
                w="100%"
                h="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="100px"
              >
                <Flex justify="center" align="center" gap={10}>
                  {/* BUSINESS 01 */}
                  <Text
                    w={{ base: "70px", lg: "100px" }}
                    h={{ base: "70px", lg: "100px" }}
                    fontSize={{ base: "12px", lg: "16px" }}
                    fontWeight="bold"
                    color="#666"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{
                      color: "white",
                      bg: "#4A7CD5",
                      boxShadow: "0 8px 25px rgba(74, 124, 213, 0.3)",
                      transform: "scale(1.05)",
                    }}
                    onClick={() => scrollToProduct(business01Ref)}
                  >
                    BUSINESS
                    <br />
                    01
                  </Text>

                  {/* BUSINESS 02 */}
                  <Box
                    w={{ base: "70px", lg: "100px" }}
                    h={{ base: "70px", lg: "100px" }}
                    fontSize={{ base: "12px", lg: "16px" }}
                    fontWeight="bold"
                    color="#666"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{
                      color: "white",
                      bg: "#4A7CD5",
                      boxShadow: "0 8px 25px rgba(74, 124, 213, 0.3)",
                      transform: "scale(1.05)",
                    }}
                    onClick={() => scrollToProduct(business02Ref)}
                  >
                    <Text
                      fontSize={{ base: "12px", lg: "16px" }}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      BUSINESS
                      <br />
                      02
                    </Text>
                  </Box>

                  {/* BUSINESS 03 */}
                  <Text
                    w={{ base: "70px", lg: "100px" }}
                    h={{ base: "70px", lg: "100px" }}
                    fontSize={{ base: "12px", lg: "16px" }}
                    fontWeight="bold"
                    color="#666"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{
                      color: "white",
                      bg: "#4A7CD5",
                      boxShadow: "0 8px 25px rgba(74, 124, 213, 0.3)",
                      transform: "scale(1.05)",
                    }}
                    onClick={() => scrollToProduct(business03Ref)}
                  >
                    BUSINESS
                    <br />
                    03
                  </Text>
                </Flex>
              </Box>
            </Box>

            {/* 제품 섹션들 */}
            <Stack gap={10} w="100%">
              {/* 첫 번째 제품 - 이미지 왼쪽, 텍스트 오른쪽 */}
              <Flex
                ref={business01Ref}
                direction={{ base: "column", md: "column", lg: "row" }}
                justify="space-between"
                align="center"
                gap={10}
                px={{ base: 3, lg: 20 }}
                py={10}
                w="100%"
                borderRadius="20px"
                border="1px solid #D9D9D9"
                cursor="pointer"
                transition="all 0.8s ease"
                transform={
                  animations.business01 ? "translateX(0)" : "translateX(-100px)"
                }
                opacity={animations.business01 ? 1 : 0}
                _hover={{
                  transform: animations.business01
                    ? "translateY(-10px)"
                    : "translateX(-100px) translateY(-10px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                  borderColor: "#4A7CD5",
                  bg: "rgba(74, 124, 213, 0.02)",
                  transition: "all 0.2s ease",
                }}
                style={{
                  scrollMarginTop: "100px",
                }}
              >
                {/* 동그라미 이미지 영역 30% */}
                <Box
                  w={{ base: "100%", lg: "30%" }}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    w={{ base: "200px", lg: "300px" }}
                    h={{ base: "200px", lg: "300px" }}
                    overflow="hidden"
                    borderRadius="50%"
                    bg="gray.100"
                  >
                    <Image
                      src="/images/sub/business1.png"
                      alt="고순도 수소가스"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                </Box>

                {/* 텍스트 영역 60% */}
                <Box w={{ base: "100%", lg: "60%" }} textAlign="center">
                  <Heading
                    as="h3"
                    fontSize={{ base: "14px", lg: "24px", xl: "36px" }}
                    fontWeight="bold"
                    mb={{ base: 5, lg: 10 }}
                    color="#000"
                  >
                    수소가스 제조 및 공급
                  </Heading>

                  <Text
                    fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                    color="#333"
                    lineHeight="1.6"
                  >
                    <strong>고순도 수소 생산:</strong> 99.99% 고순도 수소 시간당 92,000N㎥ 생산
                    <br />
                    <strong>산업용 수소 공급:</strong> 석유화학, 제철, 반도체, 전기전자 등 다양한 산업 분야
                    <br />
                    <strong>전량 맞춤 공급:</strong> S-Oil 샤힌 프로젝트를 비롯한 주요 고객사 맞춤형 공급
                  </Text>
                </Box>
              </Flex>

              {/* 두 번째 제품 - 텍스트 왼쪽, 이미지 오른쪽 */}
              <Flex
                ref={business02Ref}
                direction={{
                  base: "column-reverse !important",
                  md: "column-reverse !important",
                  lg: "row !important",
                }}
                justify="space-between"
                align="center"
                gap={10}
                px={{ base: 3, lg: 20 }}
                py={10}
                w="100%"
                borderRadius="20px"
                border="1px solid #D9D9D9"
                cursor="pointer"
                transition="all 0.8s ease"
                transform={
                  animations.business02 ? "translateX(0)" : "translateX(100px)"
                }
                opacity={animations.business02 ? 1 : 0}
                _hover={{
                  transform: animations.business02
                    ? "translateY(-10px)"
                    : "translateX(100px) translateY(-10px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                  borderColor: "#4A7CD5",
                  bg: "rgba(74, 124, 213, 0.02)",
                  transition: "all 0.2s ease",
                }}
                style={{
                  scrollMarginTop: "100px",
                }}
              >
                {/* 텍스트 영역 60% */}
                <Box w={{ base: "100%", lg: "60%" }} textAlign="center">
                  <Heading
                    as="h3"
                    fontSize={{ base: "16px", lg: "24px", xl: "36px" }}
                    fontWeight="bold"
                    mb={10}
                    color="#000"
                  >
                    부산물 활용 사업
                  </Heading>
                  <Text
                    fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                    color="#333"
                    lineHeight="1.6"
                  >
                    <strong>HP 스팀 생산:</strong> 연간 68만톤의 고압 스팀 생산 및 공급
                    <br />
                    <strong>액화탄산(L-CO2) 제조:</strong> 하루 500~600톤의 99.99% 고순도 액화탄산 생산
                    <br />
                    <strong>탄산 및 드라이아이스 공급:</strong> 국내외 다양한 현장에 CO2 활용제품 공급
                  </Text>
                </Box>

                {/* 동그라미 이미지 영역 30% */}
                <Box
                  w={{ base: "100%", lg: "30%" }}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    w={{ base: "200px", lg: "300px" }}
                    h={{ base: "200px", lg: "300px" }}
                    overflow="hidden"
                    borderRadius="50%"
                    bg="gray.100"
                  >
                    <Image
                      src="/images/sub/business2.png"
                      alt="고압 스팀"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                </Box>
              </Flex>

              {/* 세 번째 제품 - 이미지 왼쪽, 텍스트 오른쪽 */}
              <Flex
                ref={business03Ref}
                direction={{
                  base: "column",
                  md: "column",
                  lg: "row",
                }}
                justify="space-between"
                align="center"
                gap={10}
                px={{ base: 3, lg: 20 }}
                py={10}
                w="100%"
                borderRadius="20px"
                border="1px solid #D9D9D9"
                cursor="pointer"
                transition="all 0.8s ease"
                transform={
                  animations.business03 ? "translateX(0)" : "translateX(-100px)"
                }
                opacity={animations.business03 ? 1 : 0}
                _hover={{
                  transform: animations.business03
                    ? "translateY(-10px)"
                    : "translateX(-100px) translateY(-10px)",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                  borderColor: "#4A7CD5",
                  bg: "rgba(74, 124, 213, 0.02)",
                  transition: "all 0.2s ease",
                }}
                style={{
                  scrollMarginTop: "100px",
                }}
              >
                {/* 동그라미 이미지 영역 30% */}
                <Box
                  w={{ base: "100%", lg: "30%" }}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                    w={{ base: "200px", lg: "300px" }}
                    h={{ base: "200px", lg: "300px" }}
                    overflow="hidden"
                    borderRadius="50%"
                    bg="gray.100"
                  >
                    <Image
                      src="/images/sub/product3.png"
                      alt="액화탄산"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                </Box>

                {/* 텍스트 영역 60% */}
                <Box w={{ base: "100%", lg: "60%" }} textAlign="center">
                  <Heading
                    as="h3"
                    fontSize={{ base: "16px", lg: "24px", xl: "36px" }}
                    fontWeight="bold"
                    mb={10}
                    color="#000"
                  >
                    친환경 에너지 솔루션
                  </Heading>
                  <Text
                    fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                    color="#333"
                    lineHeight="1.6"
                  >
                    <strong>탄소 포집 및 활용:</strong> 수소 생산 과정에서 발생하는 CO2 포집 및 재활용
                    <br />
                    <strong>그린에너지 추구:</strong> 환경친화적 생산 공정을 통한 지속가능한 에너지 생산
                  </Text>
                </Box>
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
