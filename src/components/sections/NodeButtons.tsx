import { Box, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const MotionButton = motion(Button);

interface ButtonPosition {
  x: number;
  y: number;
  alpha: number;
  scale: number;
}

interface NodeButtonsProps {
  buttonPositions: ButtonPosition[];
  onHoverChange?: (hovering: boolean, mappedIndex: number) => void;
}

export const NodeButtons = ({
  buttonPositions,
  onHoverChange,
}: NodeButtonsProps) => {
  const buttonTexts = [
    "자가진단",
    "개인 상담 신청",
    "집단 상담 신청",
    "성고충",
    "심리검사",
  ];
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [hoveredIndices, setHoveredIndices] = useState<Set<number>>(new Set());
  const frozenPositionsRef = useRef<Record<number, ButtonPosition>>({});

  // Shuffle helper to randomize mapping once per mount
  const shuffleArray = (arr: number[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };
  const indexOrderRef = useRef<number[] | null>(null);
  if (!indexOrderRef.current) {
    indexOrderRef.current = shuffleArray([...Array(buttonTexts.length).keys()]);
  }
  const indexOrder = indexOrderRef.current;

  const baseSizesRef = useRef<{ w: number; h: number }[] | null>(null);
  if (!baseSizesRef.current) {
    baseSizesRef.current = buttonTexts.map(() => ({
      w: Math.round(80 + Math.random() * 20),
      h: Math.round(34 + Math.random() * 10),
    }));
  }
  const baseSizes = baseSizesRef.current;

  const descriptionByLabel: Record<string, string> = {
    "집단 상담 신청": "함께 이야기하고, 함께 자라는 시간입니다.",
    "개인 상담 신청":
      "혼자 끙끙대지 말고, 안전한 공간에서 가볍게 시작해 보세요.",
    심리검사: "현재 나의 마음 상태를 간단히 살펴볼 수 있는 도구입니다.",
    자가진단: "현재 나의 마음 상태를 간단히 살펴볼 수 있는 도구입니다.",
    성고충: "성 관련 어려움을 안전하게 해결할 수 있어요.",
  };
  const restMinWidthByText: Record<string, number> = {
    "개인 상담 신청": 180,
    "집단 상담 신청": 180,
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialRender(false), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      position="absolute"
      zIndex={3}
      top={0}
      left={0}
      right={0}
      bottom={0}
      pointerEvents="auto"
    >
      {buttonTexts.map((text, index) => {
        const mappedIndex = indexOrder[index] ?? index;
        const position = buttonPositions?.[mappedIndex] ?? {
          x: 0,
          y: 0,
          alpha: 0,
          scale: 1,
        };
        const effectivePosition =
          hoveredIndices.has(index) && frozenPositionsRef.current[index]
            ? frozenPositionsRef.current[index]
            : position;
        const { w, h } = baseSizes[index] || { w: 200, h: 50 };
        const minWForText = restMinWidthByText[text] ?? 140;
        const restW = Math.max(w, minWForText);
        const restH = Math.max(h, 44);

        return (
          <motion.div
            key={text}
            style={{
              position: "absolute",
              zIndex: hoveredIndices.has(index) ? 20 : 3,
              pointerEvents: effectivePosition.alpha > 0.3 ? "auto" : "none",
            }}
            initial={isInitialRender ? { scale: 0, opacity: 0 } : false}
            animate={{
              x: effectivePosition.x,
              y: effectivePosition.y,
              opacity: effectivePosition.alpha,
              scale: effectivePosition.scale,
            }}
            transition={{
              x: { type: "tween", duration: 0 },
              y: { type: "tween", duration: 0 },
              scale: { type: "tween", duration: 0 },
              opacity: { type: "tween", ease: "easeOut", duration: 0.18 },
            }}
          >
            <MotionButton
              variant="ghost"
              p={0}
              lineHeight="normal"
              display="flex"
              alignItems="center" // ★ 수직 상단
              justifyContent="center" // ★ 수평 좌측
              //bg="rgba(255,255,255,0.75)"
              boxShadow="0 0 0 rgba(0,0,0,0.3)"
              style={{
                backdropFilter: "blur(8px)",
                overflow: "hidden",
                display: "flex",
                transformOrigin: "0% 0%",
                minWidth: minWForText,
                minHeight: 44,
              }}
              initial="rest"
              animate="rest"
              whileHover="hover"
              onHoverStart={() => {
                setHoveredIndices((prev) => {
                  const next = new Set(prev);
                  next.add(index);
                  return next;
                });
                frozenPositionsRef.current[index] = position;
                onHoverChange?.(true, mappedIndex);
              }}
              onHoverEnd={() => {
                setHoveredIndices((prev) => {
                  const next = new Set(prev);
                  next.delete(index);
                  return next;
                });
                delete frozenPositionsRef.current[index];
                onHoverChange?.(false, mappedIndex);
              }}
              variants={{
                rest: {
                  x: 0,
                  y: 0,
                  width: restW,
                  height: restH,
                  borderRadius: 24,
                },
                hover: {
                  x: 0,
                  y: 0,
                  width: 350,
                  height: 130,
                  borderRadius: 24,
                  boxShadow: "0 5px 10px rgba(13,52,78,.18)",
                  background: "rgba(255,255,255,.98)",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                },
              }}
            >
              <motion.div
                style={{
                  width: "100%",
                  pointerEvents: "none",
                  paddingLeft: 12,
                }}
              >
                <motion.div
                  style={{ display: "flex", width: "100%" }}
                  variants={{
                    rest: { justifyContent: "center" },
                    hover: { justifyContent: "flex-start" },
                  }}
                >
                  <Box
                    as="div"
                    fontWeight={800}
                    fontSize="16px"
                    color="#0D344E"
                    py={5}
                    m={0}
                    whiteSpace="nowrap"
                  >
                    {text}
                  </Box>
                </motion.div>
                <motion.div
                  style={{ overflow: "hidden", width: "100%" }}
                  variants={{ hover: { height: "auto", opacity: 1 } }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Box
                    as="div"
                    fontSize="14px"
                    lineHeight="1.2"
                    color="#0D344E"
                    textAlign="left"
                    mt={0}
                  >
                    {descriptionByLabel[text]}
                  </Box>
                  <motion.span
                    style={{
                      position: "absolute",
                      right: 20,
                      bottom: 20,
                      fontWeight: 700,
                      color: "#0D344E",
                    }}
                    variants={{ hover: { opacity: 1, y: 0 } }}
                    initial={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    More &gt;
                  </motion.span>
                </motion.div>
              </motion.div>
            </MotionButton>
          </motion.div>
        );
      })}
    </Box>
  );
};
