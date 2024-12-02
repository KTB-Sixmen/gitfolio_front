import customFetch from "@/app/api/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface PaymentResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: {
    tid: string;
    next_redirect_app_url: string;
    next_redirect_mobile_url: string;
    next_redirect_pc_url: string;
    android_app_scheme: string;
    ios_app_scheme: string;
    created_at: string;
  };
}

export function usePlanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["planMutate"],
    mutationFn: async (paidPlan: string) => {
      const response = await customFetch(`/api/payments/ready`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ paidPlan }),
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
      // 팝업창으로 next_redirect_pc_url 열기
      const redirectUrl = data.result.next_redirect_pc_url;
      if (redirectUrl) {
        window.open(
          redirectUrl,
          "_blank",
          "width=500,height=700,scrollbars=yes",
        );
      }
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
