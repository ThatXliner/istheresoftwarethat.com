import { redirect } from "next/navigation";

export async function submit(formData: FormData): Promise<void> {
  console.log(formData);
  return redirect("/submit/success");
}
