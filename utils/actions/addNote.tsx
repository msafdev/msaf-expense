"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addNote(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: user } = await supabase.auth.getUser();

  const users = user.user?.id;

  if (!user) {
    console.error("User is not authenticated within addWatch server action");
    return;
  }

  const { data, error } = await supabase.from("notes").insert([
    {
      title,
      content,
      user_id: users,
    },
  ]);

  if (error) {
    console.error("Error inserting data", error);
    return;
  }

  revalidatePath("/notes");

  formData.delete("title");
  formData.delete("content");

  return { message: "Success" };
}
