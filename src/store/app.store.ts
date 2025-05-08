import { create } from 'zustand';

interface AppState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: !!localStorage.getItem('auth'),
  login: () => {
    localStorage.setItem('auth', 'true');
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth');
    set({ isAuthenticated: false });
  },
}));
