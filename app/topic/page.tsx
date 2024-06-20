import { createClient } from '@/utils/supabase/client';
import { TopicList } from './TopicList';

export default async function TopicPage() {
  const supabase = createClient();
  const { count } = await supabase
    .from('topic')
    .select('*', { count: 'exact' });

  return (
    <main className="flex flex-col gap-10 animate-in max-w-[1280px] w-full px-10 sm:px-6 pt-16 pb-20 sm:pt-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-titleLarge">토픽</h1>
        <p className="text-bodyLarge">
          흥미로운 디자인 주제에 관해서 함께 토론해 보세요.
        </p>
      </div>
      <TopicList max={Math.ceil((count || 50) / 20)} />
    </main>
  );
}
