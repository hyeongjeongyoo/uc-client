"use client";
import { Box, Heading, Text, chakra } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { SVGProps } from "react";

const moveOnPath = keyframes`
  0%, 5% { offset-distance: 0%; }
  25%, 30% { offset-distance: 25%; }
  50%, 55% { offset-distance: 50%; }
  75%, 80% { offset-distance: 75%; }
  100% { offset-distance: 100%; }
`;

const ChakraSvg = chakra.svg;
const ChakraCircle = chakra.circle;
const ChakraLine = chakra.line;
const ChakraRect = chakra.rect;

const SpiderChart = () => {
  const advantages = [
    { text: "수소가스 제조 및<br />공급", position: "top" },
    { text: "부산물 활용<br />사업", position: "right" },
    { text: "고온·고압<br />스팀", position: "left" },
    { text: "친환경<br />에너지 솔루션", position: "bottom" },
  ];

  const movingPoints = [
    { delay: "0s" },
    { delay: "-2s" },
    { delay: "-4s" },
    { delay: "-6s" },
  ];

  const getAdvantagePosition = (position: string) => {
    switch (position) {
      case "top":
        return {
          top: {base: "-15%", md: "-13%", xl:"-13%"},
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center" as const,
        };
      case "right":
        return {
          top: "50%",
          right: {base: "-25%", md: "-20%", xl:"-20%"},
          transform: "translateY(-50%)",
          textAlign: "left" as const,
        };
      case "bottom":
        return {
          bottom: {base: "-15%", md: "-13%", xl:"-13%"},
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center" as const,
        };
      case "left":
        return {
          top: "50%",
          left: {base: "-25%", md: "-20%", xl:"-20%"},
          transform: "translateY(-50%)",
          textAlign: "right" as const,
        };
      default:
        return {};
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={{base: "auto", md: "500px", lg: "600px"}}
      padding="2rem"
      mt={{base: "80px", md: "80px", lg: "100px"}}
    >
      <Box
        position="relative"
        width={{base: "280px", md: "400px", lg: "500px"}}
        height={{base: "280px", md: "400px", lg: "500px"}}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ChakraSvg
          as="svg"
          viewBox="0 0 400 400"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
        >
          <ChakraCircle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="rgba(74, 124, 213, 0.3)"
            strokeWidth="1"
          />
          <ChakraCircle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="rgba(74, 124, 213, 0.2)"
            strokeWidth="1"
          />
          <ChakraCircle
            cx="200"
            cy="200"
            r="60"
            fill="none"
            stroke="rgba(74, 124, 213, 0.2)"
            strokeWidth="1"
          />
          <ChakraLine
            x1="200"
            y1="20"
            x2="200"
            y2="380"
            stroke="rgba(74, 124, 213, 0.2)"
            strokeWidth="1"
          />
          <ChakraLine
            x1="20"
            y1="200"
            x2="380"
            y2="200"
            stroke="rgba(74, 124, 213, 0.2)"
            strokeWidth="1"
          />
          <ChakraLine
            x1="73"
            y1="73"
            x2="327"
            y2="327"
            stroke="rgba(74, 124, 213, 0.2)"
            strokeWidth="1"
          />
          <ChakraLine
            x1="327"
            y1="73"
            x2="73"
            y2="327"
            stroke="rgba(74, 124, 213, 0.2)"
            strokeWidth="1"
          />
          <ChakraRect
            x="80"
            y="80"
            width="240"
            height="240"
            fill="rgba(74, 124, 213, 0.1)"
            stroke="#4A7CD5"
            strokeWidth="2"
            transform="rotate(45deg)"
            transformOrigin="200px 200px"
          />
          {movingPoints.map((point, index) => (
            <ChakraCircle
              key={index}
              r="4"
              fill="#4A7CD5"
              offsetPath='path("M 200,30.3 L 369.7,200 L 200,369.7 L 30.3,200 Z")'
              animation={`${moveOnPath} 8s linear infinite`}
              animationDelay={point.delay}
              offsetRotate="0deg"
            />
          ))}
        </ChakraSvg>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="#4A7CD5"
        >
          <Heading
            fontSize={{base: "24px", md: "32px", lg: "40px"}}
            fontWeight="600"
            marginBottom="0.2rem"
            letterSpacing="1px"
          >
            K&D
          </Heading>
          <Text fontSize={{base: "24px", md: "32px", lg: "40px"}} fontWeight="700" letterSpacing="1px">
            Energen
          </Text>
        </Box>
        {advantages.map((advantage, index) => (
          <Box
            key={index}
            position="absolute"
            fontSize={{base: "14px", md: "16px", lg: "20px"}}
            fontWeight="500"
            color="#666"
            textAlign="center"
            lineHeight="1.4"
            zIndex="2"
            padding="0.5rem"
            whiteSpace="pre-line"
            {...getAdvantagePosition(advantage.position)}
          >
            {advantage.text.split("<br />").map((line, lineIndex) => (
              <Text key={lineIndex}>{line}</Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SpiderChart;
