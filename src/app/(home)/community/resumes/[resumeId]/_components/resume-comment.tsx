"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useResumeCommentQuery } from "../_hooks/useResumeComment";
import { useResumeCommentCreate } from "../_hooks/useResumeCommentCreate";
import { useState } from "react";
import { useResumeCommentDelete } from "../_hooks/useResumeCommentDelete";
import CommentDeleteModal from "./comment-delete-modal";
import { Button } from "@/components/ui/button";
import { useProfileQuery } from "@/app/(home)/onboarding/_hooks/useProfileQuery";
import ResumeCommentSkeleton from "./ResumeCommentSkeleton";
import { LoadingButton } from "@/components/ui/loading-button";

type Props = {
  resumeId: string;
};

export default function ResumeComment({ resumeId }: Props) {
  const [comment, setComment] = useState<string>("");

  const { data: comments, isLoading } = useResumeCommentQuery(resumeId);
  const { mutate, isPending } = useResumeCommentCreate(resumeId);
  const { mutate: deleteComment } = useResumeCommentDelete(resumeId);
  const { data: userProfile } = useProfileQuery();

  const onSubmit = () => {
    const data = {
      content: comment,
    };
    mutate({ data });
    setComment("");
  };
  const onDelete = (commentId: number) => {
    deleteComment(commentId);
  };

  if (isLoading) {
    return <ResumeCommentSkeleton />;
  }

  return (
    <div className="flex flex-col w-full h-full border rounded-lg">
      <div className="p-4 px-10 text-lg font-semibold text-white rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-200">
        댓글
      </div>
      <div className="flex flex-col w-full h-full">
        <div className="px-10 py-6">
          {comments?.result.length === 0 ? (
            <p className="text-center text-muted-foreground">
              등록된 댓글이 없습니다.
            </p>
          ) : (
            comments?.result.map((comment, index) => (
              <div className="flex flex-col" key={comment.id}>
                <div className="flex items-start w-full gap-3 p-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={comment.avatarUrl} alt="프로필 이미지" />
                    <AvatarFallback>
                      {comment.nickname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">
                        {comment.nickname}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date(comment.updatedAt),
                          "yyyy. MM. dd. HH:mm",
                        )}
                      </p>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                  {userProfile?.result.memberId === comment.memberId && (
                    <CommentDeleteModal
                      onDelete={onDelete}
                      commentId={comment.id}
                    />
                  )}
                </div>
                {index < comments.result.length - 1 && <Separator />}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between p-2 px-10 py-6 space-x-2">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 남겨주세요!"
            onKeyDown={(e: any) => {
              if (e.isComposing || e.keyCode === 229) return;
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
          />
          <LoadingButton
            loading={isPending}
            onClick={() => onSubmit()}
            className="p-2 px-4 text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-400"
          >
            저장
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
