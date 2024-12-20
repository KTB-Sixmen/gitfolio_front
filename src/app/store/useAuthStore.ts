import { create } from "zustand";

interface AuthStoreInterface {
  authenticated: boolean;
  setAuthenticated: (val: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  accessToken: string | null;
  setAccessToken: (finished: string) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthStoreInterface>((set) => ({
  authenticated: false,
  setAuthenticated: (val) => set((state) => ({ authenticated: val })),
  user: {},
  setUser: (user) => set({ user }),
  accessToken: null,
  setAccessToken: (token) => set((state) => ({ accessToken: token })),
  resetAuth: () =>
    set({
      authenticated: false,
      user: {},
      accessToken: null,
    }),
}));
