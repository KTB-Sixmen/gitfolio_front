import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingSkeleton() {
  return (
    <div className="max-w-3xl p-4 mx-auto space-y-6">
      <Skeleton className="h-8 w-1/3 mb-4" />
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg font-medium">
            <Skeleton className="h-6 w-1/4" />
          </CardTitle>
          <Separator className="border-2 border-black" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col justify-center gap-2">
                <Skeleton className="w-[100px] h-[100px] rounded-full" />
                <Skeleton className="h-8 w-24 mt-2" />
              </div>
              <div className="flex flex-col justify-between w-full gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
