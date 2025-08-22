"use client";

import { Box, Text, Heading, Stack, Image } from "@chakra-ui/react";

import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace WindowNamespaceFix {
    // dummy namespace to satisfy TS single-augment rule
  }
}

// Window 전역 보강은 파일 내 단일 augment만 허용되므로 별도 변수 선언 사용
// 런타임 접근 시에만 window를 안전하게 참조
type DaumGlobal = {
  roughmap?: { Lander?: new (opts: any) => { render: () => void } };
};

export default function LocationPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    mapHeading: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 200,
        description: scrollY > 300,
        mapHeading: scrollY > 400,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroData = HERO_DATA["/uc/location"];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner autoMode={true} />

      <PageContainer>
        <Stack>
          {/* 위치 안내 섹션 */}
          <Box>
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
            >
              찾아오시는 길
            </Heading>
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              mb={5}
              transition="all 0.8s ease 0.4s"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              울산과학대학교 학생상담센터 위치를 소개해드립니다.
            </Text>
            <Image
              src="/images/sub/location.png"
              alt="heading decoration"
              width="100%"
              height="500px"
              objectFit="cover"
              objectPosition="center"
              zIndex={0}
              transition="all 0.8s ease 0.4s"
              transform={
                animations.mapHeading ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.mapHeading ? 1 : 0}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={6}
              mb={6}
              pb={4}
              borderBottom="2px solid #333"
            >
              <Heading
                fontSize={{ base: "18px", md: "24px", lg: "32px" }}
                fontWeight="bold"
                color="#333"
              >
                울산과학대학교 학생상담센터
              </Heading>
              <Box
                as="button"
                bg="#267987"
                color="white"
                px={6}
                py={3}
                borderRadius="full"
                fontSize="16px"
                fontWeight="bold"
                _hover={{
                  bg: "linear-gradient(135deg, #297D83 0%, #48AF84 100%)",
                  cursor: "pointer",
                }}
                display="flex"
                alignItems="center"
                gap={2}
              >
                View Map
              </Box>
            </Box>

            {/* 주소 정보 */}
            <Box
              display="grid"
              gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={8}
              mb={6}
            >
              <Box>
                <Text fontSize="18px" fontWeight="bold" color="#333" mb={3}>
                  ADDRESS
                </Text>
                <Text fontSize="16px" color="#666" lineHeight="1.6">
                  [44022] 울산광역시 동구 봉수로 101 울산과학대학교 제 1대학관
                  203호 학생상담센터
                </Text>
              </Box>
            </Box>

            {/* 연락처 정보 */}
            <Box mt={6} pt={4} borderTop="1px solid #f0f0f0">
              <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={6}
              >
                <Box>
                  <Text fontSize="16px" fontWeight="bold" color="#333" mb={2}>
                    대표전화
                  </Text>
                  <Text fontSize="16px" color="#267987" fontWeight="medium">
                    052-230-0776~0778
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="16px" fontWeight="bold" color="#333" mb={2}>
                    팩스
                  </Text>
                  <Text fontSize="16px" color="#267987" fontWeight="medium">
                    052-234-9300
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
