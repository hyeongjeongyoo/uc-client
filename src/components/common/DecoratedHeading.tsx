"use client";

import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";

interface DecoratedHeadingProps {
  text: string;
  inView?: boolean;
}

export function DecoratedHeading({
  text,
  inView = true,
}: DecoratedHeadingProps) {
  return (
    <Box position="relative" mb={5}>
      <Heading
        as="h2"
        fontSize={{ base: "24px", lg: "36px", xl: "48px" }}
        fontWeight="bold"
        lineHeight="1.3"
        transition="all 0.8s ease 0.2s"
        transform={inView ? "translateY(0)" : "translateY(50px)"}
        opacity={inView ? 1 : 0}
        position="relative"
        zIndex={1}
      >
        {text}
      </Heading>
      <Image
        src="/images/sub/textLine.png"
        alt="heading decoration"
        position="absolute"
        top="50%"
        left="calc(50% - 50vw)"
        transform="translateY(-55%)"
        w="auto"
        h="auto"
        pointerEvents="none"
        zIndex={0}
        display={{ base: "none", md: "block" }}
      />
    </Box>
  );
}
