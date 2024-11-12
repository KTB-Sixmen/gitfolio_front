"use client";

import OnboardingSkeleton from "../onboarding/_components/onboarding-skeleton";
import { useProfileQuery } from "../onboarding/_hooks/useProfileQuery";
import ProfileEdit from "./_components/ProfileEdit";

export default function Page() {
  const { data: userProfile } = useProfileQuery();

  if (!userProfile) {
    return <OnboardingSkeleton />;
  }

  return (
    <div>
      <ProfileEdit userProfile={userProfile.result} />
    </div>
  );
}
