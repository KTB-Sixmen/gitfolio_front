"use client";

import { useMyResumeDetailQuery } from "@/app/(home)/community/_hooks/useResumeQuery";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash } from "lucide-react";
import OnboardingSkeleton from "@/app/(home)/onboarding/_components/onboarding-skeleton";
import ProjectFields from "./_components/ProjectFields";
import { formSchema } from "./_lib/resume-schema";
import { useMyResumePatchMutation } from "../hooks/useMyResumePatchMutation";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof formSchema>;

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;
  const router = useRouter();

  const { data: resume, error, refetch } = useMyResumeDetailQuery(resumeId);
  const { mutate } = useMyResumePatchMutation(
    resume?.result.resumeId as string,
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutMe: "",
      techStack: [],
      projects: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (resume?.result) {
      form.reset({
        aboutMe: resume.result.aboutMe || "",
        techStack:
          resume.result.techStack && resume.result.techStack.length > 0
            ? resume.result.techStack
            : [],
        projects:
          resume.result.projects.map((p: any) => ({
            projectName: p.projectName || "",
            projectStartedAt: p.projectStartedAt || "",
            projectEndedAt: p.projectEndedAt || "",
            skillSet: p.skillSet || "",
            roleAndTask: Array.isArray(p.roleAndTask) ? p.roleAndTask : [],
            template: p.template,
            star: p.star
              ? {
                  situation: p.star.situation,
                  task: p.star.task,
                  action: p.star.action,
                  result: p.star.result,
                }
              : undefined,
            troubleShooting: p.troubleShooting
              ? {
                  problem: p.troubleShooting.problem,
                  hypothesis: p.troubleShooting.hypothesis,
                  try: p.troubleShooting.try,
                  result: p.troubleShooting.result,
                }
              : undefined,
          })) || [],
      });
    }
  }, [resume, form]);

  const {
    fields: techStackFields,
    append: techStackAppend,
    remove: techStackRemove,
  } = useFieldArray<any>({
    control: form.control,
    name: "techStack",
  });

  const {
    fields: projectsFields,
    append: projectAppend,
    remove: projectRemove,
    move: projectMove,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  function onSubmit(data: FormValues) {
    // resume.result의 기존 값들
    const { tags, workExperiences, educations, certificates, links } =
      resume?.result || {};

    const updateResumeRequestDTO = {
      tags,
      workExperiences,
      educations,
      certificates,
      links,
      aboutMe: data.aboutMe,
      techStack: data.techStack,
      projects: data.projects,
    };

    const formData = new FormData();
    formData.append(
      "updateResumeRequestDTO",
      new Blob([JSON.stringify(updateResumeRequestDTO)], {
        type: "application/json",
      }),
    );

    mutate({ data: formData, isAiFixed: "false" });
    router.back();
  }

  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (!resume) {
    return <OnboardingSkeleton />;
  }

  return (
    <div className="flex flex-col w-full max-w-[800px] p-4 mx-auto space-y-6 px-10">
      <div className="text-center text-2xl font-bold">이력서 수정</div>
      <div className="text-center">프로젝트 부분만 수정 가능합니다.</div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* aboutMe 수정용 Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">자기소개 수정</CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="aboutMe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자기소개</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-32"
                        {...field}
                        placeholder="자기소개를 입력하세요."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <div className="text-xl font-bold">프로젝트 수정</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    projectAppend({
                      projectName: "",
                      projectStartedAt: "",
                      projectEndedAt: "",
                      skillSet: "",
                      roleAndTask: [""],
                      template: "BASIC",
                    });
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  프로젝트 추가
                </Button>
              </CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>
            {projectsFields.map((field, index) => (
              <ProjectFields
                key={field.id}
                index={index}
                control={form.control}
                template={resume?.result.template}
                onRemove={() => projectRemove(index)}
                onMoveUp={() => projectMove(index, index - 1)}
                onMoveDown={() => projectMove(index, index + 1)}
                isFirst={index === 0}
                isLast={index === projectsFields.length - 1}
              />
            ))}
          </Card>

          {/* techStack 수정용 Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg font-medium">
                <div className="text-xl font-bold">기술 스택 수정</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    techStackAppend("");
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  스택 추가
                </Button>
              </CardTitle>
              <Separator className="border-2 border-black" />
            </CardHeader>
            <CardContent className="space-y-4">
              {techStackFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <FormField
                    control={form.control}
                    name={`techStack.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input {...field} placeholder="기술 스택 입력" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={() => techStackRemove(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="px-8">
              저장
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
