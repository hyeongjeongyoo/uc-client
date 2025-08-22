"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Text, Image, Button, Flex } from "@chakra-ui/react"; // Chakra UI import 추가

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    // App.tsx에 스크롤 시작을 알리는 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent("scrollToTopStart"));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinkClick = (link: string) => {
    router.push(link);
  };

  return (
    <Box
      as="footer"
      bg="#267987"
      color="#fff"
      pt={{ base: 8, xl: 10 }}
      pb={{ base: 10, xl: 12 }}
      fontFamily="paperlogy"
    >
      <Box maxWidth={{ base: "92%", xl: "1300px" }} margin="0 auto">
        {/* 상단: 좌측 브랜드, 우측 링크 */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={4}
          py={2}
        >
          <Text fontWeight="bold" fontSize={{ base: "16px", md: "20px" }}>
            울산과학대학교 학생상담센터
          </Text>
          <Flex gap={{ base: 2, md: 4 }} wrap="wrap">
            <Button
              onClick={() => handleLinkClick("/privacy-policy")}
              bg="transparent"
              color="#fff"
              _hover={{ bg: "rgba(255,255,255,0.15)" }}
              fontSize={{ base: "14px", lg: "16px" }}
            >
              개인정보처리방침
            </Button>
            <Button
              onClick={() => handleLinkClick("/reject-spam-email")}
              bg="transparent"
              color="#fff"
              _hover={{ bg: "rgba(255,255,255,0.15)" }}
              fontSize={{ base: "14px", lg: "16px" }}
            >
              이메일무단수집거부
            </Button>
            {/* <Button
              onClick={() => handleLinkClick("/uc/info")}
              bg="transparent"
              color="#fff"
              _hover={{ bg: "rgba(255,255,255,0.15)" }}
              fontSize={{ base: "14px", lg: "16px" }}
            >
              교내전화번호
            </Button> */}
            <Button
              onClick={() => handleLinkClick("/uc/location")}
              bg="transparent"
              color="#fff"
              _hover={{ bg: "rgba(255,255,255,0.15)" }}
              fontSize={{ base: "14px", lg: "16px" }}
            >
              찾아오시는길
            </Button>
          </Flex>
        </Flex>

        {/* 구분선 */}
        <Box borderTop="1px solid rgba(255,255,255,0.3)" mt={2} mb={6} />

        {/* 본문: 좌측 캠퍼스 정보, 우측 로고 */}
        <Flex justify="space-between" align="flex-start" gap={6} wrap="wrap">
          <Box flex="1 1 520px">
            <Box mb={6}>
              <Text fontSize={{ base: "14px", lg: "18px" }} mb={2}>
                동부캠퍼스
              </Text>
              <Text fontSize={{ base: "12px", lg: "16px" }}>
                (우)44022) 울산광역시 동구 봉수로 101
              </Text>
              <Text fontSize={{ base: "12px", lg: "16px" }}>
                TEL : 052-230-0500
              </Text>
              <Text fontSize={{ base: "12px", lg: "16px" }}>
                FAX : 052-234-9300
              </Text>
            </Box>
            <Box>
              <Text fontSize={{ base: "14px", lg: "18px" }} mb={2}>
                서부캠퍼스
              </Text>
              {/* <Text fontSize={{base:"12px", lg:"16px"}}>(우)44610) 울산광역시 남구 대학로 57</Text>
              <Text fontSize={{base:"12px", lg:"16px"}}>TEL : 052-279-5300</Text>
              <Text fontSize={{base:"12px", lg:"16px"}}>FAX : 052-277-1538</Text> */}
            </Box>
          </Box>
        </Flex>

        {/* 하단 카피라이트 */}
        <Flex justify="flex-end" mt={6}>
          <Text fontSize={{ base: "14px", md: "16px" }} opacity={0.9}>
            Copyright ⓒ 2025 울산과학대학교 학생상담센터. All Rights Reserved.
          </Text>
        </Flex>
      </Box>

      {showTopButton && (
        <Button
          position="fixed"
          bottom="2rem"
          right="2rem"
          bg="#267987"
          color="#fff"
          p="0.8rem 1.2rem"
          borderRadius="25px"
          fontSize="0.9rem"
          fontWeight="600"
          boxShadow="0 4px 15px rgba(0, 0, 0, 0.25)"
          zIndex={100}
          onClick={scrollToTop}
          _hover={{
            bg: "linear-gradient(135deg, #297D83 0%, #48AF84 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35)",
          }}
        >
          TOP
        </Button>
      )}
    </Box>
  );
};

export default Footer;
