import { useAuthStore } from "@/app/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

interface Notification {
  notificationId: number;
  resumeId: string;
  senderId: number;
  receiverId: number;
  type: string;
  isRead: boolean;
}

export interface NotificationResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: Notification[];
}

const getNotifications = async (accessToken: string) => {
  const response = await fetch(`/api/notifications/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: NotificationResponse = await response.json();
  return data;
};

export const useNotificationsQuery = () => {
  const { accessToken } = useAuthStore((state) => state);

  return useQuery<NotificationResponse>({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(accessToken!),
    refetchInterval: 60000, // 1분마다 polling
  });
};
