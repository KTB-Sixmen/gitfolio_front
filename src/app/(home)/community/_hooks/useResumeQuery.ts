import customFetch from "@/app/api/customFetch";
import { useAuthStore } from "@/app/store/useAuthStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export interface ResumeFilter {
  tags?: string[];
  position: string;
  techStack: string;
  schoolType: string;
  sortOrder: string;
  liked: string;
}
export interface Resume {
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

const getResume = async (page: number, size: number, filters: ResumeFilter) => {
  const filterParams = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      filterParams.append(key, value); // 필터 값이 있는 경우만 쿼리 추가
    }
  });

  const response = await customFetch(
    `/api/resumes?page=${page - 1}&size=${size}&${filterParams.toString()}`,
    {
      method: "GET",
      // credentials: "include",
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "이력서 데이터를 가져올 수 없습니다.");
  }

  const data: ResumeResponse = await response.json();
  return data;
};
export const useResumeQuery = (page: number, size: number, filters: any) => {
  return useQuery<ResumeResponse>({
    queryKey: ["resumes", page, size, filters],
    queryFn: () => getResume(page, size, filters),
    placeholderData: keepPreviousData,
  });
};

/**
 * 커뮤니티 이력서 상세 정보
 */
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

export interface ResumeDetail {
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
  visibility: "PUBLIC" | "PRIVATE";
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
const getOneResume = async (resumeId: string) => {
  const response = await customFetch(`/api/resumes/${resumeId}/community`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "이력서 데이터를 가져올 수 없습니다.");
  }

  const data: ResumeDetailResponse = await response.json();
  return data;
};
export const useResumeDetailQuery = (resumeId: string) => {
  return useQuery<ResumeDetailResponse>({
    queryKey: ["resumes", resumeId],
    queryFn: () => getOneResume(resumeId),
    retry: 0,
  });
};

/** 내 이력서 상세 정보 */
export interface MyResumeDetailResponse extends ResumeDetailResponse {
  template: string;
}
const getMyResumeDetail = async (resumeId: string) => {
  const response = await customFetch(`/api/resumes/${resumeId}/myResume`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "이력서 데이터를 가져올 수 없습니다.");
  }

  const data: MyResumeDetailResponse = await response.json();
  return data;
};
export const useMyResumeDetailQuery = (resumeId: string) => {
  return useQuery<MyResumeDetailResponse>({
    queryKey: ["resumes", resumeId],
    queryFn: () => getMyResumeDetail(resumeId),
  });
};
