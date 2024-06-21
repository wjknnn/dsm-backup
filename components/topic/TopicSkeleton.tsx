'use client';

export const TopicSkeleton = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-x-4 gap-y-8 animate-pulse">
      {[...new Array(20)].map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex justify-center w-full p-5 rounded-2xl bg-grayLight2 dark:bg-grayDark2">
            <div className="w-full h-auto aspect-[4/3]"></div>
          </div>
          <div className="flex flex-col flex-1 gap-2 px-1">
            <div className="w-full h-12 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
            <div className="w-32 h-5 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
