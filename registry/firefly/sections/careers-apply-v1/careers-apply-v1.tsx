"use client";

import { useId, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CareersApplyLabels = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  resume: string;
  resumeHint: string;
  coverLetter: string;
  url: string;
  location: string;
  more: string;
  submit: string;
};

export type CareersApplyProps = {
  /** Section id: the Apply pill on the role page links to `#${id}` */
  id?: string;
  /** Prefilled, read-only role field; also the default grey half of the headline */
  roleTitle: string;
  headline?: string;
  /** Defaults to `for ${roleTitle}` */
  headlineMuted?: string;
  /** Resume size limit in MB */
  maxFileMb?: number;
  /** Accepted resume types */
  accept?: string;
  labels?: Partial<CareersApplyLabels>;
  /** Shown in the reserved status slot after submit. `{role}` is replaced by the role title. */
  confirmation?: string;
  /** Called with the form data on a valid submit. Nothing is sent anywhere until a site wires this. */
  onSubmit?: (data: FormData) => void;
  className?: string;
};

const DEFAULT_LABELS: CareersApplyLabels = {
  firstName: "Name",
  lastName: "Last name",
  email: "Email address",
  phone: "Phone number",
  role: "Role",
  resume: "Resume/CV",
  resumeHint: "Click to upload a file or drag and drop. PDF, DOC or DOCX, max {max} MB.",
  coverLetter: "Cover letter",
  url: "URL",
  location: "Location (City, Country)",
  more: "Additional information",
  submit: "Submit",
};

const fieldClass =
  "h-11 w-full rounded-tile border border-border-10 bg-surface-primary px-4 text-[15px] leading-[1.3] text-text-primary outline-none transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-text-placeholder focus:border-border-16 focus-visible:ring-2 focus-visible:ring-border-interactive/30 motion-reduce:transition-none";
const areaClass = `${fieldClass} h-auto min-h-[120px] resize-y py-3`;
const labelClass = "text-[13px] leading-[1.5] text-text-tertiary";

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? <span aria-hidden="true">*</span> : null}
      </label>
      {children}
    </div>
  );
}

/**
 * Careers Apply v1
 * Application form in a muted card: name, e-mail, phone, read-only role, resume drop zone (click or
 * drag, size limit, PDF/DOC/DOCX), cover letter, URL, location, notes and a full-width primary pill.
 * Native validation; a missing resume shows an inline error; on a valid submit the form locks and
 * the confirmation appears in a reserved role="status" slot (no layout shift). Nothing is sent
 * anywhere until `onSubmit` is wired to a backend.
 */
