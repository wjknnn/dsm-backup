export const PopularFeedbackSkeleton = () => {
  return (
    <>
      {[...new Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center w-full animate-pulse"
        >
          <div className="flex flex-col w-full gap-2 px-6 py-3">
            <div className="flex flex-col gap-1">
              <div className="w-20 h-6 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
              <div className="w-48 h-6 rounded-lg bg-grayLight1 dark:bg-grayDark15"></div>
            </div>
            <div className="w-full h-10 rounded-lg bg-grayLight2 dark:bg-grayDark2"></div>
            <div className="w-16 h-5 rounded-lg bg-grayLight1 dark:bg-grayDark15"></div>
          </div>
          <div className="w-[calc(100%-48px)] bg-grayLight2 dark:bg-grayDark2 h-[1px]"></div>
        </div>
      ))}
    </>
  );
};
