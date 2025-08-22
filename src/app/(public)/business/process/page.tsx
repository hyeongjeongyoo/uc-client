"use client";

import { Box, Text, Heading, Stack, Container, SimpleGrid, VStack, HStack, Icon, Flex, Image } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { useState, useEffect, useRef } from "react";
import { FaIndustry, FaShieldAlt, FaLeaf, FaCog, FaArrowRight } from "react-icons/fa";

export default function ProcessPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    descriptionText: false,
    processText: false,
    process01: false,
    process02: false,
    process03: false,
    process04: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        descriptionText: scrollY > 200,
        processText: scrollY > 250,
        process01: scrollY > 400,
        process02: scrollY > 600,
        process03: scrollY > 800,
        process04: scrollY > 1000,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessMenuItems = [
    { name: "사업분야", href: "/business/business" },
    { name: "주요공정", href: "/business/process" },
  ];

  const processDetails = [
    {
      id: 1,
      title: "원료 공급 단계",
      image: "/images/sub/process1.png",
      width: "80%",
      description: [
        "S-Oil로부터 천연가스(LNG) 공급",
      ],
      direction: "column"
    },
    {
      id: 2,
      title: "고온 수증기 주입",
      image: "/images/sub/process2.png", 
      width: "80%",
      description: [
        "LNG에 고온의 수증기를 주입하여 개질분해 진행"
      ],
      direction: "column"
    },
    {
      id: 3,
      title: "수소 추출 공정",
      image: "/images/sub/process3.png",
      width: "80%",
      description: [
        "개질 과정을 통해 고순도 수소 분리 및 정제"
      ],
      direction: "column"
    },
    {
      id: 4,
      title: "부산물 회수 시스템",
      image: "/images/sub/process4.png",
      width: "80%",
      description: [
        "공정 중 발생하는 스팀과 CO2 회수 및 재활용"
      ],
      direction: "column"
    }
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="BUSINESS"
        subtitle="K&D Energen의 주요공정을 소개합니다"
        backgroundImage="/images/sub/business_bg.jpg"
        height="600px"
        menuType="custom"
        customMenuItems={businessMenuItems}
        animationType="zoom-out"
      />

      <PageContainer>
        <Stack gap={20}>
          {/* 주요공정 소개 섹션 */}
          <Box
            textAlign="center"
            transition="all 0.8s ease"
            transform={
              animations.titleText ? "translateY(0)" : "translateY(50px)"
            }
            opacity={animations.titleText ? 1 : 0}
          >
            <Text
              fontSize={{ base: "16px", lg: "20px", xl: "24px" }}
              fontWeight="bold"
              mb={6}
              color="#4A7CD5"
              letterSpacing="2px"
              textTransform="uppercase"
            >
              PROCESS
            </Text>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={6}
              lineHeight="1.3"
            >
              수증기 촉매 개질방식(SMR)
            </Heading>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              mb={5}
              textAlign="center"
            >
              케이앤디에너젠은 천연가스(LNG)를 원료로 하여 수증기 촉매 개질 방식(Steam Methane Reforming, SMR)을 통해 수소를 생산하고 있습니다. 이 방식은 탄화수소와 물을 고온에서 반응시켜 수소와 일산화탄소를 만들어내는 기술로, 수소는 물론 암모니아, 메탄올 등 다양한 산업 분야에서도 활용됩니다.
            </Text>
          </Box>

          {/* 공정 상세 섹션 */}
          <Box>
            <Text
              fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
              fontWeight="bold"
              mb={10}
              textAlign="center"
              color="#4A7CD5"
              transition="all 0.8s ease"
              transform={
                animations.processText ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.processText ? 1 : 0}
            >
              공정 단계
            </Text>
            
            <Flex
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              gap={{base:5, md:5, lg:0}}
            >
              {processDetails.map((process, index) => (
                <Box
                  key={process.id}
                  borderRadius="20px"
                  border="1px solid #D9D9D9"
                  cursor="pointer"
                  transition="all 0.8s ease"
                  transform={
                    animations[`process0${index + 1}` as keyof typeof animations] 
                      ? "translateX(0)" 
                      : index % 2 === 0 ? "translateX(-100px)" : "translateX(100px)"
                  }
                  opacity={animations[`process0${index + 1}` as keyof typeof animations] ? 1 : 0}
                  _hover={{
                    transform: "translateY(-10px)",
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
                    borderColor: "#4A7CD5",
                    bg: "rgba(74, 124, 213, 0.02)",
                    transition: "all 0.2s ease",
                  }}
                  style={{
                    scrollMarginTop: "100px",
                  }}
                  position="relative"
                  p={8}
                  maxW={{ md: "48%", lg: "24%" }}
                >
                  {/* 상단 원형 숫자 */}
                  <Box
                    w="50px"
                    h="50px"
                    borderRadius="full"
                    bg="#4A7CD5"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                    fontSize="24px"
                    fontWeight="bold"
                    mb={{base:20, md:10, lg:20}}
                    ml={0}
                    boxShadow="0 4px 12px rgba(74, 124, 213, 0.3)"
                  >
                    {process.id}
                  </Box>

                  {/* 텍스트 영역 */}
                  <Box mb={6} textAlign="center">
                    <Heading
                      as="h3"
                      fontSize={{ base: "20px", lg: "24px", xl: "28px" }}
                      fontWeight="bold"
                      mb={3}
                      color="#000"
                    >
                      {process.title}
                    </Heading>

                    <Text
                      fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                      color="#333"
                      lineHeight="1.6"
                      mb={20}
                    >
                      {process.description[0]}
                    </Text>
                  </Box>

                  {/* 하단 일러스트레이션 영역 */}
                  <Box
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      w={process.width || "100%"}
                      maxW="100%"
                    >
                      <Image
                        src={process.image}
                        alt={process.title}
                        w="100%"
                        h="auto"
                        objectFit="contain"
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        </Stack>
      </PageContainer>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}
