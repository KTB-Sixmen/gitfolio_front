import customFetch from "@/app/api/customFetch";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useResumeCommentDelete(resumeId: string) {
  const queryClient = useQueryClient();
  const { accessToken } = useAuthStore((state) => state);

  return useMutation({
    mutationKey: ["resuemCommentCreate"],
    mutationFn: async (commentId: number) => {
      const response = await customFetch(`/api/resumes/comments/${commentId}`, {
        method: "DELETE",
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
      queryClient.invalidateQueries({
        queryKey: ["resumes", resumeId, "comments"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
