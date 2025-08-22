"use client";

import { Box, Text, Heading, Grid, GridItem } from "@chakra-ui/react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "상담신청",
    description: "방문 또는 전화로 상담 신청이 가능합니다.",
  },
  {
    number: "02",
    title: "접수면담",
    description:
      "상담자와 첫 만남을 통해 문제를 파악하고 상담 계획을 세웁니다.",
  },
  {
    number: "03",
    title: "개인상담",
    description: "전문 상담자와 1:1로 만나 깊이 있는 대화를 나눕니다.",
  },
  {
    number: "04",
    title: "종결",
    description: "상담 목표 달성 후 상담을 마무리합니다.",
  },
];

export function CounselingProcess() {
  return (
    <Box py={10}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={8}
      >
        {processSteps.map((step, index) => (
          <GridItem
            key={step.number}
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            textAlign="center"
            transition="transform 0.3s"
            _hover={{ transform: "translateY(-5px)" }}
            position="relative"
          >
            <Box
              position="absolute"
              top={-3}
              left={-3}
              bg="#4A7CD5"
              color="white"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="sm"
              fontWeight="bold"
            >
              {step.number}
            </Box>
            <Heading
              as="h3"
              fontSize={{ base: "xl", lg: "2xl" }}
              mb={4}
              color="#4A7CD5"
            >
              {step.title}
            </Heading>
            <Text color="gray.600" fontSize={{ base: "sm", lg: "md" }}>
              {step.description}
            </Text>
            {index < processSteps.length - 1 && (
              <Box
                display={{ base: "none", lg: "block" }}
                position="absolute"
                right="-50%"
                top="50%"
                transform="translateY(-50%)"
                width="100%"
                height="2px"
                bg="#E2E8F0"
                zIndex={-1}
              />
            )}
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

export default CounselingProcess;

