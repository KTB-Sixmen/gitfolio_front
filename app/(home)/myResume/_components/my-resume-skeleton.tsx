import { Skeleton } from "@/components/ui/skeleton";

export default function MyResumeSkeleton() {
  return (
    <div className="flex flex-col w-full h-full p-12 px-40 space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col w-full items-start p-4 space-x-4 border-b"
        >
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex flex-col  w-full flex-1 space-y-2">
            <Skeleton className="w-14 h-6 rounded-md" />
            <Skeleton className="w-full h-12 rounded-md" />
            <Skeleton className="w-14 h-6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
