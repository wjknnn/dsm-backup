'use client';

import { getTopic } from '@/apis';
import { Arrow, Vote } from '@/assets';
import { userIdStore } from '@/store/userId';
import { storeUserId } from '@/utils';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const TopicDetail = ({ id }: { id: string }) => {
  const [vote, setVote] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ['topic detail', id],
    queryFn: () => getTopic(id),
  });

  const router = useRouter();
  const { userId, updateUserId } = userIdStore();

  const getVote = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('topic_vote')
      .select('*')
      .match({ topic_id: +id, user_id: userId })
      .single();

    if (!error) {
      setVote(data.key);
    }
  };

  useEffect(() => {
    userId && getVote();
  }, [userId]);

  useEffect(() => {
    storeUserId(updateUserId);
  }, []);

  return (
    <section className="max-w-[800px] w-full flex flex-col gap-6 animate-in">
      {isLoading ? (
        <></>
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
                  disabled={vote === 'A'}
                  className={`flex w-[208px] sm:w-full h-[72px] justify-center items-center rounded-[18px] gap-2 border border-grayLight1 dark:border-grayDark15 ${
                    vote === 'A'
                      ? 'bg-attention text-white'
                      : 'bg-white dark:bg-grayDark3 hover:bg-attentionBackground dark:hover:bg-grayDark2'
                  }`}
                >
                  {vote ? (
                    <>
                      <p className="text-title">
                        {(data.num_a / (data.num_a + data.num_b)) * 100}%
                      </p>
                      <p className="text-bodyLarge2">({data.num_a}명)</p>
                    </>
                  ) : (
                    <p className="text-title">A</p>
                  )}
                </button>
                <button
                  disabled={vote === 'B'}
                  className={`flex w-[208px] sm:w-full h-[72px] justify-center items-center rounded-[18px] gap-2 border border-grayLight1 dark:border-grayDark15 ${
                    vote === 'B'
                      ? 'bg-attention text-white'
                      : 'bg-white dark:bg-grayDark3 hover:bg-attentionBackground dark:hover:bg-grayDark2'
                  }`}
                >
                  {vote ? (
                    <>
                      <p className="text-title">
                        {(data.num_b / (data.num_a + data.num_b)) * 100}%
                      </p>
                      <p className="text-bodyLarge2">({data.num_b}명)</p>
                    </>
                  ) : (
                    <p className="text-title">B</p>
                  )}
                </button>
              </div>
            </article>
          </>
        )
      )}
    </section>
  );
};
