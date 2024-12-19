import customFetch from "@/app/api/customFetch";
import { useQuery } from "@tanstack/react-query";

export interface INotification {
  notificationId: number;
  resumeId: string;
  senderId: number;
  senderNickname: string;
  receiverId: number;
  type: string;
  isRead: boolean;
}

export interface NotificationResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: INotification[];
}

const getNotifications = async () => {
  const response = await customFetch(`/api/notifications/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "알림 데이터를 가져올 수 없습니다.");
  }

  const data: NotificationResponse = await response.json();

  return data;
};

export const useNotificationsQuery = () => {
  return useQuery<NotificationResponse>({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
    refetchInterval: 60000, // 1분마다 polling
    retry: 0,
  });
};
