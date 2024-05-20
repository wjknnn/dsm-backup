import { FeedbackStatusType } from '@/types';

export const FeedbackChip = ({
  status,
  large,
}: {
  status: FeedbackStatusType;
  large?: boolean;
}) => {
  let statusStyle = '';

  if (status === '피드백 요청') {
    statusStyle =
      'bg-successBackground text-success dark:bg-success dark:bg-opacity-20';
  } else if (status === '논의중') {
    statusStyle =
      'bg-attentionBackground text-attention dark:bg-attention dark:bg-opacity-20';
  } else if (status === '해결됨') {
    statusStyle =
      'bg-grayLight2 text-grayDark1 dark:bg-grayDark1 dark:bg-opacity-20';
  }

  return (
    <div
      className={`w-fit ${
        large ? 'p-[4px_12px] text-bodyLarge2' : 'p-[2px_8px] text-bodyStrong'
      } rounded-lg ${statusStyle}`}
    >
      <p className="dark:brightness-150 text-nowrap">{status}</p>
    </div>
  );
};
