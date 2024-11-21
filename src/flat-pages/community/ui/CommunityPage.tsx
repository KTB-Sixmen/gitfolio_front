import { Suspense } from "react";
import CommunitySkeleton from "../../../../app/(home)/community/_components/community-skeleton";
import Community from "../../../../app/(home)/community/_components/community";

export function CommunityPage() {
  return (
    <Suspense fallback={<CommunitySkeleton />}>
      <Community />
    </Suspense>
  );
}
