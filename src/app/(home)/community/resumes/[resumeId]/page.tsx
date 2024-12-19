"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
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
import ResumeComment from "./_components/resume-comment";
import ResumeSkeleton from "./_components/resume-skeleton";
import Markdown from "react-markdown";
import { useCallback, useEffect, useState } from "react";
import { generateTabItems } from "./_lib/util";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleIconChange } from "@/app/_lib/util";
import { ResumeDetailContent } from "@/app/(home)/_components/ResumeDetailContent";

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;
  const [activeTab, setActiveTab] = useState<string>("aboutMe");

  const router = useRouter();

  const { data: resume, error } = useResumeDetailQuery(resumeId);

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

  useEffect(() => {
    if (error && (error as any).status === 403) {
      toast.error("접근 권한이 없습니다."); // Display error message
      router.push("/community"); // Redirect to /community
    }
  }, [error, router]);

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

        <div className="relative flex flex-col border rounded-md w-full border-gray-300 ">
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

            <ResumeDetailContent resume={resume.result} />
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
