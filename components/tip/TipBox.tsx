'use server';

import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';

type TipData = {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  explanation: string;
  created_at: Date;
};

export const TipBox = async () => {
  const supabase = createClient();
  const { data } = await supabase.from('tip').select('*').limit(3);
  console.log(data);
  return (
    <section className="grid w-full grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-1">
      {data?.map((value: TipData) => (
        <Link href={`/tip/${value.id}`} key={value.id}>
          <article className="flex flex-col object-cover w-full gap-3 [&>.thumbnail]:hover:-translate-y-2">
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_URL! + value.thumbnail}
              alt={value.title + ' thumbnail image'}
              width={400}
              height={200}
              className="w-full overflow-hidden transition-transform thumbnail aspect-video outline-grayLight2 dark:outline-grayDark2 -outline-offset-1 outline outline-1 rounded-2xl"
            />
            <div className="flex flex-col gap-2 px-1">
              <h6 className="text-subtitle text-balance">{value.title}</h6>
              <p className="text-body2 text-grayDark1">{value.explanation}</p>
            </div>
          </article>
        </Link>
      ))}
    </section>
  );
};
