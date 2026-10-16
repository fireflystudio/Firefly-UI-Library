import Image from "next/image";
import { TestimonialQuote } from "./testimonial-quote-v1";

/*
 * Final example: the Startupmap Founders "How founders are winning with Startupmap." quote
 * (startupmap/components/sections/founders/voices.tsx). "[placeholder company]" is still a
 * placeholder in the source. The source section is plum; this component offers dark or light.
 */
export default function Example() {
  return (
    <TestimonialQuote
      id="voices"
      tone="dark"
      quote="Startupmap helped us identify investors we would have never found on our own. We closed conversations with three relevant funds within six weeks."
      name="Mia Chen"
      role="Founder · [placeholder company] · raised €4M seed"
      avatar={
        <span className="relative block size-12 overflow-clip rounded-pill">
          {/* 800×1200 portrait, cropped to the face as in the source (top of the frame) */}
          <Image
            src="/images/examples/testimonial-quote-v1/founder-portrait.png"
            alt=""
            fill
            sizes="48px"
            className="object-cover object-[50%_15%]"
          />
        </span>
      }
    />
  );
}
