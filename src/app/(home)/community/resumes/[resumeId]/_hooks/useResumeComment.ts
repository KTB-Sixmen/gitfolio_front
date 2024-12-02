import customFetch from "@/app/api/customFetch";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

interface Result {
  id: number;
  resumeId: string;
  memberId: number;
  nickname: string;
  avatarUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ResumeCommentResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: Result[];
}
const getResumeComment = async (accessToken: string, resumeId: string) => {
  const response = await customFetch(`/api/resumes/${resumeId}/comments`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "댓글 데이터를 가져올 수 없습니다.");
  }

  const data: ResumeCommentResponse = await response.json();

  return data;
};
export const useResumeCommentQuery = (resumeId: string) => {
  const { accessToken } = useAuthStore((state) => state);
  return useQuery<ResumeCommentResponse>({
    queryKey: ["resumes", resumeId, "comments"],
    queryFn: () => getResumeComment(accessToken!, resumeId),
    enabled: !!accessToken,
  });
};
