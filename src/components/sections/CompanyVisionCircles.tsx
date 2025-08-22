import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// 회전 애니메이션 정의
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 원의 둘레를 따라 위치를 계산하는 함수 (CSS 좌표계 기준)
const getCirclePosition = (angle: number, radius: number) => {
  // CSS에서 12시 방향을 0도로 하고 시계방향으로 증가하도록 조정
  const radian = ((angle - 90) * Math.PI) / 180;
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);
  return { x, y };
};

export const CompanyVisionCircles: React.FC = () => {
  // 큰 점선 원의 반지름 (responsive)
  const circleRadius = {
    base: 160, // 320px / 2
    md: 200, // 400px / 2
    lg: 250, // 500px / 2
  };
  return (
    <Box
      width="100%"
      maxW="100%"
      height={{ base: "400px", md: "450px", lg: "500px" }}
      margin="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      mt={{ base: "20px", md: "50px", lg: "80px", xl: "100px" }}
      px={{ base: "20px", md: "40px" }}
    >
      {/* 큰 점선 원 - 회전 애니메이션 */}
      <Box
        position="absolute"
        width={{ base: "320px", md: "400px", lg: "500px" }}
        height={{ base: "320px", md: "400px", lg: "500px" }}
        borderRadius="50%"
        border="2px dashed #4A7CD5"
        opacity="0.6"
        zIndex="2"
        animation={`${rotate} 50s linear infinite`}
      />

      {/* 흰색 원 (배경) */}
      <Box
        position="absolute"
        width={{ base: "200px", md: "250px", lg: "300px" }}
        height={{ base: "200px", md: "250px", lg: "300px" }}
        borderRadius="50%"
        bg="rgba(255, 255, 255, 0.3)"
        boxShadow="0 8px 25px rgba(0, 0, 0, 0.1)"
        zIndex="1"
      />

      {/* 중앙 CORE VALUE 원 */}
      <Box
        width={{ base: "120px", md: "160px", lg: "200px" }}
        height={{ base: "120px", md: "160px", lg: "200px" }}
        borderRadius="50%"
        bg="#4A7CD5"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 10px 30px rgba(26, 74, 158, 0.51)"
        zIndex="3"
      >
        <Box textAlign="center">
          <Text
            fontSize={{ base: "16px", md: "20px", lg: "28px" }}
            fontWeight="bold"
            color="white"
            lineHeight="1.3"
          >
            CORE <br />
            VALUE
          </Text>
        </Box>
      </Box>

      {/* 안정적 수소 공급 */}
      <Box
        position="absolute"
        transform={{
          base: `translate(${
            getCirclePosition(-15, circleRadius.base + 100).x
          }px, ${
            getCirclePosition(-60, circleRadius.base + 130).y
          }px) translateX(-50%)`,
          md: `translate(${getCirclePosition(-30, circleRadius.md + 0).x}px, ${
            getCirclePosition(-60, circleRadius.md + 110).y
          }px) translateX(-50%)`,
          lg: `translate(${getCirclePosition(-30, circleRadius.lg + 0).x}px, ${
            getCirclePosition(-60, circleRadius.lg + 130).y
          }px) translateX(-50%)`,
        }}
        display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        zIndex="4"
        gap={{ base: 1, md: 4 }}
        maxW={{ base: "200px", md: "300px", lg: "400px" }}
      >
        <Box order={{ base: 1, md: 1 }}>
          <Text
            fontSize={{ base: "14px", md: "16px", lg: "20px", xl: "24px" }}
            fontWeight="bold"
            color="#333"
            mb={{ base: 0, md: 2 }}
            textAlign={{ base: "center", md: "right" }}
          >
            안정적 수소 공급
          </Text>
          <Text
            fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px" }}
            color="#666"
            textAlign={{ base: "center", md: "right" }}
            lineHeight="1.4"
            display={{ base: "none", md: "block" }}
          >
            국내 최대 규모의 수소 생산설비를 통한
            <Box as="br" display={{ base: "inline", md: "none" }} />
            &nbsp;안정적이고 지속적인 수소 공급
          </Text>
        </Box>
        <Box
          width={{ base: "60px", md: "80px", lg: "100px" }}
          height={{ base: "60px", md: "80px", lg: "100px" }}
          borderRadius="50%"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
          border="2px solid #f0f0f0"
          flexShrink={0}
          order={{ base: 1, md: 2 }}
          mx={{ base: "auto", md: "0" }}
        >
          {/* 수소 공급 아이콘 */}
          <Box
            width={{ base: "20px", md: "25px", lg: "30px" }}
            height={{ base: "20px", md: "25px", lg: "30px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#4A7CD5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>
      </Box>

      {/* 우측 - 세계적 기업 도약 */}
      <Box
        position="absolute"
        transform={{
          base: `translate(${
            getCirclePosition(35, circleRadius.base + 110).x
          }px, ${
            getCirclePosition(25, circleRadius.base + 0).y
          }px) translateX(-50%)`,
          md: `translate(${getCirclePosition(60, circleRadius.md + 260).x}px, ${
            getCirclePosition(60, circleRadius.md + 110).y
          }px) translateX(-50%)`,
          lg: `translate(${getCirclePosition(60, circleRadius.lg + 300).x}px, ${
            getCirclePosition(60, circleRadius.lg + 130).y
          }px) translateX(-50%)`,
        }}
        display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "column-reverse", md: "row" }}
        alignItems="center"
        zIndex="4"
        maxW={{ base: "200px", md: "300px", lg: "350px" }}
        gap={{ base: 1, md: 4 }}
      >
        <Box
          width={{ base: "60px", md: "80px", lg: "100px" }}
          height={{ base: "60px", md: "80px", lg: "100px" }}
          borderRadius="50%"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
          border="2px solid #f0f0f0"
          flexShrink={0}
          mx={{ base: "auto", md: "0" }}
        >
          {/* 세계 아이콘 */}
          <Box
            width={{ base: "20px", md: "25px", lg: "30px" }}
            height={{ base: "20px", md: "25px", lg: "30px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
              <circle cx="12" cy="12" r="10" stroke="#4A7CD5" strokeWidth="2" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                stroke="#4A7CD5"
                strokeWidth="2"
              />
            </svg>
          </Box>
        </Box>
        <Box>
          <Text
            fontSize={{ base: "14px", md: "16px", lg: "20px", xl: "24px" }}
            fontWeight="bold"
            color="#333"
            mb={{ base: 0, md: 2 }}
            textAlign={{ base: "center", md: "left" }}
          >
            세계적 기업 도약
          </Text>
          <Text
            fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px" }}
            color="#666"
            textAlign={{ base: "center", md: "left" }}
            lineHeight="1.4"
            display={{ base: "none", md: "block" }}
          >
            수소기술 분야에서 축적한 기술과 노하우로 세계적 기업으로 성장
          </Text>
        </Box>
      </Box>

      {/* 하단 - 지역경제 발전 */}
      <Box
        position="absolute"
        transform={{
          base: `translate(${
            getCirclePosition(-20, circleRadius.base + 110).x
          }px, ${
            getCirclePosition(140, circleRadius.base + 10).y
          }px) translateX(-50%)`,
          md: `translate(${
            getCirclePosition(-20, circleRadius.md + 110).x
          }px, ${
            getCirclePosition(130, circleRadius.md + 10).y
          }px) translateX(-50%)`,
          lg: `translate(${
            getCirclePosition(-20, circleRadius.lg + 130).x
          }px, ${
            getCirclePosition(130, circleRadius.lg + 20).y
          }px) translateX(-50%)`,
        }}
        display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        zIndex="4"
        maxW={{ base: "200px", md: "300px", lg: "350px" }}
        gap={{ base: 2, md: 4 }}
      >
        <Box order={{ base: 2, md: 1 }}>
          <Text
            fontSize={{ base: "14px", md: "16px", lg: "20px", xl: "24px" }}
            fontWeight="bold"
            color="#333"
            mb={{ base: 0, md: 2 }}
            textAlign={{ base: "center", md: "right" }}
            display={{ base: "column", md: "flex-end" }}
          >
            지역경제 발전
          </Text>
          <Text
            fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px" }}
            color="#666"
            textAlign={{ base: "center", md: "right" }}
            lineHeight="1.4"
            display={{ base: "none", md: "block" }}
          >
            울산 지역의 수소 생태계 강화 및 지역산업 발전에 기여
          </Text>
        </Box>
        <Box
          width={{ base: "60px", md: "80px", lg: "100px" }}
          height={{ base: "60px", md: "80px", lg: "100px" }}
          borderRadius="50%"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
          border="2px solid #f0f0f0"
          flexShrink={0}
          order={{ base: 1, md: 2 }}
          mx={{ base: "auto", md: "0" }}
        >
          {/* 지역경제 아이콘 */}
          <Box
            width={{ base: "20px", md: "25px", lg: "30px" }}
            height={{ base: "20px", md: "25px", lg: "30px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
              <path
                d="M3 21h18M5 21V7l8-4v18M19 21V10l-6-3"
                stroke="#4A7CD5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01"
                stroke="#4A7CD5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>
      </Box>

      {/* 좌측 - 환경친화적 경영 */}
      <Box
        position="absolute"
        transform={{
          base: `translate(${
            getCirclePosition(90, circleRadius.base + 0).x
          }px, ${
            getCirclePosition(245, circleRadius.base + 150).y
          }px) translateX(-50%)`,
          md: `translate(${
            getCirclePosition(100, circleRadius.md + 210).x
          }px, ${
            getCirclePosition(248, circleRadius.md + 160).y
          }px) translateX(-50%)`,
          lg: `translate(${
            getCirclePosition(100, circleRadius.lg + 220).x
          }px, ${
            getCirclePosition(245, circleRadius.lg + 160).y
          }px) translateX(-50%)`,
        }}
        display={{ base: "flex", md: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        zIndex="4"
        maxW={{ base: "200px", md: "300px", lg: "350px" }}
        gap={{ base: 2, md: 4 }}
      >
        <Box
          width={{ base: "60px", md: "80px", lg: "100px" }}
          height={{ base: "60px", md: "80px", lg: "100px" }}
          borderRadius="50%"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.1)"
          border="2px solid #f0f0f0"
          flexShrink={0}
          mx={{ base: "auto", md: "0" }}
        >
          {/* 환경 아이콘 */}
          <Box
            width={{ base: "20px", md: "25px", lg: "30px" }}
            height={{ base: "20px", md: "25px", lg: "30px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                stroke="#4A7CD5"
                strokeWidth="2"
              />
              <path
                d="M8 12h8M12 8v8"
                stroke="#4A7CD5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Box>
        </Box>
        <Box>
          <Text
            fontSize={{ base: "14px", md: "16px", lg: "20px", xl: "24px" }}
            fontWeight="bold"
            color="#333"
            mb={{ base: 0, md: 2 }}
            textAlign={{ base: "center", md: "left" }}
          >
            환경친화적 경영
          </Text>
          <Text
            fontSize={{ base: "12px", md: "14px", lg: "16px", xl: "18px" }}
            color="#666"
            textAlign={{ base: "center", md: "left" }}
            lineHeight="1.4"
            display={{ base: "none", md: "block" }}
          >
            온실가스 저감과 대기질 개선을 통한 친환경 미래도시 조성
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
