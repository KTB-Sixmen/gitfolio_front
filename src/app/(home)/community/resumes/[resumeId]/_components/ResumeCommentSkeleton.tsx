import { Skeleton } from "@/components/ui/skeleton";

export default function ResumeCommentSkeleton() {
  return (
    <div className="flex flex-col w-full h-full border rounded-lg">
      <div className="p-4 px-10 text-lg font-semibold text-white rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-200">
        댓글
      </div>
      <div className="px-10 py-6">{renderSkeleton()}</div>
    </div>
  );
}

const renderSkeleton = () => (
  <div className="flex flex-col space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="flex items-start w-full gap-3 p-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    ))}
  </div>
);
