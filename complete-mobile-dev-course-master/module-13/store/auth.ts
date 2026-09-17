import { getToken } from "@/lib/token";
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  checkAuth: () => Promise<void>;
  login: () => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,

  checkAuth: async () => {
    const token = await getToken();
    set({ isAuthenticated: !!token });
  },

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
