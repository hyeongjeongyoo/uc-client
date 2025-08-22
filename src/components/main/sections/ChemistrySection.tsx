import { Box, Text, Heading, SystemStyleObject } from "@chakra-ui/react";
import Image from "next/image";
import SpiderChart from "../component/SpiderChart";
import { RefObject, useState, useEffect } from "react";

// AnimatedNumber 컴포넌트 추가
const AnimatedNumber = ({
  value,
  isVisible,
}: {
  value: string;
  isVisible: boolean;
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const targetValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const unit = value.replace(/[0-9,.]/g, "");

  useEffect(() => {
    if (isVisible && targetValue > 0) {
      let start = 0;
      const duration = 2000; // 2초 동안 애니메이션
      const startTime = performance.now();

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const animatedValue = Math.floor(progress * targetValue);

        setCurrentValue(animatedValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCurrentValue(targetValue); // 최종 값으로 설정
        }
      };

      requestAnimationFrame(animate);
    } else if (!isVisible) {
      setCurrentValue(0); // 보이지 않으면 0으로 리셋
    }
  }, [isVisible, targetValue]);

  return (
    <>
      <Text lineHeight={1}>{currentValue.toLocaleString()}</Text>
      <Text fontSize="20px" fontWeight="bold" mt="7px" color="#2c5aa0">
        {unit}
      </Text>
    </>
  );
};

interface ChemistrySectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  stats: Array<{
    category: string;
    rank: string;
  }>;
  statsRef: RefObject<HTMLDivElement>;
}

// Atom과 Bond의 공통 스타일 및 pseudo-element 스타일
const atomStyles: SystemStyleObject = {
  w: "32px",
  h: "32px",
  borderRadius: "50%",
  bg: "radial-gradient(circle at 30% 30%, #ffffff 0%, #a2c4f0 30%, #4A7CD5 60%, #2c5aa0 100%)",
  boxShadow:
    "0 8px 24px rgba(74, 124, 213, 0.5), inset 0 4px 5px rgba(255, 255, 255, 0.5), inset 0 -5px 8px rgba(44, 90, 160, 0.6)",
  position: "relative",
  _before: {
    content: '""',
    position: "absolute",
    top: "-4px",
    left: "-4px",
    right: "-4px",
    bottom: "-4px",
    borderRadius: "50%",
    bg: "radial-gradient(circle, rgba(74, 124, 213, 0.4), transparent 60%)",
    zIndex: -1,
    animation: `atomGlow 3s ease-in-out infinite alternate`,
  },
};

const bondStyles: SystemStyleObject = {
  w: "45px",
  h: "6px",
  bg: "linear-gradient(90deg, #4A7CD5, #66B92F 25%, #7db3f7 50%, #66B92F 75%, #4A7CD5)",
  mx: "4px",
  borderRadius: "3px",
  boxShadow:
    "0 2px 8px rgba(74, 124, 213, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3), inset 0 -1px 2px rgba(0, 0, 0, 0.1)",
  position: "relative",
  _before: {
    content: '""',
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    bg: "linear-gradient(90deg, rgba(74, 124, 213, 0.2), rgba(102, 185, 47, 0.2), rgba(74, 124, 213, 0.2))",
    borderRadius: "4px",
    zIndex: -1,
    filter: "blur(4px)",
  },
};

// 각 분자의 위치와 애니메이션 설정
const molecules = [
  {
    top: "15%",
    right: "12%",
    animation: "elegantFloat1 10s ease-in-out infinite",
  },
  {
    top: "25%",
    right: "8%",
    animation: "elegantFloat2 12s ease-in-out infinite",
  },
  {
    top: "35%",
    right: "15%",
    animation: "elegantFloat3 8s ease-in-out infinite",
  },
  {
    top: "45%",
    left: "8%",
    animation: "elegantFloat4 11s ease-in-out infinite",
  },
  {
    top: "55%",
    left: "12%",
    animation: "elegantFloat5 9s ease-in-out infinite",
  },
  {
    top: "50%",
    left: "5%",
    animation: "elegantFloat6 13s ease-in-out infinite",
  },
];

