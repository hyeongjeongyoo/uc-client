"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Check as CheckIcon } from "lucide-react";

import { Radio, RadioGroup } from "@/components/ui/radio";

interface DepressionTestProps {
  showInternalSubmit?: boolean;
  onSubmit?: (answers: Record<number, string>) => void;
}

const PHQ_QUESTIONS = [
  "초조하거나 불안하거나 조마조마하게 느낀다.",
  "걱정하는 것을 멈추거나 조절할 수가 없다.",
  "여러 가지 것들에 대해 걱정을 너무 많이 한다.",
  "편하게 있기가 어렵다.",
  "너무 안절부절못해서 가민히 있기가 힘들다.",
  "쉽게 짜증이 나거나 쉽게 성을 내게 된다.",
  "마치 끔찍한 일이 생길 것처럼 두렵게 느껴진다.",
];

const RADIO_OPTIONS = [
  { value: "0", label: "전혀 방해받지 않는다" },
  { value: "1", label: "며칠 동안 방해받았았다" },
  { value: "2", label: "2주 중 절반 이상 방해받았다" },
  { value: "3", label: "거의 매일 방해받았다" },
];

const MotionBox = motion(Box);

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

const DepressionTest = (props: DepressionTestProps) => {
  const { showInternalSubmit = false, onSubmit } = props;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const actionSectionRef = useRef<HTMLDivElement>(null);

  const totalQuestions = PHQ_QUESTIONS.length;
  const progress = (Object.keys(answers).length / totalQuestions) * 100;

  const findNextUnanswered = (
    startIndex: number,
    currentAnswers: Record<number, string>
  ) => {
    for (let i = startIndex; i < totalQuestions; i++) {
      if (!currentAnswers[i]) return i;
    }
    for (let i = 0; i < startIndex; i++) {
      if (!currentAnswers[i]) return i;
    }
    return null;
  };

  const handleCalculateScore = () => {
    const allAnswered = Object.keys(answers).length === totalQuestions;
    if (!allAnswered) {
      alert("모든 질문에 답변해주세요.");
      const firstUnanswered = findNextUnanswered(0, answers);
      if (firstUnanswered !== null) {
        setDirection(firstUnanswered > currentQuestionIndex ? 1 : -1);
        setCurrentQuestionIndex(firstUnanswered);
      }
      return;
    }

    let score = 0;
    Object.values(answers).forEach((v) => {
      score += parseInt(v, 10);
    });
    setTotalScore(score);

    setTimeout(() => {
      actionSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleAnswerChange = (details: { value: string | null }) => {
    const { value } = details;
    if (!value) return;

    const newAnswers = { ...answers, [currentQuestionIndex]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex === totalQuestions - 1) {
      setIsLastQuestionAnswered(true);
      return;
    }

    setDirection(1);
    setTimeout(() => setCurrentQuestionIndex(currentQuestionIndex + 1), 150);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    const allAnswered = Object.keys(answers).length === totalQuestions;
    if (!allAnswered) {
      const firstUnanswered = findNextUnanswered(0, answers);
      if (firstUnanswered !== null) {
        alert("답변하지 않은 질문으로 이동합니다.");
        setDirection(firstUnanswered > currentQuestionIndex ? 1 : -1);
        setCurrentQuestionIndex(firstUnanswered);
      }
      return;
    }
    onSubmit?.(answers);
  };

  return (
    <Box mx="auto" px={5} position="relative">
      <IconButton
        aria-label="Previous question"
        onClick={handlePrevious}
        variant="ghost"
        visibility={currentQuestionIndex > 0 ? "visible" : "hidden"}
        position="absolute"
        left="-12px"
        top="60%"
        transform="translateY(-60%)"
        zIndex="docked"
      >
        <Box as={LuChevronLeft} w={10} h={10} color="gray.400" />
      </IconButton>

      <IconButton
        aria-label="Next question"
        onClick={handleNext}
        variant="ghost"
        visibility={
          currentQuestionIndex < totalQuestions - 1 ? "visible" : "hidden"
        }
        position="absolute"
        right="-12px"
        top="60%"
        transform="translateY(-60%)"
        zIndex="docked"
      >
        <Box as={LuChevronRight} w={10} h={10} color="gray.400" />
      </IconButton>

      <Box as="header" bg="transparent" py={4}>
        <Box textAlign="center" bg="#48AF84" p={6} borderRadius="md">
          <Heading
            fontSize={{ base: "24px", md: "32px" }}
            size="lg"
            color="white"
            mb={5}
          >
            불안 척도 검사 (GAD-7)
          </Heading>
          <Text fontSize="md" color="white">
            Generalized Anxiety Disorder-7
          </Text>
        </Box>
      </Box>

      <VStack as="main" gap={12} align="stretch">
        <Box position="relative" w="80%" h="400px" overflow="hidden" mx="auto">
          <AnimatePresence initial={false} custom={direction}>
            <MotionBox
              key={currentQuestionIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              position="absolute"
              w="full"
              p={6}
            >
              <Text
                mb={4}
                fontSize="18px"
                fontWeight="bold"
                marginBottom="50px"
                textAlign="center"
              >
                {PHQ_QUESTIONS[currentQuestionIndex]}
              </Text>
              <RadioGroup
                value={answers[currentQuestionIndex] || ""}
                onValueChange={handleAnswerChange}
              >
                <VStack w="full" align="stretch" gap={4}>
                  {RADIO_OPTIONS.map((option) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      hideIndicator
                      display="flex"
                      justifyContent="center"
                      textAlign="center"
                      borderWidth="1px"
                      borderRadius="full"
                      borderColor="gray.200"
                      _checked={{
                        bg: "#43AD83",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      px={5}
                      py={3}
                    >
                      {option.label}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </MotionBox>
          </AnimatePresence>
        </Box>

        {isLastQuestionAnswered && (
          <>
            <Box
              p={8}
              borderRadius="xl"
              borderTopWidth="4px"
              borderColor="#43AD83"
              bg="white"
              boxShadow="xl"
              textAlign="center"
              mb={6}
            >
              {totalScore === null ? (
                <VStack gap={4}>
                  <Box
                    as={CheckIcon}
                    fontSize={{ base: "32px", md: "48px" }}
                    color="#43AD83"
                  />
                  <Text fontSize="xl" fontWeight="bold" color="gray.800">
                    당신의 불안 정도 점수를 계산할 준비가 되었습니다.
                  </Text>
                  <Button
                    onClick={handleCalculateScore}
                    bg="gray.800"
                    color="white"
                    _hover={{ bg: "gray.700" }}
                    size="lg"
                    px={10}
                    mt={3}
                    borderRadius="full"
                  >
                    결과 확인하기
                  </Button>
                </VStack>
              ) : (
                <VStack gap={3}>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.500"
                    letterSpacing="wider"
                    textTransform="uppercase"
                  >
                    나의 GAD-7 점수
                  </Text>
                  <Text
                    fontSize="7xl"
                    fontWeight="extrabold"
                    color="gray.800"
                    lineHeight={1}
                  >
                    {totalScore}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    점수가 높을수록 불안 증상이 심함을 의미합니다.
                  </Text>
                </VStack>
              )}
            </Box>
          </>
        )}
      </VStack>

      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        zIndex="15"
        p={4}
        boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      >
        <Box maxW="800px" mx="auto" position="relative">
          <Progress.Root value={progress} w="full">
            <Progress.Track h="24px" borderRadius="full">
              <Progress.Range bg="#43AD83" borderRadius="full" />
            </Progress.Track>
          </Progress.Root>
          <Flex
            position="absolute"
            inset="0"
            align="center"
            justify="center"
            zIndex={1}
          >
            <Text
              color="white"
              fontWeight="bold"
              fontSize="sm"
              textShadow="1px 1px 2px rgb(0, 0, 0)"
            >
              {`${Math.round(progress)}%`}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default DepressionTest;
