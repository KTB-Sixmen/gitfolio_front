"use client";

import { Suspense } from "react";
import MyResumeSkeleton from "./_components/my-resume-skeleton";
import MyResumeContent from "./_components/MyResumeContent";
import { QueryErrorBoundary } from "@/app/_components/ErrorBoundary";

export default function Page() {
  return (
    // <QueryErrorBoundary>
    //   <Suspense fallback={<MyResumeSkeleton />}>
    //     <MyResumeContent />
    //   </Suspense>
    // </QueryErrorBoundary>
    <MyResumeContent />
  );
}
