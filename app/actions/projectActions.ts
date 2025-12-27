"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../lib/supabase";

export async function handleLike(projectId: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to like a project." };
  }

  const { data: like, error: likeError } = await supabase
    .from("likes")
    .select("*")
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .single();

  if (likeError && likeError.code !== "PGRST116") {
    console.error(likeError);
    return { error: "Something went wrong." };
  }

  if (like) {
    // User has already liked the project, so unlike it.
    const { error: deleteError } = await supabase
      .from("likes")
      .delete()
      .eq("project_id", projectId)
      .eq("user_id", user.id);

    if (deleteError) {
      console.error(deleteError);
      return { error: "Something went wrong." };
    }

    const { error: decrementError } = await supabase.rpc("decrement", {
      project_id: projectId,
    });

    if (decrementError) {
      console.error(decrementError);
      return { error: "Something went wrong." };
    }
  } else {
    // User has not liked the project, so like it.
    const { error: insertError } = await supabase
      .from("likes")
      .insert({ project_id: projectId, user_id: user.id });

    if (insertError) {
      console.error(insertError);
      return { error: "Something went wrong." };
    }

    const { error: incrementError } = await supabase.rpc("increment", {
      project_id: projectId,
    });

    if (incrementError) {
      console.error(incrementError);
      return { error: "Something went wrong." };
    }
  }

  revalidatePath("/");
}

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a project." };
  }

  // Check if the user is the admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    return { error: "You are not authorized to create a project." };
  }

  const { error: insertError } = await supabase.from("projects").insert({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    image_url: formData.get("image_url"),
    tags: formData.get("tags"),
    status: formData.get("status"),
  });

  if (insertError) {
    console.error(insertError);
    return { error: "Something went wrong." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateProject(projectId: number, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update a project." };
  }

  // Check if the user is the admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    return { error: "You are not authorized to update a project." };
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update({
      title: formData.get("title"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      image_url: formData.get("image_url"),
      tags: formData.get("tags"),
      status: formData.get("status"),
    })
    .eq("id", projectId);

  if (updateError) {
    console.error(updateError);
    return { error: "Something went wrong." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteProject(projectId: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete a project." };
  }

  // Check if the user is the admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    return { error: "You are not authorized to delete a project." };
  }

  const { error: deleteError } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (deleteError) {
    console.error(deleteError);
    return { error: "Something went wrong." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
