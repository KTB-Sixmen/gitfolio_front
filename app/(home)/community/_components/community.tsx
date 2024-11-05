'use client';

import Image from 'next/image';
import { Heart, RefreshCw } from 'lucide-react';
import MAIN_BANNER from '../../../../../public/images/main-banner.png';
import {
  ResumeFilter,
  ResumeResponse,
  useResumeQuery,
} from '../_hooks/useResumeQuery';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MouseEvent, useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CommunitySkeleton from '../_components/community-skeleton';
import { PositionType, positionTypeMap, schoolTypeMap } from '@/app/types/type';
import { useQueryClient } from '@tanstack/react-query';
import { useLikeMutation } from '../_hooks/useLikeMutation';

export default function Community() {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam) : 1;

  const [size, setsize] = useState(12);
  const [filters, setFilters] = useState<ResumeFilter>({
    // tags: [""],
    position: '',
    techStack: '',
    schoolType: '',
    sortOrder: 'recent',
  });

  const router = useRouter();
  console.log('sdf');
  const { data: resumes, isLoading } = useResumeQuery(page, size, filters);
  const { mutate } = useLikeMutation(page, size, filters);

  useEffect(() => {
    const newFilters = {
      position: searchParams.get('position') || '',
      techStack: searchParams.get('techStack') || '',
      schoolType: searchParams.get('schoolType') || '',
      sortOrder: searchParams.get('sortOrder') || '',
    };
    setFilters(newFilters);
  }, [searchParams]);

  if (isLoading || !resumes) {
    return <CommunitySkeleton size={size} />;
  }

  const resetFilter = () => {
    setFilters({
      // tag: [""],
      position: '',
      techStack: '',
      schoolType: '',
      sortOrder: 'recent',
    });
    router.push(`/community`);
  };

  const handleFilterChange = (field: string, value: string) => {
    const newValue = value === 'all' ? '' : value; // Map 'all' to ''
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
    query.append('page', '1'); // Reset to page 1 when filter changes
    router.push(`/community?${query.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) {
        query.append(key, val as string);
      }
    });
    query.append('page', newPage.toString());
    router.push(`/community?${query.toString()}`); // 페이지 이동
  };

  const handleHeartClick = (resumeId: string) => {
    mutate(resumeId);
  };

  return (
    <>
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
              onValueChange={(value) => handleFilterChange('position', value)}
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
            <Select
              value={filters.techStack}
              onValueChange={(value) => handleFilterChange('techStack', value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="기술 스택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 기술 스택</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                {/* 추가적인 기술 스택 옵션 */}
              </SelectContent>
            </Select>
            <Select
              value={filters.schoolType}
              onValueChange={(value) => handleFilterChange('schoolType', value)}
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
              onValueChange={(value) => handleFilterChange('sortOrder', value)}
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
          <Button
            variant="outline"
            className="flex gap-2 p-2 px-4 text-gray-500 border border-gray-400 rounded-2xl"
          >
            <Heart className="w-4 h-4" />
            좋아요 누른 이력서만 보기
          </Button>
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
                      : ['#기타']
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
                  src={
                    resume.avatarUrl.startsWith('https://avatars')
                      ? resume.avatarUrl
                      : `${process.env.NEXT_PUBLIC_S3_URL}${resume.avatarUrl}`
                  }
                  alt="프로필 이미지"
                  width={300}
                  height={300}
                  className="object-cover w-full h-48 rounded-lg"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {positionTypeMap[
                        resume.position.replace('개발자', '') as PositionType
                      ] || resume.position}{' '}
                      개발자
                    </h3>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleHeartClick(resume.resumeId);
                      }}
                      className="cursor-pointer"
                      aria-label={resume.isLiked ? 'Unlike' : 'Like'}
                    >
                      <Heart
                        fill={resume.isLiked ? 'red' : 'none'}
                        stroke={resume.isLiked ? 'red' : 'currentColor'}
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
                  : 0
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
                      index === resumes.result.currentPage ? 'font-bold' : ''
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
                  : resumes.result.totalPages - 1
              }`}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
