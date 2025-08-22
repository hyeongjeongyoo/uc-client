import { Box, Text, Heading } from "@chakra-ui/react";

interface FinalSectionProps {
  backgroundImage: string;
}

export default function FinalSection({ backgroundImage }: FinalSectionProps) {
  return (
    <Box
      as="section"
      w="100%"
      p="200px 0"
      position="relative"
      overflow="hidden"
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
    >
      <Box 
        w={{base: "90%", md: "90%", lg:"100%"}} 
        margin="auto"
        textAlign="center"
        color="white"
        zIndex={2}
        position="relative"
      >
        <Heading
          as="h1"
          fontSize={{base: "32px", md: "48px", lg: "64px"}}
          fontWeight="bold"
          lineHeight="1.2"
          mb="20px"
        >
          청정 에너지의 완성, <Box as="br" display={{ base: "inline", md: "none" }} />K&D Energen
        </Heading>

        <Text fontSize={{base: "16px", md: "24px", lg: "24px"}} textAlign="center">
          Engineering부터 EPC까지 토탈 솔루션으로 <Box as="br" display={{ base: "inline", md: "none" }} />산업 전반의 혁신을 이끌어갑니다.
        </Text>
      </Box>
    </Box>
  );
}
