import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CareersValue = { title: string; body: string };

export type CareersValuesProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  headline: string;
  headlineMuted?: string;
  /** 4–8 short principles */
  items: CareersValue[];
  /** Width + side padding of the content column, so it lines up with the site's nav and footer. Default = the library footer (1360px at 1440). */
  containerClassName?: string;
  className?: string;
};

/**
 * Careers Values v1
 * "How we work": a section headline and a two-column grid of principles (card-title h3 + one or two
 * sentences). Items stagger in. Single column below 768px.
 */
export function CareersValues({ id = "how-we-work", headline, headlineMuted, items, containerClassName = "max-w-[1440px] px-5 md:px-10", className = "" }: CareersValuesProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page py-8 md:py-12 xl:py-[60px] ${className}`}>
      <div className={`mx-auto ${containerClassName}`}>
        <Reveal stagger={70}>
          <h2 id={headingId} {...reveal} className="max-w-[1000px] text-balance text-[28px] leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]">
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
          <ul className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-10 xl:mt-16 xl:gap-x-16 xl:gap-y-12">
            {items.map((item) => (
              <li key={item.title} {...reveal} className="flex flex-col gap-2.5">
                <h3 className="text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-text-primary md:text-[19px] xl:text-[20px]">{item.title}</h3>
                <p className="max-w-[460px] text-pretty text-[15px] leading-[1.55] text-text-tertiary md:text-[16px]">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
