import { create } from "zustand";

export const useUser = create((set) => ({
  user: {},
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: {}, isAuthenticated: false }),
}));
