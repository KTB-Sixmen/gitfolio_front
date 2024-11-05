import { useAuthStore } from "@/app/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";

export interface ResumeFilter {
  tags?: string[];
  position: string;
  techStack: string;
  schoolType: string;
  sortOrder: string;
}
interface Resume {
  resumeId: string;
  memberId: number;
  avatarUrl: string;
  position: string;
  aboutMe: string;
  tags: string[] | null;
  likeCount: number;
  viewCount: number;
  liked: boolean;
  isLiked: boolean;
}
interface ResumeResult {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  size: 10;
  content: Resume[];
}
export interface ResumeResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: ResumeResult;
}

const getResume = async (
  accessToken: string | null,
  page: number,
  size: number,
  filters: ResumeFilter
) => {
  const filterParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      filterParams.append(key, value); // 필터 값이 있는 경우만 쿼리 추가
    }
  });

  const response = await fetch(
    `/api/resumes?page=${page - 1}&size=${size}&${filterParams.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ResumeResponse = await response.json();
  return data || "";
};
export const useResumeQuery = (page: number, size: number, filters: any) => {
  const { accessToken } = useAuthStore((state) => state);
  return useQuery<ResumeResponse>({
    queryKey: ["resume", page, size, filters],
    queryFn: () => getResume(accessToken, page, size, filters),
    enabled: !!accessToken,
  });
};

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
interface Project {
  projectName: string;
  projectStartedAt: string;
  projectEndedAt: string;
  skillSet: string;
  projectDescription: string;
  repoLink: string;
}

interface ResumeDetail {
  resumeId: string;
  memberId: number;
  memberName: string;
  avatarUrl: string;
  email: string;
  position: string;
  techStack: string[];
  aboutMe: string;
  tags: string[] | null;
  workExperiences: WorkExperience[];
  educations: Education[];
  projects: Project[];
  certificates: Certificate[];
  activities: Activity[];
  links: Link[];
  likeCount: number;
  viewCount: number;
}
export interface ResumeDetailResponse {
  time: string;
  status: string;
  code: string;
  message: string;
  result: ResumeDetail;
}
const getOneResume = async (accessToken: string, resumeId: string) => {
  const response = await fetch(`/api/resumes/${resumeId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ResumeDetailResponse = await response.json();
  return data || "";
};
export const useResumeDetailQuery = (resumeId: string) => {
  const { accessToken } = useAuthStore((state) => state);
  return useQuery<ResumeDetailResponse>({
    queryKey: ["resume", resumeId],
    queryFn: () => getOneResume(accessToken!, resumeId),
    enabled: !!accessToken,
  });
};
