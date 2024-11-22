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
  const response = await fetch(`/api/resumes/${resumeId}/comments`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ResumeCommentResponse = await response.json();
  return data || "";
};
export const useResumeCommentQuery = (resumeId: string) => {
  const { accessToken } = useAuthStore((state) => state);
  return useQuery<ResumeCommentResponse>({
    queryKey: ["resume", resumeId, "comments"],
    queryFn: () => getResumeComment(accessToken!, resumeId),
    enabled: !!accessToken,
  });
};
