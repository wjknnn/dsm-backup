import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">
      this is protected page.
    </div>
  );
}
