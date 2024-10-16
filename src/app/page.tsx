"use client";

import { Button } from "@/components/ui/button";
import GITHUB_WHITE_LOGO from "../../public/images/github-mark-white.png";
import LANDING_IMAGE from "../../public/images/langing-image.png";
import GITFOLIO_LOGO from "../../public/images/gitfolio-logo.png";
import Image from "next/image";

export default function Home() {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/github`;
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* <header className="flex w-full justify-end p-2">
        
      </header> */}
      <main className="flex flex-1 justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <Image alt="github_white_logo" src={GITFOLIO_LOGO} width={300} />
          <div className="text-blue-600 mb-6">
            한 큐에 만드는 나만의 이력서, <strong>깃트폴리오</strong>
          </div>
          <Button onClick={handleKakaoLogin} className="flex gap-2">
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
