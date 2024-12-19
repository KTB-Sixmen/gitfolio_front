import customFetch from "@/app/api/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface PaymentResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: string;
}

export function useUnsubscribeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["unsubscribe"],
    mutationFn: async () => {
      const response = await customFetch(`/api/payments/terminate`, {
        method: "PATCH",
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
    onSuccess: () => {
      toast.success("정기 결제가 해지되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
