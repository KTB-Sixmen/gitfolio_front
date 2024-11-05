"use client";

import Image from "next/image";
import NAMKI from "../../../../public/images/namki.jpeg";
import GITHUB_LOGO from "../../../../public/images/github-mark.png";
import { Separator } from "@/components/ui/separator";
import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";
import { Button } from "@/components/ui/button";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
// import html2pdf from "html2pdf.js";
import { toast } from "sonner";
import { PencilLine } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToggleStore } from "@/app/store/useToggleStore";

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = parseInt(params.resumeId);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const [messages, setMessages] = useState<string[]>(["이렇게 이렇게 바꿔줘"]);
  const [input, setInput] = useState("");
  const [selection, setSelection] = useState<string>(); // getSelection을 위한 상태
  const [position, setPosition] = useState<Record<string, number>>();
  const [selectedText, setSelectedText] = useState<string | null>(null);

  function onSelectStart() {
    setSelection(undefined);
  }

  function onMouseUp() {
    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      setSelection(undefined);
      return;
    }

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setSelection(text);
    setPosition({
      x: rect.left + rect.width / 2 - 44 / 2,
      y: rect.top + window.scrollY - 100,
      width: rect.width,
      height: rect.height,
    });
  }

  useEffect(() => {
    document.addEventListener("selectstart", onSelectStart);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("selectstart", onSelectStart);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const handlePopover = useCallback(() => {
    console.log(selection);
    setSelectedText(selection as string); // `selection`이 있을 때만 `selectedText`를 설정
  }, [selection]);

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, input]);
      setInput("");
      setSelection(undefined);
      setSelectedText(null);
    }
  }, [input]);

  return (
    <div className="relative w-full h-full">
      {selection && position && (
        <div
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          }}
          className="absolute top-0 left-0 w-[44px] h-[30px] "
        >
          <PencilLine
            onClick={handlePopover}
            className="flex items-center w-full h-full px-2 text-black bg-white border shadow-2xl rounded-3xl hover:bg-gray-100"
          />
        </div>
      )}

      <aside className="fixed top-[4rem] flex flex-col justify-between right-0 w-1/4 h-[calc(100vh-4rem)] p-4 border-l bg-white z-40 border-gray-300 shadow-lg">
        <div>
          <div className="mb-4 text-lg font-bold text-center">
            이력서 수정 채팅
          </div>
          <div className="flex-grow space-y-2 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className="p-2 text-white bg-blue-400 rounded-lg"
              >
                {message}
              </div>
            ))}
          </div>
        </div>

        {/* 선택한 텍스트와 입력창 */}
        <div className="flex flex-col items-center p-2 mt-2 space-y-2 bg-gray-100 rounded-lg">
          {selectedText && (
            <div className="w-full p-2 mb-2 text-black bg-white rounded-lg line-clamp-3">
              {selectedText}
            </div>
          )}

          <div className="flex items-center w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-grow p-2 bg-gray-100 border border-gray-300 border-none rounded-full focus-visible:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 text-white bg-blue-500 rounded-full"
            >
              전송
            </button>
          </div>
        </div>
      </aside>
      <div className="mr-[25%] items-center justify-center w-full h-full p-24 space-y-4 overflow-y-auto">
        <div
          ref={targetRef}
          className="border w-[1000px] border-gray-300 p-10 px-32 space-y-10"
        >
          <div className="flex flex-row">
            <div className="flex flex-col flex-grow">
              <div className="mb-4 text-5xl font-semibold">김남기</div>
              <div className="text-2xl">백엔드 개발자</div>
            </div>
            <div className="relative w-[228px] h-[228px]">
              {/* sdf */}
              <Image
                src={NAMKI}
                alt="프로필 이미지"
                priority
                fill
                className="object-cover rounded-lg "
              />
            </div>
          </div>
          {/* 자기소개 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">자기소개</div>
            <div>
              저는 끊임없이 ‘왜?’라는 질문을 던지며 문제 해결을 즐기고, 소통과
              협업을 통해 팀의 목표를 달성하는 데 기여하는 개발자입니다. <br />
              도전적인 환경에 빠르게 적응하고, 새로운 기술을 적극적으로 학습해
              성과를 창출하는 데 강점을 가지고 있습니다. 세 차례의 해커톤에서
              기획부터 프로젝트 완성까지의 전 과정을 경험하며 실전 감각을
              키웠습니다. 또한, Spring Cloud Netflix Eureka를 활용한 MSA
              환경에서 개발을 진행한 경험이 있으며, 커서 기반 페이지네이션을
              적용해 성능을 개선한 경험이 있습니다.
            </div>
          </div>
          {/* 경력 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">경력</div>
            <div className="text-lg font-semibold">야놀자</div>
            <div className="text-sm text-gray-400">
              <div>CX서비스실 | 백엔드 | 정규직</div>
              <div>2021.10 ~ (현재)</div>
            </div>
            <ul className="pl-6 space-y-2 list-disc">
              <li>백엔드 및 프론트엔드 전반에 관려</li>
              <li>백엔드 및 프론트엔드 전반에 관려</li>
              <li>백엔드 및 프론트엔드 전반에 관려</li>
              <li>백엔드 및 프론트엔드 전반에 관려</li>
              <li>백엔드 및 프론트엔드 전반에 관려</li>
            </ul>
          </div>
          {/* 프로젝트 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">프로젝트</div>
            <div className="text-xl font-semibold">ReBook</div>
            <div className="text-sm text-gray-400">
              <div>https://github.com/namkikima0718/rebook</div>
              <div>2021.10 ~ (현재)</div>
              <div>#Java #Spring #AWS S3 #Netflix Eureka #JPA</div>
            </div>
            <ul className="pl-6 space-y-2 list-disc">
              <li>상품 관리 시스템 개발</li>
              <ul className="pl-6 space-y-1 list-disc">
                <li>
                  상품 등록, 수정, 삭제 기능을 제공하여 판매자들이 손쉽게 상품을
                  관리할 수 있도록 구현
                </li>
                <li>
                  AWS S3를 활용해 상품 이미지 파일을 안정적으로 저장 및 관리
                </li>
              </ul>
              <li>사용자 중심의 상품 조회 기능 구현</li>
              <ul className="pl-6 space-y-1 list-disc">
                <li>
                  다양한 검색 필터 옵션을 제공해 사용자들이 원하는 상품을 빠르게
                  찾을 수 있도록 개선
                </li>
                <li>
                  페이지네이션 및 무한 스크롤을 적용해 조회 성능을 최적화하고,
                  페이지 로딩 시간을 단축하여 사용자 경험을 향상
                </li>
              </ul>
              <li>전역적인 예외 처리 시스템 구축</li>
              <ul className="pl-6 space-y-1 list-disc">
                <li>
                  일관된 에러 처리와 사용자 정의 예외를 통해 안정적인 서비스
                  제공
                </li>
                <li>
                  통일된 에러 메시지 포맷으로 사용자에게 명확한 응답 제공, 이를
                  통해 문제 해결 시간을 단축하고 신뢰성 향상
                </li>
              </ul>
              <li>실시간 채팅 기능 구현</li>
              <ul className="pl-6 space-y-1 list-disc">
                <li>
                  WebSocket과 STOMP를 사용해 사용자 간 실시간 양방향 소통을 지원
                </li>
                <li>
                  채팅방별 메시지 구독 및 발송 기능을 제공하여 실시간 대화
                  경험을 강화
                </li>
              </ul>
              <li>Redis 기반 메시지 브로드캐스팅 시스템 구축</li>
              <ul className="pl-6 space-y-1 list-disc">
                <li>
                  Redis Pub/Sub을 활용해 다중 서버 환경에서도 안정적으로 실시간
                  메시지를 전달
                </li>
                <li>
                  채팅방 구독 시스템을 통해 실시간 메시지의 빠르고 효율적인 전달
                  보장
                </li>
              </ul>
            </ul>
          </div>
          {/* 교육 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">교육</div>
            <div className="text-xl font-semibold">카카오 부트캠프</div>
            <div className="text-sm text-gray-400">
              <div>사설 교육 | 풀스택 과정</div>
              <div>2024.07 ~ 2024.12 | 재학 중</div>
            </div>
          </div>
          {/* 자격증 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">자격증</div>
            <div className="text-xl font-semibold">정보처리기사</div>
            <div className="text-sm text-gray-400">
              <div>실기합격 | 한국산업인력공단</div>
              <div>2024.07</div>
            </div>
          </div>
          {/* 기술스택 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">기술스택</div>
            <div>
              Java, Spring, Spring Boot, JPA, MySQL, MongoDB, React, JavaScript
            </div>
          </div>
          {/* 개인 링크 */}
          <Separator className="bg-black" />
          <div className="space-y-4">
            <div className="text-2xl font-semibold">개인 링크</div>
            <div className="flex items-center w-full p-2 space-x-2 border border-gray-400 rounded-md bg-gray-50">
              <div className="w-10 h-10 p-2">
                <Image src={GITHUB_LOGO} alt="logo" />
              </div>
              <div className="flex flex-col flex-1 space-y-1">
                <div className="text-sm font-semibold text-gray-600">
                  https://github.com/speardragon
                </div>
                <div className="font-semibold">깃허브</div>
              </div>
            </div>
          </div>
        </div>

        {/* </TextSelector> */}
        <Button
          onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
        >
          pdf로 저장
        </Button>
      </div>
    </div>
  );
}
