'use client';

import { getTipList } from '@/apis';
import { TipListSkeleton } from '@/components';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export const TipList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tip list'],
    queryFn: getTipList,
  });

  return (
    <section className="grid w-full grid-cols-3 md:grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-1">
      {isLoading
        ? [...new Array(12)].map((_, index) => <TipListSkeleton key={index} />)
        : data &&
          data.length > 0 &&
          data?.map((value) => (
            <Link href={`/tip/${value.id}`} key={value.id}>
              <article className="flex flex-col object-cover w-full gap-3 [&>.thumbnail]:hover:-translate-y-2">
                <Image
                  src={value.thumbnail!}
                  alt={value.title + ' thumbnail image'}
                  width={384}
                  height={216}
                  className="w-full overflow-hidden transition-transform thumbnail aspect-video outline-grayLight2 dark:outline-grayDark2 -outline-offset-1 outline outline-1 rounded-2xl"
                />
                <div className="flex flex-col gap-2 px-1">
                  <h6 className="text-subtitle text-balance">{value.title}</h6>
                  <p className="text-body2 text-grayDark1">
                    {value.explanation}
                  </p>
                </div>
              </article>
            </Link>
          ))}
    </section>
  );
};
