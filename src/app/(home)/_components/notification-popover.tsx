"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { useNotificationsQuery } from "../_hooks/useNotificationQuery";
import { useRouter } from "next/navigation";
import { useNotificationMutation } from "../_hooks/useNotificationMutation";
import { useCallback } from "react";

export default function NotificationPopover() {
  const router = useRouter();
  const { data: notifications } = useNotificationsQuery();
  const { mutate } = useNotificationMutation();

  const getNotificationMessage = useCallback(
    (type: string, senderName: string) => {
      if (type === "LIKE") {
        return `${senderName}님이 회원님의 이력서에 좋아요를 눌렀습니다!`;
      } else if (type === "COMMENT") {
        return `${senderName}님이 회원님의 이력서에 댓글을 달았습니다!`;
      }
      return "";
    },
    [], // 의존성 배열은 비워둠 (외부 변수를 참조하지 않으므로)
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-7 h-7 cursor-pointer">
          <Bell className="w-full h-full" />
          {notifications?.result.length! > 0 && (
            <span className="absolute top-0 -right-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="relative w-[400px] h-[444px] right-20 mt-3 shadow-lg overflow-y-auto">
        <div className="flex flex-col w-full h-full">
          {notifications?.result.length === 0 ? (
            <div className="text-sm text-gray-600 p-4">알림이 없습니다.</div>
          ) : (
            notifications?.result.map((noti) => (
              <div
                key={noti.notificationId}
                className="p-4 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  router.push(`/myResume/${noti.resumeId}`);
                  mutate(noti.notificationId);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <p className="text-sm">
                      {getNotificationMessage(noti.type, noti.senderNickname)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
