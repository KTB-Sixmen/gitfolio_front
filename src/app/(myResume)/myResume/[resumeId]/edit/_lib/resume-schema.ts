import { z } from "zod";

// 프로젝트 템플릿에 따른 필드 정의
const starSchema = z.object({
  situation: z.string().optional(),
  task: z.string().optional(),
  action: z.string().optional(),
  result: z.string().optional(),
});

const troubleShootingSchema = z.object({
  problem: z.string().optional(),
  hypothesis: z.string().optional(),
  try: z.string().optional(),
  result: z.string().optional(),
});

const projectSchema = z.object({
  projectName: z.string().optional(),
  projectStartedAt: z.string().optional(),
  projectEndedAt: z.string().optional(),
  skillSet: z.string().optional(),
  roleAndTask: z.array(z.string().optional()).optional(),
  template: z.string().optional(), // BASIC | STAR | GITFOLIO
  star: starSchema.optional(),
  troubleShooting: troubleShootingSchema.optional(),
});

export const formSchema = z.object({
  aboutMe: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  projects: z.array(projectSchema).optional(),
});
