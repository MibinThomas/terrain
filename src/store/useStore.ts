import { create } from 'zustand';

interface AppState {
  isHovered: boolean;
  setHovered: (hovered: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isHovered: false,
  setHovered: (hovered) => set({ isHovered: hovered }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
