import { TipDetail } from './TipDetail';

export default function TipDetailPage({ params }: { params: { id: string } }) {
  const id = decodeURI(params.id);

  return (
    <main className="flex flex-col items-center max-w-[880px] w-full px-10 sm:px-6 pt-20 pb-[240px] sm:pt-10 gap-10">
      <TipDetail id={id} />
    </main>
  );
}
