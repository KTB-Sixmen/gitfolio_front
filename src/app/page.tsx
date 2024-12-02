"use client";

import LANDING_IMAGE from "../../public/images/langing-image.png";
import GITFOLIO_LOGO from "../../public/images/gitfolio-logo.png";
import Image from "next/image";
import GithubButton from "./_components/GithubButton";
import Link from "next/link";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useReissue } from "./(home)/_hooks/useReissue";

export default function Home() {
  const { authenticated } = useAuthStore((state) => state);
  useReissue();
  const router = useRouter();

  useEffect(() => {
    if (authenticated) {
      router.push("/community");
    }
  }, [authenticated, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <main className="flex items-center justify-center flex-1">
        <div className="flex flex-col items-center gap-2">
          <Image
            alt="github_white_logo"
            src={GITFOLIO_LOGO}
            width={300}
            priority
          />
          <div className="mb-6 text-blue-600">
            한 큐에 만드는 나만의 이력서, <strong>깃트폴리오</strong>
          </div>
          <GithubButton />
          {!authenticated && (
            <Link
              href={"/community"}
              className="text-gray-500 underline mt-4 cursor-pointer"
            >
              로그인하지 않고 구경하러 가기
            </Link>
          )}
          <Image
            alt="github_white_logo"
            src={LANDING_IMAGE}
            priority
            width={800}
          />
        </div>
      </main>
    </div>
  );
}
