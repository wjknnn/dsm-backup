import { getFeedbackComment } from '@/apis';
import { Send } from '@/assets';
import { isSined, relativeTime } from '@/utils';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useState } from 'react';
import DOMPurify from 'dompurify';
import { userIdStore } from '@/store/userId';
import { useRouter } from 'next/navigation';

export const FeedbackComment = ({
  id,
  setCommentCnt,
  answer = false,
}: {
  id: string;
  setCommentCnt: Dispatch<SetStateAction<number>>;
  answer?: boolean;
}) => {
  const [comment, setComment] = useState<string>('');
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['feedback comment', id, answer],
    queryFn: () => getFeedbackComment(id, answer),
    staleTime: 1000 * 10,
  });

  const router = useRouter();
  const { userId } = userIdStore();
  const supabase = createClient();

  const commentRegister = async () => {
    if (!userId && !alert('로그인 후 댓글을 작성해 보세요.')!) return;
    const feedbackC = { comment: comment, writer: userId, feedback: +id };
    const answerC = { comment: comment, writer: userId, answer: +id };
    const { error } = await supabase
      .from('feedback_comment')
      .insert(answer ? answerC : feedbackC);

    if (error) console.log(error);
    else {
      setComment('');
      setCommentCnt((prev) => prev + 1);
      refetch();
    }
  };

  const commentHandler = async (writer: string, commentId: number) => {
    if (userId === writer) {
      if (!confirm('댓글을 삭제하실건가요?')) return;
      if (!isSined('로그인 후 댓글을 삭제해 보세요.')) return;
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
          onClick={() => {
            if (!userId && !alert('로그인 후 댓글을 작성해 보세요.')!)
              router.push('/login');
          }}
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
              comment.length < 6
                ? 'text-grayLight1 dark:text-grayDark15'
                : 'text-black dark:text-white'
            }`}
          >
            <Send />
          </button>
        </div>
      </div>
      {data && data.length > 0 && (
        <section className="flex flex-col">
          {data.map((value, index) => (
            <div key={value.id} className="flex flex-col">
              <article className="flex flex-col gap-2 py-4">
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
                    __html: DOMPurify.sanitize(
                      value.comment.replaceAll('\n', '<br>')
                    ),
                  }}
                  className="text-grayDark3 dark:text-grayLight2 text-bodyLarge"
                />
              </article>
              {data.length > index + 1 && (
                <div className="bg-grayLight2 dark:bg-grayDark2 h-[1px]"></div>
              )}
            </div>
          ))}
        </section>
      )}
    </section>
  );
};
