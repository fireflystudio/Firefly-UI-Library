"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import { BeforeAfterCompare } from "@/registry/firefly/sections/before-after-compare-v1/before-after-compare-v1";
import { BentoCards } from "@/registry/firefly/sections/bento-cards-v1/bento-cards-v1";
import { CarouselCoverflow } from "@/registry/firefly/sections/carousel-coverflow-v1/carousel-coverflow-v1";
import { CtaDemoPill } from "@/registry/firefly/sections/cta-demo-pill-v1/cta-demo-pill-v1";
import { CtaNewsletter } from "@/registry/firefly/sections/cta-newsletter-v1/cta-newsletter-v1";
import { FaqCentered } from "@/registry/firefly/sections/faq-centered-v1/faq-centered-v1";
import { FaqSplit } from "@/registry/firefly/sections/faq-split-v1/faq-split-v1";
import { FeatureRowChecks } from "@/registry/firefly/sections/feature-row-checks-v1/feature-row-checks-v1";
import { FeatureRowInteractive } from "@/registry/firefly/sections/feature-row-interactive-v1/feature-row-interactive-v1";
import { Footer } from "@/registry/firefly/sections/footer-v1/footer-v1";
import { HeroCentered } from "@/registry/firefly/sections/hero-centered-v1/hero-centered-v1";
import { HeroNewsBento } from "@/registry/firefly/sections/hero-news-bento-v1/hero-news-bento-v1";
import { HeroPortrait } from "@/registry/firefly/sections/hero-portrait-v1/hero-portrait-v1";
import { HeroSplit } from "@/registry/firefly/sections/hero-split-v1/hero-split-v1";
import { LensesList } from "@/registry/firefly/sections/lenses-list-v1/lenses-list-v1";
import { LogoMarquee } from "@/registry/firefly/sections/logo-marquee-v1/logo-marquee-v1";
import { NavigationCentered } from "@/registry/firefly/sections/navigation-centered-v1/navigation-centered-v1";
import { NavigationSlideOut } from "@/registry/firefly/sections/navigation-slide-out-v1/navigation-slide-out-v1";
import { NavigationSticky } from "@/registry/firefly/sections/navigation-sticky-v1/navigation-sticky-v1";
import { StatsGrid } from "@/registry/firefly/sections/stats-grid-v1/stats-grid-v1";
import { StatsRows } from "@/registry/firefly/sections/stats-rows-v1/stats-rows-v1";
import { StepsCards } from "@/registry/firefly/sections/steps-cards-v1/steps-cards-v1";
import { TestimonialQuote } from "@/registry/firefly/sections/testimonial-quote-v1/testimonial-quote-v1";
import { getImage } from "./image-store";
import type { PlanImage, PlanSection, SectionProps } from "./types";

/* ---------- helpers ---------- */

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";
const link = (l: { label: string }) => ({ label: l.label, href: `#${slug(l.label)}` });
const links = (arr?: { label: string }[]) => (arr ?? []).map(link);
const ctaOrNull = (l: { label: string } | null | undefined) => (l === null ? null : l ? link(l) : undefined);

/** Generated image inside a component slot: resolves IndexedDB keys, falls back to a placeholder. */
export function PlanImg({ image }: { image: PlanImage }) {
  const direct = image.src && !image.src.startsWith("idb:") ? image.src : undefined;
  const [src, setSrc] = useState<string | undefined>(direct);
  useEffect(() => {
    let alive = true;
    if (image.src?.startsWith("idb:")) {
      getImage(image.src.slice(4)).then((value) => alive && value && setSrc(value));
    } else {
      setSrc(direct);
    }
    return () => {
      alive = false;
    };
  }, [image.src, direct]);
  if (!src) return <Placeholder label="Image" />;
  // Data URLs from the image API cannot go through next/image.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />;
}

const findImage = (section: PlanSection, slot: string) => section.images?.find((i) => i.slot === slot);
const img = (section: PlanSection, slot: string): ReactNode | undefined => {
  const image = findImage(section, slot);
  return image ? <PlanImg image={image} /> : undefined;
};
const framed = (node: ReactNode | undefined, className: string) => (node ? <div className={`relative w-full ${className}`}>{node}</div> : undefined);

