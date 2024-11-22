import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Sentry from "@sentry/nextjs";

type OnboardingRequest = {
  accessToken: string;
  data: {
    selectedRepo: string[];
    requirements: string;
    visibility: string;
  };
};

export function useResumeMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createResume"],
    mutationFn: async ({ accessToken, data }: OnboardingRequest) => {
      const promise = fetch(`/api/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message ?? "에러가 발생했습니다.");
          }
          return response.json();
        })
        .catch((errorData) => {
          Sentry.captureException(errorData);
          throw new Error(errorData.message ?? "에러가 발생했습니다.");
        });

      // const promise = () =>
      //   new Promise((resolve) =>
      //     setTimeout(
      //       () => resolve({ resumeId: "67297a9eb654bc508be40d3d" }),
      //       2000,
      //     ),
      //   );
      router.push("/community");

      return toast.promise(promise, {
        loading: "이력서 생성 중...",
        success: (success: any) => {
          queryClient.invalidateQueries({ queryKey: ["resume"] });
          return (
            <div className="flex justify-between items-center w-full">
              <div className="font-bold">이력서 등록에 성공하였습니다.</div>
              <button
                onClick={() => router.push(`/myResume/${success.result}`)}
                className="ml-4 px-2 py-1 border hover:bg-green-200 border-green-500 text-green-700 rounded-lg"
              >
                보러가기
              </button>
            </div>
          );
        },
        error: (error) => {
          return error.message || "이력서 등록에 실패했습니다.";
        },
        position: "top-right",
        className: "bg-blue-50 text-blue-500 mt-10",
      });
    },
    onSuccess: (data) => {},
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
