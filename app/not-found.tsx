import { BrokenFile } from "@/assets";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-[24px] w-full flex-1 pt-[160px] sm:pt-[80px]">
      <div className="w-[128px] h-[128px] rounded-[16px] bg-grayLight2 flex justify-center items-center border border-grayLight1 dark:bg-grayDark2 dark:border-grayDark15">
        <BrokenFile size={40} className="text-grayDark2 dark:text-grayLight1" />
      </div>
      <div className="flex flex-col items-center pb-[12px] gap-[8px]">
        <p className="text-center text-title text-grayDark2 dark:text-grayLight1">
          요청하신 페이지를
          <br />
          찾을 수 없어요.
        </p>
        <p className="text-bodyLarge text-grayDark1">404 Not Found</p>
      </div>
      <Link
        href="/"
        className="rounded-full flex p-[8px_24px] bg-black dark:bg-white text-white dark:text-black"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
