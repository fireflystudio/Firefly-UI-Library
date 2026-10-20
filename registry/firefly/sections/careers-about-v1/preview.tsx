import { CareersAbout } from "./careers-about-v1";

export default function Preview() {
  return (
    <CareersAbout
      headline="Who we are"
      paragraphs={[
        "We build a small set of tools that teams open every morning and close every evening. Each one does a narrow job well and stays out of the way the rest of the time.",
        "We look for people who are curious, direct and comfortable owning an outcome. Ideas are judged on evidence, not on who proposed them, and everyone can talk to anyone.",
        "We are a remote team. You set your own hours, we protect long stretches of uninterrupted work, and we skip any meeting a message could replace.",
        "If that sounds like you, we would like to hear from you.",
      ]}
    />
  );
}
