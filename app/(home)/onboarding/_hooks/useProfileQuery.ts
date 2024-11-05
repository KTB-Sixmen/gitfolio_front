import { useAuthStore } from "@/app/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

interface WorkExperience {
  companyName: string;
  departmentName: string;
  role: string;
  workType: string;
  employmentStatus: string;
  startedAt: string | null;
  endedAt: string | null;
}

interface Education {
  schoolType: string;
  schoolName: string;
  major: string;
  graduationStatus: string;
  startedAt: string | null;
  endedAt: string | null;
}

interface Certificate {
  certificateName: string;
  certificateGrade: string;
  certificatedAt: string;
  certificateOrganization: string;
}

interface Activity {
  activityName: string;
  activityYear: number;
  activityDescription: string;
  activityOrganization: string;
}

interface Link {
  linkTitle: string;
  linkUrl: string;
}

interface Result {
  memberId: number;
  memberAdditionalInfoId: string;
  nickname: string;
  name: string;
  username: string;
  avatarUrl: string;
  phoneNumber: string;
  email: string;
  position: string;
  workExperiences: WorkExperience[];
  educations: Education[];
  certificates: Certificate[];
  activities: Activity[];
  links: Link[];
}

interface ApiResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: Result;
}

const getUserProfile = async (accessToken: string | null) => {
  const response = await fetch(`/api/members/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ApiResponse = await response.json();
  return data || "";
};
export const useProfileQuery = () => {
  const { accessToken } = useAuthStore((state) => state);
  return useQuery<ApiResponse>({
    queryKey: ["profile"],
    queryFn: () => getUserProfile(accessToken),
    enabled: !!accessToken,
  });
};
