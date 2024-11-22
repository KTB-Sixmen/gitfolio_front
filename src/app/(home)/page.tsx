import { Suspense } from "react";
import CommunitySkeleton from "./_components/CommunitySkeleton";
import Community from "./_components/Community";

export default function Page() {
  return (
    <Suspense fallback={<CommunitySkeleton />}>
      <Community />
    </Suspense>
  );
}
