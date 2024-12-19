"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ArrowUp, EllipsisVertical, Sparkles, Trash2, X } from "lucide-react";
import {
  GraduationStatus,
  graduationStatusMap,
  PositionType,
  positionTypeMap,
  SchoolType,
  schoolTypeMap,
  WorkType,
  workTypeMap,
} from "@/app/types/type";
import { useCallback, useEffect, useRef, useState } from "react";
import { CornerDownRight } from "lucide-react";
import PdfDownloadButton from "./_components/PdfDownloadButton";
import Markdown from "react-markdown";
import { Switch } from "@/components/ui/switch";
import { useVisibility } from "./hooks/useVisibility";
import { useMyResumeDetailQuery } from "@/app/(home)/community/_hooks/useResumeQuery";
import ResumeComment from "@/app/(home)/community/resumes/[resumeId]/_components/resume-comment";
import MyResumeDetailSkeleton from "./_components/MyResumeDetailSkeleton";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useResumeAIPatchMutation } from "./hooks/useResumeAIPatchMutation";
import { LoadingButton } from "@/components/ui/loading-button";
import AIResumePatchDialog from "./_components/AIResumePatchDialog";
import useOpenDialogStore from "@/app/store/useDialogOpenStore";
import { handleIconChange } from "@/app/_lib/util";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import MyResumeDeleteModal from "./_components/MyResumeDeleteModal";
import { useMyResumeDeleteMutation } from "../_hooks/useMyResuemDeleteMutation";
import { useOnborda } from "onborda";
import { ResumeDetailContent } from "@/app/(home)/_components/ResumeDetailContent";
import Goorm from "./_components/Goorm";
import { useMyResumePatchMutation } from "./hooks/useMyResumePatchMutation";

type Props = {
  params: { resumeId: string };
};

