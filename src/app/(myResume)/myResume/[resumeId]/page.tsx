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
import { useCallback, useEffect, useRef, useState } from "react";
import { CornerDownRight } from "lucide-react";
import PdfDownloadButton from "./_components/PdfDownloadButton";
import Markdown from "react-markdown";
import { Switch } from "@/components/ui/switch";
import { useVisibility } from "./hooks/useVisibility";
import { useResumeDetailQuery } from "@/app/(home)/community/_hooks/useResumeQuery";
import ResumeComment from "@/app/(home)/community/resumes/[resumeId]/_components/resume-comment";
import MyResumeDetailSkeleton from "./_components/MyResumeDetailSkeleton";
import { useProfileQuery } from "@/app/(home)/onboarding/_hooks/useProfileQuery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;
  const router = useRouter();

  const { data: resume, isLoading } = useResumeDetailQuery(resumeId);
  const { data: userProfile } = useProfileQuery();

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [selection, setSelection] = useState<string>(""); // getSelection을 위한 상태
  const [position, setPosition] = useState<Record<string, number>>();
  const [selectedText, setSelectedText] = useState<string>("");
  const [isPopOver, setIsPopOver] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  const { visibility, handleToggleVisibility } = useVisibility(
    resume,
    resumeId,
  );

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
  const onMouseUp = useCallback((event: MouseEvent) => {
    // 이벤트가 팝오버 버튼 내부에서 발생했는지 확인
    if (
      popoverRef.current &&
      popoverRef.current.contains(event.target as Node)
    ) {
      return;
    }

    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      setIsPopOver(false);
      return;
    }

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setSelection(text as string);
    setIsPopOver(true);
    setPosition({
      x: rect.left + rect.width / 2 - 44 / 2,
      y: rect.top + window.scrollY - 100,
      // y: rect.top + (mainRef.current?.scrollTop || 0),
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

  useEffect(() => {
    if (resume && userProfile) {
      const userId = userProfile.result.memberId;
      const resumeOwnerId = resume.result.memberId;

      if (userId !== resumeOwnerId) {
        toast.error("잘못된 접근입니다.");
        router.push("/community");
      }
    }
  }, [resume, userProfile, router]);

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
    return <MyResumeDetailSkeleton />;
  }

  // min-h-[calc(100vh-4rem)]
  return (
    <div className="relative w-full h-full">
      {isPopOver && (
        <div
          ref={popoverRef}
          style={{
            transform: `translate3d(${position?.x}px, ${position?.y}px, 0)`,
          }}
          className="absolute top-0 left-0 w-[44px] h-[30px] pencil-button-wrapper"
          onClick={handlePopover}
        >
          <PencilLine className="flex items-center w-full h-full px-2 text-black bg-white border shadow-2xl rounded-3xl hover:bg-gray-100" />
        </div>
      )}
      <div className="flex h-full">
        {/* 메인 콘텐츠 */}
        <main className="items-center justify-center flex-1 p-12 mx-auto overflow-y-auto custom-scrollbar">
          <div className="flex flex-col items-center justify-center w-full space-y-4">
            <div className="flex justify-end w-full max-w-[982px]">
              <PdfDownloadButton resume={resume} />
            </div>
            <div className="flex flex-row items-center max-w-[982px] w-full justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <div className="text-base">공개 여부 설정</div>
                <div className="text-sm text-gray-400">
                  공개 여부에 체크하시면 커뮤니티에 회원님의 이력서가
                  공개됩니다!
                </div>
              </div>
              <Switch
                checked={visibility}
                onCheckedChange={() => handleToggleVisibility()}
              />
            </div>
            <div className="flex items-center justify-between max-w-[982px] w-full ">
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

            <div className="px-20 space-y-10 border border-gray-300 rounded-lg p-14 max-w-[982px] w-full">
              <div className="flex flex-row">
                <div className="flex flex-col flex-grow">
                  <div className="mb-4 text-3xl font-semibold">
                    {resume.result.memberName}
                  </div>
                  <div className="text-xl">
                    {positionTypeMap[resume.result.position as PositionType]}{" "}
                    개발자
                  </div>
                </div>
                <div className="relative w-[128px] h-[128px] md:w-[180px] md:h-[180px] border border-gray-100 rounded-lg">
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
                            {project.projectStartedAt} ~{" "}
                            {project.projectEndedAt}
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
                            {schoolTypeMap[education.schoolType as SchoolType]}{" "}
                            | {education.major}
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
            <div className="flex max-w-[982px] w-full">
              <ResumeComment resumeId={resumeId} />
            </div>
          </div>
        </main>

        {/* 사이드바 */}
        <aside className="hidden lg:flex flex-col justify-between w-[300px] h-full p-4 border-l bg-white border-gray-300 shadow-lg">
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
                <div className="mt-4 text-center text-gray-500">
                  요청한 수정 사항이 없습니다.
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center p-2 mt-2 space-y-2 bg-gray-100 rounded-lg">
            {selectedText && (
              <div className="relative flex items-center w-full p-2 px-4 mb-2 text-gray-500 bg-white rounded-lg">
                <CornerDownRight className="absolute w-5 h-5 text-gray-600 left-2 top-2" />
                <span className="flex-grow px-6 text-sm line-clamp-2">{`"${selectedText}"`}</span>
                <X
                  // size={}
                  className="absolute w-5 h-5 text-gray-600 rounded-full cursor-pointer right-2 top-2 hover:bg-gray-300"
                  onClick={() => setSelectedText("")}
                />
              </div>
            )}
            <div className="relative flex items-center w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-grow h-8 p-2 bg-gray-100 border border-gray-300 border-none rounded-full focus-visible:outline-none"
              />
              <button
                onClick={handleSend}
                className="absolute right-0 p-2 px-4 text-sm text-white bg-blue-600 rounded-md"
              >
                전송
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
