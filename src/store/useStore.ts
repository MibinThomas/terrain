import { create } from 'zustand';

export type PageName = 'home' | 'ideas' | 'technology' | 'strategy' | 'services' | 'blog' | 'contact';

interface AppState {
  isHovered: boolean;
  setHovered: (hovered: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  currentPage: PageName;
  setCurrentPage: (page: PageName) => void;
  scrollProgress: {
    hero: number;
    ideas: number;
    technology: number;
    strategy: number;
    services: number;
    blog: number;
    contact: number;
  };
  setScrollProgress: (section: string, progress: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isHovered: false,
  setHovered: (hovered) => set({ isHovered: hovered }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),
  scrollProgress: {
    hero: 1.0,
    ideas: 0.0,
    technology: 0.0,
    strategy: 0.0,
    services: 0.0,
    blog: 0.0,
    contact: 0.0,
  },
  setScrollProgress: (section, progress) =>
    set((state) => ({
      scrollProgress: {
        ...state.scrollProgress,
        [section]: progress,
      },
    })),
}));
