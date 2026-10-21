import { handleSession } from "@/lib/supabase/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export {
  handleSession as GET,
  handleSession as HEAD,
  handleSession as POST,
  handleSession as PUT,
  handleSession as PATCH,
  handleSession as DELETE,
  handleSession as OPTIONS,
};
