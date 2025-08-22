"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // 브라우저의 자동 스크롤 복원 기능을 비활성화합니다.
    // 이 설정을 통해 페이지는 새로고침 시 항상 (0, 0) 위치에서 로드됩니다.
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
