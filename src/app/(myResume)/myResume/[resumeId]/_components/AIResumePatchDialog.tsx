import { ResumeDetail } from "@/app/(home)/community/_hooks/useResumeQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMyResumePatchMutation } from "../hooks/useMyResumePatchMutation";
import { ResumeDetailContent } from "@/app/(home)/_components/ResumeDetailContent";

type Props = {
  open: boolean;
  setOpen: (item: boolean) => void;
  resume: ResumeDetail;
};

export default function AIResumePatchDialog({ open, setOpen, resume }: Props) {
  const { mutate } = useMyResumePatchMutation(resume?.resumeId);

  const handleSubmit = async () => {
    const formData = new FormData();

    const updateResumeRequestDTO = resume;

    formData.append(
      "updateResumeRequestDTO",
      new Blob([JSON.stringify(updateResumeRequestDTO)], {
        type: "application/json",
      }),
    );

    mutate({ data: formData, isAiFixed: "true" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[60%] max-h-[600px] overflow-y-auto p-0">
        <DialogHeader className="relative flex flex-col items-center justify-center w-full p-2">
          <DialogTitle className="text-2xl text-gray-800">
            AI 수정 결과
          </DialogTitle>
          <DialogDescription className="">
            AI가 수정한 이력서 내용입니다. 아래 내용을 확인하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="p-10 py-4">
          <div className="flex w-full justify-evenly mb-4">
            <Button
              onClick={() => setOpen(false)}
              className="text-red-500 bg-white border border-red-500 hover:bg-gray-100"
            >
              취소하기
            </Button>
            <Button
              onClick={() => {
                handleSubmit();
              }}
              className="bg-blue-500 hover:bg-blue-700"
            >
              변경하기
            </Button>
          </div>
          {resume ? (
            <ResumeDetailContent resume={resume} />
          ) : (
            <div className="text-gray-500">
              로딩 중이거나 데이터가 없습니다.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
