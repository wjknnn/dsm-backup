import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes?.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}
