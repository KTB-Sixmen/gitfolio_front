import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  size: number;
};

export default function CommunitySkeleton({ size }: Props) {
  return (
    <>
      <Skeleton className="w-full h-52 object-cover rounded-lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: size }).map((_, idx) => (
          <div
            key={idx}
            className="border rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-2">
              <div className="flex space-x-2 text-xs text-gray-500 items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-16 rounded-lg" />
                ))}
              </div>
            </div>
            <Skeleton className="w-full h-48 object-cover rounded-lg" />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-6" />
              </div>
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />
              <Skeleton className="mt-1 h-4 w-2/4" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
