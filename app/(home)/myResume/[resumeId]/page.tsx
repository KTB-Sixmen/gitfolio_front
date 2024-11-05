"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Github, Link, Linkedin } from "lucide-react";
import {
  GraduationStatus,
  graduationStatusMap,
  SchoolType,
  schoolTypeMap,
  WorkType,
  workTypeMap,
} from "@/app/types/type";
import Tistory from "../../../../../public/tistory.svg";
import Notion from "../../../../../public/notion.svg";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Document,
  Page as Pa,
  Text,
  View,
  Image as Im,
  StyleSheet,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import ResumeSkeleton from "../../community/resumes/[resumeId]/_components/resume-skeleton";
import { useResumeDetailQuery } from "../../community/_hooks/useResumeQuery";
import ResumeComment from "../../community/resumes/[resumeId]/_components/resume-comment";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [messages, setMessages] = useState<string[]>(["이렇게 이렇게 바꿔줘"]);
  const [input, setInput] = useState("");

  const { data: resume } = useResumeDetailQuery(resumeId);

  const handleIconChange = (url: string) => {
    if (url.includes("github.com")) {
      // return <GitHubLogoIcon />;
      return <Github />;
    } else if (url.includes("linkedin.com")) {
      // return <LinkedInLogoIcon />;
      return <Linkedin />;
    } else if (url.includes("tistory.com")) {
      return <Tistory />;
    } else if (url.includes("notion.site")) {
      return <Notion />;
    } else {
      return <Link />;
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  if (!resume) {
    return <ResumeSkeleton />;
  }

  // min-h-[calc(100vh-4rem)]
  return (
    <div className="relative flex flex-row w-full h-full">
      <div className="flex flex-col items-center justify-center w-full p-24 space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-4 font-semibold text-blue-500">
              {(resume.result.tags && resume.result.tags.length > 0
                ? resume.result.tags
                : ["#기타"]
              ).map((tag, index) => (
                <span key={index} className="font-bold text-blue-500">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2 text-sm">
              <div className="flex items-center gap-1 p-2 border border-gray-300 rounded-full">
                <FontAwesomeIcon color="gray" icon={faHeart} />
                <div>{resume.result.likeCount}</div>
              </div>
              <div className="flex items-center gap-1 p-2 border rounded-full border-gray-3000">
                <FontAwesomeIcon color="gray" icon={faEye} />
                <div>{resume.result.viewCount}</div>
              </div>
            </div>
          </div>

          <div
            ref={targetRef}
            // ref={printRef}
            className="border w-[1000px] border-gray-300 p-10 px-32 space-y-10"
          >
            <div className="flex flex-row">
              <div className="flex flex-col flex-grow">
                <div className="mb-4 text-5xl font-semibold">
                  {resume.result.memberName}
                </div>
                <div className="text-2xl">{resume.result.position}</div>
              </div>
              <div className="relative w-[228px] h-[228px]">
                <Image
                  src={
                    resume.result.avatarUrl.startsWith("https://avatars")
                      ? resume.result.avatarUrl
                      : `${process.env.NEXT_PUBLIC_S3_URL}${resume.result.avatarUrl}`
                  }
                  alt="프로필 이미지"
                  priority
                  fill
                  className="object-cover rounded-lg "
                />
                {/* <img
                src={`${process.env.NEXT_PUBLIC_S3_URL}${resume.result.avatarUrl}`}
                alt="프로필 이미지"
                className="w-full h-full rounded-lg "
                // style={{ width: "228px", height: "228px" }}
              /> */}
              </div>
            </div>

            {/* 자기소개 */}
            <Separator className="bg-black" />
            <div className="space-y-4">
              <div className="text-2xl font-semibold">자기소개</div>
              <div className="whitespace-pre-line">{resume.result.aboutMe}</div>
            </div>

            {/* 경력 */}
            {resume.result.workExperiences.length > 0 && (
              <>
                <Separator className="bg-black" />
                <div className="space-y-4">
                  <div className="text-2xl font-semibold">경력</div>
                  {resume.result.workExperiences.map((experience, index) => (
                    <div key={index}>
                      <div className="text-lg font-semibold">
                        {experience.companyName}
                      </div>
                      <div className="text-sm text-gray-400">
                        <div>
                          {experience.departmentName} | {experience.role} |{" "}
                          {experience.workType}
                          {workTypeMap[experience.workType as WorkType]}
                        </div>
                        <div>
                          {experience.startedAt} ~ {experience.endedAt}
                        </div>
                      </div>
                      {index < resume.result.workExperiences.length - 1 && (
                        <Separator className="my-4 bg-black" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* 프로젝트 */}
            {resume.result.projects.length > 0 && (
              <>
                <Separator className="bg-black" />
                <div className="space-y-4">
                  <div className="text-2xl font-semibold">프로젝트</div>
                  {resume.result.projects.map((project, index) => (
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
                        <div>{project.skillSet}</div>
                      </div>
                      <div>{project.projectDescription}</div>
                      {index < resume.result.projects.length - 1 && (
                        <Separator className="my-4 bg-gray-300" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 교육 */}
            {resume.result.educations.length > 0 && (
              <>
                <Separator className="bg-black" />
                <div className="space-y-4">
                  <div className="text-2xl font-semibold">교육</div>
                  {resume.result.educations.map((education, index) => (
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
                      {index < resume.result.educations.length - 1 && (
                        <Separator className="my-4 bg-black" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 자격증 */}
            {resume.result.certificates.length > 0 && (
              <>
                <Separator className="bg-black" />
                <div className="space-y-4">
                  <div className="text-2xl font-semibold">자격증</div>
                  {resume.result.certificates.map((certificate, index) => (
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
                      {index < resume.result.certificates.length - 1 && (
                        <Separator className="my-4 bg-black" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 기술스택 */}
            {resume.result.techStack.length > 0 && (
              <>
                <Separator className="bg-black" />
                <div className="space-y-4">
                  <div className="text-2xl font-semibold">기술스택</div>
                  <div>{resume.result.techStack.join(", ")}</div>
                </div>
              </>
            )}

            {/* 개인 링크 */}
            {resume.result.links.length > 0 && (
              <>
                <Separator className="bg-black" />
                <div className="space-y-4">
                  <div className="text-2xl font-semibold">개인 링크</div>
                  {resume.result.links.map((link, index) => (
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
          {/* 댓글 */}
          <ResumeComment resumeId={resumeId} />
        </div>
        <Button
          onClick={() => toPDF()}
          // onClick={() => handleDownloadPdf()}
        >
          pdf로 저장
        </Button>
      </div>
      <aside className="flex flex-col w-1/4 h-full min-h-[calc(100vh-4rem)] p-4 border-l border-gray-300 shadow-lg sticky top-0">
        <div className="flex-grow space-y-2 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="p-2 text-white bg-blue-400 rounded-lg">
              {message}
            </div>
          ))}
        </div>

        {/* 입력창 */}
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 text-white bg-blue-500 rounded-r-lg"
          >
            전송
          </button>
        </div>
      </aside>
    </div>
  );
}
