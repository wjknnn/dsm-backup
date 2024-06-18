import { getFeedbackAnswer } from '@/apis';
import { Pen } from '@/assets';
import { Button } from '@/components';
import { useQuery } from '@tanstack/react-query';
import { Answer } from './Answer';
import { getCookie } from '@/utils';

export const FeedbackAnswer = ({
  id,
  writer,
}: {
  id: string;
  writer: string;
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['feedback answer', id],
    queryFn: () => getFeedbackAnswer(id),
  });

  const userId = getCookie('userId') || '';

  return (
    <>
      {data && (
        <section className="flex flex-col gap-10">
          {writer !== userId && (
            <div className="flex p-8 sm:p-4 justify-between items-center bg-grayLight2 dark:bg-grayDark2 border border-grayLight1 dark:border-grayDark15 rounded-[18px]">
              <div className="flex items-center gap-4 sm:gap-3">
                <div className="p-[14px] bg-white dark:bg-grayDark3 border rounded-full border-grayLight1 dark:border-grayDark15">
                  <Pen />
                </div>
                <div className="flex flex-col gap-1 sm:gap-0">
                  <p className="text-subtitle sm:text-bodyLarge2">
                    {data && data.length > 0
                      ? '추가 정보를 제공해 보세요.'
                      : '아직 등록된 답변이 없어요'}
                  </p>
                  <p className="text-body2">디자인 정보를 공유해 주세요.</p>
                </div>
              </div>
              <Button size="small">답변하기</Button>
            </div>
          )}
          {data.length > 0 && (
            <section className="flex flex-col gap-4">
              <p className="text-title">{data.length} 개 답변</p>
              {data.map((answer) => (
                <Answer key={answer.id} answer={answer} userId={userId} />
              ))}
            </section>
          )}
        </section>
      )}
    </>
  );
};
