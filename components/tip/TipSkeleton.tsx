export const TipListSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-3 animate-pulse">
      <div className="w-full aspect-video rounded-2xl bg-grayLight2 dark:bg-grayDark2"></div>
      <div className="flex flex-col gap-2 px-1">
        <h6 className="w-[40%] h-7 rounded-lg bg-grayLight2 dark:bg-grayDark2"></h6>
        <p className="w-[70%] h-5 rounded-lg bg-grayLight2 dark:bg-grayDark2"></p>
      </div>
    </div>
  );
};
