import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const quotes = [
  {
    text: "'고민이 많아서 머리가 너무 복잡해요'",
    bgColor: "white",
    borderColor: "#297D83",
    borderRadius: "20px",
  },
  {
    text: "'앞으로의 진로와 미래가 막막하게 느껴져 불안해요'",
    gradient: "linear-gradient(135deg, #297D83 0%, #48AF84 100%)",
    textColor: "white",
    borderRadius: "20px",
  },
  {
    text: "'인간관계 때문에 마음이 자꾸 흔들려요'",
    bgColor: "white",
    borderColor: "#297D83",
    borderRadius: "20px",
  },
  {
    text: "'그냥 누군가에게 내 마음을 털어놓고 싶어요'",
    gradient: "linear-gradient(135deg, #297D83 0%, #48AF84 100%)",
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
