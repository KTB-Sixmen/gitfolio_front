import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingSkeleton() {
  return (
    <div className="w-full max-w-3xl p-4 mx-auto space-y-6">
      <Skeleton className="w-1/3 h-8 mb-4" />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg font-medium">
            <Skeleton className="w-1/4 h-6" />
          </CardTitle>
          <Separator className="border-2 border-black" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col justify-center gap-2">
                <Skeleton className="w-[100px] h-[100px] rounded-full" />
                <Skeleton className="w-24 h-8 mt-2" />
              </div>
              <div className="flex flex-col justify-between w-full gap-2">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-3/4 h-6" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
