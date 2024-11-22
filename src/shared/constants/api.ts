export const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL;
export const MEMBERS_SERVER_URL = process.env.MEMBERS_SERVER_URL;
export const RESUMES_SERVER_URL = process.env.RESUMES_SERVER_URL;
export const NOTIFICATIONS_SERVER_URL = process.env.NOTIFICATIONS_SERVER_URL;

export const NETWORK = {
  RETRY_COUNT: 2,
  TIMEOUT: 60 * 60 * 1000,
} as const;

export const END_POINTS = {
  /** Member */

  /** Members */
  GET_MY_INFO: "/api/members/me", // GET
  UPDATE_MY_INFO: "/api/members/me", // PUT
  GET_MY_REPO: "/api/members/myRepo", // GET
  DELETE_MY_ACCOUNT: "/api/members/me", // DELETE

  /** Resumes */
  GET_RESUMES: (params: {
    tag?: string;
    position: string;
    techStack: string;
    schoolType: string;
    sortOrder: string;
    page: number;
    size: number;
  }) => {
    const queryParams: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams[key] = String(value);
      }
    });

    return `/api/resumes?${new URLSearchParams(queryParams).toString()}`;
  },
  GET_RESUME: (resumeId: number) => `/api/resumes/${resumeId}`, // GET
  CREATE_RESUME: "/api/resumes", // POST
  GET_MY_RESUMES: (page = 0, size = 12) =>
    `/api/resumes/me?page=${page}&size=${size}`, // GET
  DELETE_RESUME: (resumeId: number) => `/api/resumes/${resumeId}`, // DELETE
  UPDATE_RESUME: (resumeId: number) => `/api/resumes/${resumeId}`, // POST
  LIKE_RESUME: (resumeId: number) => `/api/resumes/${resumeId}/likes`, // POST
  CHANGE_RESUME_VISIBILITY: (resumeId: number) =>
    `/api/resumes/${resumeId}/visibility`, // PATCH

  /** Authentication */
  REISSUE_TOKEN: "/api/auth/reissue", // POST
  LOGOUT: "/api/auth/logout", // POST

  /** Notifications */
  GET_MY_NOTIFICATIONS: "/api/notifications/me", // GET
  GET_NOTIFICATION: (notificationId: number) =>
    `/api/notifications/${notificationId}`, // GET
};
