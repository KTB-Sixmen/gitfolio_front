import customFetch from "@/app/api/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AIPatchBody {
  selectedText: string;
  requirement: string;
}

export function useResumeAIPatchMutation(resumeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeAIPatch"],
    mutationFn: async (data: AIPatchBody) => {
      toast.info("AI가 이력서를 수정하기 시작했어요!", {
        position: "top-right",
      });
      const response = await customFetch(
        `/api/resumes/${resumeId}`,
        // `${process.env.NEXT_PUBLIC_RESUMES_SERVER_URL}/api/resumes/${resumeId}`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(data),
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
      toast.success("AI가 성공적으로 이력서를 수정했습니다!", {
        position: "top-right",
      });
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
    onError: (error: any) => {
      toast.error(error.message, {
        position: "top-right",
      });
    },
  });
}
