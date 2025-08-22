"use client";

import {
  Box,
  Text,
  Heading,
  Stack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function TherapyPage() {
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
                심리검사
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
              자가진단은 현재 나의 마음 상태를 간단히 살펴볼 수 있는 도구입니다.
              검사 결과는 참고 자료로만 활용하시고, 정확한 이해와 도움이 필요할
              경우 학생상담센터 상담을 통해 자세히 안내받으시기 바랍니다.
            </Text>

            <Flex
              justify="center"
              mt={{ base: "20px", lg: "30px", xl: "100px" }}
            >
              <Link href="/therapy/assessment">
                <Button
                  bg="linear-gradient(135deg, #297D83 0%, #48AF84 100%)"
                  borderRadius="full"
                  px={20}
                  py={6}
                  fontSize={{ base: "14px", lg: "18px" }}
                  _hover={{
                    bg: "linear-gradient(135deg, #297D83 0%, #48AF84 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  검사하러 가기
                </Button>
              </Link>
            </Flex>
            {/* 설문은 /therapy/assessment 에서 진행됩니다. */}
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
