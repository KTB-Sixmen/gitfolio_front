import GITHUB_WHITE_LOGO from "../../../public/images/github-mark-white.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GithubButton() {
  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/github`;
  };

  return (
    <>
      <Button onClick={handleGithubLogin} className="flex gap-2">
        <Image
          alt="github_white_logo"
          src={GITHUB_WHITE_LOGO}
          width={20}
          height={20}
        />
        <div className="font-semibold">깃허브로 로그인하기</div>
      </Button>
    </>
  );
}
