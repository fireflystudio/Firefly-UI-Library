import { CareersRoles } from "./careers-roles-v1";

export default function Preview() {
  return (
    <CareersRoles
      headline="Open roles"
      roles={[
        { title: "Frontend Engineer", href: "#role-1", meta: ["Full-time", "Remote"] },
        { title: "Backend Engineer", href: "#role-2", meta: ["Full-time", "Remote"] },
        { title: "Product Designer", href: "#role-3", meta: ["Full-time", "Remote"] },
        { title: "Customer Success Lead", href: "#role-4", meta: ["Full-time", "Hybrid"] },
      ]}
    />
  );
}
