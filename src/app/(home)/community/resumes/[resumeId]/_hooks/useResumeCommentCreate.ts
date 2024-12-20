import customFetch from "@/app/api/customFetch";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RequestDto {
  data: {
    content: string;
  };
}

export function useResumeCommentCreate(resumeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resuemCommentCreate"],
    mutationFn: async ({ data }: RequestDto) => {
      const response = await customFetch(
        `/api/resumes/${resumeId}/comments`,
        // `${process.env.NEXT_PUBLIC_RESUMES_SERVER_URL}/api/resumes/${resumeId}/comments`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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
