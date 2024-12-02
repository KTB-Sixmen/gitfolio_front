import customFetch from "@/app/api/customFetch";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

interface MyResume {
  resumeId: string;
  memberId: number;
  avatarUrl: string;
  position: string;
  aboutMe: string;
  tags: string[] | null;
  viewCount: number;
  likeCount: number;
  isLiked: boolean;
  visibility: "PUBLIC" | "PRIVATE";
  updatedAt: string;
}

interface Pageable {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: MyResume[];
}

interface MyResumeResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: Pageable;
}
const getMyResume = async () => {
  const response = await customFetch(`/api/resumes/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: MyResumeResponse = await response.json();
  return data;
};
export const useMyResumeQuery = () => {
  const { accessToken } = useAuthStore((state) => state);
  return useQuery<MyResumeResponse>({
    queryKey: ["resume", "me"],
    queryFn: () => getMyResume(),
  });
};
