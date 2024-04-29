import { SignupInput } from './signupInput';

export default function Signup() {
  return (
    <section className="flex flex-col max-w-[448px] w-full p-[64px_24px] gap-[64px]">
      <div className="flex flex-col">
        <h2 className="text-titleLarge2">회원가입</h2>
        <p className="text-bodyLarge">서비스 이용에 필요한 정보들이에요.</p>
      </div>
      <SignupInput />
    </section>
  );
}