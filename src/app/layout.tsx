import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import ReactQueryProviders from "./_components/ReactQueryProvider";
import * as Sentry from "@sentry/nextjs";
import Error from "./error";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "이력서 자동 생성 서비스 - 깃트폴리오",
  description: "당신의 이력서를 만들어드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={`${pretendard.className} antialiased`}>
        <Toaster richColors />
        <ReactQueryProviders>
          <Sentry.ErrorBoundary fallback={<Error />}>
            {children}
          </Sentry.ErrorBoundary>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
