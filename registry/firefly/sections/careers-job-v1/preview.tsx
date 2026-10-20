import { CareersJob } from "./careers-job-v1";

export default function Preview() {
  return (
    <CareersJob
      back={{ label: "All open roles", href: "#roles" }}
      title="Frontend Engineer"
      tags={["Senior", "Full-time", "Remote"]}
      intro={[
        "We look for people who are curious, direct and comfortable owning an outcome. Ideas are judged on evidence, not on who proposed them.",
        "We are a remote team. You set your own hours and we protect long stretches of uninterrupted work.",
      ]}
      sections={[
        {
          title: "About the role",
          paragraphs: [
            "You will design, build and ship the user-facing side of the product: the interfaces people touch every day, from the component and the interaction to performance and accessibility.",
            "You will work closely with design and product and help shape the component library the rest of the frontend builds on.",
          ],
        },
        {
          title: "What you'll do",
          lead: "In this role, you will:",
          bullets: [
            "Build and maintain the web application",
            "Build responsive, accessible and fast interfaces",
            "Evolve a shared component library and design system",
            "Own client-side features end to end, from implementation through release",
          ],
        },
        {
          title: "Required qualifications",
          bullets: ["5+ years of professional frontend experience", "Deep experience with TypeScript and a modern UI framework", "A portfolio of shipped, polished interfaces"],
        },
        {
          title: "What we offer",
          bullets: ["A remote-first team that trusts you with real ownership", "Room to shape how we build, not only what we build", "Competitive compensation based on experience and impact"],
        },
      ]}
    />
  );
}
