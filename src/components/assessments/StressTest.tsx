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
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Check as CheckIcon } from "lucide-react";

import { Radio, RadioGroup } from "@/components/ui/radio";

interface StressTestProps {
  showInternalSubmit?: boolean;
  onSubmit?: (answers: Record<number, string>) => void;
}

const PSS_QUESTIONS = [
  "예상치 못한 일이 생겨서 기분 나빠진 적이 얼마나 있었나요?",
  "중요한 일들을 통제할 수 없다고 느낀 적은 얼마나 있었나요?",
  "어려운 일이 너무 많이 쌓여서 극복할 수 없다고 느낀 적이 얼마나 있었나요?",
  "당신이 통제할 수 없는 범위에서 발생한 일 때문에 화가 난 적이 얼마나 있었나요?",
  "매사를 잘 컨트롤하고 있다고 느낀 적이 얼마나 있었나요?",
  "자신의 뜻대로 일이 진행된다고 느낀 적이 얼마나 있었나요?",
  "개인적인 문제를 처리하는 능력에 대해 자신감을 느낀적은 얼마나 있었나요?",
  "생활 속에서 일어난 중요한 변화들을 효과적으로 대처한 적이 얼마나 있었나요?",
  "짜증나고 성가신 일들을 성공적으로 처리한 적이 얼마나 있었나요?",
  "초조하거나 스트레스가 쌓인다고 느낀적이 얼마나 있었나요?",
];

const RADIO_OPTIONS = [
  { value: "0", label: "전혀 없었다" },
  { value: "1", label: "거의 없었다" },
  { value: "2", label: "때때로 있었다" },
  { value: "3", label: "자주 있었다" },
];

const MotionBox = motion(Box);

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.9,
  }),
};

const StressTestPage = (props: StressTestProps) => {
  const { showInternalSubmit = false, onSubmit } = props;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isAnsweringSkipped, setIsAnsweringSkipped] = useState(false);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const actionSectionRef = useRef<HTMLDivElement>(null);

  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = PSS_QUESTIONS.length;
  const progress = (answeredQuestions / totalQuestions) * 100;
  const allAnswered = answeredQuestions === totalQuestions;

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
        setIsAnsweringSkipped(true);
        setDirection(firstUnanswered > currentQuestionIndex ? 1 : -1);
        setCurrentQuestionIndex(firstUnanswered);
      }
      return;
    }

    let score = 0;
    Object.entries(answers).forEach(([questionIndexStr, value]) => {
      const questionIndex = parseInt(questionIndexStr, 10);
      const answerValue = parseInt(value, 10);

      if ((questionIndex >= 0 && questionIndex <= 3) || questionIndex === 9) {
        score += answerValue + 1;
      } else if (questionIndex >= 4 && questionIndex <= 8) {
        score += 4 - answerValue;
      }
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
    if (!isProgressBarVisible) setIsProgressBarVisible(true);
    const { value } = details;
    if (!value) return;

    const newAnswers = { ...answers, [currentQuestionIndex]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex === totalQuestions - 1) {
      setIsLastQuestionAnswered(true);
    }

    const allNowAnswered = Object.keys(newAnswers).length === totalQuestions;

    if (allNowAnswered) {
      setIsAnsweringSkipped(false);
      return;
    }

    if (isAnsweringSkipped) {
      const nextUnansweredIndex = findNextUnanswered(
        currentQuestionIndex + 1,
        newAnswers
      );
      if (nextUnansweredIndex !== null) {
        const newDirection =
          nextUnansweredIndex > currentQuestionIndex ? 1 : -1;
        setDirection(newDirection);
        setTimeout(() => setCurrentQuestionIndex(nextUnansweredIndex), 150);
      }
    } else {
      if (currentQuestionIndex < totalQuestions - 1) {
        setDirection(1);
        setTimeout(
          () => setCurrentQuestionIndex(currentQuestionIndex + 1),
          150
        );
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < PSS_QUESTIONS.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const allAnswered = Object.keys(answers).length === totalQuestions;
    if (!allAnswered) {
      const firstUnanswered = findNextUnanswered(0, answers);
      if (firstUnanswered !== null) {
        alert("답변하지 않은 질문으로 이동합니다.");
        setIsAnsweringSkipped(true);
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
          currentQuestionIndex < PSS_QUESTIONS.length - 1 ? "visible" : "hidden"
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
            한국판 지각된 스트레스 척도
          </Heading>
          <Text fontSize="md" color="white">
            (Perceived Stress Scale, PSS)
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
                {PSS_QUESTIONS[currentQuestionIndex]}
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
                    당신의 스트레스 지수를 확인할 준비가 되었습니다.
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
                    나의 스트레스 지수
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
                    점수가 높을수록 지각된 스트레스가 높음을 의미합니다.
                  </Text>
                </VStack>
              )}
            </Box>
          </>
        )}
      </VStack>

      {isProgressBarVisible && (
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
      )}
    </Box>
  );
};

export default StressTestPage;
