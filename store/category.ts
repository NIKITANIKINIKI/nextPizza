import { create } from "zustand";

interface Store {
  currentCategoryId: number;
  setCategoryId: (currentCategoryId: number) => void;
}

export const useCategoryStore = create<Store>()((set) => ({
  currentCategoryId: 0,
  setCategoryId: (currentCategoryId: number) => set({ currentCategoryId }),
}));
