"use client";

import {
  Box,
  Text,
  Heading,
  Stack,
  Image,
  Tabs,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Check as CheckIcon } from "lucide-react";
import StressTest from "@/components/assessments/StressTest";
import StressTestEng from "@/components/assessments/StressTestEng";
import AnxietyTest from "@/components/assessments/AnxietyTest";
import AnxietyTestEng from "@/components/assessments/AnxietyTestEng";
import DepressionTest from "@/components/assessments/DepressionTest";
import DepressionTestEng from "@/components/assessments/DepressionTestEng";
import { surveyApi } from "@/lib/api/survey";
import { publicApi } from "@/lib/api/client";

export default function TherapyAssessmentPage() {
  const [animations, setAnimations] = useState({
    mainHeading: false,
    description: false,
  });

  const infoDescRef = useRef<HTMLDivElement | null>(null);
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const [indicatorCtaVisible, setIndicatorCtaVisible] = useState(false);
  useEffect(
    () => {
      if (locale) {
        const t = setTimeout(() => setIndicatorCtaVisible(true), 10);
        return () => clearTimeout(t);
      }
      setIndicatorCtaVisible(false);
    },
    [
      /* eslint-disable-line react-hooks/exhaustive-deps */
    ]
  );
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let infoInView = false;
      if (infoDescRef.current) {
        const rect = infoDescRef.current.getBoundingClientRect();
        const viewportH =
          window.innerHeight || document.documentElement.clientHeight;
        infoInView = rect.top < viewportH - 80;
      }
      setAnimations({
        mainHeading: scrollY > 200,
        description: scrollY > 250 || infoInView,
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 자가진단 설문 상태 및 로직 (기존 페이지에서 이동)
  const [locale, setLocale] = useState<"ko" | "en" | "">("");
  const [step, setStep] = useState<number>(1);
  const [consentChecked, setConsentChecked] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<
    null | "personality" | "depression" | "anxiety"
  >(null);
  const [studentNumber, setStudentNumber] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState<"M" | "F" | "">("");
  const [submitting, setSubmitting] = useState(false);
  const [personSaved, setPersonSaved] = useState(false);

  const handlePublicSubmit = async () => {
    try {
      // baseURL 확인용
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("API baseURL:", (publicApi as any)?.defaults?.baseURL);
      if (!studentNumber || !departmentName || !fullName || !gender) {
        alert("기본정보를 모두 입력해주세요.");
        setStep(2);
        return;
      }
      setSubmitting(true);
      await surveyApi.savePersonPublic({
        studentNumber,
        fullName,
        genderCode: gender,
        departmentName,
        locale: (locale || "ko") as "ko" | "en",
      });
      setPersonSaved(true);
      alert("제출되었습니다.");
    } catch (err) {
      console.error(err);
      alert("제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStep2Next = async () => {
    if (personSaved) {
      setStep(3);
      return;
    }
    try {
      if (!studentNumber || !departmentName || !fullName || !gender) {
        alert("기본정보를 모두 입력해주세요.");
        return;
      }
      setSubmitting(true);
      // await surveyApi.savePersonPublic({
      //   studentNumber,
      //   fullName,
      //   genderCode: gender,
      //   departmentName,
      //   locale: (locale || "ko") as "ko" | "en",
      // });
      setPersonSaved(true);
      setStep(3);
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <PageContainer>
        <Stack>
          <Box>
            {/* 탭(국문/영문): 초기에는 노출, 선택 후 숨김 */}
            {!locale && (
              <Box display="flex" justifyContent="center" mt={0} border="none">
                <Box
                  border="2px solid #43AD83"
                  borderRadius="full"
                  px={{ base: 1, md: 2 }}
                  py={{ base: 1, md: 2 }}
                >
                  <Tabs.Root
                    value={locale || undefined}
                    onValueChange={({ value }) =>
                      setLocale(value as "ko" | "en")
                    }
                  >
                    <Tabs.List gap={8} alignItems="center" border="none">
                      <Tabs.Trigger
                        value="ko"
                        px={{ base: 6, md: 14 }}
                        py={{ base: 2, md: 4 }}
                        borderRadius="full"
                        color="#43AD83"
                        _selected={{ background: "#43AD83", color: "white" }}
                        border="none"
                        _before={{ display: "none" }}
                      >
                        국문
                      </Tabs.Trigger>
                      <Tabs.Trigger
                        value="en"
                        px={{ base: 8, md: 14 }}
                        py={{ base: 3, md: 4 }}
                        borderRadius="full"
                        _selected={{ background: "#43AD83", color: "white" }}
                        color="#43AD83"
                        _before={{ display: "none" }}
                      >
                        영문
                      </Tabs.Trigger>
                    </Tabs.List>
                  </Tabs.Root>
                </Box>
              </Box>
            )}

            {locale && (
              <>
                {/* 스텝 인디케이터 + 시작 버튼 */}
                <Flex
                  mt={6}
                  justify="center"
                  align="center"
                  gap={6}
                  mx="auto"
                  mb={20}
                >
                  <Box
                    w={{ base: "25px", md: "35px" }}
                    h={{ base: "25px", md: "35px" }}
                    borderRadius="full"
                    border="2px solid #43AD83"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text
                      color="#43AD83"
                      fontWeight="bold"
                      textAlign="center"
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {locale === "ko" ? "국" : "영"}
                    </Text>
                  </Box>
                  {[1, 2, 3, 4].map((n) => {
                    const isDone = n < step;
                    const isCurrent = n === step;
                    return (
                      <Box
                        key={n}
                        w="64px"
                        display="flex"
                        justifyContent="center"
                      >
                        {isDone ? (
                          <Flex
                            w={{ base: "25px", md: "35px" }}
                            h={{ base: "25px", md: "35px" }}
                            borderRadius="full"
                            bg="#43AD83"
                            align="center"
                            justify="center"
                          >
                            <Icon as={CheckIcon} boxSize={4} color="white" />
                          </Flex>
                        ) : isCurrent ? (
                          <Box
                            w={{ base: "25px", md: "35px" }}
                            h={{ base: "25px", md: "35px" }}
                            borderRadius="full"
                            bg="white"
                            border="10px solid #43AD83"
                          />
                        ) : (
                          <Flex
                            w={{ base: "25px", md: "35px" }}
                            h={{ base: "25px", md: "35px" }}
                            borderRadius="full"
                            bg="#e1e1e1"
                            align="center"
                            justify="center"
                          >
                            <Text
                              fontSize={{ base: "14px", md: "18px" }}
                              color="#333"
                            >
                              {n}
                            </Text>
                          </Flex>
                        )}
                      </Box>
                    );
                  })}
                  <Button
                    colorPalette="green"
                    borderRadius="full"
                    size="sm"
                    opacity={indicatorCtaVisible ? 1 : 0}
                    transition="all 0.3s ease"
                    transform={
                      indicatorCtaVisible ? "translateY(0)" : "translateY(8px)"
                    }
                    onClick={() =>
                      step1Ref.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    {locale === "ko" ? "시작하기" : "Start"}
                  </Button>
                </Flex>

                {/* 단계별 컨텐츠 */}
                {step === 1 && (
                  <Box ref={step1Ref} mt={4}>
                    <Heading
                      as="h3"
                      fontSize={{ base: "16px", md: "18px" }}
                      mb={3}
                    >
                      {locale === "ko"
                        ? "[개인정보(민감정보 처리) 수집 · 이용에 대한 동의]"
                        : "[Consent to collection and use of personal (sensitive) information]"}
                    </Heading>

                    <Box
                      border="1px solid #cbd5e1"
                      borderRadius="md"
                      overflow="hidden"
                      bg="#fff"
                    >
                      {/* Row 1 */}
                      <Box
                        display="grid"
                        gridTemplateColumns={{ base: "1fr", md: "220px 1fr" }}
                      >
                        <Box
                          p={3}
                          bg="gray.100"
                          borderRight={{ md: "1px solid #cbd5e1" }}
                          borderBottom="1px solid #cbd5e1"
                        >
                          {locale === "ko"
                            ? "수집·이용하는 개인정보 항목"
                            : "Items collected/used"}
                        </Box>
                        <Box p={3} borderBottom="1px solid #cbd5e1">
                          {locale === "ko"
                            ? "성명/ 학번/학과/ 연락처/ 성별/ 자가진단 결과"
                            : "Full name / Student ID / Department / Contact / Gender / Self‑assessment result"}
                        </Box>
                      </Box>
                      {/* Row 2 */}
                      <Box
                        display="grid"
                        gridTemplateColumns={{ base: "1fr", md: "220px 1fr" }}
                      >
                        <Box
                          p={3}
                          bg="gray.100"
                          borderRight={{ md: "1px solid #cbd5e1" }}
                          borderBottom="1px solid #cbd5e1"
                        >
                          {locale === "ko"
                            ? "개인정보의 수집·이용 목적"
                            : "Purpose of collection and use"}
                        </Box>
                        <Box p={3} borderBottom="1px solid #cbd5e1">
                          <Box
                            as="ul"
                            pl={4}
                            fontSize={{ base: "14px", md: "15px" }}
                            color="gray.700"
                          >
                            {locale === "ko" ? (
                              <>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  이용자 심리·정서적 상태 점검 및 지원 필요성
                                  파악
                                </Text>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  자가진단 결과에 따른 상담 연계 및 지원
                                </Text>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  자가진단 진행을 위한 본인 확인 및 연락
                                </Text>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  상담 진행 시 효과적인 심리검사 진행 및 편의
                                  제공
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  Check psychological/emotional status and need
                                  for support
                                </Text>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  Connect counseling based on results
                                </Text>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  Verify identity and contact for assessment
                                  progress
                                </Text>
                                <Text
                                  as="li"
                                  mb={1}
                                  style={{ listStyleType: "'• '" }}
                                >
                                  Provide effective psychological testing and
                                  convenience during counseling
                                </Text>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Box>
                      {/* Row 3 */}
                      <Box
                        display="grid"
                        gridTemplateColumns={{ base: "1fr", md: "220px 1fr" }}
                      >
                        <Box
                          p={3}
                          bg="gray.100"
                          borderRight={{ md: "1px solid #cbd5e1" }}
                        >
                          {locale === "ko"
                            ? "개인정보의 보유 및 이용기간"
                            : "Retention & usage period"}
                        </Box>
                        <Box p={3}>
                          {locale === "ko"
                            ? "자가진단 신청일로부터 3년간 보관 후 안전하게 폐기"
                            : "Stored for 3 years from application date and securely destroyed"}
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      mt={3}
                      color="gray.700"
                      fontSize={{ base: "13px", md: "14px" }}
                    >
                      {locale === "ko" ? (
                        <>
                          <Text mb={1}>
                            ※ 귀하는 이에 대한 동의를 거부할 수 있으며, 다만
                            동의가 없을 경우 원활한 성고충상담의 진행이 불가능할
                            수 있음을 알려드립니다.
                          </Text>
                          <Text>
                            ※ 개인정보 제공자가 동의한 내용 외의 다른 목적으로
                            활용하지 않으며 제공된 개인정보의 이용을 거부하고자
                            할 때에는 개인정보 관리책임자를 통해 정보 열람,
                            정정, 삭제를 요구할 수 있음
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text mb={1}>
                            ※ You may refuse consent; however, without consent,
                            smooth processing of counseling may not be possible.
                          </Text>
                          <Text>
                            ※ Personal data will not be used beyond agreed
                            purposes. You may request access, correction, or
                            deletion via the data protection officer.
                          </Text>
                        </>
                      )}
                    </Box>

                    <Flex
                      mt={4}
                      align="center"
                      gap={3}
                      justify="space-between"
                      wrap="wrap"
                    >
                      <Checkbox.Root
                        checked={consentChecked}
                        onCheckedChange={(e) => setConsentChecked(!!e.checked)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label
                          ml={2}
                          fontSize={{ base: "14px", md: "15px" }}
                        >
                          {locale === "ko"
                            ? "개인정보 처리방침을 읽었으며 내용에 동의합니다."
                            : "I have read the privacy notice and agree."}
                        </Checkbox.Label>
                      </Checkbox.Root>
                      <Button
                        bg="#48AF84"
                        disabled={step === 1 && !consentChecked}
                        borderRadius="full"
                        onClick={() => setStep((prev) => Math.min(prev + 1, 4))}
                      >
                        Next
                      </Button>
                    </Flex>
                  </Box>
                )}

                {step === 2 && (
                  <Box mt={6}>
                    <Heading
                      as="h3"
                      fontSize={{ base: "18px", md: "20px" }}
                      mb={4}
                    >
                      {locale === "ko"
                        ? "기본정보 입력"
                        : "Enter Basic Information"}
                    </Heading>
                    <Box
                      display="grid"
                      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                      gap={4}
                    >
                      <Box>
                        <Text mb={2}>
                          {locale === "ko" ? "학번" : "Student Number"}
                        </Text>
                        <Input
                          value={studentNumber}
                          onChange={(e) => setStudentNumber(e.target.value)}
                          placeholder={
                            locale === "ko" ? "예: 20231234" : "e.g., 20231234"
                          }
                        />
                      </Box>
                      <Box>
                        <Text mb={2}>
                          {locale === "ko" ? "학과" : "Department"}
                        </Text>
                        <Input
                          value={departmentName}
                          onChange={(e) => setDepartmentName(e.target.value)}
                          placeholder={
                            locale === "ko"
                              ? "학과명을 입력하세요"
                              : "Enter department"
                          }
                        />
                      </Box>
                      <Box>
                        <Text mb={2}>
                          {locale === "ko" ? "이름" : "Full Name"}
                        </Text>
                        <Input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={
                            locale === "ko"
                              ? "이름을 입력하세요"
                              : "Enter full name"
                          }
                        />
                      </Box>
                      <Box>
                        <Text mb={2}>
                          {locale === "ko" ? "성별" : "Gender"}
                        </Text>
                        <Flex gap={6} align="center">
                          <Checkbox.Root
                            checked={gender === "M"}
                            onCheckedChange={(e) =>
                              setGender(
                                e.checked ? "M" : gender === "M" ? "" : gender
                              )
                            }
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label ml={2}>
                              {locale === "ko" ? "남" : "Male"}
                            </Checkbox.Label>
                          </Checkbox.Root>
                          <Checkbox.Root
                            checked={gender === "F"}
                            onCheckedChange={(e) =>
                              setGender(
                                e.checked ? "F" : gender === "F" ? "" : gender
                              )
                            }
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            <Checkbox.Label ml={2}>
                              {locale === "ko" ? "여" : "Female"}
                            </Checkbox.Label>
                          </Checkbox.Root>
                        </Flex>
                      </Box>
                    </Box>

                    <Flex mt={5} justify="flex-end" gap={3}>
                      <Button
                        variant="outline"
                        borderRadius="full"
                        onClick={() => setStep(1)}
                      >
                        {locale === "ko" ? "이전" : "Back"}
                      </Button>
                      <Button
                        bg="#48AF84"
                        borderRadius="full"
                        disabled={
                          !studentNumber ||
                          !departmentName ||
                          !fullName ||
                          !gender
                        }
                        onClick={handleStep2Next}
                      >
                        {locale === "ko" ? "다음" : "Next"}
                      </Button>
                    </Flex>
                  </Box>
                )}

                {step === 3 && (
                  <Box mt={6}>
                    <Heading
                      as="h3"
                      fontSize={{ base: "18px", md: "20px" }}
                      mb={4}
                    >
                      {locale === "ko"
                        ? "자가진단 선택"
                        : "Choose a Self-Assessment"}
                    </Heading>
                    <Stack gap={6}>
                      {[
                        {
                          key: "personality" as const,
                          ko: {
                            title: "스트레스 척도 검사",
                            desc: "성격 특성과 성향을 살펴봅니다",
                          },
                          en: {
                            title: "Perceived Stress Scale (PSS)",
                            desc: "Measure perceived stress over the last month",
                          },
                        },
                        {
                          key: "depression" as const,
                          ko: {
                            title: "우울 선별 검사",
                            desc: "우울 증상 여부를 선별합니다",
                          },
                          en: {
                            title: "Severity Measure for Depression",
                            desc: "Screen for symptoms of depression",
                          },
                        },
                        {
                          key: "anxiety" as const,
                          ko: {
                            title: "불안 척도 검사",
                            desc: "불안과 두려움 수준을 평가합니다",
                          },
                          en: {
                            title: "Anxiety Scale Test",
                            desc: "Evaluate feelings of anxiety and fear",
                          },
                        },
                      ].map((item) => {
                        const t = locale === "ko" ? item.ko : item.en;
                        const active = selectedSurvey === item.key;
                        return (
                          <Box
                            key={item.key}
                            p={4}
                            borderRadius="lg"
                            border={
                              active ? "2px solid #43AD83" : "1px solid #e2e8f0"
                            }
                            boxShadow={
                              active ? "0 0 0 2px rgba(67,173,131,0.15)" : "sm"
                            }
                            bg="white"
                            cursor="pointer"
                            onClick={() => setSelectedSurvey(item.key)}
                            _hover={{ borderColor: "#43AD83" }}
                          >
                            <Text fontWeight="bold" fontSize="lg">
                              {t.title}
                            </Text>
                            <Text mt={1} color="gray.600" fontSize="sm">
                              {t.desc}
                            </Text>
                          </Box>
                        );
                      })}
                    </Stack>

                    <Flex mt={5} justify="flex-end" gap={3}>
                      <Button
                        variant="outline"
                        borderRadius="full"
                        onClick={() => setStep(2)}
                      >
                        {locale === "ko" ? "이전" : "Back"}
                      </Button>
                      <Button
                        colorPalette="green"
                        borderRadius="full"
                        disabled={!selectedSurvey}
                        onClick={() => setStep(4)}
                      >
                        Next
                      </Button>
                    </Flex>
                  </Box>
                )}

                {step === 4 && selectedSurvey === "personality" && (
                  <>{locale === "ko" ? <StressTest /> : <StressTestEng />}</>
                )}
                {step === 4 && selectedSurvey === "anxiety" && (
                  <>{locale === "ko" ? <AnxietyTest /> : <AnxietyTestEng />}</>
                )}
                {step === 4 && selectedSurvey === "depression" && (
                  <>
                    {locale === "ko" ? (
                      <DepressionTest />
                    ) : (
                      <DepressionTestEng />
                    )}
                  </>
                )}
              </>
            )}
          </Box>
        </Stack>
      </PageContainer>
    </Box>
  );
}
