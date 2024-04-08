import { addNote } from "@/utils/actions/addNote";
import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
      <pre>{JSON.stringify(user?.id, null, 2)}</pre>
      <form action={addNote} className="flex flex-col gap-y-1">
        <input
          className="border border-gray-300 bg-background"
          type="text"
          name="title"
          id="title"
          placeholder="Title"
        />
        <input
          className="border border-gray-300 bg-background"
          type="text"
          name="content"
          id="content"
          placeholder="Content"
        />
        <button className="bg-blue-500 text-white rounded p-2" type="submit">
          Add Note
        </button>
      </form>
    </div>
  );
}
