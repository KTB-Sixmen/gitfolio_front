import { Suspense } from "react";
import Community from "./_components/community";
import CommunitySkeleton from "./_components/community-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<CommunitySkeleton />}>
      <Community />
    </Suspense>
  );
}
