import { isSupabaseConnected } from '@/utils';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

export default async function Index() {
  const supabase = createClient();

  const {
    data: { publicUrl },
  } = supabase.storage.from('test').getPublicUrl('mountain.png');

  console.log(publicUrl);

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      <div className="flex flex-col flex-1 max-w-4xl gap-20 px-3 animate-in">
        <main className="flex flex-col flex-1 gap-6">
          <h2 className="mb-4 text-4xl font-bold">Next steps</h2>
          {!isSupabaseConnected() && <p>supabase is not connected</p>}
          <Image src={publicUrl} alt="test image" width={400} height={200} />
        </main>
      </div>
    </div>
  );
}