/* ---------- renderer ---------- */

/** Renders a planned section with its generated content. Returns null when the section has no props (wireframe fallback). */
export function renderPlanSection(section: PlanSection): ReactNode | null {
  const p: SectionProps | undefined = section.props;
  if (!p) return null;
  const headline = p.headline ?? "";
  const items = p.items ?? [];

  switch (section.component) {
    case "navigation-sticky-v1":
      return <NavigationSticky links={links(p.links)} cta={ctaOrNull(p.primaryCta)} activeHref={links(p.links)[0]?.href} />;
    case "navigation-centered-v1":
      return <NavigationCentered links={links(p.links)} secondaryCta={p.secondaryLink ? link(p.secondaryLink) : null} cta={ctaOrNull(p.primaryCta)} activeHref={links(p.links)[0]?.href} />;
    case "navigation-slide-out-v1":
      return (
        <NavigationSlideOut
          links={links(p.links)}
          secondaryLink={p.secondaryLink ? link(p.secondaryLink) : null}
          cta={ctaOrNull(p.primaryCta)}
          groups={(p.groups ?? []).map((g) => ({ title: g.title, links: links(g.links) }))}
          activeHref={links(p.links)[0]?.href}
        />
      );
    case "hero-centered-v1":
      return (
        <HeroCentered headline={headline} headlineMuted={p.headlineMuted ?? ""} body={p.body} primaryCta={p.primaryCta ? link(p.primaryCta) : undefined} secondaryCta={ctaOrNull(p.secondaryCta)} visual={img(section, "visual")} />
      );
    case "hero-split-v1":
      return (
        <HeroSplit headline={headline} headlineMuted={p.headlineMuted ?? ""} body={p.body} note={p.note} primaryCta={p.primaryCta ? link(p.primaryCta) : undefined} secondaryCta={ctaOrNull(p.secondaryCta)} visual={img(section, "visual")} />
      );
    case "hero-portrait-v1":
      return (
        <HeroPortrait headline={headline} headlineMuted={p.headlineMuted} body={p.body} primaryCta={p.primaryCta ? link(p.primaryCta) : undefined} secondaryCta={ctaOrNull(p.secondaryCta)} visual={img(section, "visual")} />
      );
    case "hero-news-bento-v1":
      return (
        <HeroNewsBento
          headline={headline}
          headlineMuted={p.headlineMuted ?? ""}
          intro={p.intro}
          lead={{ kicker: p.lead?.kicker, title: p.lead?.title ?? items[0]?.title ?? "", dek: p.lead?.dek, href: "#lead", image: img(section, "lead") }}
          items={items.map((it, i) => ({ kicker: it.kicker, title: it.title ?? "", href: `#story-${i + 1}`, image: img(section, `items.${i}`) }))}
        />
      );
    case "feature-row-interactive-v1":
      return (
        <FeatureRowInteractive headline={headline} headlineMuted={p.headlineMuted} items={items.map((it, i) => ({ title: it.title ?? "", body: it.body ?? "", visual: img(section, `items.${i}`) }))} />
      );
    case "feature-row-checks-v1":
      return <FeatureRowChecks headline={headline} headlineMuted={p.headlineMuted} items={items.map((it) => ({ title: it.title ?? "", body: it.body }))} visual={img(section, "visual")} />;
    case "lenses-list-v1":
      return (
        <LensesList headline={headline} headlineMuted={p.headlineMuted} items={items.map((it, i) => ({ name: it.name ?? it.title ?? "", description: it.description ?? it.body ?? "", visual: img(section, `items.${i}`) }))} />
      );
    case "stats-rows-v1":
      return (
        <StatsRows headline={headline} headlineMuted={p.headlineMuted} intro={p.intro} items={items.map((it, i) => ({ value: it.value ?? String(i + 1).padStart(2, "0"), title: it.title ?? "", description: it.description ?? it.body }))} cta={ctaOrNull(p.cta)} />
      );
    case "steps-cards-v1":
      return <StepsCards headline={headline} headlineMuted={p.headlineMuted} intro={p.intro} steps={(p.steps ?? items).map((s) => ({ title: s.title ?? "", body: s.body ?? "" }))} />;
    case "stats-grid-v1":
      return (
        <StatsGrid tone={p.tone ?? "dark"} headline={p.headline} headlineMuted={p.headlineMuted} quote={p.statQuote ? { text: p.statQuote.text, author: p.statQuote.author, role: p.statQuote.role } : undefined} stats={p.stats ?? []} />
      );
    case "before-after-compare-v1":
      return (
        <BeforeAfterCompare
          headline={headline}
          headlineMuted={p.headlineMuted}
          intro={p.intro}
          beforeLabel={p.beforeLabel}
          afterLabel={p.afterLabel}
          before={{ title: p.before?.title, points: p.before?.points ?? [], visual: findImage(section, "before") ? framed(img(section, "before"), "aspect-[4/3]") : null }}
          after={{ title: p.after?.title, points: p.after?.points ?? [], visual: findImage(section, "after") ? framed(img(section, "after"), "aspect-[4/3]") : null }}
        />
      );
    case "logo-marquee-v1":
      return (
        <LogoMarquee
          label={p.label}
          logos={(p.logos ?? []).map((name) => (
            <span key={name} className="inline-flex h-11 items-center whitespace-nowrap rounded-tile border border-border-06 bg-surface-primary px-5 text-[14px] font-medium tracking-[-0.01em] text-text-nav">
              {name}
            </span>
          ))}
        />
      );
    case "carousel-coverflow-v1":
      return (
        <CarouselCoverflow headline={headline} headlineMuted={p.headlineMuted} intro={p.intro} items={items.map((it, i) => ({ kicker: it.kicker, title: it.title ?? "", body: it.body, visual: img(section, `items.${i}`) }))} />
      );
    case "bento-cards-v1":
      return (
        <BentoCards headline={headline} headlineMuted={p.headlineMuted} items={items.map((it, i) => ({ label: it.label, title: it.title ?? "", body: it.body, tone: it.tone ?? (i % 3 === 0 ? "photo" : i % 3 === 1 ? "dark" : "light"), visual: img(section, `items.${i}`) }))} />
      );
    case "testimonial-quote-v1":
      return (
        <TestimonialQuote tone={p.tone ?? "light"} quote={p.quote ?? ""} name={p.name ?? ""} role={p.role} avatar={findImage(section, "avatar") ? <span className="relative block size-12 overflow-clip rounded-pill">{img(section, "avatar")}</span> : undefined} />
      );
    case "faq-split-v1":
      return <FaqSplit headline={headline} headlineMuted={p.headlineMuted} items={items.map((it) => ({ question: it.question ?? it.title ?? "", answer: it.answer ?? it.body ?? "" }))} cta={ctaOrNull(p.cta)} />;
    case "faq-centered-v1":
      return (
        <FaqCentered headline={headline} headlineMuted={p.headlineMuted} items={items.map((it) => ({ question: it.question ?? it.title ?? "", answer: it.answer ?? it.body ?? "" }))} footerText={p.footerText} cta={ctaOrNull(p.cta)} />
      );
    case "cta-demo-pill-v1":
      return (
        <CtaDemoPill tone={p.tone ?? "dark"} headline={headline} headlineMuted={p.headlineMuted} body={p.body} primaryCta={p.primaryCta ? link(p.primaryCta) : undefined} secondaryCta={ctaOrNull(p.secondaryCta)} note={p.note} visual={framed(img(section, "visual"), "aspect-[16/9]")} />
      );
    case "cta-newsletter-v1":
      return (
        <CtaNewsletter tone={p.tone ?? "light"} headline={headline} headlineMuted={p.headlineMuted} body={p.body} label={p.label} placeholder={p.placeholder} buttonLabel={p.buttonLabel} confirmation={p.confirmation} privacyNote={p.privacyNote} benefits={p.benefits} visual={framed(img(section, "visual"), "aspect-[2/1] overflow-clip rounded-t-2xl")} />
      );
    case "footer-v1":
      return (
        <Footer tagline={p.tagline} columns={(p.columns ?? []).map((c) => ({ title: c.title, links: links(c.links) }))} signup={p.signup === null ? null : p.signup ? { label: p.signup.label, placeholder: p.signup.placeholder, confirmation: p.signup.confirmation } : undefined} legal={p.legal} />
      );
    default:
      return null;
  }
}
