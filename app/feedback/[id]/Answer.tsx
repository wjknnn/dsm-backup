import { Chat, Heart, HeartLine, More } from '@/assets';
import { MoreSelect, useSelect } from '@/components';
import { FeedbackAnswerType } from '@/types';
import { relativeTime } from '@/utils';
import useMoonerDown from '@/utils/editor/hook/useMoonerDown';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const Answer = ({
  answer,
  userId,
}: {
  answer: FeedbackAnswerType;
  userId: string;
}) => {
  const [showComment, setShowComment] = useState<boolean>(false);
  const [heart, setHeart] = useState<string[]>(answer.like);

  const router = useRouter();
  const supabase = createClient();
  const { Result } = useMoonerDown(answer.content);
  const { modal, toggleModal } = useSelect<'share' | 'more'>();

  const heartHandler = async () => {
    if (userId === '' && !alert('로그인 후 이용해 주세요.')!) {
      router.push('/login');
      return;
    }
    const editedHeart = heart.includes(userId)
      ? heart.filter((value) => value !== userId)
      : [...heart, userId];

    setHeart(editedHeart);

    const { error } = await supabase
      .from('feedback_answer')
      .update({ like: editedHeart })
      .eq('id', answer.id);

    if (error) console.log(error);
  };

  const deleteAnswerHandler = async () => {
    const { error } = await supabase
      .from('feedback_answer')
      .delete()
      .eq('id', answer.id);

    if (error) console.log(error);
  };

  return (
    <article className="flex flex-col gap-7 p-8 rounded-[18px] border border-grayLight1 dark:border-grayDark2">
      <div className="flex items-center gap-3">
        <Image
          src={answer.users.profile_image || '/images/DefaultProfile.png'}
          alt="profile image"
          width={80}
          height={80}
          className="object-cover bg-white border rounded-full cursor-pointer size-10 dark:bg-grayDark3 border-grayLight2 dark:border-grayDark2"
          priority
        />
        <div className="flex items-center gap-2 text-bodyLarge">
          <p className="text-grayDark2 dark:text-grayLight1">
            {answer.users.name}
          </p>
          <div className="rounded-sm size-1 bg-grayLight1 dark:bg-grayDark15"></div>
          <p className="text-grayDark1 dark:text-grayBase">
            {answer.created_at && relativeTime(answer.created_at)}
          </p>
        </div>
      </div>
      <p className="text-bodyLarge text-grayDark3 dark:text-grayLight2 m-[-12px]">
        {Result}
      </p>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <button
            onClick={heartHandler}
            className={`flex gap-2 items-center p-[11px_24px] h-12 rounded-full border text-bodyLarge ${
              heart.includes(userId)
                ? 'bg-criticalBackground bg-opacity-40 hover:bg-opacity-100 text-critical border-critical border-opacity-20 dark:bg-critical dark:bg-opacity-15 dark:hover:bg-opacity-20'
                : 'hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark15 dark:text-grayLight1 border-grayLight1 dark:border-grayDark15'
            }`}
          >
            {heart.includes(userId) ? (
              <Heart
                size={20}
                className="transition-none dark:brightness-150"
              />
            ) : (
              <HeartLine size={20} />
            )}
            {heart.length > 0 && (
              <p className="dark:brightness-150">{heart.length}</p>
            )}
          </button>
          <button
            onClick={() => setShowComment((prev) => !prev)}
            className={`flex gap-2 items-center p-[11px_24px] h-12 rounded-full border text-bodyLarge hover:bg-grayLight2 dark:hover:bg-grayDark2 transition-none ${
              showComment
                ? 'text-black dark:text-white border-grayDark15 dark:border-grayBase'
                : 'text-grayDark15 dark:text-grayLight1 border-grayLight1 dark:border-grayDark15'
            }`}
          >
            <Chat size={20} />
            {answer.feedback_comment[0].count > 0 && (
              <p>{answer.feedback_comment[0].count}</p>
            )}
          </button>
        </div>
        <div className="relative">
          <button
            onClick={() => toggleModal('more')}
            className="p-3 rounded-full hover:bg-grayLight2 dark:hover:bg-grayDark2 text-grayDark1 dark:text-grayBase"
          >
            <More />
          </button>
          {modal.has('more') && (
            <MoreSelect
              list={[
                {
                  name: userId === answer.writer ? '답변 삭제' : '답변 신고',
                  onClick: () =>
                    userId === answer.writer
                      ? deleteAnswerHandler()
                      : toggleModal('more'),
                },
              ]}
              click={() => toggleModal('more')}
            />
          )}
        </div>
      </div>
    </article>
  );
};
