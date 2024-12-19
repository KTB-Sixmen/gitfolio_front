"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "../(home)/_components/header";
// Onborda
import { Onborda, OnbordaProvider } from "onborda";
import { steps } from "./_lib/steps";
import CustomCard from "./_components/CustomCard";
config.autoAddCss = false;

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col pt-16 flex-1">
        <OnbordaProvider>
          <Onborda
            steps={steps}
            showOnborda={true}
            shadowRgb="55,48,163"
            shadowOpacity="0.8"
            cardComponent={CustomCard}
            cardTransition={{ duration: 1, type: "tween" }}
          >
            {children}
          </Onborda>
        </OnbordaProvider>
      </div>
    </div>
  );
}