export default function Page({ params }: Props) {
  const resumeId = params.resumeId;

  const router = useRouter();

  const { startOnborda } = useOnborda();
  const handleStartOnborda = useCallback(
    (tourName: string) => {
      if (startOnborda) {
        startOnborda(tourName);
      }
    },
    [startOnborda],
  );

  const { data: resume, error } = useMyResumeDetailQuery(resumeId);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [requirement, setRequirement] = useState("");
  const [selectedText, setSelectedText] = useState<string>("");
  const [isPopOver, setIsPopOver] = useState<boolean>(false);
  const [modifiedResume, setModifiedResume] = useState<any>(null);
  const [position, setPosition] = useState<Record<string, number>>();
  const [goormPosition, setGoormPosition] = useState<Record<string, number>>();

  const { open, setOpen } = useOpenDialogStore((state) => state);

  const popoverRef = useRef<HTMLDivElement>(null);

  const { visibility, handleToggleVisibility } = useVisibility(
    resume,
    resumeId,
  );

  const { mutate: deleteResume } = useMyResumeDeleteMutation();
  const { mutate, isPending } = useResumeAIPatchMutation(resumeId);

  const handleDelete = (id: string) => {
    deleteResume(id);
  };

  // 마우스를 떼었을 때 발생
  const onMouseUp = useCallback((event: MouseEvent) => {
    // 이벤트가 팝오버 버튼 내부에서 발생했는지 확인
    if (
      popoverRef.current &&
      popoverRef.current.contains(event.target as Node)
    ) {
      return;
    }

    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      setIsPopOver(false);
      return;
    }

    setSelectedText(text);

    const rect = activeSelection.getRangeAt(0).getBoundingClientRect();

    setIsPopOver(true);
    setPosition({
      x: rect.left + rect.width / 2 - 150,
      y: rect.top + window.scrollY - 20,
      width: rect.width,
      height: rect.height,
    });
    setGoormPosition({
      x: rect.left + rect.width / 2 - 150,
      y: rect.top + window.scrollY - 400,
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseUp]);

  useEffect(() => {
    if (error && (error as any).status === 403) {
      toast.error("접근 권한이 없습니다."); // Display error message
      router.push("/community"); // Redirect to /community
    }
  }, [error, router]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isOnboardaCompleted = localStorage.getItem("isOnboardaCompleted");

    if (
      resume && // resume 데이터가 존재할 때만
      (isOnboardaCompleted === "false" || isOnboardaCompleted === null)
    ) {
      // resume가 도착한 후 1초 뒤에 실행
      const timer = setTimeout(() => {
        handleStartOnborda("tour1");
      }, 1000); // 1초 (1000ms)

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }
  }, [resume, handleStartOnborda]);

  const handleSend = () => {
    if (!requirement.trim()) {
      toast.error("요구사항은 반드시 입력해야 합니다", {
        position: "top-right",
      });
      return;
    }

    const data = {
      selectedText,
      requirement,
    };
    console.log(data);

    mutate(data, {
      onSuccess: (result) => {
        setModifiedResume(result.result);
        setOpen(true);
      },
    });

    setIsPopOver(false);
    setSelectedText("");
    setRequirement("");
  };

  if (!resume) {
    return <MyResumeDetailSkeleton />;
  }

  return (
    <div className="relative flex justify-center w-full h-full p-24">
      {position && isPending && (
        <div
          className="z-50"
          style={{
            transform: `translate(${position.x - 40}px, ${position.y - 300}px)`,
          }}
        >
          <Goorm />
        </div>
      )}
      <AIResumePatchDialog
        open={open}
        setOpen={setOpen}
        resume={modifiedResume}
      />
      {isPopOver && (
        <div
          ref={popoverRef}
          style={{
            transform: `translate3d(${position?.x}px, ${position?.y}px, 0)`,
          }}
          className="absolute top-0 left-0 p-4 w-[300px] flex flex-col space-y-2 bg-white border border-gray-300 rounded-lg shadow-xl"
        >
          {selectedText && (
            <div className="relative flex items-center w-full mb-4 p-2 px-4 text-gray-500 bg-gray-100 rounded-lg">
              <span className="flex-grow text-sm line-clamp-2">{`"${selectedText}"`}</span>
            </div>
          )}
          <div className="relative flex items-center w-full">
            <input
              type="text"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              placeholder="AI에게 이력서 수정 요청하기"
              onKeyDown={(e: any) => {
                if (e.isComposing || e.keyCode === 229) return;
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className="flex w-full text-sm shadow-none transition-colors bg-transparent rounded-md placeholder:text-gray-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <LoadingButton
              loading={isPending}
              disabled={!requirement}
              onClick={handleSend}
              className="absolute w-6 h-8 right-0 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-full disabled:bg-gray-400"
            >
              <ArrowUp size={20} className="absolute" />
            </LoadingButton>
          </div>
        </div>
      )}

      <div className="flex flex-col max-w-[982px] w-full h-full">
        {/* 메인 콘텐츠 */}
        <main className="w-full items-center justify-center mx-auto">
          <div className="flex flex-col items-center justify-center w-full space-y-4">
            <div className="flex justify-end w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <EllipsisVertical size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>내 이력서 관리</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="py-4"
                      onClick={() => setDeleteModalOpen(true)}
                    >
                      내 이력서 삭제
                      <DropdownMenuShortcut>
                        <Trash2 size={18} color="red" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PdfDownloadButton resume={resume} />
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <MyResumeDeleteModal
              onDelete={handleDelete}
              resumeId={resumeId}
              open={deleteModalOpen}
              onOpenChange={setDeleteModalOpen}
            />
            <div
              id="tour1-step1"
              className="flex flex-row items-center w-full justify-between p-4 border rounded-lg"
            >
              <div className="space-y-0.5">
                <div className="text-base">공개 여부 설정</div>
                <div className="text-sm text-gray-400">
                  공개 여부에 체크하시면 커뮤니티에 회원님의 이력서가
                  공개됩니다!
                </div>
              </div>
              <Switch
                checked={visibility}
                onCheckedChange={() => handleToggleVisibility()}
              />
            </div>
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center justify-between gap-4 font-semibold text-blue-500 ">
                {(resume.result.tags && resume.result.tags.length > 0
                  ? resume.result.tags
                  : ["#기타"]
                ).map((tag, index) => (
                  <span key={index} className="font-bold text-blue-500">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 text-sm">
                <div className="flex items-center gap-1 p-2 border border-gray-300 rounded-full">
                  <FontAwesomeIcon color="gray" icon={faHeart} />
                  <div>{resume.result.likeCount}</div>
                </div>
                <div className="flex items-center gap-1 p-2 border rounded-full border-gray-3000">
                  <FontAwesomeIcon color="gray" icon={faEye} />
                  <div>{resume.result.viewCount}</div>
                </div>
              </div>
            </div>

            {/* 이력서 내용 */}
            <ResumeDetailContent resume={resume.result} />

            <div id="tour1-step3" className="flex w-full">
              <ResumeComment resumeId={resumeId} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
