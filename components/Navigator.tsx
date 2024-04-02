import Link from "next/link";
import { AuthButton, ThemeButton } from ".";
import { BackupFullLogo } from "@/assets";

const link = [
  { name: "피드백", link: "/feedback" },
  { name: "토픽", link: "/topic" },
  { name: "레퍼런스", link: "/reference" },
  { name: "팁 저장소", link: "/tip" },
];

export const Navigator = () => {
  return (
    <nav className="h-[80px] sm:h-[120px] sm:gap-[16px] sm:flex-col sm:items-center w-full flex justify-center border-b border-grayLight1 dark:border-grayDark2 z-50 sticky top-0 bg-white dark:bg-grayDark3">
      <div className="max-w-[1280px] px-[40px] sm:px-[24px] w-full flex justify-between">
        <div className="flex items-center gap-[40px]">
          <Link href="/" className="z-[110]">
            <BackupFullLogo
              width={109}
              height={40}
              className="text-black duration-200 dark:text-white"
            />
          </Link>
          <div className="flex gap-[32px] sm:hidden">
            {link.map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                className="text-bodyLarge text-grayDark1 hover:text-black dark:hover:text-white z-[110]"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-[24px] items-center">
          <AuthButton />
          <ThemeButton />
        </div>
      </div>
      <div className="flex gap-[32px] lg:hidden md:hidden max-w-[1280px] px-[24px] w-full">
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
    </nav>
  );
};
