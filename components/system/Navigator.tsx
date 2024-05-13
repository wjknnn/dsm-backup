import Link from 'next/link';
import { AuthButton } from '..';
import { BackupFullLogo } from '@/assets';

const link = [
  { name: '피드백', link: '/feedback' },
  { name: '토픽', link: '/topic' },
  { name: '레퍼런스', link: '/reference' },
  { name: '팁 저장소', link: '/tip' },
];

export const Navigator = () => {
  return (
    <nav className="h-[80px] sm:h-[120px] sm:gap-[16px] sm:flex-col sm:items-center w-full flex justify-center border-b border-grayLight1 dark:border-grayDark2 z-50 sticky top-0 bg-white dark:bg-grayDark3">
      <div className="max-w-[1280px] px-[40px] sm:px-[24px] w-full flex justify-between">
        <div className="flex items-center gap-[40px]">
          <Link href="/" aria-label="Go to home" className="z-[110]">
            <BackupFullLogo
              width={109}
              height={40}
              className="text-black dark:text-white"
            />
          </Link>
          <div className="flex gap-[32px] sm:hidden">
            {link.map(({ name, link }) => (
              <Link
                key={name}
                href={link}
                aria-label={`Go to ${name}`}
                className="text-bodyLarge text-grayDark1 hover:text-black dark:hover:text-white z-[110]"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-[24px] items-center">
          <AuthButton />
        </div>
      </div>
      <div
        id="navList"
        className="flex gap-[32px] lg:hidden md:hidden max-w-[1280px] px-[24px] w-full sm:overflow-x-scroll"
      >
        <div className="absolute left-0 w-full md:hidden lg:hidden">
          <div className="absolute left-0 w-6 h-6 bg-gradient-to-r dark:from-grayDark3 from-white"></div>
          <div className="absolute right-0 w-6 h-6 bg-gradient-to-l dark:from-grayDark3 from-white"></div>
        </div>
        {link.map(({ name, link }) => (
          <Link
            key={name}
            href={link}
            aria-label={`Go to ${name}`}
            className="text-bodyLarge text-grayDark1 hover:text-black dark:hover:text-white text-nowrap"
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
