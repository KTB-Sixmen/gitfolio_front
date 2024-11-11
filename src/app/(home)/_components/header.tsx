"use client";

import Image from "next/image";
import GITFOLIO_LOGO from "../../../../public/images/gitfolio-logo.png";
import Link from "next/link";
import { useLogout } from "../_hooks/useLogout";
import { useProfileQuery } from "../onboarding/_hooks/useProfileQuery";
import HeaderPopover from "./header-popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell } from "lucide-react";
import NotificationPopover from "./notification-popover";

export default function Header() {
  const { mutate } = useLogout();
  const { data: userProfile } = useProfileQuery();

  if (!userProfile) {
    return <Skeleton className="w-full h-6" />;
  }

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-16 p-4 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center  h-full gap-8 text-lg">
          <Link href={"/community"}>
            <Image
              alt="github_white_logo"
              src={GITFOLIO_LOGO}
              width={150}
              priority
            />
          </Link>
          <Link href="/myResume">
            <button className="font-semibold hover:underline">내 이력서</button>
          </Link>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Link className="font-semibold hover:underline" href="#">
                  채팅
                </Link>
              </TooltipTrigger>
              <TooltipContent className="text-base">
                <p>준비중입니다!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* <Link href="#">
            <button className="font-semibold hover:underline">채팅</button>
          </Link> */}
        </div>
        <div className="flex items-center gap-6 ">
          <NotificationPopover />
          <HeaderPopover
            avatarUrl={userProfile?.result.avatarUrl as string}
            nickname={userProfile?.result.nickname!}
            credit={1000}
          />
        </div>
      </div>
    </header>
  );
}
