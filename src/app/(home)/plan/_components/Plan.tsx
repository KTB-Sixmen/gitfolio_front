"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PlanCard from "./PlanCard";
import Image from "next/image";
import imgGreenBlur from "../../../../../public/images/imgGreenBlur.png";
import imgVioletBlur from "../../../../../public/images/imgVioletBlur.png";
import { FAQ_ITEMS, PLANS } from "../_constants/constans";
import { useProfileQuery } from "../../onboarding/_hooks/useProfileQuery";

// 블러 이미지
function BackgroundBlur() {
  return (
    <>
      <Image
        src={imgGreenBlur}
        alt="Blur effect image 1"
        className="absolute -bottom-48 -left-40 w-1/3"
        width={916}
        height={916}
      />
      <Image
        src={imgVioletBlur}
        alt="Blur effect image 2"
        className="absolute -top-10 -right-40 w-1/3"
        width={916}
        height={916}
      />
    </>
  );
}

// FAQ 섹션 컴포넌트
function FAQSection() {
  return (
    <div className="flex flex-col justify-center items-center w-full px-14 py-20 z-20 bg-white">
      <div className="text-2xl font-extrabold text-blue-950 mb-4">
        사용권 활용 및 환불안내
      </div>
      <div className="w-full min-w text-blue-950">
        <Accordion
          defaultValue={FAQ_ITEMS.map((item) => item.id)}
          type="multiple"
          className="w-full"
        >
          {FAQ_ITEMS.map(({ id, question, answer }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger className="flex justify-start gap-2 text-lg font-semibold">
                <div className="text-blue-600">Q.</div>
                <div>{question}</div>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 font-medium">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default function Plan() {
  const { data: userProfile } = useProfileQuery();

  return (
    <>
      <div className="relative flex flex-col w-full p-10 bg-gradient-to-br z-10 overflow-hidden">
        <BackgroundBlur />
        <div className="text-2xl font-bold grid grid-cols-[1fr_auto_1fr] px-6 py-4 md:pb-10 md:pt-[4.5rem]">
          <div></div>
          <div>
            플랜 업그레이드로 <span className="text-blue-600">깃트폴리오</span>
            의 더 다양한 기능을 이용해보세요!
          </div>
        </div>
        <div className="flex justify-center w-full space-x-6">
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
