"use client";

import Header from "./_components/header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Footer } from "./_components/Footer";
config.autoAddCss = false;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col flex-1 pt-16">{children}</div>
      <Footer />
    </div>
  );
}
