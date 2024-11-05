export interface Repository {
  id: number;
  repoName: string;
  repoUrl: string;
  topLanguage: string;
  updatedAt: string; // ISO Date String format (e.g., '2024-10-22T08:30:00Z')
}
export const repositories = [
  {
    repoId: 1,
    repoName: "awesome-project",
    repoUrl: "https://github.com/user/awesome-project",
    topLanguage: "JavaScript",
    updatedAt: "2024-10-20T12:30:00Z",
  },
  {
    repoId: 2,
    repoName: "my-cool-app",
    repoUrl: "https://github.com/user/my-cool-app",
    topLanguage: "TypeScript",
    updatedAt: "2024-10-19T14:15:00Z",
  },
  {
    repoId: 3,
    repoName: "dev-tools",
    repoUrl: "https://github.com/user/dev-tools",
    topLanguage: "Python",
    updatedAt: "2024-10-18T09:20:00Z",
  },
  {
    repoId: 4,
    repoName: "web-api",
    repoUrl: "https://github.com/user/web-api",
    topLanguage: "Go",
    updatedAt: "2024-10-17T11:45:00Z",
  },
  {
    repoId: 5,
    repoName: "data-processor",
    repoUrl: "https://github.com/user/data-processor",
    topLanguage: "Java",
    updatedAt: "2024-10-16T08:10:00Z",
  },
  {
    repoId: 6,
    repoName: "mobile-app",
    repoUrl: "https://github.com/user/mobile-app",
    topLanguage: "Swift",
    updatedAt: "2024-10-15T16:25:00Z",
  },
  {
    repoId: 7,
    repoName: "cloud-service",
    repoUrl: "https://github.com/user/cloud-service",
    topLanguage: "Rust",
    updatedAt: "2024-10-14T13:50:00Z",
  },
  {
    repoId: 8,
    repoName: "machine-learning",
    repoUrl: "https://github.com/user/machine-learning",
    topLanguage: "Python",
    updatedAt: "2024-10-13T17:35:00Z",
  },
  {
    repoId: 9,
    repoName: "frontend-framework",
    repoUrl: "https://github.com/user/frontend-framework",
    topLanguage: "JavaScript",
    updatedAt: "2024-10-12T10:05:00Z",
  },
  {
    repoId: 10,
    repoName: "backend-api",
    repoUrl: "https://github.com/user/backend-api",
    topLanguage: "Kotlin",
    updatedAt: "2024-10-11T18:40:00Z",
  },
];
