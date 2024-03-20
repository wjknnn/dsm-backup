import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4 text-black dark:text-white">
      {user.email}
      {/* <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form> */}
      <div className="w-[40px] h-[40px] rounded-full bg-grayLight1 border border-grayBase cursor-pointer"></div>
    </div>
  ) : (
    <>
      <Link
        href="/login"
        className="rounded-full flex p-[8px_24px] bg-black dark:bg-white text-white dark:text-black"
      >
        로그인
      </Link>
      <Link href="/login" className="text-bodyLarge text-black dark:text-white">
        회원가입
      </Link>
    </>
  );
}
