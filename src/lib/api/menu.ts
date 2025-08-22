import { Menu } from "@/types/api";
import { PageDetailsDto } from "@/types/menu";
import { privateApi, publicApi } from "./client";
import { MenuApiResponse, PageDetailsApiResponse } from "@/types/api-response";

// 메뉴를 sortOrder 기준으로 정렬하는 헬퍼 함수
export function sortMenus(menus: Menu[]): Menu[] {
  // Create a map of menus by ID for quick lookup
  const menuMap = new Map<number, Menu>();

  // First pass: create deep copies of menu objects
  menus?.forEach((menu) => {
    const menuCopy = {
      ...menu,
      children: [], // Initialize empty children array
    };
    menuMap.set(menu.id, menuCopy);
  });

  // Build the tree structure
  const rootMenus: Menu[] = [];

  // Second pass: build the tree structure
  menus?.forEach((menu) => {
    const menuCopy = menuMap.get(menu.id);
    if (!menuCopy) return;

    if (menu.parentId === null || menu.parentId === undefined) {
      rootMenus.push(menuCopy);
    } else {
      const parent = menuMap.get(menu.parentId);
      if (parent) {
        // 순환 참조 방지: 자기 자신을 부모로 삼을 수 없음
        if (parent.id === menu.id) {
          console.warn(
            `[sortMenus] Circular reference detected: Menu ${menu.id} ('${menu.name}') cannot be its own parent. Treating as a root menu.`
          );
          rootMenus.push(menuCopy);
          return;
        }

        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(menuCopy);
      } else {
        // 고아 메뉴 처리: 존재하지 않는 부모를 가진 메뉴는 루트 메뉴로 간주
        console.warn(
          `[sortMenus] Orphan menu detected: Menu ${menu.id} ('${menu.name}') has a non-existent parentId ${menu.parentId}. Treating as a root menu.`
        );
        rootMenus.push(menuCopy);
      }
    }
  });

  // Third pass: sort each level
  const sortChildren = (menu: Menu) => {
    if (menu.children && menu.children.length > 0) {
      menu.children.sort((a, b) => a.sortOrder - b.sortOrder);
      menu.children.forEach(sortChildren);
    }
  };

  rootMenus.sort((a, b) => a.sortOrder - b.sortOrder);
  rootMenus?.forEach(sortChildren);

  return rootMenus;
}

// 메뉴 목록을 가져오는 API 함수
export async function fetchMenus(): Promise<Menu[]> {
  try {
    const response = await privateApi.get<Menu[]>("/cms/menu");
    if (!response) {
      throw new Error("Failed to fetch menus");
    }
    const sortedMenus = sortMenus(response.data);
    return sortedMenus;
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
}

// 메뉴 관련 API 타입 정의
export interface MenuApi {
  getMenus: () => Promise<Menu[]>;
  getPublicMenus: () => Promise<Menu[]>;
  getMenu: (id: number) => Promise<Menu>;
  createMenu: (
    data: Omit<Menu, "id" | "createdAt" | "updatedAt">
  ) => Promise<Menu>;
  updateMenu: (
    id: number,
    data: Omit<Menu, "id" | "createdAt" | "updatedAt">
  ) => Promise<Menu>;
  deleteMenu: (id: number) => Promise<void>;
  updateMenuOrder: (
    orders: Array<{
      id: number;
      targetId: number | null;
      position: "before" | "after" | "inside";
    }>
  ) => Promise<Menu[]>;
}

export interface UpdateMenuOrderRequest {
  id: number;
  targetId: number | null;
  position: "before" | "after" | "inside";
}

// 메뉴 API 구현
export const menuApi = {
  getMenus: async () => {
    try {
      const response = await privateApi.get<{
        data: Menu[];
        status: number;
      }>("/cms/menu");
      return response;
    } catch (error) {
      console.error("Error fetching menus:", error);
      throw error;
    }
  },
  getPublicMenus: async () => {
    try {
      const response = await publicApi.get<MenuApiResponse>("/cms/menu/public");
      return response;
    } catch (error) {
      console.error("Error fetching public menus:", error);
      throw error;
    }
  },
  getMenusByType: async (type: string) => {
    try {
      const response = await privateApi.get<{
        content: Menu[];
        pageable: any;
        totalElements: number;
        totalPages: number;
        last: boolean;
      }>(`/cms/menu/type/${type}`);
      return response;
    } catch (error) {
      console.error(`Error fetching menus by type ${type}:`, error);
      throw error;
    }
  },
  getMenu: async (id: number) => {
    try {
      const response = await privateApi.get<Menu>(`/cms/menu/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching menu ${id}:`, error);
      throw error;
    }
  },
  createMenu: async (data: Omit<Menu, "id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await privateApi.post<Menu>("/cms/menu", data);
      return response;
    } catch (error) {
      console.error("Error creating menu:", error);
      throw error;
    }
  },
  updateMenu: async (
    id: number,
    data: Omit<Menu, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await privateApi.put<Menu>(`/cms/menu/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating menu ${id}:`, error);
      throw error;
    }
  },
  deleteMenu: async (id: number) => {
    try {
      await privateApi.delete(`/cms/menu/${id}`);
    } catch (error) {
      console.error(`Error deleting menu ${id}:`, error);
      throw error;
    }
  },
  updateMenuOrder: async (
    orders: Array<{
      id: number;
      targetId: number | null;
      position: "before" | "after" | "inside";
    }>
  ) => {
    try {
      if (!orders || orders.length === 0) {
        throw new Error("Orders array cannot be empty");
      }

      // 유효성 검증
      for (const order of orders) {
        if (!order.id || typeof order.id !== 'number') {
          throw new Error(`Invalid order ID: ${order.id}`);
        }
        if (!["before", "after", "inside"].includes(order.position)) {
          throw new Error(`Invalid position: ${order.position}`);
        }
      }

      console.log("Updating menu order:", orders);
      const response = await privateApi.put<Menu[]>("/cms/menu/order", orders);
      console.log("Menu order update successful:", response.data);
      return response;
    } catch (error) {
      console.error("Error updating menu order:", error);
      // 네트워크 에러인지 서버 에러인지 구분
      if (error instanceof Error) {
        if (error.message.includes("Network Error")) {
          throw new Error("네트워크 연결을 확인해주세요. 서버에 접속할 수 없습니다.");
        } else if (error.message.includes("500")) {
          throw new Error("서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      }
      throw error;
    }
  },

  // New function to get page details for a menu item
  getPageDetails: async (menuId: number): Promise<PageDetailsDto> => {
    try {
      if (!menuId || typeof menuId !== 'number') {
        throw new Error(`Invalid menu ID: ${menuId}`);
      }

      const response = await publicApi.get<PageDetailsApiResponse>(
        `/cms/menu/public/${menuId}/page-details`
      );

      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format");
      }

      // API 응답에서 data 필드를 반환
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching page details for menu ${menuId}:`, error);
      throw error;
    }
  },
};

// React Query 키 정의
export const menuKeys = {
  all: ["menus"] as const,
  lists: () => [...menuKeys.all, "list"] as const,
  list: (filters: string) => [...menuKeys.lists(), { filters }] as const,
  byType: (type: string) => [...menuKeys.all, "type", type] as const,
  details: () => [...menuKeys.all, "detail"] as const,
  detail: (id: number) => [...menuKeys.details(), id] as const,
  // New key for page details
  pageDetails: (id: number) => [...menuKeys.all, "pageDetail", id] as const,
};
