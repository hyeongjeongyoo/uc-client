"use client";

import { useState, useEffect } from "react";
import { Box, Heading, Text, chakra } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Keyframe animations
const kenBurnsZoomIn = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
`;
const kenBurnsZoomOut = keyframes`
  0% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;
const kenBurnsPanLeft = keyframes`
  0% { transform: scale(1.1) translateX(0); }
  100% { transform: scale(1.1) translateX(-3%); }
`;
const kenBurnsPanRight = keyframes`
  0% { transform: scale(1.1) translateX(0); }
  100% { transform: scale(1.1) translateX(3%); }
`;
const titleSlideUp = keyframes`
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
`;
const subtitleSlideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;
const progressFill = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;
const scrollPulse = keyframes`
  0%, 100% { opacity: 0.5; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.2); }
`;

// Styled components
const NavButton: React.FC<any> = (props) => (
  <chakra.button
    position="absolute"
    top="50%"
    transform="translateY(-50%)"
    bg="rgba(255, 255, 255, 0.1)"
    border="2px solid"
    borderColor="rgba(255, 255, 255, 0.3)"
    color="white"
    width={{base: "40px", md: "60px", lg: "60px"}}
    height={{base: "40px", md: "60px", lg: "60px"}}
    borderRadius="50%"
    fontSize={{base: "1rem", md: "1.5rem", lg: "1.5rem"}}
    cursor="pointer"
    zIndex={3}
    transition="all 0.3s ease"
    backdropFilter="blur(10px)"
    _hover={{
      bg: "rgba(74, 124, 213, 0.8)",
      borderColor: "#267987",
      transform: "translateY(-50%) scale(1.1)",
    }}
    {...props}
  />
);

const IndicatorButton: React.FC<any> = (props) => (
  <chakra.button
    width="60px"
    height="4px"
    bg="rgba(255, 255, 255, 0.3)"
    border="none"
    borderRadius="2px"
    cursor="pointer"
    transition="all 0.3s ease"
    position="relative"
    overflow="hidden"
    {...props}
  />
);

interface SlideData {
  id: number;
  image: string;
  title: React.ReactNode;
  subtitle: string;
  animation?: "zoom-in" | "zoom-out" | "pan-left" | "pan-right";
}

const HeroSlider = () => {
  const slides: SlideData[] = [
    {
      id: 1,
      image: "/images/main/section1_bg.jpg",
      title: (
        <>
          혁신을 채우는 에너지원,
          <br />
          케이앤디에너젠
        </>
      ),
      subtitle: "청정 에너지 혁신으로 지속가능한 미래를 만들어갑니다",
      animation: "zoom-in",
    },
    {
      id: 2,
      image: "/images/main/section2_bg.jpg",
      title: (
        <>
          수소 에너지의
          <br />
          새로운 패러다임
        </>
      ),
      subtitle: "차세대 수소 생산 기술로 청정 에너지 시대를 선도합니다",
      animation: "pan-right",
    },
    {
      id: 3,
      image: "/images/main/section3_bg.jpg",
      title: (
        <>
          글로벌 에너지
          <br />
          솔루션 리더
        </>
      ),
      subtitle: "세계 최고 수준의 기술력으로 에너지 산업을 혁신합니다",
      animation: "zoom-out",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const currentSlideData = slides[currentSlide];

  const getAnimation = (animationName?: string) => {
    switch (animationName) {
      case "zoom-in":
        return `${kenBurnsZoomIn} 12s ease-in-out infinite alternate`;
      case "zoom-out":
        return `${kenBurnsZoomOut} 12s ease-in-out infinite alternate`;
      case "pan-left":
        return `${kenBurnsPanLeft} 12s ease-in-out infinite alternate`;
      case "pan-right":
        return `${kenBurnsPanRight} 12s ease-in-out infinite alternate`;
      default:
        return `${kenBurnsZoomIn} 12s ease-in-out infinite alternate`;
    }
  };

  return (
    <Box
      position="relative"
      w="100vw"
      h="100vh"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* 배경 슬라이드들 */}
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bgSize="cover"
          backgroundPosition="center" // Corrected
          bgRepeat="no-repeat"
          opacity={index === currentSlide ? 1 : 0}
          transition="opacity 1s cubic-bezier(0.4, 0, 0.2, 1)"
          transform="scale(1.05)"
          bgImage={`url(${slide.image})`}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="inherit"
            bgSize="cover"
            backgroundPosition="center"
            animation={getAnimation(slide.animation)}
          />
        </Box>
      ))}

      <Box
        position="relative"
        zIndex="2"
        textAlign="center"
        color="white"
        maxW="1300px"
        px="2rem"
      >
        <Box
          opacity={isTransitioning ? 0 : 1}
          transform={isTransitioning ? "translateY(20px)" : "translateY(0)"}
          transition="all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <Heading
            fontSize={{base: "32px", md: "48px", lg: "64px"}}
            fontWeight="700"
            mb="1.5rem"
            lineHeight="1.2"
            textShadow="0 4px 20px rgba(0, 0, 0, 0.5)"
            animation={`${titleSlideUp} 1s ease-out 0.3s both`}
          >
            {currentSlideData.title}
          </Heading>
          <Text
            fontSize={{base: "16px", md: "24px", lg: "24px"}}
            fontWeight="300"
            opacity="0.9"
            textShadow="0 2px 10px rgba(0, 0, 0, 0.5)"
            animation={`${subtitleSlideUp} 1s ease-out 0.6s both`}
            lineHeight="1.6"
          >
            {currentSlideData.subtitle}
          </Text>
        </Box>
      </Box>

      {/* 슬라이드 인디케이터 */}
      <Box
        display="none !important"
        position="absolute"
        bottom="10rem"
        left="50%"
        transform="translateX(-50%)"
        gap="1rem"
        zIndex="3"
      >
        {slides.map((_, index) => (
          <IndicatorButton
            key={index}
            onClick={() => goToSlide(index)}
            bg={
              index === currentSlide
                ? "rgba(255, 255, 255, 0.5)"
                : "rgba(255, 255, 255, 0.3)"
            }
          >
            {index === currentSlide && (
              <Box
                position="absolute"
                top="0"
                left="0"
                h="100%"
                bg="#4A7CD5"
                animation={`${progressFill} 6s linear`}
              />
            )}
          </IndicatorButton>
        ))}
      </Box>

      {/* 네비게이션 화살표 */}
      <NavButton
        left="2rem"
        onClick={() =>
          goToSlide((currentSlide - 1 + slides.length) % slides.length)
        }
      >
        &#8249;
      </NavButton>
      <NavButton
        right="2rem"
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
      >
        &#8250;
      </NavButton>

      {/* 스크롤 인디케이터 */}
      <Box
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="0.5rem"
        zIndex="3"
        color="white"
      >
        <Box
          w="2px"
          h="40px"
          bg="linear-gradient(to bottom, transparent, #fff, transparent)"
          animation={`${scrollPulse} 2s ease-in-out infinite`}
        />
        <Text
          fontSize="0.8rem"
          fontWeight="500"
          letterSpacing="2px"
          writingMode="vertical-rl" // Applied directly
          textOrientation="mixed" // Applied directly
        >
          SCROLL
        </Text>
      </Box>
    </Box>
  );
};

export default HeroSlider;
