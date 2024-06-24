'use client';

import { Arrow, Logout, Setting } from '@/assets';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeButton } from './ThemeButton';
import Image from 'next/image';
import { UserType } from '@/types';

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
  user,
  logOut,
}: {
  user: UserType;
  logOut?: () => Promise<never>;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="w-[40px] h-[40px] rounded-full bg-grayLight2 border border-grayLight1 dark:bg-grayDark2 dark:border-grayDark2 overflow-hidden cursor-pointer"
      >
        <Image
          src={user.profile_image || '/images/DefaultProfile.png'}
          alt="profile image"
          width={40}
          height={40}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 w-full h-full z-[100]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute animate-in bg-white dark:bg-grayDark3 top-[64px] sm:right-[24px] right-[40px] lg:right-[calc((100%-1200px)/2)] w-[280px] rounded-[16px] border border-grayLight1 dark:border-grayDark2 p-[8px] gap-[2px] flex flex-col shadow-[0_8px_24px_0_rgba(0,0,0,0.12)] items-stretch z-[120]"
          >
            <List link="/users">
              <div className="size-[36px] rounded-full bg-grayLight2 dark:bg-grayDark2 border border-grayLight1 dark:border-grayDark2 overflow-hidden">
                <Image
                  src={user.profile_image || '/images/DefaultProfile.png'}
                  alt="profile image"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-[2px] flex-1">
                <p className="text-bodyLarge">{user.name}</p>
                <p className="text-body text-grayDark1">
                  {user.school_grade}학년
                </p>
              </div>
              <Arrow className="rotate-180 text-grayDark1" size={18} />
            </List>
            <hr className="border-grayLight1 dark:border-grayDark2 m-[8px]" />
            <List link="/setting">
              <div className="size-[36px] rounded-[8px] border border-grayLight1 dark:border-grayDark15 flex justify-center items-center">
                <Setting size={20} className="text-grayDark1" />
              </div>
              <p className="text-body2">설정</p>
            </List>
            <ThemeButton />
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
      )}
    </>
  );
};
