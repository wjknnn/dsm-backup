import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const loginWithGithub = async () => {
    "use server";

    console.log("i'm login with github");

    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("GitHub OAuth login error:", error.message);
      return redirect("/login?message=Could not authenticate with GitHub");
    }

    if (data) {
      return redirect(data.url);
    }
  };

  return (
    <div className="flex flex-col justify-center flex-1 w-full gap-2 px-8 sm:max-w-md">
      <Link
        href="/"
        className="flex items-center px-4 py-2 text-sm text-black no-underline rounded-md dark:text-white hover:bg-gray-100 dark:hover:bg-grayDark2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <form>
        <SubmitButton
          formAction={loginWithGithub}
          className="px-4 py-2 mb-2 border rounded-md border-foreground/20 text-foreground"
          pendingText="Signing In with GitHub..."
        >
          Github Signup
        </SubmitButton>
      </form>
    </div>
  );
}
