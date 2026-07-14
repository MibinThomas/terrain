import { create } from 'zustand';

interface AppState {
  isHovered: boolean;
  setHovered: (hovered: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentPage: 'home' | 'ideas' | 'technology' | 'strategy';
  setCurrentPage: (page: 'home' | 'ideas' | 'technology' | 'strategy') => void;
}

export const useStore = create<AppState>((set) => ({
  isHovered: false,
  setHovered: (hovered) => set({ isHovered: hovered }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
}));
