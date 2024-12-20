import customFetch from "@/app/api/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useNotificationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["notificationMutate"],
    mutationFn: async (notificationId: number) => {
      const response = await customFetch(
        `/api/notifications/${notificationId}`,
        // `${process.env.NEXT_PUBLIC_NOTIFICATIONS_SERVER_URL}/api/notifications/${notificationId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          status: response.status,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
