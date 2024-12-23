import Image from "next/image";
import GITFOLIO_LOGO from "../../../../public/images/gitfolio-logo.png";

export function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center border-t border-border/40 py-6 dark:border-border md:px-8 md:py-2">
      <div className="container flex flex-col gap-2 md:h-auto">
        <div className=" flex flex-col text-left p-4">
          <p className="flex justify-center gap-1 text-balance text-sm leading-loose text-muted-foreground">
            <Image
              className="w-36 object-contain mr-4"
              src={GITFOLIO_LOGO}
              alt="logo"
            />
            Built by{" "}
            <a
              href={"/#"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {" "}
              gitfolio
            </a>
            . The source code is available on{" "}
            <a
              href={"https://github.com/KTB-Sixmen"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
            <a
              href={`${process.env.NEXT_PUBLIC_SERVICE_URL}/terms-of-service`}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              이용 약관
            </a>
          </p>
        </div>
      </div>
      <div className="container mt-6 text-center text-xs leading-loose text-muted-foreground ">
        <p>
          깃트폴리오 | 대표 : 강창룡 | 개인정보보호책임자 : 김윤섭 |
          사업자등록번호 : 000-00-0000
        </p>
        <p>경기도 성남시 분당구 판교로660 유스페이스1 4층</p>
        <p>@Gitfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
