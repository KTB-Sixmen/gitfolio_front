"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "moment/locale/ko";
import { useState } from "react";
import { useRepositoryQuery } from "../_hooks/useRepositoryQuery";
import { useAuthStore } from "@/app/store/useAuthStore";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { useResumeMutation } from "../_hooks/useResumeMutation";
import RepositorySkeleton from "./repository-skeleton";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Repository() {
  const { accessToken } = useAuthStore((state) => state);

  const [value, setValue] = useState<Option[]>([]);
  const [requirements, setRequirements] = useState<string>("");
  const [visibility, setVisibility] = useState<boolean>(false);

  const { data: repositories } = useRepositoryQuery();
  const { mutate } = useResumeMutation();

  if (!repositories) {
    return <RepositorySkeleton />;
  }

  const options: Option[] = repositories.result.map((repo) => ({
    label: repo.repoName,
    value: repo.repoUrl,
    topLanguage: repo.topLanguage,
    updatedAt: repo.updatedAt,
  }));

  const onSubmit = () => {
    if (value.length > 3) {
      alert("최대 3개까지만 선택할 수 있습니다.");
      return;
    }
    const data = {
      selectedRepo: value.map((repo) => repo.value),
      requirements: requirements,
      visibility: visibility ? "PUBLIC" : "PRIVATE",
    };
    mutate({ accessToken: accessToken!, data });
    // toast.message("You submitted the following values:", {
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  };

  const handleValueChange = (selectedOptions: Option[]) => {
    if (selectedOptions.length > 3) {
      alert("최대 3개까지만 선택할 수 있습니다.");
      const updatedOptions = [...selectedOptions];
      updatedOptions.pop();
      setValue(updatedOptions);
      return;
    } else {
      setValue(selectedOptions);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full p-4 my-auto space-y-10">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-xl">깃허브 레파지토리 선택</CardTitle>
          <CardDescription className="text-lg">
            이력서에 넣고 싶은 프로젝트를 생성하기 위한 레파지토리를
            선택해주세요(최대 3개)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full space-y-4">
          <MultipleSelector
            className=""
            hidePlaceholderWhenSelected
            value={value}
            onChange={handleValueChange}
            defaultOptions={options}
            placeholder="원하는 레포지토리를 최대 3개까지 선택해주세요."
            emptyIndicator={
              <p className="text-lg leading-10 text-center text-gray-600 dark:text-gray-400">
                레포지토리가 존재하지 않습니다.
              </p>
            }
          />
          <Input
            type="text"
            placeholder="더 나은 이력서를 만들기 위한 요청사항을 입력해주세요."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="w-full rounded-md"
          />
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="text-base">공개 여부 설정</div>
              <div className="text-sm text-gray-400">
                공개 여부를 체크하시면 커뮤니티에 회원님의 이력서가 공개됩니다!
              </div>
            </div>
            <Switch checked={visibility} onCheckedChange={setVisibility} />
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-400 w-full"
      >
        이력서 만들러 가기
      </Button>
      <Link className="text-gray-400 underline" href={"/community"}>
        이력서 등록 하지 않고 커뮤니티로 이동
      </Link>
    </div>
  );
}
