"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

type Props = {
  onDelete: (resumeId: string) => void;
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MyResumeDeleteModal({
  onDelete,
  resumeId,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent autoFocus>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            한번 삭제된 이력서는 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(resumeId);
              router.push("/myResume");
            }}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
