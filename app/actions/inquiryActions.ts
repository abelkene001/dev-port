"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase";

export async function submitInquiry(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from("messages").insert({
    sender_name: formData.get("name"),
    email: formData.get("email"),
    message_body: formData.get("message"),
  });

  if (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }

  revalidatePath("/admin");
}
