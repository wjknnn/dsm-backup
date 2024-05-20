import { isSignedUser } from '@/utils/serverIndex';
import { redirect } from 'next/navigation';

export default async function FeedbackWritePage() {
  if (!(await isSignedUser())) {
    return redirect('/login');
  }

  return (
    <div>
      <p>this is feedback write page!</p>
    </div>
  );
}
