"use client";

import { Button } from "@/components/ui/button";
import CheckIcon from "@/components/ui/CheckIcon";
import { usePlanMutation } from "../_hooks/usePlanMutation";
import { LoadingButton } from "@/components/ui/loading-button";

export default function PlanCard({
  title,
  price,
  description,
  buttonLabel,
  buttonDisabled,
  benefits,
  animationDelay,
}: {
  title: string;
  price: string;
  description: string;
  buttonLabel: string;
  buttonDisabled: boolean;
  benefits: string[];
  animationDelay: string;
}) {
  const { mutate, isPending } = usePlanMutation();

  const handleButtonClick = () => {
    if (title === "Pro" && !buttonDisabled) {
      mutate("PRO");
    }
  };

  return (
    <div
      className={`flex flex-col shadow-lg p-6 border border-gray-200 rounded-lg w-80 h-96
      animate-flip-in`}
      style={{ animationDelay }}
    >
      <div className="text-3xl font-semibold">{title}</div>
      <div className="mt-4 text-sm">
        <span className="text-4xl font-bold">{price}</span>원
        <div className="text-sm text-right text-gray-400">한 달 기준</div>
      </div>
      <div className="mt-4">{description}</div>
      <LoadingButton
        loading={isPending}
        className={`w-full mt-4 ${
          buttonDisabled
            ? "cursor-not-allowed bg-gray-100 hover:bg-gray-100 text-gray-400"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        } rounded-full`}
        onClick={handleButtonClick}
      >
        {buttonLabel}
      </LoadingButton>
      <ul className="mt-4 space-y-2 text-sm list-none font-semibold">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
