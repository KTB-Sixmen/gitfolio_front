"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "../_constants/constans";
import { useUnsubscribeMutation } from "../_hooks/useUnsubscribeMutation";

// FAQ 섹션 컴포넌트
export default function FAQSection() {
  const { mutate } = useUnsubscribeMutation();

  return (
    <div className="z-20 flex flex-col items-center justify-center w-full py-20 bg-white px-14 space-y-2">
      <div className="mb-4 text-2xl font-extrabold text-blue-950">
        사용권 활용 및 환불안내
      </div>
      <div className="w-full px-20 text-blue-950">
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
              <AccordionContent className="font-medium text-gray-600">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div
        onClick={() => mutate()}
        className="flex w-full justify-end underline text-gray-500 font-light cursor-pointer"
      >
        <div>해지하기</div>
      </div>
    </div>
  );
}
