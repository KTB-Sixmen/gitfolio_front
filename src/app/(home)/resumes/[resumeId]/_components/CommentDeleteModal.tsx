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
  onDelete: (commentId: number) => void;
  commentId: number;
};

export default function CommentDeleteModal({ onDelete, commentId }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className="w-6 h-6 text-red-500 rounded cursor-pointer hover:bg-gray-200 hover:bg-opacity-50" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            한번 삭제된 댓글은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500"
            onClick={() => onDelete(commentId)}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
