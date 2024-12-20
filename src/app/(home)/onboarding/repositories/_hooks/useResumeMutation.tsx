import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import customFetch from "@/app/api/customFetch";
import RotatingLoading from "../_components/RotatingLoading";

type OnboardingRequest = {
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
    mutationFn: async ({ data }: OnboardingRequest) => {
      const promise = customFetch(
        `/api/resumes`,
        // `${process.env.NEXT_PUBLIC_RESUMES_SERVER_URL}/api/resumes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      ).then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message ?? "에러가 발생했습니다.");
        }
        return response.json();
      });

      // const promise = () =>
      //   new Promise((resolve) =>
      //     setTimeout(
      //       () => resolve({ resumeId: "67297a9eb654bc508be40d3d" }),
      //       200000,
      //     ),
      //   );
      router.push("/community");

      return toast.promise(promise, {
        loading: <RotatingLoading />,
        success: (success: any) => {
          queryClient.invalidateQueries({ queryKey: ["resumes"] });
          return (
            <div className="flex items-center justify-between w-full">
              <div className="font-bold">이력서 등록에 성공하였습니다.</div>
              <button
                onClick={() => router.push(`/myResume/${success.result}`)}
                className="px-2 py-1 ml-4 text-green-700 border border-green-500 rounded-lg hover:bg-green-200"
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
    onSuccess: () => {},
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
