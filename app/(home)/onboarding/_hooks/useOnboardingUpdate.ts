import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type OnboardingRequest = {
  accessToken: string;
  data: FormData;
};

export function useOnboardingUpdate() {
  const queryClient = useQueryClient();
  const router = useRouter(); // router 사용 설정

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
      toast.success("정보 등록에 성공하였습니다.");
      router.push("/onboarding/repositories");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
