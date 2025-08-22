"use client";

import { usePathname } from "next/navigation";
import { HERO_DATA, DEFAULT_HERO_DATA, HeroPageData } from "@/lib/constants/heroSectionData";

/**
 * 현재 경로에 맞는 히어로 데이터를 자동으로 가져오는 훅
 * 
 * @example
 * ```tsx
 * // 기본 사용법 (경로 기반 자동 매핑)
 * const heroData = usePageHero();
 * 
 * // 게시판 페이지에서 사용
 * const heroData = usePageHero("notices"); // 게시판 ID 전달
 * 
 * // 수동 오버라이드
 * const heroData = usePageHero(undefined, {
 *   title: "커스텀 제목",
 *   backgroundImage: "/custom-image.jpg"
 * });
 * ```
 */
export function usePageHero(
  override?: Partial<HeroPageData>
): HeroPageData {
  const pathname = usePathname();

  // 경로 정규화 (끝의 슬래시 제거)
  const normalizedPathname = pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  // CMS 게시판 경로 처리 (/cms/bbs/* -> /bbs/*, /cms/board -> /bbs)
  let targetPath = normalizedPathname;
  if (normalizedPathname.startsWith('/cms/bbs/')) {
    const boardType = normalizedPathname.split('/')[3];
    targetPath = `/bbs/${boardType}`;
  } else if (normalizedPathname === '/cms/board') {
    targetPath = '/bbs';
  }

  // 1. 정확한 경로 매칭
  const pageData = HERO_DATA[targetPath];
  
  if (pageData) {
    return { ...pageData, ...override };
  }

  // 2. 부분 경로 매칭 (가장 긴 매칭 우선)
  const matchingPaths = Object.keys(HERO_DATA)
    .filter(path => targetPath.startsWith(path))
    .sort((a, b) => b.length - a.length); // 긴 경로 우선

  if (matchingPaths.length > 0) {
    return { ...HERO_DATA[matchingPaths[0]], ...override };
  }

  // 매칭되지 않는 경우 기본값 반환
  return { ...DEFAULT_HERO_DATA, ...override };
}

/**
 * 특정 경로의 히어로 데이터를 가져오는 함수 (훅이 아닌 유틸리티)
 */
export function getHeroDataByPath(
  path: string, 
  override?: Partial<HeroPageData>
): HeroPageData {
  // CMS 게시판 경로 처리 (/cms/bbs/* -> /bbs/*, /cms/board -> /bbs)
  let targetPath = path;
  if (path.startsWith('/cms/bbs/')) {
    const boardType = path.split('/')[3];
    targetPath = `/bbs/${boardType}`;
  } else if (path === '/cms/board') {
    targetPath = '/bbs';
  }

  // 일반 페이지 경로 매핑
  const pageData = HERO_DATA[targetPath];
  
  if (pageData) {
    return { ...pageData, ...override };
  }

  // 부분 경로 매칭
  const matchingPath = Object.keys(HERO_DATA).find(pathKey => 
    targetPath.startsWith(pathKey)
  );

  if (matchingPath) {
    return { ...HERO_DATA[matchingPath], ...override };
  }

  // 기본값 반환
  return { ...DEFAULT_HERO_DATA, ...override };
}