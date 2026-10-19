import { redirect } from "next/navigation";
import { DESIGN_SYSTEM_HOME } from "@/lib/design-system/pages";

export default function DesignSystemIndex() {
  redirect(DESIGN_SYSTEM_HOME);
}
