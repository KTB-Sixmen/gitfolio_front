import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type OnboardingRequest = {
  accessToken: string;
  data: FormData;
};

export function useProfileUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["onboardingUpdate"],
    mutationFn: async ({ accessToken, data }: OnboardingRequest) => {
      const response = await fetch(`/api/members/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: data,
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
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("정보 변경에 성공하였습니다.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
