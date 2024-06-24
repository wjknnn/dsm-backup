'use client';

export const TopicSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 px-10 sm:px-4 animate-pulse">
        <div className="bg-grayLight2 dark:bg-grayDark2 rounded-lg w-[120px] h-[36px]"></div>
        <div className="flex flex-col items-center lg:px-4 h-[104px] w-full gap-[12px]">
          <div className="w-full h-full rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
          <div className="w-[80%] h-full bg-grayLight2 dark:bg-grayDark2 rounded-lg"></div>
        </div>
      </div>
      <article className="w-full h-[490px] sm:h-[430px] rounded-[18px] bg-grayLight2 dark:bg-grayDark2 animate-pulse"></article>
    </>
  );
};

export const TopicListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="flex justify-center w-full p-5 rounded-2xl bg-grayLight2 dark:bg-grayDark2">
        <div className="w-full h-auto aspect-[4/3]"></div>
      </div>
      <div className="flex flex-col flex-1 gap-2 px-1">
        <div className="w-full h-12 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-32 h-5 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
      </div>
    </div>
  );
};
