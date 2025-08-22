export interface HeroPageData {
  title: string;
  titleGradient?: {
    from: string;
    to: string;
  };
  subtitle?: string;
  subtitleColor?: string;
  // true면 subtitle 내 <br />을 모든 해상도에서 줄바꿈 처리
  // 기본은 모바일에서만 줄바꿈 처리
  subtitleBrAlways?: boolean;
  backgroundImage: string;
  height?: string;
  menuItems: Array<{ name: string; href: string }>;
  animationType?: "zoom-in" | "zoom-out" | "pan-right";
}

export interface BoardHeroData extends HeroPageData {
type: "board";
}

export interface DynamicHeroData extends HeroPageData {
type: "dynamic";
}

// 완전한 페이지별 히어로 데이터 중앙 관리
export const DEFAULT_HERO_DATA: HeroPageData = {
  title: "페이지",
  subtitle: undefined,
  subtitleColor: "#0D344E",
  subtitleBrAlways: false,
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [{ name: "홈", href: "/" }],
  animationType: "zoom-in",
};

// 완전한 페이지별 히어로 데이터 중앙 관리
export const HERO_DATA: Record<string, HeroPageData> = {
// UC 관련 페이지들
"/uc/center": {
  title: "센터소개",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "울산과학대학교 학생상담센터를 소개합니다",
  subtitleColor: "#0d344e",
  backgroundImage: "/images/main/hero-image.jpg",
  height: "500px",
  menuItems: [
    { name: "센터안내", href: "/uc/center" },
    { name: "센터소개", href: "/uc/center" },
  ],
  animationType: "zoom-in",
},

"/uc/location": {
  title: "센터소개",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "울산과학대학교 학생상담센터의 위치를 소개합니다",
  subtitleColor: "#0d344e",
  backgroundImage: "/images/main/hero-image.jpg",
  height: "500px",
  menuItems: [
    { name: "센터안내", href: "/uc/center" },
    { name: "찾아오시는 길", href: "/uc/location" },
  ],
  animationType: "zoom-in",
},
"/uc/info": {
  title: "센터소개",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "울산과학대학교 학생상담센터의 <br />위기 상황별 대응 및 연계기관을 안내드립니다",
  subtitleColor: "#0D344E",
  subtitleBrAlways: false,
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [
    { name: "센터안내", href: "/uc/center" },
    { name: "위기상황별 대응 및 연계기관 안내", href: "/uc/info" },
  ],
  animationType: "zoom-in",
},
"/counsel/individual": {
  title: "개인상담",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "혼자 끙끙대지 말고, 안전한 공간에서 가볍게 시작해 보세요",
  subtitleColor: "#0D344E",
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [
    { name: "개인상담", href: "/counsel/individual" },
    { name: "개인상담 안내", href: "/counsel/individual" },
  ],
  animationType: "zoom-out",
},
"/counsel/group": {
  title: "개인상담",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "함께 이야기하고, 함께 자라는 시간입니다",
  subtitleColor: "#0D344E",
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [
    { name: "개인상담", href: "/counsel/group" },
    { name: "그룹상담 안내", href: "/counsel/group" },
  ],
  animationType: "zoom-out",
},
"/counsel/disabled": {
  title: "개인상담",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "내 마음을 이해하고, 문제 해결 방법을 함께 찾습니다.",
  subtitleColor: "#0D344E",
  subtitleBrAlways: true,
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [
    { name: "개인상담", href: "/counsel/individual" },
    { name: "장애학생심리지원상담 안내", href: "/counsel/disabled" },
  ],
  animationType: "zoom-out",
},
"/therapy/therapy": {
  title: "심리검사",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "자가진단은 <br />현재 나의 마음 상태를 간단히 살펴볼 수 있는 도구입니다.",
  subtitleColor: "#0D344E",
  subtitleBrAlways: true,
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [
    { name: "심리검사", href: "/therapy/therapy" },
    { name: "자가진단", href: "/therapy/therapy" },
  ],
  animationType: "zoom-in",
},
"/therapy/counseling": {
  title: "심리검사",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "나를 객관적으로 보는 첫걸음입니다. <br />결과를 함께 해석하며, 앞으로의 방향을 정리합니다.",
  subtitleColor: "#0D344E",
  subtitleBrAlways: true,
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [
    { name: "심리검사", href: "/therapy/counseling" },
    { name: "심리검사 안내", href: "/therapy/counseling" },
  ],
  animationType: "zoom-in",
},  
"/sexualcounseling/sexualcounseling": {
  title: "성고충상담",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "내 마음을 이해하고, 문제 해결 방법을 함께 찾습니다.",
  subtitleColor: "#0D344E",
  subtitleBrAlways: true,
  backgroundImage: "/images/sub/bg.jpg",
  height: "500px",
  menuItems: [
    { name: "성고충상담", href: "/sexualcounseling/sexualcounseling" },
    { name: "성고충상담 안내", href: "/sexualcounseling/sexualcounseling" },
  ],
  animationType: "zoom-in",
},


// 게시판 관련 페이지들 (완전 통합)
"/bbs": {
  title: "BOARD",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "울산과학대학교 학생상담센터의 게시판입니다",
  backgroundImage: "/images/sub/privacy_bg.jpg",
  height: "500px",
  menuItems: [
    { name: "홈", href: "/" },
    { name: "게시판", href: "/bbs" },
  ],
  animationType: "zoom-in",
},

"/bbs/notices": {
  title: "공지/소식",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "울산과학대학교 학생상담센터의 공지사항을 확인하세요",
  subtitleColor: "#0D344E",
  backgroundImage: "/images/sub/privacy_bg.jpg",
  height: "500px",
  menuItems: [
    { name: "공지/소식", href: "/bbs/notices" },
    { name: "공지/소식", href: "/bbs/notices" },
  ],
  animationType: "zoom-in",
},

"/bbs/resources": {
  title: "공지/소식",
  titleGradient: {
    from: "#297D83",
    to: "#48AF84"
  },
  subtitle: "울산과학대학교 학생상담센터의 이야기를 전해드립니다",
  subtitleColor: "#0D344E",
  backgroundImage: "/images/sub/privacy_bg.jpg",
  height: "500px",
  menuItems: [
    { name: "공지/소식", href: "/bbs/resources" },
    { name: "상담센터 이야기", href: "/bbs/resources" },
  ],
  animationType: "zoom-in",
},

"/bbs/ir": {
  title: "IR",
  subtitle: "K&D ENERGEN의 IR 정보를 확인하세요",
  subtitleColor: "#0D344E",
  backgroundImage: "/images/sub/privacy_bg.jpg",
  height: "500px",
  menuItems: [
    { name: "IR", href: "/bbs/ir" },
    { name: "IR", href: "/bbs/ir" },
  ],
  animationType: "zoom-in",
},

};



