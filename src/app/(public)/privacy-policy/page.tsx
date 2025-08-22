"use client";

import { useState, useEffect } from "react";
import { Box, Text, Heading, Stack, Grid } from "@chakra-ui/react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeroBanner } from "@/components/sections/PageHeroBanner";
import { useRef } from "react";
import { HERO_DATA } from "@/lib/constants/heroSectionData";
import { Image } from "@chakra-ui/react";

export default function PrivacyPolicyPage() {
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

  const businessMenuItems = [
    { name: "개인정보처리방침", href: "/privacy-policy" },
    { name: "개인정보처리방침", href: "/privacy-policy" },
  ];

  return (
    <Box>
      {/* 상단 배너 컴포넌트 */}
      <PageHeroBanner
        title="개인정보처리방침"
        subtitle="울산과학대학교 학생상담센터의 개인정보처리방침을 소개합니다"
        subtitleColor="#0D344E"
        backgroundImage="/images/sub/privacy_bg.jpg"
        height="600px"
        menuType="custom"
        customMenuItems={businessMenuItems}
        animationType="pan-right"
      />

      <PageContainer>
        <Stack>
          {/* 개인정보취급방침 개요 섹션 */}
          <Box position="relative">
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
              position="relative"
              zIndex={1}
            >
              개인정보처리방침
            </Heading>
            <Image
              src="/images/sub/textLine.png"
              alt="heading decoration"
              position="absolute"
              top="10%"
              left="calc(50% - 50vw)"
              transform="translateY(-55%)"
              w="auto"
              h="auto"
              pointerEvents="none"
              zIndex={0}
            />
            <Text
              fontSize={{ base: "14px", lg: "20px", xl: "24px" }}
              transition="all 0.8s ease 0.4s"
              transform={
                animations.description ? "translateY(0)" : "translateY(50px)"
              }
              opacity={animations.description ? 1 : 0}
            >
              울산과학대학교는 개인정보 보호법 제30조에 따라 정보주체의
              개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수
              있도록 하기 위하여 다음과 같이 개인정보 처리방침을
              수립·공개합니다.
            </Text>
          </Box>

          {/* 주요 개인정보 처리 표시(라벨링) 섹션 */}
          <Stack>
            <Box position="relative" mt={{ base: 10, md: 20 }}>
              <Heading
                as="h3"
                fontSize={{ base: "16px", lg: "18px", xl: "28px" }}
                fontWeight="bold"
                mb={5}
                lineHeight="1.3"
                transition="all 0.6s ease 0.1s"
              >
                주요 개인정보 처리 표시(라벨링)
              </Heading>

              {/* 라벨링 그리드 */}
              <Box
                border="1px solid #E5E7EB"
                borderRadius="18px"
                overflow="hidden"
                bg="#ffffff"
              >
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                  gap={0}
                >
                  {[
                    {
                      title: "일반개인정보수집",
                      desc: "세부항목은 개인정보 처리방침 본문 확인",
                    },
                    {
                      title: "개인정보처리목적",
                      desc: "수집 · 이용 목적 고지",
                    },
                    { title: "개인정보보유기간", desc: "보유 및 보존 기간" },
                    { title: "개인정보의 제공", desc: "제3자 제공 여부" },
                    { title: "처리위탁", desc: "수탁사 및 범위" },
                    { title: "고충처리부서", desc: "문의 · 민원 접수" },
                  ].map((item, idx) => {
                    const isLastRow = idx >= 3;
                    const isLastCol = (idx + 1) % 3 === 0;
                    return (
                      <Box
                        key={idx}
                        py={{ base: 8, md: 10 }}
                        px={{ base: 4, md: 6 }}
                        textAlign="center"
                        borderRight={{
                          md: isLastCol ? "none" : "1px solid #E5E7EB",
                        }}
                        borderTop={isLastRow ? "1px solid #E5E7EB" : "none"}
                      >
                        {/* 아이콘 원형 */}
                        <Box
                          mx="auto"
                          w={{ base: "56px", md: "64px" }}
                          h={{ base: "56px", md: "64px" }}
                          borderRadius="full"
                          bg="#F5FAFF"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mb={4}
                        >
                          {/* 심플 라인 아이콘 (gradient stroke) */}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            preserveAspectRatio="xMidYMid meet"
                            style={{ display: "block" }}
                            fill="none"
                          >
                            <defs>
                              <linearGradient
                                id={`privacyGradient_${idx}`}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                              >
                                <stop offset="0%" stopColor="#297D83" />
                                <stop offset="100%" stopColor="#0E58A4" />
                              </linearGradient>
                            </defs>
                            {/* 간단한 변형으로 6개 모두 표현 */}
                            {idx === 0 && (
                              <path
                                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 8v-1a5 5 0 0 0-5-5H11a5 5 0 0 0-5 5v1"
                                stroke={`url(#privacyGradient_${idx})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {idx === 1 && (
                              <path
                                d="M4 4h16v4H4zM4 10h16M4 14h10"
                                stroke={`url(#privacyGradient_${idx})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {idx === 2 && (
                              <path
                                d="M12 8v5l3 3M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"
                                stroke={`url(#privacyGradient_${idx})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {idx === 3 && (
                              <path
                                d="M4 12h16M12 4v16"
                                stroke={`url(#privacyGradient_${idx})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {idx === 4 && (
                              <path
                                d="M21 7l-9 10L3 12"
                                stroke={`url(#privacyGradient_${idx})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                            {idx === 5 && (
                              <path
                                d="M12 8a4 4 0 1 0 0 8h5l3 3v-9a4 4 0 0 0-8 0"
                                stroke={`url(#privacyGradient_${idx})`}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            )}
                          </svg>
                        </Box>

                        <Text
                          fontSize={{ base: "15px", md: "18px" }}
                          fontWeight="bold"
                          color="#333"
                        >
                          {item.title}
                        </Text>
                        <Text
                          mt={2}
                          fontSize={{ base: "12px", md: "14px" }}
                          color="#6b7280"
                        >
                          {item.desc}
                        </Text>
                      </Box>
                    );
                  })}
                </Grid>
              </Box>
              <Text fontSize={{ base: "14px", md: "18px" }} mt={3} mb={6}>
                ※ 기호를 클릭하시면 세부 사항을 확인할 수 있으며, 자세한 내용은
                아래의 개인정보 처리방침을 확인하시기 바랍니다.
              </Text>
              {/* 제1조 (개인정보의 처리목적) */}
              <Box mt={{ base: 12, md: 16 }}>
                <Heading
                  as="h3"
                  display="flex"
                  alignItems="center"
                  gap={3}
                  fontSize={{ base: "16px", lg: "18px", xl: "24px" }}
                  fontWeight="extrabold"
                  mb={4}
                >
                  제1조 (개인정보의 처리목적)
                </Heading>
                <Text fontSize={{ base: "14px", md: "18px" }} mb={6}>
                  울산과학대학교는 다음의 목적을 위하여 개인정보를 처리합니다.
                  처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지
                  않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에
                  따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </Text>

                <Box mt={8}>
                  <Heading
                    as="h4"
                    fontSize={{ base: "16px", md: "18px" }}
                    mb={3}
                  >
                    홈페이지 회원 가입 및 관리
                  </Heading>
                  <Box as="ul" pl={5} fontSize={{ base: "14px", md: "18px" }}>
                    <Text as="li" mb={2}>
                      회원 가입의사 확인, 회원제 서비스 제공에 따른 본인
                      식별·인증, 회원자격 유지·관리
                    </Text>
                    <Text as="li" mb={2}>
                      제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용
                      방지
                    </Text>
                    <Text as="li" mb={2}>
                      만 14세 미만 아동의 개인정보 처리 시 법정대리인의 동의
                      여부 확인, 각종 고지·통지, 고충처리
                    </Text>
                  </Box>
                </Box>

                <Box mt={8}>
                  <Heading
                    as="h4"
                    fontSize={{ base: "16px", md: "18px" }}
                    mb={3}
                  >
                    서비스 제공
                  </Heading>
                  <Box as="ul" pl={5} fontSize={{ base: "14px", md: "18px" }}>
                    <Text as="li" mb={2}>
                      대학 소식 및 공지사항, 교육콘텐츠 제공, 증명서 발급(교육
                      수료증) 지원
                    </Text>
                    <Text as="li" mb={2}>
                      본인인증 및 입학관련 정보 등의 서비스 제공
                    </Text>
                  </Box>
                </Box>

                <Box mt={8}>
                  <Heading
                    as="h4"
                    fontSize={{ base: "16px", md: "18px" }}
                    mb={3}
                  >
                    민원사무 처리
                  </Heading>
                  <Box as="ul" pl={5} fontSize={{ base: "14px", md: "18px" }}>
                    <Text as="li" mb={2}>
                      민원인의 신원 확인 및 민원사항 확인
                    </Text>
                    <Text as="li" mb={2}>
                      사실조사를 위한 연락·통지, 처리결과 통보
                    </Text>
                  </Box>
                </Box>
                {/* 제2조 (개인정보파일의 등록 및 공개) */}
                <Box mt={{ base: 12, md: 16 }}>
                  <Heading
                    as="h3"
                    fontSize={{ base: "16px", lg: "18px", xl: "24px" }}
                    fontWeight="extrabold"
                    mb={4}
                  >
                    제2조(개인정보파일의 등록 및 공개)
                  </Heading>
                  <Text fontSize={{ base: "14px", md: "18px" }} mb={4}>
                    울산과학대학교는 개인정보보호법 제32조에 따라 개인정보파일을
                    등록·공개하며, 개인정보파일의 목록과 세부 내용은 학교
                    홈페이지의 개인정보처리방침 게시판에서 확인하실 수 있습니다.
                  </Text>

                  {/* 표: therapy/therapy 표 스타일을 따른 가로 스크롤 그리드 */}
                  <Box
                    overflowX="auto"
                    border="1px solid #E5E7EB"
                    borderRadius="12px"
                    bg="#ffffff"
                  >
                    <Box
                      display="grid"
                      gridTemplateColumns="140px 200px 220px 220px 1fr 120px"
                    >
                      {/* 헤더 */}
                      {[
                        "보유부서",
                        "개인정보 파일 명칭",
                        "운영근거",
                        "처리목적",
                        "개인정보 항목",
                        "보유기간",
                      ].map((h) => (
                        <Box
                          key={h}
                          p={{ base: 3, md: 4 }}
                          bg="#F9FAFB"
                          borderRight="1px solid #E5E7EB"
                          borderBottom="1px solid #E5E7EB"
                          fontSize={{ base: "14px", md: "16px" }}
                          fontWeight="semibold"
                          textAlign="center"
                        >
                          {h}
                        </Box>
                      ))}

                      {/* Row 1 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        교무팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        학적 및 성적관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        고등교육법시행령 제4조 및 제73조
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        학적변동 및 성적 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 생년월일, 집연락처, 집주소, 핸드폰(연락처),
                        E-Mail, 직장연락처, 직장주소, 주민등록번호, 사진, 학번,
                        학과, 전공, 국적, 학적, 캠퍼스, 전화번호, 보호자 연락처,
                        직장, 학적부 기재사항(등록, 장학, 성적, 학적변동사항,
                        수강/출결, 시간표, 기초학습, 튜터링, 어학능력/교육,
                        국제교류, 취업, 교직, 장애, 현장실습, 자치활동, 상담,
                        고등학교, 신상변동, 기숙사, 가상강의 등)
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>
                      {/* Row 2 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        교무팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        졸업관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        고등교육법시행령 제4조
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        졸업관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 집연락처, 집주소, 핸드폰(연락처), E-Mail,
                        직장연락처, 직장주소, 주민등록번호, 사진, 학번, 학과,
                        전공, 국적, 학적, 캠퍼스, 보호자 연락처, 직장, 학적부
                        기재사항(등록, 장학, 성적, 학적변동사항, 수강/출결,
                        시간표, 기초학습, 튜터링, 어학능력/교육, 국제교류, 취업,
                        교직, 장애, 현장실습, 자치활동, 상담, 고등학교,
                        신상변동, 기숙사, 가상강의 등)
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 3 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        교무팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교원자격관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교원자격검정령 제31조
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교원자격증 발급대상 학생관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 핸드폰(연락처), 주민등록번호, 사진, 졸업정보, 각종
                        자격면허번호 등
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>
                      {/* Row 4: 입학팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        입학팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        입학지원자명단
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 고등교육법시행령 제35조 및 제73조{`\n`}- 정보주체의
                        동의
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        입시전형 업무수행
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 연락처, 집주소, 주민등록번호, 고교졸업년도,
                        출신고교명, 검정고시 출신지구, 고졸검정구분, 고교구분,
                        지원학과, 지원형, 가족 휴대전화 연락처, 학생부 자료
                        온라인 제공 동의여부, 수시모집 합격여부, 고교
                        생활기록부(성적, 학교생활 및 상벌사항 등), 학력, 성별,
                        대학수학능력시험 성적, 기능 및 자격정보, 고교 졸업학력
                        검정고시 성적, 출신대학, 대학재학기간 및 졸업여부, 대학
                        졸업성적, 산업체명, 직업구분, 산업체경력사항(재직증명,
                        4대보험 증명, 추천서, 협약서), 납세사실증명, 소득증명,
                        재직산업체정보(산업체명, 사업자등록번호, 업종, 주소,
                        대표자, 종업원수, 대표전화, 부서전화, FAX, 근무경력),
                        졸업증명, 성적증명, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        10년
                      </Box>

                      {/* Row 5: 평생교육원운영팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        평생교육원운영팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        평생교육수강생
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 평생교육법시행규칙 제4조{`\n`}- 학점인정등에 관한 법률
                        시행령 제19조의2{`\n`}- 정보주체의 동의
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        수강생 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 집주소, 핸드폰(연락처), 주민등록번호, 최종학력,
                        성별, 차량번호, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 학생복지팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        학생복지팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        장학생관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 대학등록금에 관한 규칙 제3조{`\n`}- 한국장학재단 설립
                        등에 관한 법률 제50조 제2항 제10호, 제50조의2 제1항
                        제10호{`\n`}- 한국장학재단설립등에 관한 법률 시행령
                        제36조의2
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교내·외 장학 및 학자금 대출 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 핸드폰(연락처), 주민등록번호, 학번, 학부(과),
                        전공, 학년, 학적상태, 입학과정, 계좌번호, 장학사항,
                        납입사항, 국가장학금 반환(수정)사항, 성적정보, 수강정보,
                        학자금 대출사항, 학적변동사항, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        영구
                      </Box>

                      {/* Row 추가: 진로취업팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        진로취업팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        진로·취업지원
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 교육기본법 제26조의3{`\n`}- 고등교육법 제11조의3{`\n`}
                        - 통계법 승인번호 제920024호{`\n`}- 교육관련기관의
                        정보공개에 관한 특례법 제6조{`\n`}- 교육통계조사에 관한
                        교육부 훈령 제260호
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교육부 고등교육기관 졸업자 취업통계조사
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 집연락처, 집주소, 핸드폰(연락처), E-Mail,
                        주민등록번호, 학교명, 단과대학명, 학부명, 학과명,
                        주야간구분, 학번, 성별, 우편번호, 입학연월, 졸업연월,
                        부전공학과명, 복수전공학과명, 부/복수전공 여부,
                        편입여부, 외국인유학생여부, 산업체위탁생여부,
                        출신고교지역, 출신고교, 국가기술자격여부,
                        교직과정이수여부, 예비역여부, 해외연수여부, 토익점수,
                        졸업유예기간, 현장실습여부, 장애인 여부, 졸업 평점, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        5년
                      </Box>

                      {/* Row 추가: 대외협력실 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        대외협력실
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        발전기금기탁자관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 기부금품의 모집 및 사용에 관한 법률 시행령 제11조
                        {`\n`}- 소득세법 시행령 제208조의3 제1항 제1호
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        발전기금 기탁자 관리 및 기부금 영수증 발급
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 집주소, 핸드폰(연락처), E-Mail, 주민등록번호,
                        기부액, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>
                      {/* Row 추가: 학생생활관 운영팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        학생생활관 운영팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        사생선발관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        정보주체의 동의
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        입사생 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 집연락처, 집주소, 핸드폰(연락처), 학번, 학과,
                        학적상태, 보호자연락처, 은행정보, 사진 등
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        4년
                      </Box>

                      {/* Row 추가: 교무팀 (교원인사관리) */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        교무팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교원인사관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        울산공업학원교원임용규정
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교원 및 학사조교 인사관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 생년월일, 집연락처, 집주소, 핸드폰(연락처),
                        E-Mail, 주민등록번호, 성별, 병역사항, 보훈관련사항,
                        장애관련사항, 가족사항, 학력사항, 경력사항, 자격사항,
                        수상경력, 계좌번호, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 총무팀 (직원인사관리) */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        총무팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        직원인사관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        울산공업학원직원임용규정
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        직원 및 행정조교 인사관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 생년월일, 집연락처, 집주소, 핸드폰(연락처),
                        E-Mail, 주민등록번호, 성별, 병역사항, 보훈관련사항,
                        장애관련사항, 가족사항, 학력사항, 경력사항, 자격사항,
                        수상경력, 계좌번호, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 기획팀 (교육기본통계조사, 대학정보공시) */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        기획팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교육기본통계조사, 대학정보공시
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 고등교육법 제11조의3,{`\n`}- 교육통계조사에 관한 훈령,
                        {`\n`}- 통계법에 따른 통계청 지정 통계 승인번호
                        제334001호,{`\n`}- 공공기록물 관리에 관한 법률 시행령,
                        [별표1] 기록물의 보존기간별 책정기준
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        고등교육기관 교육기본통계조사 및 대학정보공시
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 생년월일, 핸드폰(연락처), E-Mail, 주민등록번호,
                        외국인등록번호, 사용자 ID, 성별, 소속기관, 소속부서,
                        직급, 인증서 정보, 학생구분, 학번, 국적, 등록여부,
                        교직원번호, 교직원구분, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 국제교류원운영팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        국제교류원운영팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        외국인 유학생관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 고등교육법시행령 제35조{`\n`}- 고등교육법시행령 제73조
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        학적변동 및 성적 관리, 통계 및 유학생 정보 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 생년월일, 집주소, 핸드폰(연락처), E-mail,
                        여권번호, 외국인등록번호, 학번, 학과, 전공, 국적, 학적,
                        캠퍼스, 전화번호, 보호자 연락처, 사진, 직장, 학적부
                        기재사항(등록, 장학, 성적, 학적변동사항, 수강/출결,
                        시간표, 기초학습, 튜터링, 어학능력/교육, 국제교류, 취업,
                        교직, 장애, 현장실습, 자치활동, 상담, 고등학교,
                        신상변동, 기숙사, 가상강의 등)
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 장애학생지원센터 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        장애학생지원센터
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        장애학생
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        장애인 등에 대한 특수교육법 제30조
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        장애학생 지원
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 집주소, 핸드폰(연락처), 주민등록번호, 학번(과),
                        전공, 학번, 학년, 장애유형, 장애정도, 장애인등록번호,
                        보호자 연락처, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        5년
                      </Box>

                      {/* Row 추가: 재무회계팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        재무회계팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        등록금 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        고등교육법 시행령 제4조, 제73조
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        대학 등록금 수납 및 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 생년월일, 집주소, 핸드폰(연락처), 학번,
                        환불계좌정보, 학부(과), 학적상태, 대표계좌번호, 사진,
                        장학사항, 납입사항, 국가장학금 반환(수정)사항, 성적정보,
                        수강정보, 학적변동사항 등
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 평생교육원운영팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        평생교육원운영팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        평생교육교강사
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        개인정보보호법
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        교강사 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 주소, 휴대폰번호(연락처), 주민등록번호, 회원번호,
                        최종학력, 성별, 계좌정보, 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 글로벌비즈니스센터 운영실 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        글로벌비즈니스센터 운영실
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        위탁사업 수강 신청자 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        개인정보보호법
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        지자체 위탁사업 수업 신청 및 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 생년월일, 집주소, 핸드폰(연락처), 사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        당해 사업종료 시까지
                      </Box>

                      {/* Row 추가: 예비군 대대 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        예비군 대대
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        학생예비군 조직 및 편성관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        예비군법
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        학생예비군 조직 및 편성, 교육훈련관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 집주소, 핸드폰(연락처), 주민등록번호, E-mail,
                        계좌번호, 군번, 특기, 군경력, 출·귀학사항, 신체등급,
                        사진
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>

                      {/* Row 추가: 학술정보운영팀 */}
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        학술정보운영팀
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        도서관 대출관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        - 도서관법 제8조{`\n`}- 정보주체의 동의
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                      >
                        도서관 이용자 신상정보 관리
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderRight="1px solid #E5E7EB"
                        borderBottom="1px solid #E5E7EB"
                        whiteSpace="pre-line"
                      >
                        이름, 사진, 집주소, E-Mail, 집연락처, 핸드폰(연락처),
                        생년월일, 성별, 직장명, 기타(개인 아이디와 비밀번호)
                      </Box>
                      <Box
                        p={{ base: 3, md: 4 }}
                        borderBottom="1px solid #E5E7EB"
                        textAlign="center"
                      >
                        준영구
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Text fontSize={{ base: "14px", md: "18px" }} mt={3} mb={6}>
                  개인정보보호 종합지원 포털(www.privacy.go.kr) → 개인서비스 →
                  개인정보열람등 요구 → 개인정보파일 목록검색 메뉴를
                  활용해주시기 바랍니다.
                </Text>
              </Box>
            </Box>

            {/* 제3조 (개인정보의 처리 및 보유기간) */}
            <Box mt={{ base: 12, md: 16 }}>
              <Heading
                as="h3"
                fontSize={{ base: "16px", lg: "18px", xl: "24px" }}
                fontWeight="extrabold"
                mb={4}
              >
                제3조(개인정보의 처리 및 보유기간)
              </Heading>
              <Box as="ul" pl={0} fontSize={{ base: "14px", md: "18px" }}>
                <Text as="li" mb={3}>
                  울산과학대학교는 법령에 따른 개인정보 보유·이용기간 내에서
                  개인정보를 처리·보유합니다.
                </Text>
                <Text as="li" mb={3}>
                  울산과학대학교에서 등록 공개하는 개인정보의 처리 및 보유기간은
                  본 방침 제2조의 ‘개인정보 파일 현황’과 같습니다.
                </Text>
                <Text as="li" mb={3}>
                  기타 울산과학대학교의 개인정보파일 등록사항 공개는
                  개인정보보호위원회 개인정보보호 종합지원
                  포털(www.privacy.go.kr) → [민원마당] → [개인정보 열람등요구] →
                  [개인정보파일목록 검색] 메뉴를 활용해주시기 바랍니다.
                </Text>
              </Box>
            </Box>

            {/* 제4조 (개인정보의 제3자 제공) */}
            <Box mt={{ base: 12, md: 16 }}>
              <Heading
                as="h3"
                fontSize={{ base: "16px", lg: "18px", xl: "24px" }}
                fontWeight="extrabold"
                mb={4}
              >
                제4조(개인정보의 제3자 제공)
              </Heading>
              <Text fontSize={{ base: "14px", md: "18px" }}>
                울산과학대학교는 정보주체의 개인정보를 제1조(개인정보의 처리
                목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의
                특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는
                경우에만 개인정보를 제3자에게 제공합니다.(2024년 10월 현재)
              </Text>
            </Box>
          </Stack>
        </Stack>
      </PageContainer>
    </Box>
  );
}
