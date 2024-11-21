import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStoreInterface {
  authenticated: boolean;
  setAuthentication: (val: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  accessToken: string | null;
  setAccessToken: (finished: string) => void;
}

// create our store
// export const useAuthStore = create(
//   persist<AuthStoreInterface>(
//     (set) => ({
//       authenticated: false,
//       setAuthentication: (val) => set((state) => ({ authenticated: val })),
//       user: {},
//       setUser: (user) => set({ user }),
//       accessToken: null,
//       setAccessToken: (token) => set((state) => ({ accessToken: token })),
//     }),
//     { name: "AuthStore" }
//   )
// );

export const useAuthStore = create<AuthStoreInterface>((set) => ({
  authenticated: false,
  setAuthentication: (val) => set((state) => ({ authenticated: val })),
  user: {},
  setUser: (user) => set({ user }),
  accessToken: null,
  setAccessToken: (token) => set((state) => ({ accessToken: token })),
}));

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const setAccessToken = (accessToken: string) =>
  useAuthStore.setState({ accessToken });
