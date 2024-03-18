import BackupFullLogo from "@/assets/BackupFullLogo";
import Link from "next/link";
import AuthButton from "./AuthButton";
import { ThemeButton } from "./ThemeButton";

const link = [
  { name: "피드백", link: "/feedback" },
  { name: "토픽", link: "/topic" },
  { name: "레퍼런스", link: "/reference" },
  { name: "팁 저장소", link: "/tip" },
];

export const Navigator = ({ connected }: { connected?: boolean }) => {
  return (
    <nav className="h-[80px] w-full flex justify-center border-b border-grayLight1 dark:border-grayDark2 z-50 sticky top-0 bg-white dark:bg-grayDark3">
      <div className="max-w-[1200px] w-full flex justify-between">
        <div className="flex items-center gap-[40px]">
          <BackupFullLogo
            width={109}
            height={40}
            className="text-black dark:text-white"
          />
          <div className="flex gap-[32px]">
            {link.map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                className="text-bodyLarge text-grayDark1 hover:text-black dark:hover:text-white"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-[24px] items-center">
          <AuthButton />
          {connected && (
            <>
              <Link
                href="/login"
                className="rounded-full flex p-[8px_24px] bg-black dark:bg-white text-white dark:text-black"
              >
                로그인
              </Link>
              <Link
                href="/login"
                className="text-bodyLarge text-black dark:text-white"
              >
                회원가입
              </Link>
            </>
          )}
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};
