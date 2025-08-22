"use client";

import { useRef, useState, useEffect } from "react";
import { Box, Text, Heading, Stack, Flex, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";

export default function ProcessPage() {
  // 각 제품 섹션의 ref 생성
  const product01Ref = useRef<HTMLDivElement>(null);
  const product02Ref = useRef<HTMLDivElement>(null);
  const product03Ref = useRef<HTMLDivElement>(null);

  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    descriptionText: false,
    navigation: false,
    product01: false,
    product02: false,
    product03: false,
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
        navigation: scrollY > 300,
        product01: scrollY > 400,
        product02: scrollY > 1000,
        product03: scrollY > 1500,
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
    { name: "제품소개", href: "/business/product" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="BUSINESS"
        subtitle="K&D Energen의 주력 제품을 소개합니다"
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
              color="#4A7CD5"
              letterSpacing="2"
              transition="all 0.8s ease"
              transform={
                animations.titleText ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.titleText ? 1 : 0}
            >
              PRODUCT
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
              고순도 수소, 고압 스팀, 액화 탄산까지 <Box as="br" display={{ base: "inline", md: "none" }} />산업 전반에
              <Box as="br" display={{ base: "none", md: "block" }} />
              &nbsp;안정적으로 공급하는 <Box as="br" display={{ base: "inline", md: "none" }} />고품질 에너지 제품
            </Heading>

            {/* 제품 네비게이션 버튼 */}
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
                  {/* PRODUCT 01 */}
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
                    onClick={() => scrollToProduct(product01Ref)}
                  >
                    PRODUCT
                    <br />
                    01
                  </Text>

                  {/* PRODUCT 02 */}
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
                    onClick={() => scrollToProduct(product02Ref)}
                  >
                    <Text
                      fontSize={{ base: "12px", lg: "16px" }}
                      fontWeight="bold"
                      textAlign="center"
                    >
                      PRODUCT
                      <br />
                      02
                    </Text>
                  </Box>

                  {/* PRODUCT 03 */}
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
                    onClick={() => scrollToProduct(product03Ref)}
                  >
                    PRODUCT
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
                ref={product01Ref}
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
                  animations.product01 ? "translateX(0)" : "translateX(-100px)"
                }
                opacity={animations.product01 ? 1 : 0}
                _hover={{
                  transform: animations.product01
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
                      src="/images/sub/product1.png"
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
                    고순도 수소가스
                  </Heading>

                  <Text
                    fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                    color="#333"
                    lineHeight="1.6"
                  >
                    <strong>순도:</strong> 99.99%
                    <br />
                    <strong>생산능력:</strong> 시간당 42,000Nm³ 이상 (최대 생산량 최대 규모 )
                    <br />
                    <strong>공급 대상:</strong> 3-5대 세미 트레일러, 선박업체, 연구시설, 산업용
                    업체
                    <br />
                    <strong>특징:</strong> 친환경적인 청정연료 공급 보장
                  </Text>
                </Box>
              </Flex>

              {/* 두 번째 제품 - 텍스트 왼쪽, 이미지 오른쪽 */}
              <Flex
                ref={product02Ref}
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
                  animations.product02 ? "translateX(0)" : "translateX(100px)"
                }
                opacity={animations.product02 ? 1 : 0}
                _hover={{
                  transform: animations.product02
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
                    고압 스팀(HP Steam)
                  </Heading>
                  <Text
                    fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                    color="#333"
                    lineHeight="1.6"
                  >
                    <strong>생산량:</strong> 연간 68만톤
                    <br />
                    <strong>용도:</strong> 산업용 열원, 공정용 스팀
                    <br />
                    <strong>공급방식:</strong> 직접 공급 파이프라인 연결
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
                      src="/images/sub/product2.png"
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
                ref={product03Ref}
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
                  animations.product03 ? "translateX(0)" : "translateX(-100px)"
                }
                opacity={animations.product03 ? 1 : 0}
                _hover={{
                  transform: animations.product03
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
                    액화탄산(L-CO2)
                  </Heading>
                  <Text
                    fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                    color="#333"
                    lineHeight="1.6"
                  >
                    <strong>순도:</strong> 99.999%
                    <br />
                    <strong>생산능력:</strong> 일일 500 ~ 600톤
                    <br />
                    <strong>용도:</strong> 탄산음료, 드라이아이스, 용접, 소화기 등
                    <br />
                    <strong>공급 범위:</strong> 국내외 전 지역
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
