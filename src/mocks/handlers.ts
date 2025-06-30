import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/user", () => {
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),

  // 커뮤니티 이력서 목록
  http.get("/api/resumes", ({ request }) => {
    // 쿼리 파라미터 파싱 (page, size 등)
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 10;
    return HttpResponse.json({
      time: new Date().toISOString(),
      status: "OK",
      code: "200",
      message: "성공",
      result: {
        currentPage: page,
        totalPages: 3,
        totalElements: 25,
        size,
        content: Array.from({ length: size }, (_, i) => ({
          resumeId: `${page * size + i + 1}`,
          memberId: 1000 + i,
          avatarUrl: "/images/namki.jpeg",
          position: "프론트엔드 개발자",
          aboutMe: "안녕하세요, 프론트엔드 개발자입니다.",
          tags: ["React", "TypeScript"],
          likeCount: 5 + i,
          viewCount: 100 + i,
          liked: false,
          isLiked: false,
        })),
      },
    });
  }),

  // 커뮤니티 이력서 상세
  http.get(/\/api\/resumes\/([^/]+)\/community/, ({ params }) => {
    const { 0: resumeId } = params;
    return HttpResponse.json({
      time: new Date().toISOString(),
      status: "OK",
      code: "200",
      message: "성공",
      result: {
        resumeId,
        memberId: 1000,
        memberName: "홍길동",
        avatarUrl: "/images/namki.jpeg",
        email: "hong@sample.com",
        position: "프론트엔드 개발자",
        techStack: ["React", "TypeScript"],
        aboutMe: "안녕하세요, 프론트엔드 개발자입니다.",
        template: "basic",
        tags: ["React", "TypeScript"],
        workExperiences: [],
        educations: [],
        projects: [],
        certificates: [],
        activities: [],
        links: [],
        visibility: "PUBLIC",
        likeCount: 10,
        viewCount: 200,
      },
    });
  }),

  // 내 이력서 상세
  http.get(/\/api\/resumes\/([^/]+)\/myResume/, ({ params }) => {
    const { 0: resumeId } = params;
    return HttpResponse.json({
      time: new Date().toISOString(),
      status: "OK",
      code: "200",
      message: "성공",
      result: {
        resumeId,
        memberId: 1000,
        memberName: "홍길동",
        avatarUrl: "/images/namki.jpeg",
        email: "hong@sample.com",
        position: "프론트엔드 개발자",
        techStack: ["React", "TypeScript"],
        aboutMe: "안녕하세요, 프론트엔드 개발자입니다.",
        template: "basic",
        tags: ["React", "TypeScript"],
        workExperiences: [],
        educations: [],
        projects: [],
        certificates: [],
        activities: [],
        links: [],
        visibility: "PUBLIC",
        likeCount: 10,
        viewCount: 200,
      },
      template: "basic",
    });
  }),
];
