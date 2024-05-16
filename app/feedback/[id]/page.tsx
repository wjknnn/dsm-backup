export default function FeedbackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = decodeURI(params.id);
  return (
    <main>
      <h1>this is feedback detail page!</h1>
      <p>feedback id is {id}!</p>
    </main>
  );
}
