import Repository from "@/app/(home)/onboarding/repositories/_components/repository";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="mt-10 text-2xl font-bold">
        새 이력서 생성을 위한 레파지토리 선택
      </div>
      <Repository />
    </div>
  );
}
