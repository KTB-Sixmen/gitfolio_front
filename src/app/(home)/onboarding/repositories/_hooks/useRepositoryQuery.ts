import customFetch from "@/app/api/customFetch";
import { useQuery } from "@tanstack/react-query";

interface Result {
  repoId: number;
  repoName: string;
  repoUrl: string;
  topLanguage: string;
  updatedAt: string;
}

interface ApiResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: Result[];
}

const getMyRepositories = async () => {
  const response = await customFetch(`/api/members/myRepo`, {
    method: "GET",
    credentials: "include",
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: ApiResponse = await response.json();
  return data;
};
export const useRepositoryQuery = () => {
  return useQuery<ApiResponse>({
    queryKey: ["repositories"],
    queryFn: () => getMyRepositories(),
  });
};
