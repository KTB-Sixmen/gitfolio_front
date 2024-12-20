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

type Props = {
  onDelete: () => void;
};

export default function MemberDeleteModal({ onDelete }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="underline cursor-pointer text-right text-gray-500">
          회원 탈퇴
        </div>
        {/* <Trash2 className="w-6 h-6 text-red-500 rounded cursor-pointer hover:bg-gray-200 hover:bg-opacity-50" /> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            한 번 탈퇴하면 모든 활동내역이 사라집니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={() => onDelete()}>
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
