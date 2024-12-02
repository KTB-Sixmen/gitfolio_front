import customFetch from "@/app/api/customFetch";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMyResumeDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteMyResume"],
    mutationFn: async (resumeId: string) => {
      const response = await customFetch(`/api/resumes/${resumeId}`, {
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
      toast.success("이력서가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
