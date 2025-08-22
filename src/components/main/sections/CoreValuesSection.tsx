import { Box, Text, Heading, SystemStyleObject } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { RefObject } from "react";
import { useRouter } from "next/navigation";

const pulseGlow = keyframes`
  from {
    box-shadow: 0 0 5px rgba(74, 124, 213, 0.5), 0 0 25px -10px rgba(74, 124, 213, 0.4);
  }
  to {
    box-shadow: 0 0 20px rgba(74, 124, 213, 0.8), 0 0 40px 5px rgba(74, 124, 213, 0.6);
  }
`;

interface Card {
  id: number;
  title: string;
  subtitle: string;
  backgroundImage: string;
  textColor: string;
  link: string;
}

interface CoreValuesSectionProps {
  sectionRef: RefObject<HTMLDivElement>;
  isVisible: boolean;
  cards: Card[];
  cardsRef: RefObject<HTMLDivElement>;
  cardsVisible: boolean;
}

export default function CoreValuesSection({
  sectionRef,
  isVisible,
  cards,
  cardsRef,
  cardsVisible,
}: CoreValuesSectionProps) {
  const router = useRouter();

  const handleCardClick = (link: string) => {
    router.push(link);
  };
  return (
    <Box
      as="section"
      ref={sectionRef}
      w="100%"
      p="150px 0"
      position="relative"
      overflow="hidden"
    >
      <Box textAlign="center" color="black" zIndex={2} position="relative">
        <Box
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          fontWeight="bold"
          mb="30px"
          color="#4A7CD5"
          letterSpacing="2px"
          textTransform="uppercase"
          style={{
            transform: `translateY(${(1 - (isVisible ? 1 : 0)) * 50}px)`,
            opacity: isVisible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isVisible ? "0.1s" : "0s",
          }}
        >
          K&D ENERGEN
        </Box>

        <Heading
          as="h1"
          fontSize={{ base: "32px", md: "48px", lg: "64px" }}
          fontWeight="bold"
          lineHeight="1.2"
          mb="20px"
          style={{
            transform: `translateY(${(1 - (isVisible ? 1 : 0)) * 50}px)`,
            opacity: isVisible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isVisible ? "0.3s" : "0s",
          }}
        >
          <Text
            as="span"
            fontWeight="bold"
            letterSpacing="-0.5px"
          >
            Core Values
          </Text>
        </Heading>

        <Text
          fontSize={{ base: "16px", md: "24px", lg: "24px" }}
          textAlign="center"
          mb="50px"
          style={{
            transform: `translateY(${(1 - (isVisible ? 1 : 0)) * 50}px)`,
            opacity: isVisible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isVisible ? "0.5s" : "0s",
          }}
        >
          지속가능한 성장과 혁신을 통해 더 나은 미래를 만들어갑니다.
        </Text>

        <Box
          ref={cardsRef}
          display="flex"
          flexDirection={{ base: "column", md: "row", xl: "row" }}
          justifyContent="center"
          alignItems="flex-start" // Align items to the top to handle different margins
          marginTop={{ base: "0", md: "50px", xl: "50px" }}
          w={{ base: "87%", md: "90%", lg: "1000px" }}
          margin={"auto"}
        >
          {cards.map((card, index) => {
            const cardStyles: SystemStyleObject = {
              width: { base: "80%", md: "320px", lg: "360px" },
              height: { base: "200px", md: "500px" },
              marginTop: index === 1 ? { base: "0", md: "50px" } : "0",
              marginLeft: index === 1 ? { base: "auto", md: "0" } : "0",
              marginRight: index === 1 ? "0" : { base: "auto", md: "0" },
              bgImage: `url(${card.backgroundImage})`,
              color: card.textColor,
              p: 0,
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              bgSize: "cover",
              backgroundPosition: "center",
              bgRepeat: "no-repeat",
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              transformStyle: "preserve-3d",
              willChange: "transform",

              // Default transition and transform state
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible
                ? "translateY(0) scale(1) rotateZ(0deg)"
                : "translateY(80px) scale(0.6) rotateZ(-10deg)",
              transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transitionDelay: `${index * 0.2}s`,
              filter: cardsVisible
                ? "drop-shadow(0 20px 40px rgba(0,0,0,0.15))"
                : "none",

              // Individual card styling
              borderTopLeftRadius:
                index === 0
                  ? { base: "20px", md: "20px" }
                  : index === 2
                  ? { base: "20px", md: "0" }
                  : "0",

              borderBottomLeftRadius:
                index === 0
                  ? { base: "20px", md: "20px" }
                  : index === 2
                  ? { base: "20px", md: "0" }
                  : "0",

              borderTopRightRadius:
                index === 2
                  ? { base: "0", md: "20px" }
                  : index === 1
                  ? { base: "20px", md: "0" }
                  : "0",

              borderBottomRightRadius:
                index === 2
                  ? { base: "0", md: "20px" }
                  : index === 1
                  ? { base: "20px", md: "0" }
                  : "0",

              // Pseudo-elements and hover effects
              _before: {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.7) 100%)",
                opacity: 1,
                transition: "opacity 0.3s ease",
              },
              _hover: {
                transform:
                  "translateY(-15px) scale(1.08) rotateY(2deg) !important",
                zIndex: 10,
                _before: {
                  bg: "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)",
                },
                "& .card-content": {
                  transform: "translateY(-10px) translateZ(20px)",
                },
                "& .card-title": {
                  transform: "translateY(-5px)",
                  textShadow: "0 5px 15px rgba(0,0,0,0.3)",
                },
                "& .card-subtitle": {
                  transform: "translateY(-3px)",
                  textShadow: "0 3px 10px rgba(0,0,0,0.2)",
                },
                _after: {
                  animationDuration: "0.5s",
                },
              },
              _after: {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-5px",
                right: "-5px",
                bottom: "-5px",
                borderRadius: "inherit",
                zIndex: -1,
                opacity: cardsVisible ? 1 : 0,
                transition: "opacity 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                animation: cardsVisible
                  ? `${pulseGlow} 2s ease-in-out infinite alternate`
                  : "none",
                willChange: "box-shadow",
                transform: "translateZ(0)",
              },
            };

            return (
              <Box
                key={card.id}
                {...cardStyles}
                onClick={() => handleCardClick(card.link)}
              >
                <Box
                  zIndex={1}
                  position="relative"
                  padding="2rem"
                  transition="all 0.4s ease"
                  transform="translateY(10px)"
                  mb="10px"
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "18px", md: "24px", xl: "36px" }}
                    fontWeight="700"
                    textShadow="0 2px 4px rgba(0, 0, 0, 0.5)"
                    transition="all 0.4s ease"
                    color="white"
                    mb={{ md: "0", xl: "10px" }}
                  >
                    {card.title}
                  </Heading>
                  <Text
                    color="white"
                    fontSize={{ base: "14px", md: "16px", xl: "24px" }}
                    fontWeight="400"
                    marginBottom="0"
                    opacity="0.9"
                    textShadow="0 1px 2px rgba(0, 0, 0, 0.5)"
                    transition="all 0.4s ease"
                  >
                    {card.subtitle}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
