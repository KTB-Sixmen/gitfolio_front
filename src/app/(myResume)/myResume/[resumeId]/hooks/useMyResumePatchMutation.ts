import customFetch from "@/app/api/customFetch";
import useOpenDialogStore from "@/app/store/useDialogOpenStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface MyResumePatchBody {
  data: FormData;
}

export function useMyResumePatchMutation(resumeId: string) {
  const queryClient = useQueryClient();
  const { setOpen } = useOpenDialogStore((state) => state);

  return useMutation({
    mutationKey: ["myResumePatch"],
    mutationFn: async ({ data }: MyResumePatchBody) => {
      const response = await customFetch(
        `/api/resumes/${resumeId}?isAiFixed=true`,
        // `${process.env.NEXT_PUBLIC_RESUMES_SERVER_URL}/api/resumes/${resumeId}?isAiFixed=true`,
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
          message: errorData.message ?? "에러가 발생했습니다.",
        };
      }

      return response.json();
    },
    onSuccess: (data) => {
      setOpen(false);
      toast.success("성공적으로 이력서를 수정하였습니다!", {
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
