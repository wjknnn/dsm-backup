"use client";

import { Arrow, Logout, Setting } from "@/assets";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const List = ({
  children,
  link,
}: {
  children?: React.ReactNode;
  link: string;
}) => (
  <Link
    href={link}
    className="flex items-center gap-[12px] p-[8px_12px] rounded-[12px] hover:bg-grayLight2 dark:hover:bg-grayDark2"
  >
    {children}
  </Link>
);

export const ProfileModal = ({
  email,
  name,
  logOut,
}: {
  email?: string;
  name?: string;
  logOut?: () => Promise<never>;
}) => {
  const router = useRouter();
  const show = useSearchParams().get("show");

  return (
    show && (
      <div
        onClick={() => router.back()}
        className="fixed top-0 left-0 w-full h-full z-[100]"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute animate-in bg-white dark:bg-grayDark3 top-[64px] right-[40px] lg:right-[calc((100%-1200px)/2)] w-[280px] rounded-[16px] border border-grayLight1 dark:border-grayDark2 p-[8px] gap-[2px] flex flex-col shadow-[0_8px_24px_0_rgba(0,0,0,0.12)] items-stretch"
        >
          <List link="/users">
            <div className="size-[36px] rounded-full bg-grayLight1 dark:bg-black border border-grayLight1 dark:border-grayDark15"></div>
            <div className="flex flex-col gap-[2px] flex-1">
              <p className="text-bodyLarge">{name || "Unknown User"}</p>
              <p className="text-body text-grayDark1">
                {email || "이메일이 없네요"}
              </p>
            </div>
            <Arrow className="rotate-180 text-grayDark1" size={18} />
          </List>
          <hr className="border-grayLight1 dark:border-grayDark2 m-[8px]" />
          <List link="/settings">
            <div className="size-[36px] rounded-[8px] border border-grayLight1 dark:border-grayDark15 flex justify-center items-center">
              <Setting size={20} className="text-grayDark1" />
            </div>
            <p className="text-body2">설정</p>
          </List>
          <form action={logOut}>
            <button className="flex items-center gap-[12px] p-[8px_12px] rounded-[12px] hover:bg-grayLight2 dark:hover:bg-grayDark2 w-full">
              <div className="size-[36px] rounded-[8px] border border-grayLight1 dark:border-grayDark15 flex justify-center items-center">
                <Logout size={20} className="text-grayDark1" />
              </div>
              <p className="text-body2">로그아웃</p>
            </button>
          </form>
        </div>
      </div>
    )
  );
};
