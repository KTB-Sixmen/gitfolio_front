"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Github, Link, Linkedin } from "lucide-react";
import { useResumeDetailQuery } from "../../_hooks/useResumeQuery";
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
import Tistory from "../../../../../../public/tistory.svg";
import Notion from "../../../../../../public/notion.svg";
import ResumeComment from "./_components/resume-comment";
import ResumeSkeleton from "./_components/resume-skeleton";
import Markdown from "react-markdown";
import { useCallback, useEffect, useState } from "react";
import { generateTabItems } from "./_lib/util";

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;
  const [activeTab, setActiveTab] = useState<string>("selfIntroduction");

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

  const TAB_ITEMS = generateTabItems(resume);

  const scrollToWithOffset = (selector: string, offset: number) => {
    const element = document.querySelector(selector);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // 부드러운 스크롤
      });

      window.history.pushState(null, "", selector);
    }
  };

  const handleScroll = useCallback(() => {
    const sections = TAB_ITEMS.map(
      (item) => document.querySelector(item.target) as HTMLElement, // HTMLElement로 캐스팅
    );
    const scrollPosition = window.scrollY; // 조정값: 헤더 높이 + 오프셋

    for (const section of sections) {
      if (section) {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          const activeSection = section.id;
          setActiveTab(activeSection);
          break;
        }
      }
    }
  }, [TAB_ITEMS]); // 의존성 배열에 TAB_ITEMS 추가

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!resume) {
    return <ResumeSkeleton />;
  }

  const tags = resume.result.tags?.length
    ? resume.result.tags.map((tag) => `#${tag}`)
    : ["#기타"];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-24 space-y-4">
      <div className="flex flex-col max-w-[982px] w-full mx-auto space-y-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4 font-semibold text-blue-500">
            {tags.map((tag, index) => (
              <div key={index}>{tag}</div>
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

        <div className="relative flex flex-col border rounded-md max-w-[982px] w-full border-gray-300 ">
          <div className="flex flex-col">
            <nav className="sticky z-10 flex justify-center w-full gap-4 pt-5 bg-white shadow-lg top-16">
              {TAB_ITEMS.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToWithOffset(item.target, 140)} // 헤더와 탭 높이에 맞춰 오프셋 적용
                  className={`px-4 py-2 text-sm font-semibold transition ${
                    activeTab === item.target.slice(1)
                      ? "border-b-2 border-blue-500 text-blue-500"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="px-20 space-y-10 p-14">
              {/* 기본정보 */}
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
                    sizes="228"
                    className="object-cover rounded-lg "
                  />
                </div>
              </div>

              {/* 자기소개 */}
              <Separator className="bg-black" />
              <div id="selfIntroduction" className="space-y-4">
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
                  <div id="workExperience" className="space-y-4">
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
                  <div id="projects" className="space-y-4">
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
                  <div id="education" className="space-y-4">
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
                  <div id="certificates" className="space-y-4">
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
                  <div id="techStack" className="space-y-4">
                    <div className="text-2xl font-semibold">기술스택</div>
                    <div>{resume.result.techStack.join(", ")}</div>
                  </div>
                </>
              )}

              {/* 개인 링크 */}
              {resume.result.links.length > 0 && (
                <>
                  <Separator className="bg-black" />
                  <div id="links" className="space-y-4">
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
          </div>
        </div>
        <div>
          {/* 댓글 */}
          <ResumeComment resumeId={resumeId} />
        </div>
      </div>
    </div>
  );
}
