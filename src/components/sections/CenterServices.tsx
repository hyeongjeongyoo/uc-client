import React, { useState, useEffect } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const services = [
  {
    title: "개인상담",
    description: "쓰거나 말하기 힘든 고민을 전문상담사와 1:1로 상담합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <defs>
          <linearGradient
            id="serviceGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#297D83" />
            <stop offset="100%" stopColor="#48AF84" />
          </linearGradient>
        </defs>
        <path
          d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
          stroke="url(#serviceGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "집단상담",
    description:
      "비슷한 고민을 가진 학생들과 함께하는 그룹 상담 프로그램입니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <defs>
          <linearGradient
            id="serviceGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#297D83" />
            <stop offset="100%" stopColor="#0E58A4" />
          </linearGradient>
        </defs>
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          stroke="url(#serviceGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "심리검사",
    description: "다양한 심리검사를 통해 자신을 이해하고 성장할 수 있습니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <defs>
          <linearGradient
            id="serviceGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#297D83" />
            <stop offset="100%" stopColor="#0E58A4" />
          </linearGradient>
        </defs>
        <path
          d="M9 3H5a2 2 0 0 0-2 2v4m6-6h4m4 0h4a2 2 0 0 1 2 2v4m-6-6V3M3 9v6m18-6v6m-18 0v4a2 2 0 0 0 2 2h4m-6-6h6m12 0h-6m6 0v4a2 2 0 0 1-2 2h-4m6-6h-6m-6 6h4m-4 0v-6m4 6v-6"
          stroke="url(#serviceGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "성고충 상담",
    description: "성희롱·성폭력 피해 관련 상담 및 지원을 제공합니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
        <defs>
          <linearGradient
            id="serviceGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#297D83" />
            <stop offset="100%" stopColor="#0E58A4" />
          </linearGradient>
        </defs>
        <path
          d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
          stroke="url(#serviceGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export const CenterServices: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 한 번 보이면 true로 고정 (단방향)
        const anyInView = entries.some((entry) => entry.isIntersecting);
        setIsVisible((prev) => prev || anyInView);
      },
      {
        threshold: 0.1,
        rootMargin: "-100px 0px",
      }
    );

    const container = document.querySelector(".services-container");
    if (container) {
      observer.observe(container);
    }

    return () => observer.disconnect();
  }, []);

  // 마우스 트래킹 기반 효과 제거 (요구사항: 기존 호버 제거 후 통일된 호버 적용)
  return (
    <Flex
      className="services-container"
      gap={{ base: 6, md: 4, lg: 6 }}
      mx="auto"
      width="100%"
      flexDirection={{ base: "column", md: "row" }}
    >
      {services.map((service, index) => (
        <MotionBox
          key={index}
          className="service-card"
          data-index={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 50,
          }}
          transition={{
            duration: 0.5,
            delay: isVisible ? index * 0.3 : 0,
            type: "tween",
            ease: [0.25, 0.1, 0.25, 1],
          }}
          bg="white"
          borderRadius="xl"
          boxShadow="0 8px 16px rgba(0,0,0,0.04)"
          p={{ base: 6, md: 8 }}
          flex="1"
          minHeight={{ base: "auto", md: "300px" }}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="flex-start"
          textAlign="left"
          transitionProperty="transform, box-shadow, border-color"
          transitionDuration="0.6s"
          transitionTimingFunction="ease-out"
          position="relative"
          overflow="hidden"
          cursor="default"
          willChange="transform, box-shadow, border-color"
          whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
          _hover={{ borderColor: "#e2e8f0" }}
        >
          {/* 아이콘 */}
          <Box
            width={{ base: "30px", md: "40px" }}
            height={{ base: "30px", md: "40px" }}
            mb={10}
            position="relative"
            zIndex={2}
          >
            {service.icon}
          </Box>

          {/* 텍스트 */}
          <VStack
            gap={3}
            position="relative"
            zIndex={2}
            alignItems="flex-start"
          >
            <Text
              fontSize={{ base: "16px", md: "24px" }}
              fontWeight="bold"
              color="#333"
            >
              {service.title}
            </Text>
            <Text fontSize={{ base: "14px", md: "16px" }} lineHeight="1.5">
              {service.description}
            </Text>
          </VStack>
        </MotionBox>
      ))}
    </Flex>
  );
};
