import { BackupLogo } from '@/assets';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 flex items-center justify-center w-full p-[40px] sm:p-[24px] border-t border-grayLight1 dark:border-grayDark2">
      <div className="flex flex-col items-center gap-[16px] sm:gap-[8px] h-fit">
        <BackupLogo size={32} />
        <div className="flex gap-[12px]">
          <Link href="terms" aria-label="Read service terms">
            <p className="text-bodyStrong">이용약관</p>
          </Link>
          <Link
            href="privacy"
            aria-label="Read policy about privacy information"
          >
            <p className="text-bodyStrong">개인정보취급방침</p>
          </Link>
        </div>
        <p className="text-body2 text-grayDark1">
          Github: wjknnn 이메일: winrightchoi@gmail.com
        </p>
        <p className="text-body2 text-grayDark1">
          © 2024 Backup All rights reserved.
        </p>
      </div>
    </footer>
  );
};
