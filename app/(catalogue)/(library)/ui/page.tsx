import { redirect } from "next/navigation";
import { BRANDS } from "@/lib/brands";

/** UI Components starts on the first brand. */
export default function UiIndexPage() {
  redirect(`/ui/${BRANDS[0].id}`);
}
