import customFetch from "@/app/api/customFetch";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useMemberDeleteMutation() {
  const { resetAuth } = useAuthStore((state) => state);

  const router = useRouter();

  return useMutation({
    mutationKey: ["memberDelete"],
    mutationFn: async () => {
      const response = await customFetch(
        `/api/members/me`,
        // `${process.env.NEXT_PUBLIC_MEMBERS_SERVER_URL}/api/members/me`,
        {
          method: "DELETE",
          credentials: "include",
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
      resetAuth();
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
}
