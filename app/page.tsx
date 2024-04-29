import { Banner } from '@/components';
import { isSupabaseConnected } from '@/utils';

export default async function Index() {
  return (
    <main className="flex flex-col animate-in max-w-[1280px] w-full px-10 sm:px-6 py-8 gap-20">
      {!isSupabaseConnected() && <p>supabase is not connected</p>}
      <Banner />
    </main>
  );
}
