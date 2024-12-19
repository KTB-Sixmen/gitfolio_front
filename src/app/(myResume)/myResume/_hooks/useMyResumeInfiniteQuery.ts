import customFetch from "@/app/api/customFetch";
import { useInfiniteQuery } from "@tanstack/react-query";

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

const getMyResume = async ({ pageParam = 0 }): Promise<MyResumeResponse> => {
  const response = await customFetch(
    `/api/resumes/me?page=${pageParam}&size=6`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (pageParam !== 0) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: MyResumeResponse = await response.json();
  return data;
};

export const useMyResumeInfiniteQuery = () => {
  return useInfiniteQuery<MyResumeResponse>({
    queryKey: ["resumes", "me"],
    // queryFn: () => getMyResume(),
    queryFn: ({ pageParam = 0 }) =>
      getMyResume({ pageParam: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const currentPage = lastPage.result.currentPage;
      const totalPages = lastPage.result.totalPages;
      // 다음 페이지가 존재하면 currentPage + 1, 없으면 undefined
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
