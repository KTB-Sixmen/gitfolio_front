import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type NotificationRequest = {
  notificationId: number;
};

export function useNotificationMutation() {
  const queryClient = useQueryClient();

  const { accessToken } = useAuthStore((state) => state);

  return useMutation({
    mutationKey: ["onboardingUpdate"],
    mutationFn: async (notificationId: number) => {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
