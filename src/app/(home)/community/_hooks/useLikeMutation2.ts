import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ResumeFilter } from "./useResumeQuery";
import debounce from "lodash/debounce";

export function useLikeMutation(
  page: number,
  size: number,
  filters: ResumeFilter,
) {
  const { accessToken } = useAuthStore((state) => state);
  const queryClient = useQueryClient();

  // 실제 API 요청을 debounce 처리
  const debouncedMutationFn = (resumeId: string) =>
    new Promise((resolve, reject) => {
      debounce(async () => {
        try {
          const response = await fetch(`/api/resumes/${resumeId}/likes`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
          });

          if (!response.ok) {
            const errorData = await response.json();
            reject({
              status: response.status,
              message: errorData.message ?? "에러가 발생했습니다.",
            });
          } else {
            resolve(response.json());
          }
        } catch (error) {
          reject(error);
        }
      }, 500)();
    });

  return useMutation({
    mutationKey: ["likes"],
    retry: 0,
    mutationFn: debouncedMutationFn, // Promise 반환 보장
    onMutate: async (resumeId) => {
      console.log("onmutate");
      await queryClient.cancelQueries({
        queryKey: ["resume", page, size, filters],
      });

      const previousResumes = queryClient.getQueryData([
        "resume",
        page,
        size,
        filters,
      ]);

      queryClient.setQueryData(["resume", page, size, filters], (old: any) => {
        return {
          ...old,
          result: {
            ...old.result,
            content: old.result.content.map((resume: any) =>
              resume.resumeId === resumeId
                ? { ...resume, isLiked: !resume.isLiked }
                : resume,
            ),
          },
        };
      });

      return { previousResumes };
    },
    onSuccess: (data) => {},
    onError: (error: any, _, context: any) => {
      if (context?.previousResumes) {
        queryClient.setQueryData(
          ["resume", page, size, filters],
          context.previousResumes,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
}
