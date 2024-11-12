"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Github, Link, Linkedin, PencilLine, X } from "lucide-react";
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
import Tistory from "../../../../../public/tistory.svg";
import Notion from "../../../../../public/notion.svg";
import { useCallback, useEffect, useState } from "react";
import ResumeSkeleton from "../../community/resumes/[resumeId]/_components/resume-skeleton";
import { useResumeDetailQuery } from "../../community/_hooks/useResumeQuery";
import ResumeComment from "../../community/resumes/[resumeId]/_components/resume-comment";
import { CornerDownRight } from "lucide-react";
import PdfDownloadButton from "./_components/PdfDownloadButton";
import Markdown from "react-markdown";

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [selection, setSelection] = useState<string>(""); // getSelection을 위한 상태
  const [position, setPosition] = useState<Record<string, number>>();
  const [selectedText, setSelectedText] = useState<string>("");
  const [isPopOver, setIsPopOver] = useState<boolean>(false);

  const { data: resume } = useResumeDetailQuery(resumeId);

  const handleIconChange = (url: string) => {
    if (url.includes("github.com")) {
      return <Github />;
    } else if (url.includes("linkedin.com")) {
      return <Linkedin />;
    } else if (url.includes("tistory.com")) {
      return <Tistory />;
    } else if (url.includes("notion.site")) {
      return <Notion />;
    } else {
      return <Link />;
    }
  };

  // 마우스를 떼었을 때 발생
  const onMouseUp = useCallback(() => {
    const activeSelection = document.getSelection();
    // console.log(activeSelection);
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      return;
    }

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setSelection(text as string);
    setIsPopOver(true);
    setPosition({
      x: rect.left + rect.width / 2 - 44 / 2,
      y: rect.top + window.scrollY - 100,
      width: rect.width,
      height: rect.height,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);

  const handlePopover = () => {
    setIsPopOver(false);
    setSelectedText(selection); // 혹시 모를 경우를 대비해 기존 상태 사용
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, input]);
      setInput("");
      setSelection("");
      setSelectedText("");
    }
  };

  if (!resume) {
    return <ResumeSkeleton />;
  }

  // min-h-[calc(100vh-4rem)]
  return (
    <div className="relative w-full h-full">
      {/* {selection && position && ( */}
      {isPopOver && (
        <div
          style={{
            transform: `translate3d(${position?.x}px, ${position?.y}px, 0)`,
          }}
          className="absolute top-0 left-0 w-[44px] h-[30px] pencil-button-wrapper"
          onClick={handlePopover}
          onMouseDown={(e) => e.preventDefault()}
        >
          <PencilLine className="flex items-center w-full h-full px-2 text-black bg-white border shadow-2xl rounded-3xl hover:bg-gray-100" />
        </div>
      )}
      {/* 사이드바 */}
      <aside className="fixed top-[4rem] flex flex-col justify-between right-0 w-1/4 h-[calc(100vh-4rem)] p-4 border-l bg-white z-40 border-gray-300 shadow-lg">
        <div>
          <div className="mb-4 text-lg font-bold text-center">
            이력서 수정 채팅
          </div>
          <div className="flex-grow space-y-2 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  className="p-2 text-white bg-blue-400 rounded-lg"
                >
                  {message}
                </div>
              ))
            ) : (
              <div className="mt-4 text-gray-500 text-center">
                요청한 수정 사항이 없습니다.
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center p-2 mt-2 space-y-2 bg-gray-100 rounded-lg">
          {selectedText && (
            // <div className="w-full p-2 px-10 mb-2 text-gray-500 bg-white rounded-lg line-clamp-2">
            //   {`"${selectedText}"`}
            // </div>
            <div className="relative w-full p-2 px-4 mb-2 text-gray-500 bg-white rounded-lg  flex items-center">
              <CornerDownRight className="absolute w-5 h-5 left-2 top-2 text-gray-600" />
              <span className="px-6 flex-grow line-clamp-2">{`"${selectedText}"`}</span>
              <X
                // size={}
                className="absolute w-5 h-5 right-2 top-2 text-gray-600 hover:bg-gray-300 rounded-full cursor-pointer"
                onClick={() => setSelectedText("")}
              />
            </div>
          )}
          <div className="flex items-center w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-grow h-8 p-2 bg-gray-100 border border-gray-300 border-none rounded-full focus-visible:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 text-white bg-blue-500 rounded-full"
            >
              전송
            </button>
          </div>
        </div>
      </aside>

      <div className="mr-[30%] items-center justify-center w-full h-full p-24 space-y-4 overflow-y-auto">
        <div className="flex w-[1000px] mr-[20%] justify-end">
          <PdfDownloadButton resume={resume} />
        </div>
        <div className="flex items-center justify-between w-[1000px] mr-[16%]">
          <div className="flex items-center justify-between gap-4 font-semibold text-blue-500 ">
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

        <div className="border w-[1000px] border-gray-300 p-10 px-32 space-y-10">
          <div className="flex flex-row">
            <div className="flex flex-col flex-grow">
              <div className="mb-4 text-5xl font-semibold">
                {resume.result.memberName}
              </div>
              <div className="text-2xl">
                {positionTypeMap[resume.result.position as PositionType]} 개발자
              </div>
            </div>
            <div className="relative w-[228px] h-[228px]">
              <Image
                src={resume.result.avatarUrl}
                alt="프로필 이미지"
                priority
                fill
                className="object-cover rounded-lg "
              />
            </div>
          </div>

          {/* 자기소개 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">자기소개</div>
            {/* <div className="whitespace-pre-line">{resume.result.aboutMe}</div> */}
            <Markdown className="prose break-words prose-p:leading-relaxed prose-pre:p-0">
              {resume.result.aboutMe}
            </Markdown>
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
                    <Markdown className="prose break-words prose-p:leading-relaxed prose-pre:p-0">
                      {project.projectDescription}
                    </Markdown>
                    {/* <div>{project.projectDescription}</div> */}
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
        <div className="mr-[30%] w-[1000px]">
          <ResumeComment resumeId={resumeId} />
        </div>
      </div>
    </div>
  );
}
