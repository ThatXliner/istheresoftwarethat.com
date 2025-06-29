"use server";
import { redirect } from "next/navigation";

// SECURITY: make sure the service role key isn't exactly f
export async function submit(formData: FormData): Promise<void> {
  console.log(formData);
  return redirect("/submit/success");
}
