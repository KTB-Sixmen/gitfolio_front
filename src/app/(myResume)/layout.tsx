"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useReissue } from "../(home)/_hooks/useReissue";
import Header from "../(home)/_components/header";
config.autoAddCss = false;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useReissue();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full pt-16">{children}</div>
    </div>
  );
}
