import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyResumeDetailSkeleton() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center p-24">
      <div className="flex justify-center max-w-[982px] w-full  h-full">
        {/* 메인 콘텐츠 */}
        <main className="items-center justify-center flex-1 mx-auto overflow-y-auto custom-scrollbar">
          <div className="flex flex-col items-center justify-center w-full space-y-4">
            <div className="flex justify-end w-full ">
              <Skeleton className="h-10 w-12" />
            </div>
            <div className="flex flex-row items-center w-full justify-between p-4 border rounded-lg">
              <div className="space-y-0.5 w-2/3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-8 w-12 rounded-full" />
            </div>
            <div className="flex items-center justify-betweenw-full ">
              <Skeleton className="h-6 w-1/4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-10 rounded-full" />
                <Skeleton className="h-6 w-10 rounded-full" />
              </div>
            </div>

            <div className="px-20 space-y-10 border border-gray-300 rounded-lg p-14 w-full">
              <div className="flex flex-row">
                <div className="flex flex-col flex-grow">
                  <Skeleton className="h-10 w-1/2 mb-4" />
                  <Skeleton className="h-8 w-1/3" />
                </div>
                <Skeleton className="w-[128px] h-[128px] md:w-[180px] md:h-[180px] rounded-lg" />
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
        </main>

        {/* 사이드바 */}
        {/* <aside className="hidden lg:flex flex-col justify-between w-[300px] h-full p-4 border-l bg-white border-gray-300 shadow-lg">
          <div>
            <div className="mb-4 text-lg font-bold text-center">
              <Skeleton className="h-4 w-40 mx-auto" />
            </div>
            <div className="flex-grow space-y-2 overflow-y-auto">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="p-2 bg-gray-200 rounded-lg w-full"
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col items-center p-2 mt-2 space-y-2 bg-gray-100 rounded-lg">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-2/3" />
          </div>
        </aside> */}
      </div>
    </div>
  );
}
