'use client';

export const FeedbackSkeleton = () => {
  return (
    <>
      {[...new Array(10)].map((_, i) => (
        <article
          key={i}
          className="animate-pulse min-h-[200px] w-full flex sm:flex-col-reverse gap-16 sm:gap-4 p-[24px_0_32px]"
        >
          <div className="flex flex-col flex-1 gap-3 py-1">
            <div className="w-40 rounded-lg h-7 bg-grayLight1 dark:bg-grayDark1"></div>
            <div className="w-full h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
            <div className="flex gap-[6px]">
              {[...new Array(3)].map((_, index) => (
                <div
                  key={`tag-${index}`}
                  className="rounded-full w-14 h-7 bg-grayLight2 dark:bg-grayDark2"
                ></div>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="h-5 rounded w-14 bg-grayLight1 dark:bg-grayDark15"></div>
              <div className="w-20 h-5 rounded bg-grayLight1 dark:bg-grayDark15"></div>
            </div>
          </div>
          <div className="w-[256px] sm:w-full h-fit rounded-xl bg-grayLight2 dark:bg-grayDark2 aspect-video object-cover"></div>
        </article>
      ))}
    </>
  );
};
