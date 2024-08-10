import { Chat, Heart, HeartLine, Send } from '@/assets';
import { userIdStore } from '@/store';
import { TopicCommentType } from '@/types';
import { isSined, relativeTime } from '@/utils';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const TopicComment = ({
  topicId,
  commentData,
  commentCount,
  refetch,
}: {
  topicId: number;
  commentData: TopicCommentType[];
  commentCount: number;
  refetch: any;
}) => {
  const [comment, setComment] = useState<string>('');
  const [recomment, setRecomment] = useState<string>('');
  const [recommentNum, setRecommentNum] = useState<number>(-1);
  const { userId } = userIdStore();
  const router = useRouter();
  const supabase = createClient();

  const commentRegister = async (recommentId?: number) => {
    if (!userId && !alert('로그인 후 댓글을 작성해 보세요.')!) return;
    if (recomment) {
      const { error } = await supabase.from('topic_comment').insert({
        user: userId,
        comment: recomment,
        recomment: recommentId,
        topic: topicId,
      });
      if (!error) {
        refetch();
        setRecomment('');
      }
    } else {
      const { error } = await supabase.from('topic_comment').insert({
        user: userId,
        comment: comment,
        topic: topicId,
      });
      if (!error) {
        refetch();
        setComment('');
      }
    }
  };

  const removeComment = async (writer: string, commentId: number) => {
    if (userId === writer) {
      if (!confirm('댓글을 삭제하실건가요?')) return;
      if (!isSined('로그인 후 댓글을 삭제해 보세요.')) return;
      const { error } = await supabase
        .from('topic_comment')
        .delete()
        .eq('id', commentId);
      if (!error) {
        refetch();
      }
    }
  };

  return (
    <section className="flex flex-col gap-6 py-10">
      <p className="text-title">댓글 {commentCount}</p>
      <div className="flex flex-col gap-2 p-6 rounded-[18px] border border-grayLight1 dark:border-grayDark15">
        <textarea
          value={comment}
          onClick={() => {
            if (!userId && !alert('로그인 후 댓글을 작성해 보세요.')!)
              router.push('/login');
          }}
          onChange={(e) => setComment(e.currentTarget.value)}
          className="resize-none min-h-[120px] h-fit focus:outline-none bg-transparent"
          placeholder="토픽에 관련된 자신의 의견을 작성해 보세요.."
          maxLength={1000}
        />
        <div className="flex items-center justify-between">
          <span className="text-grayDark1 text-bodyLarge">
            <span className="text-black dark:text-white">{comment.length}</span>{' '}
            / 1000
          </span>
          <button
            onClick={() => commentRegister()}
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
      {commentData.length > 0 && (
        <div className="flex flex-col w-full">
          {commentData.map((value) => (
            <div key={value.id} className="flex flex-col w-full">
              <div className="flex gap-4 py-4">
                <Image
                  src={value.user.profile_image || '/images/DefaultProfile.png'}
                  alt="user profile"
                  width={120}
                  height={120}
                  className="object-cover border rounded-full size-10 border-grayLight2 dark:border-grayDark2"
                />
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between h-10">
                    <div className="flex items-center gap-2">
                      <p className="text-bodyLarge2">{value.user.name}</p>
                      <div className="rounded-full size-1 bg-grayLight1 dark:bg-grayDark15"></div>
                      <p className="text-bodyLarge text-grayDark1">
                        {relativeTime(value.created_at)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeComment(value.user.id, value.id)}
                      className="text-bodyLarge text-grayDark1 dark:text-grayBase"
                    >
                      {userId === value.user.id ? '삭제' : '신고'}
                    </button>
                  </div>
                  <p className="text-bodyLarge text-grayDark3 dark:text-grayLight2">
                    {value.comment}
                  </p>
                  <div className="flex items-center gap-4 pt-3 text-grayDark15 dark:text-grayDark1">
                    <button className="flex items-center gap-1">
                      <HeartLine size={20} />
                      <p>{value.like?.length || 0}</p>
                    </button>
                    <button
                      onClick={() => {
                        setRecommentNum(
                          recommentNum === value.id ? -1 : value.id
                        );
                        setRecomment('');
                      }}
                      className={`flex items-center gap-1 ${
                        recommentNum === value.id
                          ? 'text-black dark:text-white'
                          : ''
                      }`}
                    >
                      <Chat size={20} />
                      <p>답글 {value.recommentInfo.length}</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full pl-14">
                {value.recommentInfo.length > 0 &&
                  value.recommentInfo.map((recomment) => (
                    <div key={recomment.id} className="flex gap-4 py-4">
                      <Image
                        src={
                          recomment.user.profile_image ||
                          '/images/DefaultProfile.png'
                        }
                        alt="user profile"
                        width={120}
                        height={120}
                        className="object-cover border rounded-full size-10 border-grayLight2 dark:border-grayDark2"
                      />
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center justify-between h-10">
                          <div className="flex items-center gap-2">
                            <p className="text-bodyLarge2">
                              {recomment.user.name}
                            </p>
                            <div className="rounded-full size-1 bg-grayLight1 dark:bg-grayDark15"></div>
                            <p className="text-bodyLarge text-grayDark1">
                              {relativeTime(recomment.created_at)}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeComment(recomment.user.id, recomment.id)
                            }
                            className="text-bodyLarge text-grayDark1 dark:text-grayBase"
                          >
                            {userId === recomment.user.id ? '삭제' : '신고'}
                          </button>
                        </div>
                        <p className="text-bodyLarge text-grayDark3 dark:text-grayLight2">
                          {recomment.comment}
                        </p>
                        <div className="flex items-center gap-4 pt-3 text-grayDark15 dark:text-grayDark1">
                          <button className="flex items-center gap-1">
                            <HeartLine size={20} />
                            <p>{recomment.like?.length || 0}</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                {recommentNum === value.id && (
                  <div className="flex flex-col gap-2 p-6 rounded-[18px] border border-grayLight1 dark:border-grayDark15 my-4">
                    <textarea
                      value={recomment}
                      onClick={() => {
                        if (
                          !userId &&
                          !alert('로그인 후 댓글을 작성해 보세요.')!
                        )
                          router.push('/login');
                      }}
                      onChange={(e) => setRecomment(e.currentTarget.value)}
                      className="resize-none min-h-[100px] h-fit focus:outline-none bg-transparent"
                      placeholder="토픽에 관련된 자신의 의견을 작성해 보세요.."
                      maxLength={1000}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-grayDark1 text-bodyLarge">
                        <span className="text-black dark:text-white">
                          {recomment.length}
                        </span>{' '}
                        / 1000
                      </span>
                      <button
                        onClick={() => commentRegister(value.id)}
                        disabled={recomment.length < 6}
                        className={`${
                          recomment.length < 6
                            ? 'text-grayLight1 dark:text-grayDark15'
                            : 'text-black dark:text-white'
                        }`}
                      >
                        <Send />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
