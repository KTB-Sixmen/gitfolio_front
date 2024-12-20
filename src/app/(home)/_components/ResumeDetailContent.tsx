"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Markdown from "react-markdown";
import {
  GraduationStatus,
  graduationStatusMap,
  PositionType,
  positionTypeMap,
  SchoolType,
  schoolTypeMap,
  WorkType,
  workTypeMap,
} from "@/app/types/type";
import { handleIconChange } from "@/app/_lib/util";
import { ResumeDetail } from "../community/_hooks/useResumeQuery";

interface ResumeDetailContentProps {
  resume: ResumeDetail; // 필요한 타입 정의에 따라 변경 가능합니다.
}

export function ResumeDetailContent({ resume }: ResumeDetailContentProps) {
  return (
    <div className="px-20 space-y-10 border border-gray-300 rounded-lg p-14 w-full">
      <div className="flex flex-row">
        <div className="flex flex-col flex-grow">
          <div className="mb-4 text-3xl font-semibold">{resume.memberName}</div>
          <div className="text-xl">
            {positionTypeMap[resume.position as PositionType]} 개발자
          </div>
        </div>
        <div className="relative w-[128px] h-[128px] md:w-[180px] md:h-[180px] border border-gray-100 rounded-lg">
          <Image
            src={resume.avatarUrl}
            alt="프로필 이미지"
            priority
            fill
            sizes="228"
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* 자기소개 */}
      <Separator className="bg-black" />
      <div id="aboutMe" className="space-y-4">
        <div className="text-2xl font-semibold">자기소개</div>
        <Markdown className="w-full max-w-full prose break-words prose-p:leading-relaxed prose-pre:p-0">
          {resume.aboutMe}
        </Markdown>
      </div>

      {/* 경력 */}
      {resume.workExperiences.length > 0 && (
        <>
          <Separator className="bg-black" />
          <div id="workExperience" className="space-y-4">
            <div className="text-2xl font-semibold">경력</div>
            {resume.workExperiences.map((experience: any, index: number) => (
              <div key={index}>
                <div className="text-lg font-semibold">
                  {experience.companyName}
                </div>
                <div className="text-sm text-gray-400">
                  <div>
                    {experience.departmentName} | {experience.role} |{" "}
                    {workTypeMap[experience.workType as WorkType]}
                  </div>
                  <div>
                    {experience.startedAt} ~ {experience.endedAt}
                  </div>
                </div>
                {index < resume.workExperiences.length - 1 && (
                  <Separator className="my-4 bg-black" />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 프로젝트 */}
      {resume.projects.length > 0 && (
        <>
          <Separator className="bg-black" />
          <div id="projects" className="space-y-4">
            <div className="text-2xl font-semibold">프로젝트</div>
            {resume.projects.map((project: any, index: number) => (
              <div className="space-y-4" key={index}>
                <div className="text-xl font-semibold">
                  {project.projectName}
                </div>
                <div className="text-sm text-gray-400">
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.repoLink}
                  </a>
                  <div>
                    {project.projectStartedAt} ~ {project.projectEndedAt}
                  </div>
                  <div id="tour1-step2">{project.skillSet}</div>
                </div>

                {/* template 별로 다른 데이터 구조를 보여줌 */}
                {resume.template === "BASIC" && (
                  <div className="space-y-2">
                    <div className=" font-semibold">담당 업무</div>

                    <ul className="list-disc pl-8 space-y-2">
                      {project.roleAndTask.map(
                        (task: string, taskIndex: number) => (
                          <li key={taskIndex}>{task}</li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {resume.template === "STAR" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className=" font-semibold">담당 업무</div>

                      <ul className="list-disc pl-8 space-y-2">
                        {project.roleAndTask.map(
                          (task: string, taskIndex: number) => (
                            <li key={taskIndex}>{task}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    {/* STAR 정보 텍스트로 표시 */}
                    <div className="space-y-2">
                      <div className="font-semibold">트러블 슈팅</div>
                      <ul className="pl-8 list-disc space-y-1">
                        <li>
                          <strong>Situation</strong>: {project.star.situation}
                        </li>
                        <li>
                          <strong>Task</strong>: {project.star.task}
                        </li>
                        <li>
                          <strong>Action</strong>: {project.star.action}
                        </li>
                        <li>
                          <strong>Result</strong>: {project.star.result}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {resume.template === "GITFOLIO" && (
                  <div className="space-y-4">
                    {/* roleAndTask 리스트 */}
                    <div className="space-y-2">
                      <div className=" font-semibold">담당 업무</div>

                      <ul className="list-disc pl-8 space-y-2">
                        {project.roleAndTask.map(
                          (task: string, taskIndex: number) => (
                            <li key={taskIndex}>{task}</li>
                          ),
                        )}
                      </ul>
                    </div>
                    {/* troubleShooting 정보 텍스트로 표시 */}
                    <div className="space-y-2">
                      <div className="font-semibold">트러블 슈팅</div>
                      <ul className="pl-8 list-disc space-y-1">
                        <li>
                          <strong>Problem</strong>:{" "}
                          {project.troubleShooting.problem}
                        </li>
                        <li>
                          <strong>Hypothesis</strong>:{" "}
                          {project.troubleShooting.hypothesis}
                        </li>
                        <li>
                          <strong>Try</strong>: {project.troubleShooting.tring}
                        </li>
                        <li>
                          <strong>Result</strong>:{" "}
                          {project.troubleShooting.result}
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {index < resume.projects.length - 1 && (
                  <Separator className="my-4 bg-gray-300" />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 교육 */}
      {resume.educations.length > 0 && (
        <>
          <Separator className="bg-black" />
          <div id="education" className="space-y-4">
            <div className="text-2xl font-semibold">교육</div>
            {resume.educations.map((education: any, index: number) => (
              <div className="space-y-4" key={index}>
                <div className="text-xl font-semibold">
                  {education.schoolName}
                </div>
                <div className="text-sm text-gray-400">
                  <div>
                    {schoolTypeMap[education.schoolType as SchoolType]} |{" "}
                    {education.major}
                  </div>
                  <div>
                    {education.startedAt} ~ {education.endedAt} |{" "}
                    {
                      graduationStatusMap[
                        education.graduationStatus as GraduationStatus
                      ]
                    }
                  </div>
                </div>
                {index < resume.educations.length - 1 && (
                  <Separator className="my-4 bg-black" />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 자격증 */}
      {resume.certificates.length > 0 && (
        <>
          <Separator className="bg-black" />
          <div id="certificates" className="space-y-4">
            <div className="text-2xl font-semibold">자격증</div>
            {resume.certificates.map((certificate: any, index: number) => (
              <div className="space-y-4" key={index}>
                <div className="text-xl font-semibold">
                  {certificate.certificateName}
                </div>
                <div className="text-sm text-gray-400">
                  <div>
                    {certificate.certificateGrade} |{" "}
                    {certificate.certificateOrganization}
                  </div>
                  <div>{certificate.certificatedAt}</div>
                </div>
                {index < resume.certificates.length - 1 && (
                  <Separator className="my-4 bg-black" />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* 기술스택 */}
      {resume.techStack.length > 0 && (
        <>
          <Separator className="bg-black" />
          <div id="techStack" className="space-y-4">
            <div className="text-2xl font-semibold">기술스택</div>
            <div>{resume.techStack.join(", ")}</div>
          </div>
        </>
      )}

      {/* 개인 링크 */}
      {resume.links.length > 0 && (
        <>
          <Separator className="bg-black" />
          <div id="links" className="space-y-4">
            <div className="text-2xl font-semibold">개인 링크</div>
            {resume.links.map((link: any, index: number) => (
              <a
                key={index}
                href={link.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full p-2 space-x-2 border border-gray-400 rounded-md cursor-pointer bg-gray-50"
              >
                <div className="flex items-center justify-center p-4 border-r border-gray-200 aspect-square w-14 h-14">
                  {handleIconChange(link.linkUrl)}
                </div>
                <div className="flex flex-col flex-1 space-y-1">
                  <div className="text-sm font-semibold text-gray-600">
                    {link.linkUrl}
                  </div>
                  <div className="font-semibold">{link.linkTitle}</div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
