import { Arrow } from '@/assets';
import { createClient } from '@/utils/supabase/client';
import Image from 'next/image';
import Link from 'next/link';

export const Banner = () => {
  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from('test').getPublicUrl('testBanner2.png');

  return (
    <article className="w-full h-[320px] border border-grayDark2 rounded-2xl overflow-hidden relative sm:absolute sm:top-0 sm:left-0 sm:rounded-none sm:border-none text-white">
      <Image
        src={publicUrl}
        alt="banner1"
        width={1200}
        height={320}
        className="object-cover w-full h-full"
      />
      <div className="absolute top-0 left-0 z-10 flex flex-col justify-center w-full h-full px-20 sm:px-8">
        <h4 className="font-bold tracking-tight text-titleLarge sm:text-[32px] leading-[48px] sm:leading-[40px]">
          내 디자인을
          <br />
          새롭게.
        </h4>
        <p className="text-bodyLarge !text-[20px] sm:!text-[16px] text-grayDark1 sm:text-grayBase m-[16px_0_20px]">
          내 디자인을 위한 다양한 백업
        </p>
        <Link
          href="/feedback"
          className="p-[8px_24px] rounded-full bg-grayDark3 hover:bg-grayDark2 w-fit border border-grayDark2"
        >
          <p className="text-bodyLarge">피드백 요청하기</p>
        </Link>
      </div>
      <div className="absolute top-0 left-0 w-[40%] min-w-[240px] h-full bg-gradient-to-r from-black"></div>
      <div className="absolute z-10 flex items-center gap-3 bottom-8 right-10">
        <div className="flex justify-center w-[72px] p-[4px_12px] rounded-full bg-[rgba(0,0,0,0.24)] backdrop-blur-md outline outline-1 outline-white -outline-offset-1">
          <p className="text-bodyLarge">1 / 2</p>
        </div>
        <button className="p-[6px] rounded-full bg-[rgba(0,0,0,0.24)] backdrop-blur-md outline outline-1 outline-white -outline-offset-1">
          <Arrow size={20} />
        </button>
        <button className="p-[6px] rounded-full bg-[rgba(0,0,0,0.24)] backdrop-blur-md outline outline-1 outline-white -outline-offset-1">
          <Arrow size={20} className="rotate-180" />
        </button>
      </div>
    </article>
  );
};
