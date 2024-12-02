"use client";

import Header from "./_components/header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useReissue } from "./_hooks/useReissue";
import { Footer } from "./_components/Footer";
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
      {/* <div className="flex flex-col flex-1 pt-16">{children}</div> */}
      <div className="flex flex-col flex-1 pt-16">{children}</div>
      <Footer />
    </div>
  );
}
