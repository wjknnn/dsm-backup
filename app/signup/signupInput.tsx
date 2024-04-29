import { Input } from '@/components';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submitButton';
import { signup } from '@/apis';
import { isSignedUser } from '@/utils';
import { getToken, getUserId } from '@/utils/cookie/server';

export const SignupInput = async () => {
  if (await isSignedUser()) return redirect('/protected');

  const signUp = async (formData: FormData) => {
    'use server';

    const token = getToken() || '';
    const userId = getUserId() || '';
    const name = formData.get('name') as string;
    const grade = formData.get('grade') as string;
    const jason = { id: userId, name: name, grade: +grade };

    if (await signup(token, jason)) {
      return redirect('/protected');
    } else {
      alert('something wrong!');
    }
  };

  return (
    <form className="flex flex-col gap-[64px]">
      <div className="flex flex-col gap-[24px]">
        <Input
          name="name"
          title="이름"
          placeholder="이름을 입력해 주세요."
          required
        />
        {/* <Input title="학교" placeholder="학교를 입력해 주세요." /> */}
        <Input
          number
          name="grade"
          title="학년"
          type="text"
          min={1}
          max={3}
          maxLength={1}
          placeholder="학년을 입력해 주세요."
        />
      </div>
      <SubmitButton formAction={signUp} pendingText="회원가입중...">
        회원가입
      </SubmitButton>
    </form>
  );
};
