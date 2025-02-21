import { create } from "zustand";

interface Store {
  anchor: string;
  setAnchor: (anchor: string) => void;
}

export const useAnchorStore = create<Store>()((set) => ({
  anchor: '',
  setAnchor: (anchor: string) => set({ anchor }),
}));
