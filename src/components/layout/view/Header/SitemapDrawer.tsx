"use client";

import {
  Box,
  Flex,
  Link,
  Drawer,
  Portal,
  VStack,
  HStack,
  Text as ChakraText,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { memo, useState, useEffect, useCallback } from "react";
import NextLink from "next/link";
import { Menu } from "@/types/api";
import {
  X as LargeCloseIcon,
  User2Icon,
  LogOutIcon,
  ChevronDown,
} from "lucide-react";
import { useRecoilValue } from "recoil";
import { authState, useAuthActions } from "@/stores/auth";
import { useRouter } from "next/navigation";

interface SitemapDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menusWithLastFlag: (Menu & { isLastMenuItem?: boolean })[];
  isMenuActive: (menuUrl: string | undefined) => boolean;
  isDark: boolean;
  width: number;
  height: number;
}

export const SitemapDrawer = memo(
  ({
    isOpen,
    onClose,
    menusWithLastFlag,
    isDark,
    width,
    height,
  }: SitemapDrawerProps) => {
    const router = useRouter();

    const [selectedCategoryKey, setSelectedCategoryKey] = useState<
      number | null
    >(null);

    const [hoveredMenuParent, setHoveredMenuParent] = useState<number | null>(
      null
    );
    const [expandedMenu, setExpandedMenu] = useState<number | null>(null);

    const { isAuthenticated } = useRecoilValue(authState);
    const { logout } = useAuthActions();

    const topLevelMenus = menusWithLastFlag.filter(
      (menu) => !menu.parentId || menu.parentId === 0
    );
    const handleNavigate = useCallback(
      (path: string) => {
        router.push(path);
        onClose(); // Close drawer after navigation
      },
      [router]
    );
    const handleLogout = useCallback(async () => {
      try {
        await logout();
        onClose(); // Close drawer after logout
      } catch (error) {
        console.error("Logout error:", error);
        // logout() already handles error cases and cleans up local state
        onClose(); // Still close drawer even if logout fails
      }
    }, [logout]);

    // The right panel will display content based on ALL topLevelMenus, not just the selected one.
    // The selectedCategoryKey is now mainly for styling the left sidebar.

    const handleCategoryClick = (categoryId: number) => {
      setSelectedCategoryKey(categoryId);
      const sectionElement = document.getElementById(
        `sitemap-section-${categoryId}`
      );
      if (sectionElement) {
        // Find the scrollable container for the right panel
        const scrollableContainer =
          document.getElementById("sitemapRightPanel");
        if (scrollableContainer) {
          // Calculate the offset of the target element relative to the scrollable container
          const scrollTop =
            sectionElement.offsetTop - scrollableContainer.offsetTop;
          scrollableContainer.scrollTo({
            top: scrollTop,
            behavior: "smooth",
          });
        }
      }
    };

    // Hide body scroll when drawer is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }, [isOpen]);

    return (
      <Drawer.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
        placement="end"
        size="full"
        modal={true}
      >
        <Portal>
          <Drawer.Backdrop
            bg={isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)"}
          />
          <Drawer.Positioner>
            <Drawer.Content bg={isDark ? "gray.800" : "white"} boxShadow="none">
              <Flex
                as="header"
                align="center"
                justify="center"
                borderBottomWidth="1px"
                borderColor={isDark ? "gray.700" : "gray.200"}
                h={{ base: "60px", lg: "70px" }}
              >
                <Flex
                  align="center"
                  justify="space-between"
                  maxW={{ base: "90%", "2xl": "92vw" }}
                  w="full"
                >
                  <Link as={NextLink} href="/" onClick={onClose}>
                    <Image
                      src={
                        isDark
                          ? "/images/logo/logo_w.png"
                          : "/images/logo/logo.png"
                      }
                      width={width}
                      height={height}
                      alt="logo"
                    />
                  </Link>
                  {/* <HStack gap={4}>
                    {isAuthenticated ? (
                      <Flex gap={2}>
                        { <Button
                          variant="ghost"
                          onClick={() => handleNavigate("/mypage")}
                          color={isDark ? "gray.200" : "gray.700"}
                          justifyContent="flex-start"
                          size="xs"
                          p={0}
                        >
                          <User2Icon size={18} />
                          마이페이지
                        </Button> }
                        { <Button
                          variant="ghost"
                          colorPalette="red"
                          onClick={handleLogout}
                          justifyContent="flex-start"
                          size="xs"
                          p={0}
                        >
                          <LogOutIcon size={18} />
                          로그아웃
                        </Button> }
                      </Flex>
                    ) : (
                      <Flex gap={2}>
                        <Button
                          flex={1}
                          justifyContent="center"
                          variant="outline"
                          onClick={() => handleNavigate("/login")}
                          color={isDark ? "gray.200" : "gray.700"}
                          size="xs"
                        >
                          로그인
                        </Button>
                        <Button
                          flex={1}
                          justifyContent="center"
                          variant="solid"
                          colorPalette="blue"
                          onClick={() => handleNavigate("/signup")}
                          size="xs"
                        >
                          회원가입
                        </Button>
                      </Flex>
                    )}
                  </HStack> */}
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    p={0}
                    minW="auto"
                    h="auto"
                    _hover={{ bg: "transparent" }}
                  >
                    <LargeCloseIcon size={24} />
                  </Button>
                </Flex>
              </Flex>

              <Drawer.Body p={0}>
                <Box
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: isDark ? "#2D3748" : "#F7FAFC",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: isDark ? "#4A5568" : "#CBD5E0",
                      borderRadius: "6px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: isDark ? "#718096" : "#A0AEC0",
                    },
                  }}
                >
                  <Flex
                    h="auto"
                    justify="center"
                    alignItems="center"
                    textAlign="center"
                    minH={{
                      base: "0",
                      lg: "calc(100vh - 70px - 0px)",
                    }}
                  >
                    <VStack
                      as="aside"
                      w="full"
                      maxW={{ base: "100%", "2xl": "92vw" }}
                      bg={isDark ? "gray.800" : "white"}
                      align="flex-start"
                      flexDirection={{ base: "column", xl: "row" }}
                      gap={0}
                    >
                      {topLevelMenus.map((menu, index) => (
                        <Box
                          key={menu.id}
                          w={{ base: "90%", xl: "25%" }}
                          mx={{ base: "auto", xl: "0" }}
                          borderLeftWidth={{
                            base: "0",
                            xl: index === 0 ? "1px" : "0",
                          }}
                          borderLeftStyle="solid"
                          borderLeftColor={isDark ? "gray.600" : "gray.300"}
                          borderRightWidth={{ base: "0", xl: "1px" }}
                          borderRightStyle="solid"
                          borderRightColor={isDark ? "gray.600" : "gray.300"}
                          borderBottomWidth={{ base: "1px", xl: "0" }}
                          borderBottomStyle="solid"
                          borderBottomColor={isDark ? "gray.600" : "gray.300"}
                          minH={{
                            base: "auto",
                            xl: "calc(100vh - 70px - 0px)",
                          }}
                          display="flex"
                          flexDirection="column"
                          justifyContent="flex-start"
                          alignItems="center"
                          pt={{ base: "0", xl: "250px" }}
                          pb={{ base: "0", xl: "0" }}
                          cursor={{ base: "pointer", xl: "auto" }}
                        >
                          <ChakraText
                            className="main-menu-title"
                            fontSize={{ base: "18px", md: "24px", lg: "30px" }}
                            py={{ base: "15px", xl: "0" }}
                            fontWeight={
                              hoveredMenuParent === menu.id ||
                              expandedMenu === menu.id
                                ? "700"
                                : "600"
                            }
                            color={{
                              base:
                                expandedMenu === menu.id
                                  ? "#0D344E"
                                  : isDark
                                  ? "gray.100"
                                  : "gray.700",
                              xl:
                                hoveredMenuParent === menu.id
                                  ? "#0D344E"
                                  : isDark
                                  ? "gray.100"
                                  : "gray.700",
                            }}
                            onClick={() => {
                              handleCategoryClick(menu.id);
                              // 모바일에서는 아코디언 토글
                              if (window.innerWidth < 1200) {
                                setExpandedMenu(
                                  expandedMenu === menu.id ? null : menu.id
                                );
                              }
                            }}
                            cursor="pointer"
                            position="relative"
                            zIndex={2}
                            w="full"
                            transition="all 0.2s ease"
                            mb={{ base: "0", xl: "120px" }}
                            _hover={{
                              color: "#0D344E",
                              fontWeight: "700",
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent={{
                              base: "space-between",
                              xl: "center",
                            }}
                            gap={2}
                            borderBottom={{
                              base:
                                expandedMenu === menu.id ? "1px solid" : "none",
                              xl: "none",
                            }}
                            borderBottomColor="gray.300"
                            pb={{
                              base: "15px",
                              xl: "0",
                            }}
                          >
                            {menu.name}
                            {/* 모바일 아코디언 화살표 */}
                            <Box
                              display={{ base: "block", xl: "none" }}
                              transform={
                                expandedMenu === menu.id
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)"
                              }
                              transition="transform 0.3s ease"
                              ml={2}
                            >
                              <ChevronDown
                                size={20}
                                color={
                                  expandedMenu === menu.id
                                    ? "#0D344E"
                                    : isDark
                                    ? "#F7FAFC"
                                    : "#2D3748"
                                }
                              />
                            </Box>
                          </ChakraText>

                          {/* Child menus displayed under each top-level menu */}
                          {menu.children && menu.children.length > 0 && (
                            <Box
                              display={{
                                base:
                                  expandedMenu === menu.id ? "block" : "none",
                                xl: "block",
                              }}
                              w="100%"
                              bg={{
                                base:
                                  expandedMenu === menu.id
                                    ? isDark
                                      ? "gray.800"
                                      : "gray.50"
                                    : "transparent",
                                xl: "transparent",
                              }}
                              p={{
                                base: expandedMenu === menu.id ? "10px" : "0",
                                xl: "0",
                              }}
                            >
                              <Flex
                                wrap="wrap"
                                gap={
                                  menu.children.some(
                                    (child) =>
                                      child.children &&
                                      child.children.length > 0
                                  )
                                    ? 0
                                    : { base: 0, md: 0 }
                                }
                                align="flex-start"
                                justifyContent={{
                                  base: "flex-start",
                                  xl: "center",
                                }}
                                w="full"
                                flexDirection={{ base: "column", xl: "row" }}
                                px={{ base: "20px", xl: "0" }}
                              >
                                {menu.children.map((level2Menu) => (
                                  <Box
                                    key={level2Menu.id}
                                    w="100%"
                                    mb={{ base: "8px", xl: "0" }}
                                  >
                                    {level2Menu.url ? (
                                      <Link
                                        as={NextLink}
                                        href={level2Menu.url}
                                        onClick={onClose}
                                        onMouseEnter={() =>
                                          setHoveredMenuParent(menu.id)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredMenuParent(null)
                                        }
                                        fontWeight="medium"
                                        borderRadius={0}
                                        paddingY={{ base: 3, xl: 5 }}
                                        paddingX={{ base: 0, xl: 4 }}
                                        fontSize={{
                                          base: "14px",
                                          md: "16px",
                                          lg: "22px",
                                        }}
                                        lineHeight="1.2"
                                        color={isDark ? "gray.100" : "gray.800"}
                                        position="relative"
                                        overflow="hidden"
                                        transition="all 0.4s ease"
                                        textAlign={{
                                          base: "left",
                                          xl: "center",
                                        }}
                                        _before={{
                                          content: { base: "none", xl: '""' },
                                          position: "absolute",
                                          top: 0,
                                          left: 0,
                                          width: "0%",
                                          height: "100%",
                                          backgroundImage:
                                            "linear-gradient(90deg, #297D83 0%, #889C3F 100%)",
                                          transition: "width 0.4s ease",
                                          zIndex: 0,
                                        }}
                                        _hover={{
                                          color: {
                                            base: "#0D344E",
                                            xl: "white",
                                          },
                                          fontWeight: "bold",
                                          _before: {
                                            width: { base: "0%", xl: "100%" },
                                          },
                                        }}
                                        display="block"
                                      >
                                        <Box position="relative" zIndex={1}>
                                          {level2Menu.name}
                                        </Box>
                                      </Link>
                                    ) : (
                                      <ChakraText
                                        fontWeight="medium"
                                        fontSize={{ base: "md", md: "lg" }}
                                        color={isDark ? "gray.100" : "gray.800"}
                                        onMouseEnter={() =>
                                          setHoveredMenuParent(menu.id)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredMenuParent(null)
                                        }
                                        cursor="pointer"
                                        paddingY={{ base: 3, xl: 5 }}
                                        paddingX={{ base: 0, xl: 4 }}
                                        position="relative"
                                        overflow="hidden"
                                        transition="all 0.4s ease"
                                        textAlign={{
                                          base: "left",
                                          xl: "center",
                                        }}
                                        _before={{
                                          content: { base: "none", xl: '""' },
                                          position: "absolute",
                                          top: 0,
                                          left: 0,
                                          width: "0%",
                                          height: "100%",
                                          backgroundImage:
                                            "linear-gradient(90deg, #297D83 0%, #889C3F 100%)",
                                          transition: "width 0.4s ease",
                                          zIndex: 0,
                                        }}
                                        _hover={{
                                          color: {
                                            base: "#0D344E",
                                            xl: "white",
                                          },
                                          fontWeight: "bold",
                                          _before: {
                                            width: { base: "0%", xl: "100%" },
                                          },
                                        }}
                                      >
                                        <Box position="relative" zIndex={1}>
                                          {level2Menu.name}
                                        </Box>
                                      </ChakraText>
                                    )}
                                    {level2Menu.children &&
                                    level2Menu.children.length > 0 ? (
                                      <VStack
                                        align="flex-start"
                                        gap={1.5}
                                        pl={0}
                                      >
                                        {level2Menu.children.map(
                                          (level3Link) => (
                                            <Link
                                              key={level3Link.id}
                                              as={NextLink}
                                              href={level3Link.url || "#"}
                                              onClick={onClose}
                                              onMouseEnter={() =>
                                                setHoveredMenuParent(menu.id)
                                              }
                                              onMouseLeave={() =>
                                                setHoveredMenuParent(null)
                                              }
                                              fontSize={{
                                                base: "sm",
                                                md: "md",
                                              }}
                                              color={
                                                isDark ? "gray.300" : "gray.600"
                                              }
                                              paddingY={2}
                                              paddingX={3}
                                              borderRadius="md"
                                              position="relative"
                                              overflow="hidden"
                                              transition="all 0.4s ease"
                                              textAlign={{
                                                base: "left",
                                                xl: "center",
                                              }}
                                              _before={{
                                                content: {
                                                  base: "none",
                                                  xl: '""',
                                                },
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                width: "0%",
                                                height: "100%",
                                                backgroundImage:
                                                  "linear-gradient(90deg, #297D83 0%, #889C3F 100%)",
                                                transition: "width 0.4s ease",
                                                zIndex: 0,
                                              }}
                                              _hover={{
                                                fontWeight: "semibold",
                                                color: {
                                                  base: "#0D344E",
                                                  xl: "white",
                                                },
                                                _before: {
                                                  width: {
                                                    base: "0%",
                                                    xl: "100%",
                                                  },
                                                },
                                              }}
                                              display="block"
                                            >
                                              <Box
                                                position="relative"
                                                zIndex={1}
                                              >
                                                {level3Link.name}
                                              </Box>
                                            </Link>
                                          )
                                        )}
                                      </VStack>
                                    ) : null}
                                  </Box>
                                ))}
                              </Flex>
                            </Box>
                          )}
                        </Box>
                      ))}
                      <Box flex={1} />
                    </VStack>
                  </Flex>
                </Box>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    );
  }
);

SitemapDrawer.displayName = "SitemapDrawer";
export default SitemapDrawer;
