"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Input,
  Tabs,
  NativeSelect,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { surveyApi } from "@/lib/api/survey";
import { useMemo, useState } from "react";

type Step = 1 | 2 | 3;

export default function TherapySurveyPage() {
  const [locale, setLocale] = useState<"ko" | "en">("ko");
  const [step, setStep] = useState<Step>(1);
  const [registrationId, setRegistrationId] = useState<number | null>(null);
  const [selectedSurveyId, setSelectedSurveyId] = useState<number | null>(null);

  const form = useForm<{
    studentNumber?: string;
    fullName: string;
    genderCode?: string;
    phoneNumber?: string;
    campusCode?: string;
    departmentName?: string;
  }>();

  const canNextFromStep1 = useMemo(() => !!form.watch("fullName"), [form]);
  const canNextFromStep2 = useMemo(
    () => selectedSurveyId != null,
    [selectedSurveyId]
  );

  const handleCreateDraft = async () => {
    if (!selectedSurveyId) return;
    const values = form.getValues();
    const res = await surveyApi.createDraft({
      ...values,
      locale,
      surveyId: selectedSurveyId,
    });
    setRegistrationId(res.data);
    setStep(3);
  };

  const handleSubmitSurvey = async () => {
    if (!registrationId) return;
    // Placeholder responses. Replace with actual question rendering later.
    const responses = [
      { questionCode: "Q1", answerValue: "A", answerScore: 1, itemOrder: 1 },
      { questionCode: "Q2", answerValue: "B", answerScore: 2, itemOrder: 2 },
    ];
    await surveyApi.submit({ registrationId, responses });
    alert("제출이 완료되었습니다.");
  };

  return (
    <Box maxW="960px" mx="auto" py={10} px={4}>
      <Heading mb={6}>자가진단 설문</Heading>
      <Tabs.Root
        value={locale}
        onValueChange={({ value }) => setLocale(value as "ko" | "en")}
      >
        <Tabs.List>
          <Tabs.Trigger value="ko">국문</Tabs.Trigger>
          <Tabs.Trigger value="en">영문</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>

      <Flex mt={6} gap={4} align="center">
        {[1, 2, 3].map((s) => (
          <Box
            key={s}
            p={2}
            px={4}
            borderRadius="md"
            bg={step === s ? "#267987" : "gray.100"}
            color={step === s ? "white" : "gray.700"}
          >
            {`${s}. ${s === 1 ? "기본정보" : s === 2 ? "설문선택" : "설문"}`}
          </Box>
        ))}
      </Flex>

      {step === 1 && (
        <Box mt={6}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (canNextFromStep1) setStep(2);
            }}
          >
            <Stack gap={4}>
              <Input
                placeholder="이름"
                {...form.register("fullName", { required: true })}
              />
              <Input placeholder="학번" {...form.register("studentNumber")} />
              <NativeSelect.Root size="md" width="100%">
                <NativeSelect.Field
                  {...form.register("genderCode")}
                  placeholder="성별 선택"
                >
                  <option value="">성별 선택</option>
                  <option value="M">남</option>
                  <option value="F">여</option>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Input placeholder="연락처" {...form.register("phoneNumber")} />
              <Input
                placeholder="캠퍼스 코드"
                {...form.register("campusCode")}
              />
              <Input placeholder="학과" {...form.register("departmentName")} />
              <Flex justify="flex-end" gap={2}>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canNextFromStep1}
                  colorPalette="teal"
                >
                  다음
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      )}

      {step === 2 && (
        <Box mt={6}>
          <Text mb={2}>설문 선택</Text>
          <NativeSelect.Root size="md" width="100%">
            <NativeSelect.Field
              value={selectedSurveyId ?? ""}
              onChange={(e) =>
                setSelectedSurveyId(
                  Number((e.target as HTMLSelectElement).value)
                )
              }
              placeholder="설문을 선택하세요"
            >
              <option value="">설문을 선택하세요</option>
              <option value="1">예시 설문 v1 ({locale})</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          <Flex justify="space-between" mt={4}>
            <Button variant="outline" onClick={() => setStep(1)}>
              이전
            </Button>
            <Button
              colorPalette="teal"
              onClick={handleCreateDraft}
              disabled={!canNextFromStep2}
            >
              설문 시작
            </Button>
          </Flex>
        </Box>
      )}

      {step === 3 && (
        <Box mt={6}>
          <Text mb={2}>설문 진행(예시)</Text>
          <Stack gap={3}>
            <Text>Q1. 예시 질문 1</Text>
            <Text>Q2. 예시 질문 2</Text>
          </Stack>
          <Flex justify="space-between" mt={4}>
            <Button variant="outline" onClick={() => setStep(2)}>
              이전
            </Button>
            <Button
              colorPalette="teal"
              onClick={handleSubmitSurvey}
              disabled={!registrationId}
            >
              제출
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
