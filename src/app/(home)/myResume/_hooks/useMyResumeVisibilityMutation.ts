import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMyResumeVisibilityMutation(resumeId: string) {
  const queryClient = useQueryClient();

  const { accessToken } = useAuthStore((state) => state);

  return useMutation({
    mutationKey: ["onboardingUpdate"],
    mutationFn: async (visibility: string) => {
      const response = await fetch(`/api/resumes/${resumeId}/visibility`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ visibility }),
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
      toast.success("이력서 공개 여부 설정이 바뀌었습니다.");
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
