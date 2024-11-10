import { create } from "zustand";

export const useUser = create((set) => ({
  user: {},
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: {}, isAuthenticated: false }),
}));

export const useProfImg = create((set) => ({
  image:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
  setImage: (image) => set({ image }),
}));
