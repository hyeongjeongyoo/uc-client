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

interface DepressionTestEngProps {
  showInternalSubmit?: boolean;
  onSubmit?: (answers: Record<number, string>) => void;
}

const PHQ9_QUESTIONS = [
  "Feeling nervous, anxious or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things ",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen",
];

const RADIO_OPTIONS = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
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

const DepressionTestEng = (props: DepressionTestEngProps) => {
  const { showInternalSubmit = false, onSubmit } = props;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const actionSectionRef = useRef<HTMLDivElement>(null);

  const totalQuestions = PHQ9_QUESTIONS.length;
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
      alert("Please answer all questions.");
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
        alert("You will be redirected to the unanswered question.");
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
            Depression Screening Test (PHQ-9)
          </Heading>
          <Text fontSize="md" color="white">
            Patient Health Questionnaire-9 (PHQ-9)
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
                {PHQ9_QUESTIONS[currentQuestionIndex]}
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
                    You are ready to calculate your depression score.
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
                    Check Result
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
                    My PHQ-9 Score
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
                    The higher the score, the more severe the depression
                    symptoms.
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

export default DepressionTestEng;
