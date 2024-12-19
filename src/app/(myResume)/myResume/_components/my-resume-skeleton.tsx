import React from "react";

export default function MyResumeSkeleton() {
  return (
    <div className="flex flex-col w-full h-full p-12 space-y-2 overflow-y-auto">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-40 h-8 bg-blue-300 rounded animate-pulse"></div>
      </div>

      {/* 이력서 리스트 섹션 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 로딩 중인 이력서 카드 6개 표시 */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative p-4 space-y-2 border border-gray-300 shadow-xl rounded-xl"
          >
            {/* 아바타 스켈레톤 */}
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>

            {/* 이력서 정보 스켈레톤 */}
            <div className="space-y-2">
              {/* 포지션 제목 */}
              <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
              {/* 자기소개 */}
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              {/* 태그 */}
              <div className="flex flex-wrap gap-2">
                <div className="w-12 h-4 bg-blue-300 rounded animate-pulse"></div>
                <div className="w-12 h-4 bg-blue-300 rounded animate-pulse"></div>
              </div>
              {/* 업데이트 날짜 */}
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              {/* 조회수 및 좋아요 */}
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
