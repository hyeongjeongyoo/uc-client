import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const quotes = [
  {
    text: "'원치 않는 성적 말·농담·메시지·사진·영상으로 불쾌감·굴욕감이 들 때'",
    bgColor: "white",
    borderColor: "#297D83",
    borderRadius: "20px",
  },
  {
    text: "'동의 없이 신체 접촉·촬영·유포가 이루어졌을 때(디지털성범죄 포함)'",
    gradient: "linear-gradient(135deg, #297D83 0%, #3DAD5F 100%)",
    textColor: "white",
    borderRadius: "20px",
  },
  {
    text: "'연인·선후배·교수–학생 등 권력/의존 관계에서의 강요나 압박을 느낄 때'",
    bgColor: "white",
    borderColor: "#297D83",
    borderRadius: "20px",
  },
  {
    text: "'사건을 목격했거나, 그로 인해 불안·수치심·분노 등 심리적 어려움이 클 때'",
    gradient: "linear-gradient(135deg, #297D83 0%, #3DAD5F 100%)",
    textColor: "white",
    borderRadius: "20px",
  },
];

export const QuoteBoxes: React.FC = () => {
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = React.useState<boolean[]>(
    Array(quotes.length).fill(false)
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLDivElement;
          const indexAttr = target.getAttribute("data-quote-index");
          const idx = indexAttr ? parseInt(indexAttr, 10) : -1;
          if (idx >= 0) {
            setVisible((prev) => {
              const next = [...prev];
              // 한 번 보이면 true로 고정, 스크롤 업 시에도 유지
              next[idx] = prev[idx] || entry.isIntersecting;
              return next;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-100px 0px",
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Flex
      className="quotes-container"
      direction="column"
      gap={10}
      width="100%"
      maxW="1300px"
      mx="auto"
      pt={4}
    >
      {quotes.map((quote, index) => (
        <MotionBox
          key={index}
          ref={(el: HTMLDivElement | null) => (itemRefs.current[index] = el)}
          data-quote-index={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: visible[index] ? 1 : 0,
            y: visible[index] ? 0 : 50,
            scale: visible[index] ? 1 : 0.95,
          }}
          transition={{
            duration: 0.8,
            delay: visible[index] ? index * 0.3 : 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          bg={quote.gradient || quote.bgColor}
          bgGradient={quote.gradient}
          color={quote.textColor || "gray.700"}
          p={10}
          borderRadius={quote.borderRadius}
          border="1px solid"
          borderColor={quote.borderColor || "transparent"}
          position="relative"
          overflow="visible"
        >
          <Box mb={4}>
            <Image
              src="/images/sub/re.png"
              alt="Quote icon"
              width="28px"
              height="28px"
              objectFit="contain"
              filter={quote.gradient ? "brightness(0) invert(1)" : "none"}
            />
          </Box>
          <Text
            fontSize={{ base: "16px", md: "24px" }}
            fontWeight="500"
            whiteSpace="pre-line"
          >
            {quote.text}
          </Text>
        </MotionBox>
      ))}
    </Flex>
  );
};

// 동일 컴포넌트를 다른 이름으로도 사용할 수 있게 별칭 내보내기
export const CounselingBoxes = QuoteBoxes;
