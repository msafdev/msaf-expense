"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function addTransaction(formData: FormData) {
  let amount = formData.get("amount");
  const tag_id = formData.get("tag_id");

  amount = parseFloat(amount as string).toString();

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const date = new Date().toISOString().split("T")[0];

  const { data: user } = await supabase.auth.getUser();
  const users = user.user?.id;

  if (!user) {
    console.error("User is not authenticated!");
    return;
  }

  const { data, error } = await supabase.from("transactions").insert([
    {
      amount,
      tag_id,
      date,
      user_id: users,
    },
  ]);

  if (error) {
    console.error("Error inserting data", error);
    return;
  }

  revalidatePath("/");

  formData.delete("amount");
  formData.delete("tag_id");

  return data;
}
