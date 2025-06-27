import { redirect } from "next/navigation";

export async function submit(formData: FormData): Promise<void> {
 return redirect("/submit/success");
}
