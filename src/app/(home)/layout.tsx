"use client";

import { useEffect } from "react";
import Header from "./_components/header";
import { useAuthStore } from "../store/useAuthStore";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setAccessToken, authenticated, setAuthentication } = useAuthStore(
    (state) => state,
  );

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
          // console.log(accessToken);
          setAccessToken(accessToken);
          setAuthentication(true);
        } else {
          console.error("Failed to reissue access token");
        }
      } catch (error) {
        console.error("Error reissuing access token:", error);
      }
    };
    reissueAccessToken();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow mt-16">{children}</div>
    </div>
  );
}
