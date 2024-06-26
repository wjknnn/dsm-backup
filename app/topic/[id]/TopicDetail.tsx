'use client';

import { getTopic } from '@/apis';
import { Arrow, Vote } from '@/assets';
import { TopicSkeleton } from '@/components';
import { userIdStore } from '@/store/userId';
import { storeUserId } from '@/utils';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TopicComment } from './TopicComment';

export const TopicDetail = ({ id }: { id: string }) => {
  const [isChange, setIsChange] = useState<boolean>(false);
  const [vote, setVote] = useState<string | null>(null);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['topic detail', id],
    queryFn: () => getTopic(id),
  });

  const supabase = createClient();
  const router = useRouter();
  const { userId, updateUserId } = userIdStore();

  const getVote = async () => {
    const { data, error } = await supabase
      .from('topic_vote')
      .select('*')
      .match({ topic_id: +id, user_id: userId })
      .single();

    if (!error) {
      setVote(data.key);
    }
  };

  const changeHandler = async (changed: string) => {
    if (!userId && !alert('로그인 후 투표해 주세요.')!) {
      router.push('/login');
      return;
    }
    if (vote === 'A' && changed === 'B') {
      setIsChange(true);
    } else if (vote === 'B' && changed === 'A') {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
    if (vote) {
      const { error } = await supabase
        .from('topic_vote')
        .update({ key: changed })
        .match({ topic_id: +id, user_id: userId });
      if (error) console.log(error);
    } else {
      const { error } = await supabase
        .from('topic_vote')
        .insert({ topic_id: +id, user_id: userId, key: changed });
      if (error) console.log(error);
      else {
        refetch();
        setVote(changed);
      }
    }
  };

  useEffect(() => {
    setVote(null);
    userId && getVote();
  }, [userId, id]);

  useEffect(() => {
    refetch();
    storeUserId(updateUserId);
    setIsChange(false);
  }, [id]);

  return (
    <section className="max-w-[800px] w-full flex flex-col gap-6 animate-in">
      {isLoading ? (
        <TopicSkeleton />
      ) : (
        data && (
          <>
            <div className="flex flex-col items-center gap-4 px-10">
              <div className="flex items-center text-grayDark15 dark:text-grayLight1 bg-grayLight2 dark:bg-grayDark2 rounded-lg p-[8px_16px] gap-1 text-bodyStrong">
                <Vote size={20} />
                투표수 {data.num_a + data.num_b}회
              </div>
              <h1 className="text-center text-titleLarge break-keep sm:text-title">
                {data.title}
              </h1>
            </div>
            <article className="flex flex-col gap-6 py-8 px-2 sm:px-8 items-center rounded-[18px] bg-gradient-to-t to-grayLight2 dark:to-grayDark2 from-white dark:from-grayDark3">
              <div className="flex justify-center w-full gap-2">
                <div className="flex items-center justify-center flex-1 sm:hidden">
                  <button
                    onClick={() => router.push(`${+id - 1 <= 0 ? 1 : +id - 1}`)}
                    disabled={+id <= 1}
                    className="flex p-6 bg-white border rounded-full dark:bg-grayDark3 hover:bg-grayLight2 dark:hover:bg-grayDark2 border-grayLight1 dark:border-grayDark15"
                  >
                    <Arrow size={28} />
                  </button>
                </div>
                <Image
                  src={data.image}
                  alt="topic image"
                  width={800}
                  height={600}
                  className="w-[440px] h-[330px] sm:w-[360px] object-contain aspect-[4/3] sm:h-auto"
                />
                <div className="flex items-center justify-center flex-1 sm:hidden">
                  <button
                    onClick={() => router.push(`${+id + 1 > 3 ? 3 : +id + 1}`)}
                    disabled={+id >= 3}
                    className="flex p-6 bg-white border rounded-full dark:bg-grayDark3 hover:bg-grayLight2 dark:hover:bg-grayDark2 border-grayLight1 dark:border-grayDark15"
                  >
                    <Arrow size={28} className="rotate-180" />
                  </button>
                </div>
              </div>
              <div className="flex sm:max-w-[360px] sm:w-full gap-6">
                <button
                  onClick={() => changeHandler('A')}
                  disabled={
                    (vote === 'A' && !isChange) || (vote === 'B' && isChange)
                  }
                  className={`flex w-[208px] sm:w-full h-[72px] justify-center items-center rounded-[18px] gap-2 border border-grayLight1 dark:border-grayDark15 ${
                    (vote === 'A' && !isChange) || (vote === 'B' && isChange)
                      ? 'bg-attention text-white'
                      : 'bg-white dark:bg-grayDark3 hover:bg-attentionBackground dark:hover:bg-grayDark2'
                  }`}
                >
                  {vote ? (
                    <>
                      <p className="text-title">
                        {isChange
                          ? vote === 'A'
                            ? Math.floor(
                                ((data.num_a - 1) /
                                  (data.num_a - 1 + data.num_b + 1)) *
                                  100
                              )
                            : vote === 'B' &&
                              Math.floor(
                                ((data.num_a + 1) /
                                  (data.num_a + 1 + data.num_b - 1)) *
                                  100
                              )
                          : Math.floor(
                              (data.num_a / (data.num_a + data.num_b)) * 100
                            )}
                        %
                      </p>
                      <p className="text-bodyLarge2">
                        (
                        {isChange
                          ? vote === 'A'
                            ? data.num_a - 1
                            : vote === 'B' && data.num_a + 1
                          : data.num_a}
                        명)
                      </p>
                    </>
                  ) : (
                    <p className="text-title">A</p>
                  )}
                </button>
                <button
                  onClick={() => changeHandler('B')}
                  disabled={
                    (vote === 'B' && !isChange) || (vote === 'A' && isChange)
                  }
                  className={`flex w-[208px] sm:w-full h-[72px] justify-center items-center rounded-[18px] gap-2 border border-grayLight1 dark:border-grayDark15 ${
                    (vote === 'B' && !isChange) || (vote === 'A' && isChange)
                      ? 'bg-attention text-white'
                      : 'bg-white dark:bg-grayDark3 hover:bg-attentionBackground dark:hover:bg-grayDark2'
                  }`}
                >
                  {vote ? (
                    <>
                      <p className="text-title">
                        {isChange
                          ? vote === 'A'
                            ? Math.floor(
                                ((data.num_b + 1) /
                                  (data.num_a - 1 + data.num_b + 1)) *
                                  100
                              )
                            : vote === 'B' &&
                              Math.floor(
                                ((data.num_b - 1) /
                                  (data.num_a + 1 + data.num_b - 1)) *
                                  100
                              )
                          : Math.floor(
                              (data.num_b / (data.num_a + data.num_b)) * 100
                            )}
                        %
                      </p>
                      <p className="text-bodyLarge2">
                        (
                        {isChange
                          ? vote === 'A'
                            ? data.num_b + 1
                            : vote === 'B' && data.num_b - 1
                          : data.num_b}
                        명)
                      </p>
                    </>
                  ) : (
                    <p className="text-title">B</p>
                  )}
                </button>
              </div>
            </article>
            <TopicComment
              topicId={+id}
              commentData={data.comment}
              commentCount={data.commentCount}
              refetch={refetch}
            />
          </>
        )
      )}
    </section>
  );
};
