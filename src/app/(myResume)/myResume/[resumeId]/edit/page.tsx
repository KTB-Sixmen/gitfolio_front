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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, PlusCircle, Trash } from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import OnboardingSkeleton from "@/app/(home)/onboarding/_components/onboarding-skeleton";

// 개별 프로젝트 컴포넌트
const ProjectFields = ({
  index,
  control,
  template,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  index: number;
  control: any;
  template: string;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const {
    fields: roleAndTaskFields,
    append: roleAndTaskAppend,
    remove: roleAndTaskRemove,
  } = useFieldArray({
    control,
    name: `projects.${index}.roleAndTask`,
  });

  return (
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            프로젝트 {String(index + 1).padStart(2, "0")}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={isFirst}
              onClick={onMoveUp}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={isLast}
              onClick={onMoveDown}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRemove}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <FormField
          control={control}
          name={`projects.${index}.projectName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>프로젝트명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="프로젝트명" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <FormField
            control={control}
            name={`projects.${index}.projectStartedAt`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>시작일</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="YYYY-MM-DD" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`projects.${index}.projectEndedAt`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>종료일</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="YYYY-MM-DD" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={`projects.${index}.skillSet`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>스킬셋</FormLabel>
              <FormControl>
                <Input {...field} placeholder="예: React, Node.js" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>역할 및 업무</FormLabel>
          {roleAndTaskFields.map((rtField, rtIndex) => (
            <div key={rtField.id} className="flex gap-2 items-center">
              <FormField
                control={control}
                name={`projects.${index}.roleAndTask.${rtIndex}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} placeholder="역할 또는 업무" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => roleAndTaskRemove(rtIndex)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => roleAndTaskAppend("")}
            className="flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            추가
          </Button>
        </div>

        {template === "STAR" && (
          <>
            <FormField
              control={control}
              name={`projects.${index}.star.situation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>S (Situation)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="상황 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.star.task`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>T (Task)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="과제 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.star.action`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>A (Action)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="조치 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.star.result`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>R (Result)</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="결과 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {template === "GITFOLIO" && (
          <>
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.problem`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="문제점 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.hypothesis`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hypothesis</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="가설 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.try`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Try</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="시도한 내용" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`projects.${index}.troubleShooting.result`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="결과 설명" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Separator className="my-4" />
      </div>
    </CardContent>
  );
};

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
  projectName: z.string(),
  projectStartedAt: z.string().optional(),
  projectEndedAt: z.string().optional(),
  skillSet: z.string().optional(),
  roleAndTask: z.array(z.string().optional()).optional(),
  template: z.string(), // BASIC | STAR | GITFOLIO
  star: starSchema.optional(),
  troubleShooting: troubleShootingSchema.optional(),
});

const formSchema = z.object({
  projects: z.array(projectSchema),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;
  const { data: resume, error } = useMyResumeDetailQuery(resumeId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projects:
        resume?.result.projects.map((p: any) => ({
          projectName: p.projectName || "",
          projectStartedAt: p.projectStartedAt || "",
          projectEndedAt: p.projectEndedAt || "",
          skillSet: p.skillSet || "",
          // roleAndTask를 배열 형태로 변환. p.roleAndTask가 Array라면 그대로, 아니라면 빈 배열
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
    },
    mode: "onChange",
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

  // Move roleAndTask useFieldArray to the top level
  // const roleAndTaskArrays = projectsFields.map((_, index) =>
  //   useFieldArray({
  //     control: form.control,
  //     name: `projects.${index}.roleAndTask`,
  //   }),
  // );

  function onSubmit(data: FormValues) {
    setTimeout(() => {
      alert("프로젝트 정보가 업데이트되었습니다!");
    }, 1000);
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
                template={form.getValues(`projects.${index}.template`)}
                onRemove={() => projectRemove(index)}
                onMoveUp={() => projectMove(index, index - 1)}
                onMoveDown={() => projectMove(index, index + 1)}
                isFirst={index === 0}
                isLast={index === projectsFields.length - 1}
              />
            ))}
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
