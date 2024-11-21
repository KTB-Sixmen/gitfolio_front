import { useAuthStore } from "@/app/store/useAuthStore";
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

const getMyRepositories = async (accessToken: string | null) => {
  const response = await fetch(`/api/members/myRepo`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ApiResponse = await response.json();
  return data || "";
};
export const useRepositoryQuery = () => {
  const { accessToken } = useAuthStore((state) => state);
  return useQuery<ApiResponse>({
    queryKey: ["repositories"],
    queryFn: () => getMyRepositories(accessToken),
    enabled: !!accessToken,
  });
};
