"use client";

import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import {
  motion,
  Variants,
  useTransform,
  MotionValue,
  useMotionTemplate,
} from "framer-motion";
import { ChevronsRightIcon } from "lucide-react";
import NoticeCard from "./card/NoticeCard";
import { useState, useEffect, useRef } from "react";

const MotionHeading = motion(Heading);
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

interface MainContentProps {
  mouse: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
}

const subTitle = "학생상담센터";
const description = `울산과학대학교 학생상담센터는 학생들의 심리적 건강과 성장을 지원하기 위해\n전문 상담사와 함께 개인 및 집단 상담을 제공합니다.`;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const typingContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const typingLetterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MainContent = ({ mouse }: MainContentProps) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [dimensions, setDimensions] = useState<{
    el: DOMRect | null;
    win: { width: number; height: number };
  }>({ el: null, win: { width: 0, height: 0 } });
  const [isOverflowVisible, setOverflowVisible] = useState(false);
  const [isButtonHovered, setButtonHovered] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const measure = () => {
      setDimensions({
        el: headingRef.current?.getBoundingClientRect() || null,
        win: { width: window.innerWidth, height: window.innerHeight },
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const gradientX = useTransform(
    mouse.x,
    (normX) => normX * dimensions.win.width - (dimensions.el?.left || 0)
  );
  const gradientY = useTransform(
    mouse.y,
    (normY) => normY * dimensions.win.height - (dimensions.el?.top || 0)
  );

  const baseColor = { r: 72, g: 175, b: 132 };
  const hue = useTransform(mouse.x, [0, 1], [70, 30]);
  const lightness = useTransform(mouse.y, [0, 1], [0.5, 0.6]);

  const background = useMotionTemplate`radial-gradient(circle at ${gradientX}px ${gradientY}px,rgb(239, 211, 50) 0%, rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 1) 70%)`;

  const rotateX = useTransform(mouse.y, [0, 1], [8, -8]);
  const rotateY = useTransform(mouse.x, [0, 1], [-8, 8]);

  return (
    <Box position="relative" w="full" h="70vh">
      <Flex
        flex={{ base: 1, lg: "0 0 55%" }}
        h="100%"
        justifyContent="center"
        direction="column"
        alignItems="flex-start"
        pr={{ lg: 8 }}
        style={{ perspective: "800px" }}
      >
        <MotionBox
          w="full"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <MotionHeading
            as="h2"
            fontSize={{ base: "7xl", md: "8xl", lg: "9xl" }}
            fontWeight="900"
            lineHeight="1"
            variants={itemVariants}
            ref={headingRef}
            style={{
              rotateX,
              rotateY,
              backgroundImage: background as unknown as string,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              willChange: "transform, background-image",
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <motion.span
              variants={typingContainerVariants}
              style={{ display: "inline-block" }}
            >
              {subTitle.split("").map((char, i) => (
                <motion.span key={i} variants={typingLetterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </MotionHeading>
          <MotionBox
            mt={5}
            fontSize={{ base: "lg", md: "xl" }}
            maxW="100%"
            color="#0d344e"
            variants={itemVariants}
            as="div"
            style={{ whiteSpace: "pre-line" }}
          >
            <motion.span
              variants={{
                ...typingContainerVariants,
                visible: { transition: { staggerChildren: 0.015 } },
              }}
              style={{ display: "inline-block" }}
            >
              {description.split("").map((char, i) => (
                <motion.span key={i} variants={typingLetterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <MotionFlex
              mt={3}
              align="center"
              gap={2}
              wrap="nowrap"
              initial="collapsed"
              animate={isExpanded ? "expanded" : "collapsed"}
              onHoverEnd={() => setExpanded(false)}
              style={{ overflow: "hidden" }}
              variants={{
                collapsed: {},
                expanded: { gap: 0 },
              }}
            >
              <MotionBox
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                onHoverStart={() => setExpanded(true)}
                variants={{
                  collapsed: {
                    opacity: 1,
                    scale: 1,
                    width: 100,
                    marginRight: 8,
                  },
                  expanded: {
                    opacity: 0,
                    scale: 0.95,
                    x: 0,
                    width: 0,
                    marginRight: 0,
                  },
                }}
              >
                <MotionBox
                  animate={{ x: [0, 10] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  style={{
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  바로가기
                  <Icon
                    as={ChevronsRightIcon}
                    color="#48AF84"
                    strokeWidth={2.75}
                  />
                </MotionBox>
              </MotionBox>
              <motion.div
                style={{ display: "flex", gap: 8, whiteSpace: "nowrap" }}
                variants={{
                  collapsed: { maxWidth: 0, opacity: 0, x: -8 },
                  expanded: { maxWidth: 1000, opacity: 1, x: 0 },
                }}
                transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              >
                {[
                  "자가진단 하러가기",
                  "개인 상담 신청",
                  "집단 상담 신청",
                  "성고충",
                  "심리검사",
                ].map((label, idx) => (
                  <MotionFlex
                    key={label}
                    display="inline-flex"
                    border="1px solid #48AF84"
                    color="#48AF84"
                    style={{
                      transition:
                        "background-color 0.25s ease, transform 0.2s ease",
                    }}
                    borderRadius="full"
                    align="center"
                    py={0}
                    px="15px"
                    h="36px"
                    initial="collapsed"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    whileHover="hover"
                    custom={idx}
                    variants={{
                      collapsed: { opacity: 0, x: -12, scale: 0.98 },
                      expanded: (i: number) => ({
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 420,
                          damping: 28,
                          delay: i * 0.12,
                        },
                      }),
                      hover: {
                        backgroundColor: "#48AF84",
                        color: "#ffffff",
                        x: 5,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        },
                      },
                    }}
                  >
                    <Box
                      flex={1}
                      whiteSpace="nowrap"
                      overflow="visible"
                      display="flex"
                      alignItems="center"
                      h="100%"
                    >
                      <motion.div
                        style={{
                          display: "inline-flex",
                          lineHeight: 1,
                          alignItems: "center",
                        }}
                        variants={{
                          visible: {
                            clipPath: "inset(0 0% 0 0)",
                            transition: { duration: 0.3, ease: "easeInOut" },
                          },
                          hover: { transition: { staggerChildren: 0.05 } },
                        }}
                      >
                        {label.split("").map((char, index) => (
                          <motion.span
                            key={index}
                            style={{ display: "inline-block" }}
                            variants={{
                              hover: { y: [0, -5, 0] },
                              visible: { y: 0 },
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </motion.div>
                    </Box>
                  </MotionFlex>
                ))}
              </motion.div>
            </MotionFlex>
          </MotionBox>
        </MotionBox>
      </Flex>
      <NoticeCard />
    </Box>
  );
};

export default MainContent;
