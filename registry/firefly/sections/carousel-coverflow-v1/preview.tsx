import { CarouselCoverflow, type CarouselItem } from "./carousel-coverflow-v1";

const ITEMS: CarouselItem[] = [
  {
    title: "How a 12-person team shipped weekly",
    body: "From monthly releases to a Friday cadence in one quarter, without adding headcount.",
  },
  {
    title: "Cutting onboarding from weeks to days",
    body: "One shared workspace replaced three hand-off documents and most of the back-and-forth.",
  },
  {
    title: "Why a finance team left spreadsheets behind",
    body: "Month-end close now takes two afternoons instead of a week.",
  },
  {
    title: "One source of truth for a remote team",
    body: "Fourteen time zones, one place where decisions get written down.",
  },
  {
    title: "Running a product launch without a war room",
    body: "The checklist, owners and dates that kept a launch on track.",
  },
  {
    title: "Scaling support without scaling the queue",
    body: "How a two-person team handles ten times the volume with templates and routing.",
  },
  {
    title: "Replacing status meetings with a weekly digest",
    body: "Four recurring meetings removed; the digest takes five minutes to read.",
  },
];

export default function Preview() {
  return (
    <CarouselCoverflow
      headline="What changes when the whole team"
      headlineMuted="works from one place."
      intro="Short stories from customers across product, finance and operations. Drag the cards, use the arrows or let them play."
      items={ITEMS}
    />
  );
}
