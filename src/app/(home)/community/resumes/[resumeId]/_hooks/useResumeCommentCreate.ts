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
  const { accessToken } = useAuthStore((state) => state);

  return useMutation({
    mutationKey: ["resuemCommentCreate"],
    mutationFn: async ({ data }: RequestDto) => {
      const response = await fetch(`/api/resumes/${resumeId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
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
      queryClient.invalidateQueries({
        queryKey: ["resume", resumeId, "comments"],
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
