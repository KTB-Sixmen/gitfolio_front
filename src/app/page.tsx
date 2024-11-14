"use client";

import { Button } from "@/components/ui/button";
import GITHUB_WHITE_LOGO from "../../public/images/github-mark-white.png";
import LANDING_IMAGE from "../../public/images/langing-image.png";
import GITFOLIO_LOGO from "../../public/images/gitfolio-logo.png";
import Image from "next/image";

export default function Home() {
  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/github`;
  };

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
          <Button onClick={handleGithubLogin} className="flex gap-2">
            <Image
              alt="github_white_logo"
              src={GITHUB_WHITE_LOGO}
              width={20}
              height={20}
            />
            <div className="font-semibold">깃허브로 로그인하기</div>
          </Button>
          <Image alt="github_white_logo" src={LANDING_IMAGE} width={1000} />
        </div>
      </main>
    </div>
  );
}