export default function ChemistrySection({
  sectionRef,
  stats,
  statsRef,
}: ChemistrySectionProps) {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    spiderChart: false,
    arrows: false,
    statsContainer: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 100,
        mainHeading: scrollY > 120,
        description: scrollY > 130,
        spiderChart: scrollY > 140,
        arrows: scrollY > 800,
        statsContainer: scrollY > 1000,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Box
      as="section"
      ref={sectionRef}
      w={{ base: "90%", md: "90%", lg: "100%" }}
      p="150px 0"
      position="relative"
      overflow="hidden"
      margin="auto"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        overflow="hidden"
        pointerEvents="none"
        zIndex={1}
      >
        {molecules.map((style, index) => (
          <Box
            key={index}
            position="absolute"
            display="flex"
            alignItems="center"
            opacity={0.25}
            filter="drop-shadow(0 4px 12px rgba(74, 124, 213, 0.2))"
            top={style.top}
            left={style.left}
            right={style.right}
            animation={style.animation}
          >
            <Box {...atomStyles} />
            <Box {...bondStyles} />
            <Box {...atomStyles} />
          </Box>
        ))}
      </Box>

      <Box textAlign="center" color="black" zIndex={2} position="relative">
        <Box
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          fontWeight="bold"
          mb="30px"
          color="#4A7CD5"
          letterSpacing="2px"
          textTransform="uppercase"
          transition="transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.titleText ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.titleText ? 1 : 0}
        >
          K&D ENERGEN
        </Box>

        <Heading
          as="h1"
          fontSize={{ base: "32px", md: "48px", lg: "64px" }}
          fontWeight="bold"
          lineHeight="1.2"
          mb="20px"
          transition="transform 0.8s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.mainHeading ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.mainHeading ? 1 : 0}
        >
          <Text
            as="span"
            fontWeight="bold"
            letterSpacing="-0.5px"
          >
            Energen 4Sight:
            {/* <br />
            Mapping the Future of Clean Energy */}
          </Text>
        </Heading>

        <Text
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          textAlign="center"
          mb={{ md: "0", lg: "50px" }}
          transition="transform 0.8s 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.description ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.description ? 1 : 0}
        >
          수소 생산 · 전략적 투자 · 스팀 생산 · CO₂{" "}
          <Box as="br" display={{ base: "inline", md: "none" }} />
          포집 4대 지표로 완성하는 토탈 에너지 솔루션 리더십
        </Text>

        <Box
          transition="transform 0.8s 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.spiderChart ? "translateY(-30px)" : "translateY(20px)"
          }
          opacity={animations.spiderChart ? 1 : 0}
        >
          <SpiderChart />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="10px"
          marginTop="30px"
          height="150px"
          transition="transform 0.8s 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.arrows ? "translateY(-20px)" : "translateY(30px)"
          }
          opacity={animations.arrows ? 1 : 0}
        >
          {[0, 0.3, 0.6].map((delay, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="center"
              alignItems="center"
              opacity="0.7"
              animation="moveDown 2s ease-in-out infinite"
              animationDelay={delay ? `${delay}s` : undefined}
            >
              <Image
                src="/images/main/section2_arrow.png"
                alt={`Arrow ${index + 1}`}
                width={60}
                height={60}
              />
            </Box>
          ))}
        </Box>

        <Box
          ref={statsRef}
          display="flex"
          flexWrap="wrap"
          flexDirection={{ base: "column", md: "row", xl: "row" }}
          justifyContent="space-between"
          gap={5}
          marginTop="80px"
          maxWidth={{ base: "100%", md: "100%", xl: "1300px" }}
          margin="80px auto 0"
          transition="transform 0.8s 1.0s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 1.0s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.statsContainer ? "translateY(-30px)" : "translateY(40px)"
          }
          opacity={animations.statsContainer ? 1 : 0}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              backdropFilter="blur(10px)"
              border="2px solid rgba(74, 124, 213, 0.3)"
              padding="30px 20px"
              borderRadius="20px"
              textAlign="center"
              flex="1"
              width={{ base: "100%", md: "48%", xl: "23%" }}
              position="relative"
              overflow="hidden"
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "radial-gradient(circle at 50% 0%, rgba(74, 124, 213, 0.1) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
              _hover={{
                transform: "translateY(-5px)",
                borderColor: "rgba(74, 124, 213, 0.5)",
                boxShadow:
                  "0 20px 40px rgba(74, 124, 213, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <Box
                fontSize="0.95rem"
                color="#4A7CD5"
                marginBottom="1.5rem"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="1px"
                position="relative"
                zIndex="1"
              >
                {stat.category}
              </Box>
              <Box
                fontSize={{ base: "24px", md: "36px", xl: "48px" }}
                color="#2C5AA0"
                fontWeight="800"
                lineHeight="1.1"
                position="relative"
                zIndex="1"
                textShadow="0 2px 4px rgba(74, 124, 213, 0.3)"
              >
                <AnimatedNumber
                  value={stat.rank}
                  isVisible={animations.statsContainer}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
