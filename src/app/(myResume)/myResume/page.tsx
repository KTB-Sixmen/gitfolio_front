"use client";

import { useRouter } from "next/navigation";
import { useMyResumeQuery } from "./_hooks/useMyResumeQuery";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import MyResumeSkeleton from "./_components/my-resume-skeleton";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { PositionType, positionTypeMap } from "@/app/types/type";
import moment from "moment";
import "moment/locale/ko";
import { useMyResumeDeleteMutation } from "./_hooks/useMyResuemDeleteMutation";
import MyResumeDeleteModal from "./[resumeId]/_components/MyResumeDeleteModal";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useMyResumeInfiniteQuery } from "./_hooks/useMyResumeInfiniteQuery";

export default function Page() {
  const router = useRouter();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [resumeId, setResumeId] = useState<string>();

  const observerRef = useRef<HTMLDivElement>(null);

  // const { data: myResume } = useMyResumeQuery();
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useMyResumeInfiniteQuery();
  const { mutate: deleteResume } = useMyResumeDeleteMutation();

  const onDelete = (resumeId: string) => {
    deleteResume(resumeId);
  };

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(observerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return <MyResumeSkeleton />;
  }

  const pages = infiniteData?.pages || [];
  const allResumes = pages.flatMap((page) => page.result.content);

  return (
    <div className="flex flex-col w-full h-full p-12 space-y-2 overflow-y-auto">
      <MyResumeDeleteModal
        onDelete={onDelete}
        resumeId={resumeId!}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
      />
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-semibold">내 이력서 리스트</div>
        <Link
          className="flex gap-2 p-2 px-4 pr-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          href={"/myResume/create"}
        >
          <Plus />새 이력서 만들기
        </Link>
      </div>
      {allResumes.length === 0 ? (
        <div>나만의 이력서를 생성해 보세요!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allResumes.map((resume) => (
            <div
              key={resume.resumeId}
              onClick={() => router.push(`/myResume/${resume.resumeId}`)}
              className="relative flex flex-col justify-center p-4 space-y-2 transition-transform duration-500 ease-in-out transform border border-gray-300 shadow-xl cursor-pointer rounded-xl hover:-translate-y-1"
            >
              <Button
                variant="ghost"
                className="absolute top-2 right-2 w-10 h-10 p-0 flex items-center justify-center text-red-500 rounded-full cursor-pointer hover:bg-gray-200 hover:bg-opacity-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setResumeId(resume.resumeId);
                  setDeleteModalOpen(true);
                }}
              >
                <Trash2 size={20} color="red" />
              </Button>

              <div className="flex flex-col flex-1 space-y-2">
                <Image
                  src={resume.avatarUrl}
                  width={64}
                  height={64}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full avatar object-cover"
                />
                <h2 className="font-bold position">
                  {positionTypeMap[resume.position as PositionType]}
                </h2>
                <p className="text-sm text-gray-600 about-me">
                  {resume.aboutMe}
                </p>
              </div>

              <div className="space-y-2">
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
                <div className="text-sm text-gray-500">
                  {moment(resume.updatedAt).isSame(moment(), "day")
                    ? moment(resume.updatedAt).fromNow()
                    : moment(resume.updatedAt).format("YYYY.MM.DD HH:mm")}
                </div>
                <div className="text-xs">
                  <span>조회수: {resume.viewCount}</span> |{" "}
                  <span>좋아요: {resume.likeCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 무한 스크롤을 위해 관찰할 대상 */}
      <div ref={observerRef} className="w-full h-10" />

      {isFetchingNextPage && (
        <div className="text-center text-gray-500 mt-4">더 불러오는 중...</div>
      )}
    </div>
  );
}
