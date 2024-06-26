import { Input } from '@/components';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submitButton';
import { signup } from '@/apis';
import { getToken, getUserId } from '@/utils/cookie/server';

export const SignupInput = () => {
  const signUp = async (formData: FormData) => {
    'use server';

    const token = getToken() || '';
    const userId = getUserId() || '';
    const name = formData.get('name') as string;
    const grade = formData.get('grade') as string;
    const jason = { id: userId, name: name, grade: +grade };

    if (await signup(token, jason)) {
      return redirect('/');
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
          title="기수"
          type="text"
          min={1}
          max={10}
          maxLength={2}
          placeholder="기수를 입력해 주세요."
        />
      </div>
      <SubmitButton formAction={signUp} pendingText="회원가입중...">
        회원가입
      </SubmitButton>
    </form>
  );
};
