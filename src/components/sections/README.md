# 히어로 섹션 중앙 관리 시스템 (통합 완료 🎉)

이제 모든 페이지의 히어로 배너 데이터를 한 곳에서 관리할 수 있습니다!

## 🔄 최신 업데이트 (통합 완료)

- ✅ `HeroSection` 컴포넌트에 `PageHeroBanner`의 모든 스타일과 애니메이션 적용
- ✅ 중복 표시 문제 해결
- ✅ Ken Burns 애니메이션, 글래스모피즘 브레드크럼, Montserrat 폰트 모두 적용
- ✅ 기존 `useHeroSectionData` 훅과 완벽 호환

## 🎯 사용법

### 1. **기존 방식** (업그레이드됨)

기존 `useHeroSectionData` + `HeroSection` 조합이 자동으로 새로운 스타일 적용됩니다.

```tsx
// layout.tsx 또는 page.tsx에서
const heroData = useHeroSectionData();
return (
  <Box>
    {heroData && <HeroSection slideContents={[heroData]} />}
    {children}
  </Box>
);
```

### 2. **새로운 방식** (PageHeroBanner)

```tsx
// 자동 모드 (권장)
<PageHeroBanner />

// 게시판 페이지
<PageHeroBanner boardId="notices" />

// 수동 설정
<PageHeroBanner
  title="CUSTOM TITLE"
  subtitle="커스텀 부제목"
  backgroundImage="/custom-image.jpg"
  customMenuItems={[
    { name: "메뉴1", href: "/menu1" },
    { name: "메뉴2", href: "/menu2" },
  ]}
/>
```

## 📊 중앙 관리되는 페이지들

### KND 관련

- `/knd/company` - 회사 소개
- `/knd/organization` - 조직도
- `/knd/location` - 오시는 길

### Business 관련

- `/business/business` - 사업 분야
- `/business/process` - 사업 프로세스
- `/business/product` - 제품 소개

### 게시판 관련

- `notices` - 공지사항
- `resources` - 뉴스/보도자료
- `ir` - IR

## 🔧 데이터 추가/수정

새로운 페이지 데이터를 추가하려면 `client/src/lib/constants/heroSectionData.ts`를 수정하세요:

```typescript
export const HERO_DATA: Record<string, HeroPageData> = {
  // 새 페이지 추가
  "/new-page": {
    title: "NEW PAGE",
    subtitle: "새로운 페이지입니다",
    backgroundImage: "/images/new-page.jpg",
    height: "600px",
    menuItems: [
      { name: "메뉴1", href: "/menu1" },
      { name: "메뉴2", href: "/menu2" },
    ],
    animationType: "zoom-in",
  },
};
```

## ✨ 새로운 기능들

### 🎬 Ken Burns 애니메이션

- `zoom-in`: 확대 효과 (기본값)
- `zoom-out`: 축소 효과
- `pan-right`: 우측 이동 효과

### 🪞 글래스모피즘 브레드크럼

- 반투명 블러 효과
- 홈 아이콘 포함
- 부드러운 호버 애니메이션

### 📝 텍스트 애니메이션

- 제목 슬라이드업 효과
- 부제목 페이드인 효과
- Montserrat 폰트 적용

### 🎯 스마트 모드 전환

- 단일 슬라이드: 정적 배너 모드
- 다중 슬라이드: 슬라이드쇼 + 드래그 모드

## ✨ 장점

- **한 곳에서 관리**: 모든 히어로 데이터를 중앙에서 관리
- **자동 매핑**: 경로 기반으로 자동으로 적절한 데이터 적용
- **기존 코드 호환**: 기존 코드 그대로 새로운 스타일 적용
- **고급 애니메이션**: Ken Burns 효과와 글래스모피즘
- **간편한 사용**: 각 페이지에서 한 줄만 추가하면 완료

## 🔄 업그레이드 완료!

### ✅ 자동 적용됨 (기존 코드 그대로)

기존에 `useHeroSectionData` + `HeroSection`을 사용하던 모든 페이지가 **자동으로 새로운 스타일 적용**됩니다!

```tsx
// 기존 코드 그대로 → 새로운 스타일 자동 적용!
const heroData = useHeroSectionData();
return (
  <Box>
    {heroData && <HeroSection slideContents={[heroData]} />}
    {children}
  </Box>
);
```

### 🎉 적용된 변경사항

- ✅ **Ken Burns 애니메이션** 자동 적용
- ✅ **글래스모피즘 브레드크럼** 활성화
- ✅ **Montserrat 폰트** 적용
- ✅ **텍스트 애니메이션** 효과 추가
- ✅ **오버레이 효과** 개선

### 📂 영향받는 페이지들

- `/knd/location` - 오시는 길
- `/mypage` - 마이페이지
- `/bbs/[id]` - 동적 게시판 페이지들
- CMS 보드 미리보기

**더 이상 추가 작업 필요 없음!** 모든 페이지가 자동으로 업그레이드됩니다! 🎊
