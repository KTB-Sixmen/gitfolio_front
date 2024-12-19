"use client";

import PlanCard from "./PlanCard";
import Image from "next/image";
import imgGreenBlur from "../../../../../public/images/imgGreenBlur.png";
import imgVioletBlur from "../../../../../public/images/imgVioletBlur.png";
import { PLANS } from "../_constants/constans";
import { useProfileQuery } from "../../onboarding/_hooks/useProfileQuery";
import FAQSection from "./FAQSection";

// 블러 이미지
function BackgroundBlur() {
  return (
    <>
      <Image
        src={imgGreenBlur}
        alt="Blur effect image 1"
        className="absolute w-1/3 -bottom-48 -left-40"
        width={916}
        height={916}
      />
      <Image
        src={imgVioletBlur}
        alt="Blur effect image 2"
        className="absolute w-1/3 -top-10 -right-40"
        width={916}
        height={916}
      />
    </>
  );
}

export default function Plan() {
  const { data: userProfile } = useProfileQuery();

  return (
    <>
      <div className="relative z-10 flex flex-col w-full p-10 overflow-hidden bg-gradient-to-br">
        <BackgroundBlur />
        <div className="text-2xl font-bold grid grid-cols-[1fr_auto_1fr] px-6 py-4 md:pb-10 md:pt-[4.5rem]">
          <div></div>
          <div>
            플랜 업그레이드로 <span className="text-blue-600">깃트폴리오</span>
            의 더 다양한 기능을 이용해보세요!
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full md:flex-row md:space-x-6">
          {PLANS.map((plan) => {
            const isProPlan = plan.title === "Pro";
            const isFreePlan = plan.title === "Free";
            const isCurrentPlanPro = userProfile?.result?.paidPlan === "PRO";
            return (
              <PlanCard
                key={plan.title}
                {...plan}
                buttonLabel={
                  isFreePlan
                    ? "무료 플랜"
                    : isProPlan && isCurrentPlanPro
                    ? "현재 나의 플랜"
                    : plan.buttonLabel
                }
                buttonDisabled={isFreePlan || (isProPlan && isCurrentPlanPro)}
              />
            );
          })}
        </div>
      </div>
      <FAQSection />
    </>
  );
}
