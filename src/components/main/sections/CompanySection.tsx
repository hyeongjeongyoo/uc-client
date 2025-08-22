import {
  Box,
  Text,
  Heading,
  SystemStyleObject,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  RefObject,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/navigation";

interface CompanyCard {
  id: string;
  title: string;
  description: string;
  link?: string;
}

interface CompanySectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  companyCards: CompanyCard[];
  currentCardIndex: number;
  setCurrentCardIndex: Dispatch<SetStateAction<number>>;
  cardsRef: RefObject<HTMLDivElement>;
}

const CompanyCard = ({
  card,
  index,
  currentCardIndex,
  onMouseEnter,
  onMouseLeave,
}: {
  card: CompanyCard;
  index: number;
  currentCardIndex: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => {
  const router = useRouter();
  const isCurrent = index === currentCardIndex;
  const isBefore = index < currentCardIndex;
  const isAfter = index > currentCardIndex;

  const handleCardClick = () => {
    if (card.link && isCurrent) {
      router.push(card.link);
    }
  };

  let cardStyles: SystemStyleObject = {
    width: { base: "280px", md: "400px", lg: "600px" },
    height: { base: "250px", md: "300px", lg: "350px" },
    textAlign: "left",
    p: { base: "20px 25px", md: "35px 45px", lg: "50px 60px" },
    position: "relative",
    cursor: isCurrent ? "pointer" : "default",
    border: "none",
    borderRadius: { base: "15px", lg: "20px" },
    transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity, filter",
    backfaceVisibility: "hidden",
    overflow: "hidden",
  };

  // 현재 활성 카드
  if (isCurrent) {
    cardStyles = {
      ...cardStyles,
      bg: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.95))",
      filter: "none", // 블러 완전 제거
      opacity: 1,
      transform: "perspective(1000px) rotateY(0deg) scale(1.1)", // 기울기 없이 확대만
      boxShadow:
        "0 15px 25px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(74, 124, 213, 0.3), 0 0 25px rgba(74, 124, 213, 0.2)",
      zIndex: 10,
      _hover: {
        transform: "perspective(1000px) rotateY(0deg) scale(1.15)",
        boxShadow:
          "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(74, 124, 213, 0.5), 0 0 30px rgba(74, 124, 213, 0.3)",
        "& .more-button": {
          opacity: 1,
          transform: "translateX(0)",
        },
        "& .more-button > p:last-of-type": {
          transform: "translateX(5px)",
        },
      },
    };
  }
  // 이전 카드들
  else if (isBefore) {
    cardStyles = {
      ...cardStyles,
      bg: "rgba(255, 255, 255, 0.98)",
      filter: "blur(6px)",
      opacity: 0.7,
      transform: "perspective(1000px) rotateY(15deg) scale(0.95)",
    };
  }
  // 다음 카드들
  else if (isAfter) {
    cardStyles = {
      ...cardStyles,
      bg: "rgba(255, 255, 255, 0.98)",
      filter: "blur(6px)",
      opacity: 0.7,
      transform: "perspective(1000px) rotateY(-15deg) scale(0.95)",
    };
  }
  // 기본 (비활성) 카드
  else {
    cardStyles = {
      ...cardStyles,
      bg: "rgba(255, 255, 255, 0.98)",
      filter: "blur(6px)",
      opacity: 0.7,
      transform: "perspective(1000px) rotateY(0deg) scale(0.95)",
    };
  }

  // 공통 스타일 추가
  if (!isCurrent) {
    cardStyles = {
      ...cardStyles,
      _before: {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: "linear-gradient(135deg, rgba(74, 124, 213, 0.05), transparent 60%)",
        borderRadius: "20px",
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
      _hover: {
        _before: {
          opacity: 1,
        },
        "& .more-button": {
          opacity: 0,
          transform: "translateX(0)",
        },
        // The selector for the arrow is changed to target the last child of the .more-button
        "& .more-button > p:last-of-type": {
          transform: "translateX(5px)",
        },
      },
    };
  } else {
    // 활성 카드용 _before 스타일
    cardStyles = {
      ...cardStyles,
      _before: {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bg: "linear-gradient(135deg, rgba(74, 124, 213, 0.05), transparent 60%)",
        borderRadius: "20px",
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
    };
  }

  return (
    <Box
      {...cardStyles}
      onClick={handleCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box
        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
        fontWeight="700"
        color="#4A7CD5"
        mb={{ base: "8px", lg: "10px" }}
        opacity="0.8"
        position="relative"
        display="inline-block"
      >
        {card.id}
      </Box>
      <Heading
        as="h3"
        fontSize={{ base: "20px", md: "24px", lg: "28px" }}
        fontWeight="600"
        mb={{ base: "15px", md: "20px", lg: "30px" }}
        lineHeight="1.3"
        color="#1A1A1A"
        transition="color 0.3s ease"
      >
        {card.title}
      </Heading>
      <Text
        fontSize={{ base: "14px", md: "16px", lg: "20px" }}
        lineHeight="1.4"
        m="0"
        color="#555"
        textAlign="justify"
      >
        {card.description}
      </Text>
      <Box
        className="more-button"
        position="absolute"
        bottom={{ base: "15px", md: "20px", lg: "30px" }}
        right={{ base: "20px", md: "30px", lg: "40px" }}
        color="#4A7CD5"
        fontSize={{ base: "14px", md: "16px", lg: "18px" }}
        opacity="0"
        transform="translateX(-20px)"
        transition="all 0.3s ease"
        display="flex"
        alignItems="center"
        gap={{ base: "4px", lg: "8px" }}
        pointerEvents={isCurrent ? "auto" : "none"}
      >
        <Text
          fontSize={{ base: "14px", md: "16px", lg: "18px" }}
          fontFamily="Pretendard, sans-serif"
          textTransform="uppercase"
          fontWeight="600"
          transition="all 0.3s ease"
        >
          MORE
        </Text>
        <Text fontFamily="sans-serif" transition="transform 0.3s ease">
          →
        </Text>
      </Box>
    </Box>
  );
};

export default function CompanySection({
  sectionRef,
  companyCards,
  currentCardIndex,
  setCurrentCardIndex,
  cardsRef,
}: CompanySectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 애니메이션 상태 관리
  const [animations, setAnimations] = useState({
    titleText: false,
    mainHeading: false,
    description: false,
    cardsContainer: false,
  });

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 각 애니메이션 트리거 지점 설정
      setAnimations({
        titleText: scrollY > 1700,
        mainHeading: scrollY > 1800,
        description: scrollY > 1900,
        cardsContainer: scrollY > 2000,
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 반응형 카드 너비 계산
  const cardWidth = useBreakpointValue({ base: 280, md: 400, lg: 600 }) || 600;
  const cardSpacing = useBreakpointValue({ base: 30, md: 40, lg: 40 }) || 40; // mx 값 * 2
  const slideDistance = cardWidth + cardSpacing;

  // 자동 슬라이드 기능
  useEffect(() => {
    if (!animations.cardsContainer || isHovered) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev: number) => (prev + 1) % companyCards.length);
    }, 3000); // 3초마다 자동 전환

    return () => clearInterval(interval);
  }, [
    companyCards.length,
    animations.cardsContainer,
    isHovered,
    setCurrentCardIndex,
  ]);

  // 수동 컨트롤 함수
  const goToSlide = (index: number) => {
    setCurrentCardIndex(index);
  };

  // hover 이벤트 핸들러
  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };

  const wrapperStyles: SystemStyleObject = {
    display: "flex",
    alignItems: "center",
    p: {
      base: "0 calc(50% - 155px)",
      md: "0 calc(50% - 220px)",
      lg: "0 calc(50% - 320px)",
    },
    width: "fit-content",
    minWidth: "100%",
    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    transform: `translateX(-${currentCardIndex * slideDistance}px)`,
  };

  return (
    <Box
      as="section"
      ref={sectionRef}
      w="100%"
      p={"150px 0"}
      position="relative"
      overflow="hidden"
      backgroundImage="url('/images/main/section3.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box
        textAlign="center"
        color="black"
        zIndex={2}
        position="relative"
        w="100%"
        margin="auto"
      >
        <Box
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          fontWeight="bold"
          mb="30px"
          color="#4A7CD5"
          letterSpacing="2px"
          textTransform="uppercase"
          transition="transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.titleText ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.titleText ? 1 : 0}
        >
          COMPANY
        </Box>

        <Heading
          as="h1"
          fontSize={{ base: "32px", md: "48px", lg: "64px" }}
          fontWeight="bold"
          lineHeight="1.2"
          mb="20px"
          transition="transform 0.8s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.mainHeading ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.mainHeading ? 1 : 0}
        >
          <Text
            as="span"
            fontWeight="bold"
            letterSpacing="-0.5px"
          >
            K&D Energen
          </Text>
        </Heading>

        <Text
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          mb={{base: "50px"}}
          textAlign="center"
          transition="transform 0.8s 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.description ? "translateY(0)" : "translateY(50px)"
          }
          opacity={animations.description ? 1 : 0}
        >
          수소를 포함한 산업용 가스의 안정적 생산과
          <Box as="br" display={{ base: "inline", md: "none" }} />
          첨단 EPC 솔루션을 제공하는 K&D Energen 입니다.
        </Text>

        <Box
          w="100vw"
          p={{ base: "50px 0", md: "65px 0", lg: "80px 0" }}
          m="0 auto"
          position="relative"
          overflow="hidden"
          ref={cardsRef}
          transition="transform 0.8s 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.8s 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)"
          transform={
            animations.cardsContainer ? "translateY(-30px)" : "translateY(0)"
          }
          opacity={animations.cardsContainer ? 1 : 0}
        >
          <Box {...wrapperStyles}>
            {companyCards.map((card, index) => (
              <Box
                key={card.id}
                mx={{ base: "15px", md: "20px", lg: "20px" }}
                flexShrink={0}
              >
                <CompanyCard
                  card={card}
                  index={index}
                  currentCardIndex={currentCardIndex}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* 슬라이드 인디케이터 */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={{ base: "30px", md: "35px", lg: "40px" }}
          gap={{ base: "6px", lg: "8px" }}
        >
          {companyCards.map((_, index) => (
            <Box
              key={index}
              w={
                index === currentCardIndex
                  ? { base: "30px", lg: "40px" }
                  : { base: "10px", lg: "12px" }
              }
              h={{ base: "10px", lg: "12px" }}
              borderRadius={{ base: "5px", lg: "6px" }}
              bg={index === currentCardIndex ? "#4A7CD5" : "rgb(235, 235, 235)"}
              cursor="pointer"
              transition="all 0.4s ease"
              _hover={{
                bg: "#4A7CD5",
                transform: "scale(1.1)",
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
