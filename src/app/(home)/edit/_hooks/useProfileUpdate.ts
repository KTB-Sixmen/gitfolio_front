import customFetch from "@/app/api/customFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type OnboardingRequest = {
  data: FormData;
};

export function useProfileUpdate() {
  return useMutation({
    mutationKey: ["profileUpdate"],
    mutationFn: async ({ data }: OnboardingRequest) => {
      const response = await customFetch(
        `/api/members/me`,
        // `${process.env.NEXT_PUBLIC_MEMBERS_SERVER_URL}/api/members/me`,
        {
          method: "PUT",
          credentials: "include",
          body: data,
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw {
          status: response.status,
          code: errorData.code,
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json();
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["profile"] });
      window.location.reload();
      toast.success("정보 변경에 성공하였습니다.");
    },
    onError: (error: any) => {
      if (error.code === "ENUM_MAPPING_ERROR") {
        toast.error(
          "빈 내용은 들어갈 수 없습니다. 내용을 채우거나 항목을 제거해주세요.",
        );
      } else {
        toast.error(error.message);
      }
    },
  });
}
