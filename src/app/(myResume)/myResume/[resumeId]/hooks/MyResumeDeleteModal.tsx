import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

type Props = {
  onDelete: (resumeId: string) => void;
  resumeId: string;
};

export default function MyResumeDeleteModal({ onDelete, resumeId }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 방지
        }}
      >
        <Trash2 className="absolute top-4 right-4 w-6 h-6 text-red-500 rounded cursor-pointer hover:bg-gray-200 hover:bg-opacity-50" />
      </AlertDialogTrigger>
      <AlertDialogContent>
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
            }}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
