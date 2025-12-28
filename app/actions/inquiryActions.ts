"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase";

export async function submitInquiry(formData: FormData) {
  const supabase = await createClient();
  
  // Construct the message body to include the new fields
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const budget = formData.get("budget");
  const timeline = formData.get("timeline");
  const originalMessage = formData.get("message");

  // Combine details into a single message body for the database
  // (Since we didn't update the database schema to add columns for phone/budget/timeline,
  // we append them to the message body so the admin can still see them)
  const fullMessageBody = `
Phone: ${phone || 'N/A'}
Budget: ${budget || 'N/A'}
Timeline: ${timeline || 'N/A'}

Message:
${originalMessage}
  `.trim();

  const { error } = await supabase.from("messages").insert({
    sender_name: name,
    email: email,
    message_body: fullMessageBody,
  });

  if (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }

  revalidatePath("/admin");
}