export function CareersApply({
  id = "apply",
  roleTitle,
  headline = "Submit application",
  headlineMuted,
  maxFileMb = 25,
  accept = ".pdf,.doc,.docx",
  labels,
  confirmation = "Thanks, your application for {role} is in. We'll get back to you by e-mail.",
  onSubmit,
  className = "",
}: CareersApplyProps) {
  const uid = useId();
  const l = { ...DEFAULT_LABELS, ...labels };
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const takeFile = (f: File | undefined) => {
    if (!f) return;
    if (f.size > maxFileMb * 1024 * 1024) {
      setFile(null);
      setFileError(`That file is larger than ${maxFileMb} MB.`);
      return;
    }
    setFileError(null);
    setFile(f);
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => takeFile(e.target.files?.[0]);
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    takeFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please add your resume or CV.");
      fileInput.current?.focus();
      return;
    }
    onSubmit?.(new FormData(e.currentTarget));
    setDone(true);
  };

  const headingId = `${uid}-heading`;
  const statusId = `${uid}-status`;

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page py-16 md:py-24 xl:py-[120px] ${className}`}>
      <div className="mx-auto max-w-[760px] px-5 md:px-10">
        <Reveal amount={0.1}>
          <h2 id={headingId} {...reveal} className="max-w-[1000px] text-balance text-[28px] leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]">
            <TwoTone text={headline} muted={headlineMuted ?? `for ${roleTitle}`} />
          </h2>

          <form {...reveal} onSubmit={handleSubmit} aria-describedby={statusId} className="mt-10 flex flex-col gap-5 rounded-card bg-surface-muted p-5 md:mt-14 md:p-8 xl:mt-16">
            <fieldset disabled={done} className="contents">
              <div className="grid gap-5 md:grid-cols-2">
                <Field id={`${uid}-first`} label={l.firstName} required>
                  <input id={`${uid}-first`} name="firstName" type="text" required autoComplete="given-name" placeholder="Jane" className={fieldClass} />
                </Field>
                <Field id={`${uid}-last`} label={l.lastName} required>
                  <input id={`${uid}-last`} name="lastName" type="text" required autoComplete="family-name" placeholder="Smith" className={fieldClass} />
                </Field>
                <Field id={`${uid}-email`} label={l.email} required>
                  <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" placeholder="jane@email.com" className={fieldClass} />
                </Field>
                <Field id={`${uid}-phone`} label={l.phone}>
                  <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" placeholder="+1 555 222 4321" className={fieldClass} />
                </Field>
              </div>

              <Field id={`${uid}-role`} label={l.role} required>
                <input id={`${uid}-role`} name="role" type="text" readOnly value={roleTitle} className={`${fieldClass} bg-surface-secondary text-text-secondary`} />
              </Field>

              {/* Resume: a real file input, the drop zone is its visible target */}
              <div className="flex flex-col gap-2">
                <label htmlFor={`${uid}-resume`} className={labelClass}>
                  {l.resume}
                  <span aria-hidden="true">*</span>
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`relative flex min-h-[72px] items-center gap-3 rounded-tile border border-dashed bg-surface-primary px-4 py-3 transition-colors duration-150 ease-out motion-reduce:transition-none ${
                    dragging ? "border-border-interactive bg-surface-secondary" : "border-border-16"
                  }`}
                >
                  <input
                    ref={fileInput}
                    id={`${uid}-resume`}
                    name="resume"
                    type="file"
                    accept={accept}
                    onChange={onFileChange}
                    aria-describedby={`${uid}-resume-help`}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-icon-secondary">
                    <path d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                  <span id={`${uid}-resume-help`} className="text-[13px] leading-[1.5] text-text-tertiary md:text-[14px]">
                    {file ? <span className="text-text-primary">{file.name}</span> : l.resumeHint.replace("{max}", String(maxFileMb))}
                  </span>
                </div>
                {fileError ? (
                  <p role="alert" className="text-[13px] leading-[1.5] text-status-negative">
                    {fileError}
                  </p>
                ) : null}
              </div>

              <Field id={`${uid}-cover`} label={l.coverLetter}>
                <textarea id={`${uid}-cover`} name="coverLetter" placeholder="Anything you want to add" className={areaClass} />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field id={`${uid}-url`} label={l.url}>
                  <input id={`${uid}-url`} name="url" type="url" inputMode="url" placeholder="https://linkedin.com/in/yourprofile" className={fieldClass} />
                </Field>
                <Field id={`${uid}-location`} label={l.location} required>
                  <input id={`${uid}-location`} name="location" type="text" required placeholder="e.g. Berlin, Germany" className={fieldClass} />
                </Field>
              </div>

              <Field id={`${uid}-more`} label={l.more}>
                <textarea id={`${uid}-more`} name="additionalInformation" placeholder="Notes, portfolio, social profiles, etc." className={areaClass} />
              </Field>

              <Button type="submit" variant="primary" size="lg" className="mt-2 w-full">
                {l.submit}
              </Button>
            </fieldset>

            {/* Reserved status line: never moves the layout */}
            <p id={statusId} role="status" aria-live="polite" className="min-h-[20px] text-[13px] leading-[1.5] text-text-tertiary md:text-[14px]">
              {done ? confirmation.replace("{role}", roleTitle) : ""}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
