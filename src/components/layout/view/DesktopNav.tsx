"use client";

import { Flex, Box } from "@chakra-ui/react";
import { memo } from "react";
import { Menu } from "@/types/api";
import { usePathname } from "next/navigation";
import { MenuItem as MemoizedMenuItem } from "./MenuItem";

interface DesktopNavProps {
  menusWithLastFlag: (Menu & { isLastMenuItem?: boolean })[];
  isNavHovered: boolean;
  isDark: boolean;
  currentPage: string;
  isMainPage: boolean;
  lastHoveredMenuId: number | null;
  onMenuHover: (menuId: number) => void;
  onMenuLeave: () => void;
  isScrolled: boolean;
}

export const DesktopNav = memo(
  ({
    menusWithLastFlag,
    isNavHovered,
    isDark,
    currentPage,
    isMainPage,
    lastHoveredMenuId,
    onMenuHover,
    onMenuLeave,
    isScrolled,
  }: DesktopNavProps) => {
    return (
      <Box
        display={{ base: "none", lg: "block" }}
        mx="auto"
        position="relative"
        flex={1}
        width="100%"
        justifyContent="space-between"
        zIndex={1000}
      >
        <Box>
          <Flex justifyContent="space-between" alignItems="flex-start">
            {menusWithLastFlag?.map((menu, index) => (
              <MemoizedMenuItem
                key={`menu-${menu.id}-${index}-${menu.name}`}
                menu={menu}
                isNavHovered={isNavHovered}
                isDark={isDark}
                isRoot={true}
                currentPage={currentPage}
                isMainPage={isMainPage}
                lastHoveredMenuId={lastHoveredMenuId}
                onMenuHover={onMenuHover}
                onMenuLeave={onMenuLeave}
                isScrolled={isScrolled}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    );
  }
);

DesktopNav.displayName = "DesktopNav";
export default DesktopNav;
