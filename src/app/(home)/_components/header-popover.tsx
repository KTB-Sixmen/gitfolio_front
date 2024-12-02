"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useLogout } from "../_hooks/useLogout";
import { BadgeDollarSign, LogOut, PencilLine } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRef, useState } from "react";
import useOnClickOutside from "../_hooks/useOnClickOutside";

type Props = {
  avatarUrl: string;
  nickname: string;
};

export default function HeaderPopover({ avatarUrl, nickname }: Props) {
  const { mutate } = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={avatarUrl} alt="Profile Image" />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="relative w-56 p-2 mt-3
    after:absolute after:top-0 after:right-7 after:translate-y-[-100%] after:h-0 after:w-0 after:border-x-[8px] after:border-x-transparent after:border-b-[10px] after:border-b-white after:!visible after:!opacity-100"
      >
        <div className="flex flex-col text-sm font-medium items-center">
          <div className="flex w-full justify-center gap-4 pr-2 items-center mb-2">
            <Avatar>
              <AvatarImage src={avatarUrl} alt="Profile Image" />
            </Avatar>
            <p className="text-lg font-semibold">{nickname}</p>
          </div>
          <Separator className="my-1" />
          <Link
            scroll={false}
            onClick={() => setIsOpen(!isOpen)}
            href={"/plan"}
            className="flex justify-start cursor-pointer items-center gap-2 w-full p-2 hover:bg-gray-200 rounded-md"
          >
            <BadgeDollarSign />
            <div>내 플랜</div>
          </Link>
          <Link
            scroll={false}
            onClick={() => setIsOpen(!isOpen)}
            href={"/edit"}
            className="flex justify-start items-center cursor-pointer gap-2 w-full p-2 hover:bg-gray-200 rounded-md"
          >
            <PencilLine />
            <div>내 정보 수정</div>
          </Link>
          <Separator className="my-1" />
          <div
            onClick={() => {
              mutate();
              setIsOpen(!isOpen);
            }}
            className="flex justify-start text-red-500 cursor-pointer items-center gap-2 w-full p-2 hover:bg-gray-200 rounded-md"
          >
            <LogOut />
            <div>로그아웃</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
