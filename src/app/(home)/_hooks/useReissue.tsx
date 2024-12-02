"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { useEffect } from "react";

export const useReissue = () => {
  const { setAccessToken, setAuthenticated } = useAuthStore((state) => state);

  useEffect(() => {
    const reissueAccessToken = async () => {
      try {
        const response = await fetch(`/api/auth/reissue`, {
          method: "POST",
          credentials: "include", // 쿠키가 필요하면 이 옵션을 사용
        });

        if (response.ok) {
          const data = await response.json();
          const accessToken = data.accessToken;
          setAccessToken(accessToken);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        setAuthenticated(false);
      }
    };

    reissueAccessToken();
  }, [setAccessToken, setAuthenticated]);
};
