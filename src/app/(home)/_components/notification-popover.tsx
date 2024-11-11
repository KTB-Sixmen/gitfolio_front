import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import moment from "moment";
import { Separator } from "@/components/ui/separator";

interface Alarm {
  id: number;
  message: string;
  createdAt: string;
}

const dummyAlarms = [
  {
    id: 1,
    message: "00님에게 댓글이 달렸습니다.",
    createdAt: moment().subtract(1, "hours").toISOString(), // 최근 알람
  },
  {
    id: 2,
    message: "이력서 생성이 완료되었습니다.",
    createdAt: moment().subtract(2, "days").toISOString(), // 오래된 알람
  },
];

export default function NotificationPopover() {
  const [alarms] = useState<Alarm[]>([]);
  const hasRecentAlarm = alarms.some(
    (alarm) => moment().diff(moment(alarm.createdAt), "hours") < 24,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-7 h-7 cursor-pointer">
          <Bell className="w-full h-full" />
          {hasRecentAlarm && (
            <span className="absolute top-0 -right-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="relative w-[400px] h-[444px] right-20 mt-3 shadow-lg overflow-y-auto">
        <div className="flex flex-col  w-full h-full">
          {alarms.length === 0 ? (
            <div className="text-sm text-gray-600 p-4">알림이 없습니다.</div>
          ) : (
            alarms.map((alarm, index) => (
              <div key={alarm.id} className=" p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <p className="text-sm">{alarm.message}</p>
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
