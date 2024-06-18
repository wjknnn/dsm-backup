import { getFeedbackComment } from '@/apis';
import { Send } from '@/assets';
import { relativeTime } from '@/utils';
import { getUserId } from '@/utils/cookie/client';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';

export const FeedbackComment = ({
  id,
  setCommentCnt,
}: {
  id: string;
  setCommentCnt: Dispatch<SetStateAction<number>>;
}) => {
  const [comment, setComment] = useState<string>('');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['feedback comment', id],
    queryFn: () => getFeedbackComment(id),
  });

  const userId = getUserId();
  const router = useRouter();
  const supabase = createClient();

  const isSined = () => {
    if (!userId && !alert('로그인 후 댓글을 작성해 보세요.')!) {
      router.push('/login');
      return false;
    }
    return true;
  };

  const commentRegister = async () => {
    if (!isSined()) return;
    const { error } = await supabase
      .from('feedback_comment')
      .insert({ comment: comment, feedback: +id, writer: userId });

    if (error) console.log(error);
    else {
      setComment('');
      setCommentCnt((prev) => prev + 1);
      refetch();
    }
  };

  const commentHandler = async (writer: string, commentId: number) => {
    if (userId === writer) {
      if (!isSined()) return;
      const { error } = await supabase
        .from('feedback_comment')
        .delete()
        .eq('id', commentId);

      if (error) console.log(error);
      else {
        setCommentCnt((prev) => (prev > 0 ? prev - 1 : prev));
        refetch();
      }
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 p-6 rounded-[18px] border border-grayLight1 dark:border-grayDark15">
        <textarea
          value={comment}
          onClick={isSined}
          onChange={(e) => setComment(e.currentTarget.value)}
          className="resize-none min-h-[120px] h-fit focus:outline-none bg-transparent"
          placeholder="게시글에 관련된 자신의 의견을 작성해 보세요.."
          maxLength={1000}
        />
        <div className="flex items-center justify-between">
          <span className="text-grayDark1 text-bodyLarge">
            <span className="text-black dark:text-white">{comment.length}</span>{' '}
            / 1000
          </span>
          <button
            onClick={commentRegister}
            disabled={comment.length < 6}
            className={`${
              comment.length < 6 ? 'text-grayLight1' : 'text-black'
            }`}
          >
            <Send />
          </button>
        </div>
      </div>
      {data && (
        <section className="flex flex-col">
          {data.map((value, index) => (
            <>
              <article key={value.id} className="flex flex-col gap-2 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-bodyLarge">
                    <p className="text-grayDark2 dark:text-grayLight1 text-bodyLarge2">
                      {value.users.name}
                    </p>
                    <div className="rounded-sm size-1 bg-grayLight1 dark:bg-grayDark15"></div>
                    <p className="text-grayDark1 dark:text-grayBase">
                      {value.created_at && relativeTime(value.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => commentHandler(value.writer, value.id)}
                    className="text-bodyLarge text-grayDark1 dark:text-grayBase"
                  >
                    {userId === value.writer ? '삭제' : '신고'}
                  </button>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: value.comment.replaceAll('\n', '<br>'),
                  }}
                  className="text-grayDark3 dark:text-grayLight2 text-bodyLarge"
                />
              </article>
              {data.length > index + 1 && (
                <div className="bg-grayLight2 dark:bg-grayDark2 h-[1px]"></div>
              )}
            </>
          ))}
        </section>
      )}
    </section>
  );
};
