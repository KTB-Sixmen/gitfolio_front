"use client";

import { Button } from "@/components/ui/button";
import LANDING_IMAGE from "../../../../public/images/langing-image.png";
import GITFOLIO_LOGO from "../../../../public/images/gitfolio-logo.png";
import Image from "next/image";
import GithubButton from "@/shared/ui/GithubButton";

export default function Page() {
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
          <Image alt="github_white_logo" src={LANDING_IMAGE} width={1000} />
        </div>
      </main>
    </div>
  );
}
