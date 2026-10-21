"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";

/** Verb brand values, set as CSS variables on the root so the file needs no brand tokens in the host site. */
const VERB_VARS = {
  "--v-ink": "#111111",
  "--v-blue": "#0092ff",
  "--v-shadow": "0 16px 40px rgb(0 0 0 / 0.06)",
} as CSSProperties;

/* Drawn 334px wide; every size is a share of the element's own width, so it scales with its box. */
const u = (px: number) => `calc(${px} * 100cqw / 334)`;
const fu = (px: number) => `calc(${px} * 100cqw / 334 * var(--type-scale, 1))`;

/** Verb symbol (the rotated mark), 25.5 × 24. */
const SYMBOL =
  "M24.4765 3.61921C23.1633 1.35466 20.8064 0 18.1767 0H7.28593C4.65619 0 2.30273 1.35466 0.986153 3.61921C-0.330423 5.88377 -0.327012 8.59308 0.986153 10.861L6.43323 20.2486C7.74639 22.5165 10.1033 23.8678 12.733 23.8678C15.3628 23.8678 17.7162 22.5131 19.0328 20.2486L24.5242 10.7829C25.793 8.53197 25.7828 5.86 24.4799 3.61921H24.4765ZM17.4945 19.3658C16.4986 21.0804 14.7181 22.1023 12.7296 22.1023C10.7411 22.1023 8.96065 21.0804 7.9681 19.3658L2.52102 9.9783C1.52506 8.26375 1.52506 6.21649 2.52102 4.50195C3.51698 2.7874 5.29743 1.76547 7.28593 1.76547H7.63384C7.28934 2.11856 6.98578 2.51579 6.72997 2.95377C5.65556 4.80411 5.65556 7.01435 6.72997 8.86469L11.0378 16.2932C12.1122 18.1436 14.0359 19.2504 16.1813 19.2504C16.693 19.2504 17.1944 19.1859 17.6719 19.0637L17.4979 19.3658H17.4945ZM8.125 7.70016H17.3751L12.7501 15.6753L8.125 7.70016ZM22.9416 9.9783L19.79 15.4139C19.0362 16.7108 17.6889 17.4883 16.1813 17.4883C15.4207 17.4883 14.7011 17.288 14.0769 16.9247L19.6808 7.26219C19.8377 6.99058 19.8377 6.65107 19.6808 6.37946C19.5239 6.10785 19.2306 5.93809 18.9134 5.93809H7.70205C7.69864 5.21832 7.88283 4.49516 8.26484 3.8399C9.01522 2.54635 10.3557 1.77565 11.853 1.76886H18.1801C20.1686 1.76886 21.949 2.7908 22.945 4.50534C23.941 6.21988 23.941 8.26715 22.945 9.98169L22.9416 9.9783Z";

export type SignupCardProps = {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  /** Called with the e-mail typed in (also on Enter). Nothing is sent by the component. */
  onSubmit?: (email: string) => void;
  className?: string;
};

/** Verb Reader "Create your account": the mark, a title, an e-mail field and a Subscribe button. */
export function SignupCard({
  title = "Create your Verb account",
  subtitle = "Your feed starts with one e-mail.",
  placeholder = "name@email.com",
  buttonLabel = "Subscribe",
  onSubmit,
  className = "",
}: SignupCardProps) {
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
  };

  return (
    <div className={`@container w-full ${className}`} style={VERB_VARS}>
      <form
        onSubmit={submit}
        className="flex flex-col bg-surface-primary shadow-[var(--v-shadow)]"
        style={{ padding: u(28), gap: u(16), borderRadius: u(14) }}
      >
        <svg viewBox="0 0 25.5 24" fill="var(--v-blue)" aria-hidden style={{ width: u(26) }} className="h-auto">
          <path d={SYMBOL} />
        </svg>
        <div className="flex flex-col" style={{ gap: u(4) }}>
          <p className="font-medium leading-[1.2] tracking-[-0.02em] text-text-primary" style={{ fontSize: fu(18) }}>
            {title}
          </p>
          <p className="leading-[1.4] text-text-tertiary" style={{ fontSize: fu(13) }}>
            {subtitle}
          </p>
        </div>
        <input
          type="email"
          name="email"
          autoComplete="email"
          aria-label="E-mail"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border-10 bg-transparent leading-[1.2] text-text-primary outline-none transition-colors placeholder:text-text-placeholder focus:border-text-primary"
          style={{ borderRadius: u(10), padding: `${u(11)} ${u(14)}`, fontSize: fu(14) }}
        />
        <button
          type="submit"
          className="flex cursor-pointer items-center justify-center rounded-full bg-[var(--v-ink)] font-medium leading-[1.2] text-white transition-colors duration-150 hover:bg-[#333]"
          style={{ padding: `${u(11)} ${u(14)}`, fontSize: fu(14) }}
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
