import customFetch from "@/app/api/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMyResumeVisibilityMutation(resumeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateVisibility"],
    mutationFn: async (visibility: string) => {
      const response = await customFetch(
        `/api/resumes/${resumeId}/visibility`,
        {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({ visibility }),
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
    onSuccess: (data) => {
      toast.success("이력서 공개 여부 설정이 바뀌었습니다.");
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
