import React from "react";
import { Metadata } from "next";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "회사소개 | 한국NICE개발",
  description:
    "한국NICE개발의 회사 소개, 비전, 미션, 연혁 및 주요 서비스를 확인하세요.",
  keywords: [
    "한국NICE개발",
    "회사소개",
    "IT솔루션",
    "웹개발",
    "모바일앱",
    "클라우드",
  ],
  openGraph: {
    title: "회사소개 | 한국NICE개발",
    description:
      "한국NICE개발의 회사 소개, 비전, 미션, 연혁 및 주요 서비스를 확인하세요.",
    type: "website",
  },
};

interface CompanyLayoutProps {
  children: React.ReactNode;
}

export default function CompanyLayout({ children }: CompanyLayoutProps) {
  return <>{children}</>;
}
