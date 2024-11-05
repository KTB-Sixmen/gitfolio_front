import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RepositorySkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full p-4 my-auto space-y-4">
      <Card className="w-full">
        <CardHeader>
          <Skeleton className="w-1/2 h-6 mb-2" />
          <Skeleton className="w-3/4 h-4" />
        </CardHeader>
        <CardContent className="h-full space-y-4">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </CardContent>
      </Card>
      <Skeleton className="w-full h-10" />
    </div>
  );
}
