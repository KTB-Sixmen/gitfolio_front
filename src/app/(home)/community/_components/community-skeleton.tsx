import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  size?: number;
};

export default function CommunitySkeleton({ size = 12 }: Props) {
  return (
    <div className="space-y-4">
      <Skeleton className="object-cover w-full rounded-lg h-52" />
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-[120px] h-10 rounded-lg" />
          <Skeleton className="w-[120px] h-10 rounded-lg" />
          <Skeleton className="w-[120px] h-10 rounded-lg" />
          <Skeleton className="w-[120px] h-10 rounded-lg" />
        </div>
        <Skeleton className="w-[200px] h-10 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: size }).map((_, idx) => (
          <div
            key={idx}
            className="overflow-hidden border rounded-lg shadow-lg"
          >
            <div className="p-2">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="w-16 h-6 rounded-lg" />
                ))}
              </div>
            </div>
            <Skeleton className="object-cover w-full h-48 rounded-lg" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-6 h-6" />
              </div>
              <Skeleton className="w-full h-4 mt-2" />
              <Skeleton className="w-3/4 h-4 mt-1" />
              <Skeleton className="w-2/4 h-4 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
