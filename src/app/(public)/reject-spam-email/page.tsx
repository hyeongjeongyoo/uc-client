"use client";

import { useState, useEffect } from "react";
import { Box, Text, Heading, Stack } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";

export default function PrivacyPolicyPage() {
  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    descriptionText: false,
    navigation: false,
    intro: false,
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
    section8: false,
    section9: false,
    section10: false,
    section11: false,
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
        intro: scrollY > 400,
        section1: scrollY > 500,
        section2: scrollY > 700,
        section3: scrollY > 900,
        section4: scrollY > 1100,
        section5: scrollY > 1300,
        section6: scrollY > 1500,
        section7: scrollY > 1700,
        section8: scrollY > 1900,
        section9: scrollY > 2100,
        section10: scrollY > 2300,
        section11: scrollY > 2500,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessMenuItems = [
    { name: "이메일무단수집거부", href: "/reject-spam-email" },
    { name: "이메일무단수집거부", href: "/reject-spam-email" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="이메일무단수집거부"
        subtitle="울산과학대학교 심리상담센터의 이메일무단수집거부를 소개합니다"
        backgroundImage="/images/sub/privacy_bg.jpg"
        height="600px"
        menuType="custom"
        customMenuItems={businessMenuItems}
        animationType="pan-right"
      />

      <PageContainer>
        <Stack>
          {/* 이메일무단수집거부 개요 섹션 */}
          <Box>
            <Heading
              as="h2"
              fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
              fontWeight="bold"
              mb={5}
              lineHeight="1.3"
              transition="all 0.8s ease 0.2s"
              transform={
                animations.descriptionText
                  ? "translateY(0)"
                  : "translateY(50px)"
              }
              opacity={animations.descriptionText ? 1 : 0}
            >
              이메일무단수집거부
            </Heading>
            <Box
              transition="all 0.8s ease"
              transform={
                animations.navigation ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.navigation ? 1 : 0}
            >
              {/* 소개 부분 */}
              <Text
                fontSize={{ base: "18px", lg: "18px", xl: "24px" }}
                fontWeight="bold"
                textAlign="justify"
                transition="all 0.8s ease 0.4s"
                transform={
                  animations.intro ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.intro ? 1 : 0}
                mb={8}
              >
                정보통신망 이용촉진 및 정보보호 등에 관한 법률
              </Text>

              {/* Section 1: 개인정보 처리 목적 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section1 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section1 ? 1 : 0}
                mb={4}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginBottom: "3px",
                    display: "block",
                  }}
                >
                  제50조의2 (전자우편주소의 무단 수집행위 등 금지)
                </span>
              </Text>
              <Box
                as="ul"
                pl={4}
                mb={8}
                fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                transition="all 0.8s ease 0.2s"
                transform={
                  animations.section1 ? "translateY(0)" : "translateY(40px)"
                }
                opacity={animations.section1 ? 1 : 0}
              >
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  누구든지 인터넷 홈페이지 운영자 또는 관리자의 사전 동의 없이
                  인터넷 홈페이지에서 자동으로 전자우편주소를 수집 하는 프로그램
                  그 밖의 기술적 장치를 이용하여 전자우편주소를 수집하여서는
                  아니된다.
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  누구든지 제1항의 규정을 위반하여 수집된 전자우편주소를
                  판매ㆍ유통하여서는 아니된다.
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  누구든지 제1항 및 제2항의 규정에 의하여 수집ㆍ판매 및 유통이
                  금지된 전자우편주소임을 알고 이를 정보 전송에 이용하여서는
                  아니된다.
                </Text>
              </Box>
              {/* Section 2: 개인정보 처리·이용 및 보유기간 */}
              <Text
                fontSize={{ base: "14px", lg: "16px", xl: "20px" }}
                textAlign="justify"
                transition="all 0.8s ease"
                transform={
                  animations.section2 ? "translateY(0)" : "translateY(50px)"
                }
                opacity={animations.section2 ? 1 : 0}
                mb={4}
              >
                <span
                  style={{
                    fontWeight: "bold",
                    marginBottom: "3px",
                    fontSize: "18px",
                    display: "block",
                  }}
                >
                  제74조 (벌칙)
                </span>
                <span style={{ fontSize: "18px" }}>다음 각호의 1에 해당하는 자는 1천만원 이하의 벌금에 처한다.</span>
              </Text>
              <Box
                as="ul"
                pl={4}
                mb={8}
                fontSize={{ base: "14px", lg: "16px", xl: "18px" }}
                transition="all 0.8s ease 0.3s"
                transform={
                  animations.section2 ? "translateY(0)" : "translateY(40px)"
                }
                opacity={animations.section2 ? 1 : 0}
              >
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  제8조제4항의 규정을 위반하여 표시ㆍ판매 또는 판매할 목적으로
                  진열한 자
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  제44조의7제1항제1호의 규정을 위반하여 음란한
                  부호ㆍ문언ㆍ음향ㆍ화상 또는 영상을 배포ㆍ판매ㆍ임대하거나
                  공연히 전시한 자
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  제44조의7제1항제3호의 규정을 위반하여 공포심이나 불안감을
                  유발하는 부호ㆍ문언ㆍ음향ㆍ화상 또는 영상을 반복적으로
                  상대방에게 도달하게 한 자
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  제50조제6항의 규정을 위반하여 기술적 조치를 한 자
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  제50조의8의 규정을 위반하여 광고성 정보를 전송한 자
                  제50조의2의 규정을 위반하여 전자우편 주소를 수집ㆍ판매ㆍ유통
                  또는 정보전송에 이용한 자
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  제50조의8의 규정을 위반하여 광고성 정보를 전송한 자
                </Text>
                <Text as="li" mb="5px" style={{ listStyleType: "'· '" }}>
                  제53조제4항을 위반하여 등록사항의 변경등록 또는 사업의
                  양도ㆍ양수 또는 합병ㆍ상속의 신고를 하지 아니한 자
                </Text>
              </Box>
            </Box>
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
