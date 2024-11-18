"use client";

import { useRouter } from "next/navigation";
import { useMyResumeQuery } from "./_hooks/useMyResumeQuery";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import MyResumeSkeleton from "./_components/my-resume-skeleton";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PositionType, positionTypeMap } from "@/app/types/type";
import moment from "moment";
import "moment/locale/ko";

export default function Page() {
  const { data: myResume } = useMyResumeQuery();
  const router = useRouter();

  if (!myResume) {
    return <MyResumeSkeleton />;
  }

  return (
    <div className="flex flex-col w-full space-y-2 h-full p-12 px-64 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">내 이력서 리스트</div>
        <Link
          className="flex gap-2 pr-6 bg-blue-500 hover:bg-blue-600 text-white px-4 p-2 rounded-lg"
          href={"/myResume/create"}
        >
          <Plus />새 이력서 만들기
        </Link>
      </div>
      {myResume.result.content.map((resume) => (
        <div
          key={resume.resumeId}
          onClick={() => router.push(`/myResume/${resume.resumeId}`)}
          className="p-4 space-y-2 border border-gray-300 rounded-xl shadow-xl cursor-pointer transition-transform duration-500 ease-in-out transform hover:-translate-y-1"
        >
          <Image
            src={resume.avatarUrl}
            width={64}
            height={64}
            alt="Avatar"
            className="w-16 h-16 rounded-full avatar"
          />
          <div className="resume-info space-y-2">
            <h2 className="font-bold position">
              {positionTypeMap[resume.position as PositionType]}
            </h2>
            <p className="text-sm text-gray-600 about-me">{resume.aboutMe}</p>
            <div className="flex flex-wrap gap-2 tags">
              {(resume.tags && resume.tags.length > 0
                ? resume.tags
                : ["#기타"]
              ).map((tag, index) => (
                <Badge className="font-bold bg-blue-500" key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-sm">
              {moment(resume.updatedAt).isSame(moment(), "day")
                ? moment(resume.updatedAt).fromNow()
                : moment(resume.updatedAt).format("YYYY.MM.DD HH:mm")}
            </div>
            <div className="text-xs text-gray-600 stats">
              <span>조회수: {resume.viewCount}</span> |{" "}
              <span>좋아요: {resume.likeCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
