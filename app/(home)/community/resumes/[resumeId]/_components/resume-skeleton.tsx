import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResumeSkeleton() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center w-full h-full p-24">
      <div className="flex flex-col space-y-2 w-full max-w-4xl">
        <div className="flex justify-between w-full items-center">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2 text-sm">
            <Skeleton className="h-6 w-10 rounded-full" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
        </div>

        <div className="border w-full border-gray-300 p-10 px-32 space-y-10">
          <div className="flex flex-row">
            <div className="flex flex-col flex-grow">
              <Skeleton className="h-10 w-1/2 mb-4" />
              <Skeleton className="h-8 w-1/3" />
            </div>
            <Skeleton className="w-56 h-56 rounded-lg" />
          </div>

          {/* 자기소개 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* 경력 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* 프로젝트 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* 기술스택 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* 개인 링크 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
