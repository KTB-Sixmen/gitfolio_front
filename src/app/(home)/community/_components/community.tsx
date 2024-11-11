"use client";

import Image from "next/image";
import { Heart, Plus, RefreshCw } from "lucide-react";
import MAIN_BANNER from "../../../../../public/images/main-banner.png";
import {
  ResumeFilter,
  ResumeResponse,
  useResumeQuery,
} from "../_hooks/useResumeQuery";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CommunitySkeleton from "../_components/community-skeleton";
import { PositionType, positionTypeMap, schoolTypeMap } from "@/app/types/type";
import { useQueryClient } from "@tanstack/react-query";
import { useLikeMutation } from "../_hooks/useLikeMutation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { debounce } from "lodash";

export default function Community() {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam) : 1;

  const [size, setsize] = useState(12);
  const [filters, setFilters] = useState<ResumeFilter>({
    // tags: [""],
    position: "",
    techStack: "",
    schoolType: "",
    sortOrder: "recent",
  });

  const router = useRouter();
  const { data: resumes, isLoading } = useResumeQuery(page, size, filters);
  const { mutate } = useLikeMutation(page, size, filters);

  useEffect(() => {
    const newFilters = {
      position: searchParams.get("position") || "",
      techStack: searchParams.get("techStack") || "",
      schoolType: searchParams.get("schoolType") || "",
      sortOrder: searchParams.get("sortOrder") || "",
    };
    setFilters(newFilters);
  }, [searchParams]);

  const handleHeartClick = useMemo(
    () =>
      debounce((resumeId: string) => {
        mutate(resumeId);
      }, 500),
    [mutate],
  );

  if (isLoading || !resumes) {
    return <CommunitySkeleton size={size} />;
  }

  const resetFilter = () => {
    setFilters({
      // tag: [""],
      position: "",
      techStack: "",
      schoolType: "",
      sortOrder: "recent",
    });
    router.push(`/community`);
  };

  const handleFilterChange = (field: string, value: string) => {
    const newValue = value === "all" ? "" : value; // Map 'all' to ''
    const newFilters = {
      ...filters,
      [field]: newValue,
    };
    setFilters(newFilters);

    const query = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) {
        query.append(key, val as string); // Include only non-empty filters
      }
    });
    query.append("page", "1"); // Reset to page 1 when filter changes
    router.push(`/community?${query.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) {
        query.append(key, val as string);
      }
    });
    query.append("page", newPage.toString());
    router.push(`/community?${query.toString()}`); // 페이지 이동
  };

  return (
    <>
      <Button
        className="fixed bottom-8 pr-6 py-6 z-30 right-4 bg-blue-500 text-white gap-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        onClick={() => {
          router.push("/myResume/create");
        }}
      >
        <Plus />
        <div className="text-base">새 이력서 만들기</div>
      </Button>
      <div className="w-full">
        <Image src={MAIN_BANNER} alt="sdf" priority />
      </div>
      <div className="container items-center px-4 py-8 mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-white rounded-lg shadow-lg">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => resetFilter()}
              variant="outline"
              size="icon"
              className="w-10 h-10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Select
              value={filters.position}
              onValueChange={(value) => handleFilterChange("position", value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="포지션" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 포지션</SelectItem>
                {Object.entries(positionTypeMap).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Select
              value={filters.techStack}
              onValueChange={(value) => handleFilterChange("techStack", value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="기술 스택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 기술 스택</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
              </SelectContent>
            </Select> */}
            <Select
              value={filters.schoolType}
              onValueChange={(value) => handleFilterChange("schoolType", value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="학교" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                {Object.entries(schoolTypeMap).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.sortOrder}
              onValueChange={(value) => handleFilterChange("sortOrder", value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">정렬 없음</SelectItem>
                <SelectItem value="recent">최신순</SelectItem>
                <SelectItem value="relevant">관련성순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger className="flex gap-2 p-2 px-4 items-center text-gray-500 border border-gray-400 rounded-2xl">
                <Heart className="w-4 h-4" />
                <div className="">좋아요 누른 이력서만 보기</div>
              </TooltipTrigger>
              <TooltipContent className="text-base">
                <p>준비중입니다!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {resumes.result.content.map((resume, idx) => {
            return (
              <Link
                href={`/community/resumes/${resume.resumeId}`}
                key={resume.resumeId}
                className="overflow-hidden transition-transform duration-500 ease-in-out transform border rounded-lg shadow-lg cursor-pointer hover:-translate-y-1"
              >
                <div className="p-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    {(resume.tags && resume.tags.length > 0
                      ? resume.tags
                      : ["#기타"]
                    ).map((tag, index) => (
                      <span
                        key={index}
                        className="p-1 px-2 text-gray-600 bg-gray-100 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <Image
                  src={resume.avatarUrl}
                  alt="프로필 이미지"
                  width={300}
                  height={300}
                  className="object-cover w-full h-48 rounded-lg"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {positionTypeMap[
                        resume.position.replace("개발자", "") as PositionType
                      ] || resume.position}{" "}
                      개발자
                    </h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleHeartClick(resume.resumeId);
                      }}
                      className="cursor-pointer"
                      aria-label={resume.isLiked ? "Unlike" : "Like"}
                    >
                      <Heart
                        fill={resume.isLiked ? "red" : "none"}
                        stroke={resume.isLiked ? "red" : "currentColor"}
                      />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 whitespace-pre-line line-clamp-6">
                    {resume.aboutMe}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              href={`?page=${
                resumes.result.currentPage > 0
                  ? resumes.result.currentPage - 1
                  : 1
              }`}
              onClick={() =>
                resumes.result.currentPage > 0 &&
                handlePageChange(resumes.result.currentPage - 1)
              }
              aria-disabled={resumes.result.currentPage === 0}
            />
            {Array.from({ length: resumes.result.totalPages }).map(
              (_, index) => (
                <PaginationItem className="cursor-pointer" key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    href={`?page=${index + 1}`}
                    className={
                      index === resumes.result.currentPage ? "font-bold" : ""
                    }
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                resumes.result.currentPage < resumes.result.totalPages - 1 &&
                handlePageChange(resumes.result.currentPage + 1)
              }
              href={`?page=${
                resumes.result.currentPage < resumes.result.totalPages - 1
                  ? resumes.result.currentPage + 1
                  : 1
              }`}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
