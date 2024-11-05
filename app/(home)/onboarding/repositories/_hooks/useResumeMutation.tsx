import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type OnboardingRequest = {
  accessToken: string;
  data: {
    selectedRepo: string[];
    requirements: string;
  };
};

export function useResumeMutation() {
  const router = useRouter();
  return useMutation({
    mutationKey: ["createResume"],
    mutationFn: async ({ accessToken, data }: OnboardingRequest) => {
      console.log(data);
      const promise = fetch(`/api/resumes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }).then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData.message);
          throw new Error(errorData.message ?? "에러가 발생했습니다.");
        }
        return response.json();
      });

      // const promise = () =>
      //   new Promise((resolve) =>
      //     setTimeout(() => resolve({ name: "Sonner" }), 20000)
      //   );
      router.push("/community");

      return toast.promise(promise, {
        loading: "이력서 생성 중...",
        success: (
          <div className="flex justify-between items-center w-full">
            <div>이력서 등록에 성공하였습니다.</div>
            <button
              onClick={() => router.push("/myResume")}
              className="ml-4 px-2 py-1 border hover:bg-green-200 border-green-500 text-green-700 rounded-lg"
            >
              보러가기
            </button>
          </div>
        ),
        // error: (error) => error.message || "이력서 등록에 실패했습니다.",
        error: (error) => {
          router.push("/onboarding/repositories");
          return error.message || "이력서 등록에 실패했습니다.";
        },
        position: "top-right",
        className: "bg-blue-50 text-blue-500",
      });
    },
    onSuccess: (data) => {
      // toast.custom((t) => (
      //   <div></div>
      // ));
      // router.push("/onboarding/repositories");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
