import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import LOADING_ANIMATION2 from "../../../../../../public/images/mona-loading-dark.gif";

export default function RepositorySkeleton() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 my-auto space-y-4">
      <Image className="w-12" src={LOADING_ANIMATION2} alt="loading..." />
      레파지토리 불러오는 중...
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