// HERO_DATA를 HeroSection 형태로 자동 변환하는 함수
function convertHeroDataToLegacyFormat(heroData: HeroPageData, path: string): {
header?: string;
title: string;
subtitle?: string;
subtitleColor?: string;
image: string;
breadcrumbBorderColor?: string;
breadcrumb?: { label: string; url: string }[];
} {
// 경로에 따른 헤더 및 브레드크럼 생성
const segments = path.split('/').filter(Boolean);
const breadcrumb: { label: string; url: string }[] = [
  { label: "홈", url: "/" }
];

// 브레드크럼 자동 생성
if (segments[0] === 'knd') {
  breadcrumb.push({ label: "회사소개", url: "/knd/company" });
  if (segments[1] === 'organization') {
    breadcrumb.push({ label: "조직도", url: path });
  } else if (segments[1] === 'location') {
    breadcrumb.push({ label: "오시는 길", url: path });
  }
} else if (segments[0] === 'business') {
  breadcrumb.push({ label: "사업분야", url: "/business/business" });
  if (segments[1] === 'process') {
    breadcrumb.push({ label: "사업 프로세스", url: path });
  } else if (segments[1] === 'product') {
    breadcrumb.push({ label: "제품소개", url: path });
  }
} else if (segments[0] === 'bbs') {
  if (segments[1] === 'notices') {
    breadcrumb.push({ label: "PR", url: "/bbs/notices" });
    breadcrumb.push({ label: "공지/소식", url: path });
  } else if (segments[1] === 'resources') {
    breadcrumb.push({ label: "PR", url: "/bbs/resources" });
    breadcrumb.push({ label: "뉴스/보도자료", url: path });
  } else if (segments[1] === 'ir') {
    breadcrumb.push({ label: "IR", url: path });
    breadcrumb.push({ label: "IR", url: path });
  } else {
    breadcrumb.push({ label: "게시판", url: path });
  }
} else if (segments[0] === 'pr') {
  if (segments[1]) {
    breadcrumb.push({ label: "PR", url: "/pr" });
    if (segments[1] === 'notices') {
      breadcrumb.push({ label: "공지/소식", url: path });
    } else if (segments[1] === 'resources') {
      breadcrumb.push({ label: "뉴스/보도자료", url: path });
    } else if (segments[1] === 'ir') {
      breadcrumb.push({ label: "IR", url: path });
    }
  } else {
    breadcrumb.push({ label: "PR", url: path });
  }
}

// 헤더 자동 생성
let header = heroData.title;
if (heroData.title === 'NOTICES') header = 'NOTICES';
else if (heroData.title === '뉴스/보도자료') header = 'NEWS';
else if (heroData.title === 'IR') header = 'IR';
else if (heroData.title === 'BOARD') header = 'BOARD';
else if (heroData.title === 'PR') header = 'PR';

return {
  header,
  title: heroData.title,
  subtitle: heroData.subtitle,
  subtitleColor: heroData.subtitleColor,
  image: heroData.backgroundImage,
  breadcrumbBorderColor: "#4A7CD5",
  breadcrumb,
};
}

// 기존 HeroSection 컴포넌트와의 호환성을 위한 자동 생성 export
export const heroSectionData: Record<
string,
{
  header?: string;
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  image: string;
  breadcrumbBorderColor?: string;
  breadcrumb?: { label: string; url: string }[];
}
> = {
// HERO_DATA를 기반으로 자동 변환
...Object.fromEntries(
  Object.entries(HERO_DATA).map(([path, data]) => [
    path,
    convertHeroDataToLegacyFormat(data, path)
  ])
),
};
