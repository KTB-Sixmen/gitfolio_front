import { z } from "zod";

export const OnboardingFormSchema = z.object({
  name: z.string().min(1, "이름은 필수 항목입니다."),
  phoneNumber: z
    .string()
    .min(10, "전화번호는 필수 항목입니다. 올바른 번호를 입력해주세요"),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  position: z.string().min(1, "직군은 필수 항목입니다."),

  workExperiences: z
    .array(
      z.object({
        companyName: z.string().optional(),
        role: z.string().optional(),
        departmentName: z.string().optional(),
        workType: z.string().optional(),
        employmentStatus: z.string().optional(),
        startedAt: z.string().optional(),
        endedAt: z.string().optional(),
      })
    )
    .optional(),

  educations: z
    .array(
      z.object({
        schoolType: z.string().optional(),
        schoolName: z.string().optional(),
        major: z.string().optional(),
        graduationStatus: z.string().optional(),
        startedAt: z.string().optional(),
        endedAt: z.string().optional(),
      })
    )
    .optional(),

  links: z
    .array(
      z.object({
        linkUrl: z.string().optional(),
        linkTitle: z.string().optional(),
      })
    )
    .optional(),

  certificates: z
    .array(
      z.object({
        certificateName: z.string().optional(),
        certificateGrade: z.string().optional(),
        certificateOrganization: z.string().optional(),
        certificatedAt: z.string().optional(),
      })
    )
    .optional(),

  githubRepositories: z
    .array(
      z.object({
        repositoryName: z.string().optional(),
        language: z.string().optional(),
        isPrivate: z.boolean().optional(),
        lastCommitDate: z.string().optional(),
      })
    )
    .optional(),
});
