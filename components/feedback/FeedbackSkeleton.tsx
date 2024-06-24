'use client';

export const FeedbackCommentSkeleton = () => {
  return [...new Array(3)].map((_, index) => (
    <div key={index} className="flex flex-col animate-pulse">
      <div className="flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between">
          <div className="w-[100px] h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
          <div className="w-8 h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        </div>
        <div className="w-[60%] h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
      </div>
      {index >= 3 && (
        <div className="bg-grayLight2 dark:bg-grayDark2 h-[1px]"></div>
      )}
    </div>
  ));
};

export const FeedbackSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="w-20 h-8 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-[60%] sm:w-[80%] h-[52px] rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-[32%] sm:w-[52%] h-10 rounded-full bg-grayLight2 dark:bg-grayDark2"></div>
      </div>
      <div className="flex flex-col gap-1 pb-6 animate-pulse">
        <div className="w-full h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-[50%] h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-[80%] h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2 mb-3"></div>
        <div className="w-[90%] h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-full h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-[20%] h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-[60%] h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="w-full h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
      </div>
      <div className="flex gap-[6px] pb-6 items-center flex-wrap animate-pulse">
        {[...new Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-32 h-10 rounded-full bg-grayLight2 dark:bg-grayDark2"
          ></div>
        ))}
      </div>
      <div className="flex justify-between animate-pulse">
        <div className="w-[70px] h-12 rounded-full bg-grayLight2 dark:bg-grayDark2"></div>
        <div className="flex items-center gap-1">
          <div className="rounded-full size-12 bg-grayLight2 dark:bg-grayDark2"></div>
          <div className="rounded-full size-12 bg-grayLight2 dark:bg-grayDark2"></div>
        </div>
      </div>
    </>
  );
};

export const FeedbackListSkeleton = () => {
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
