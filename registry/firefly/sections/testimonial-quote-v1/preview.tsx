import { TestimonialQuote } from "./testimonial-quote-v1";

export default function Preview() {
  return (
    <TestimonialQuote
      quote="It took the team a week to stop opening the old spreadsheet. Nobody has since."
      name="Maya Lindqvist"
      role="Head of Operations"
      logo={
        <span className="rounded-pill border border-border-on-dark px-2.5 py-1 font-mono text-[12px] uppercase leading-none tracking-[0.08em] text-text-on-dark/60">
          Logo
        </span>
      }
    />
  );
}
