"use client";

import Image from "next/image";
import GITFOLIO_LOGO from "../../../../public/images/gitfolio-logo.png";
import Link from "next/link";
import { useProfileQuery } from "../onboarding/_hooks/useProfileQuery";
import HeaderPopover from "./header-popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NotificationPopover from "./notification-popover";
import GithubButton from "@/app/_components/GithubButton";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function Header() {
  const { data: userProfile } = useProfileQuery();
  const { authenticated } = useAuthStore((state) => state);

  if (!userProfile) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 z-50 items-center w-full h-16 px-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center h-full gap-8 text-lg">
          <Link href={"/community"}>
            <Image
              alt="github_white_logo"
              src={GITFOLIO_LOGO}
              width={150}
              priority
            />
          </Link>
          {authenticated && (
            <>
              <Link href="/myResume">
                <button className="text-base font-semibold hover:underline">
                  내 이력서
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-6">
          {authenticated ? (
            <>
              <NotificationPopover />
              <HeaderPopover
                plan={userProfile?.result.paidPlan!}
                avatarUrl={userProfile?.result.avatarUrl as string}
                nickname={userProfile?.result.nickname!}
              />
            </>
          ) : (
            <GithubButton />
          )}
        </div>
      </div>
    </header>
  );
}
