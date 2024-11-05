"use client";

import { useRouter } from "next/navigation";
import ResumeSkeleton from "../community/resumes/[resumeId]/_components/resume-skeleton";
import { useMyResumeQuery } from "./_hooks/useMyResumeQuery";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Page() {
  const { data: myResume } = useMyResumeQuery();
  const router = useRouter();

  if (!myResume) {
    return <ResumeSkeleton />;
  }

  return (
    <div className="flex flex-col w-full h-full p-12 px-40">
      {myResume.result.map((resume) => (
        <div
          key={resume.resumeId}
          onClick={() => router.push(`/myResume/${resume.resumeId}`)}
          className="p-4 space-y-2 border-b cursor-pointer"
        >
          <Image
            src={resume.avatarUrl}
            width={64}
            height={64}
            alt="Avatar"
            className="w-16 h-16 rounded-full avatar"
          />
          <div className="resume-info">
            <h2 className="font-bold position">{resume.position}</h2>
            <p className="text-sm text-gray-600 about-me">{resume.aboutMe}</p>
            <div className="flex flex-wrap gap-2 mt-2 tags">
              {(resume.tags && resume.tags.length > 0
                ? resume.tags
                : ["#기타"]
              ).map((tag, index) => (
                <Badge className="font-bold bg-blue-500" key={index}>
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 stats">
              <span>Views: {resume.viewCount}</span> |{" "}
              <span>Likes: {resume.likeCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
