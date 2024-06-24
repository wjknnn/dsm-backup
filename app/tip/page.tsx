import { TipList } from './TipList';

export default function TipPage() {
  return (
    <main className="flex flex-col gap-10 animate-in max-w-[1280px] w-full px-10 sm:px-6 pt-16 pb-20 sm:pt-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-titleLarge">팁 저장소</h1>
        <p className="text-bodyLarge">
          디자인에 도움이 되는 팁을 통해 실력을 키워보세요.
        </p>
      </div>
      <TipList />
    </main>
  );
}
