"use client";

import { useEffect, useRef, useState } from "react";
import { putImage } from "@/lib/plan/image-store";
import type { ChatMessage, PlanResponse } from "@/lib/plan/types";
import { useSelection } from "./selection";

const CHAT_KEY = "firefly-ui-library:chat";

const SUGGESTIONS = [
  "Landing page dla aplikacji do rezerwacji stolików w restauracjach. Klient: właściciele małych restauracji. Cel: zapisy na darmowy okres próbny.",
  "Strona studia architektury wnętrz z Warszawy: portfolio realizacji, proces współpracy, opinie klientów, kontakt.",
  "Strona produktu SaaS do zarządzania fakturami dla freelancerów. Ton: spokojny, konkretny. Cel: rejestracja.",
];

/**
 * Site-builder chat: describe the site, get a plan (sections + copy + image prompts) from the
 * planner API, refine it in conversation, then generate the images.
 */
export function BuildChat() {
  const { plan, sections, setPlan, setImageSrc, clear } = useSelection();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageProgress, setImageProgress] = useState<{ done: number; total: number } | null>(null);
  const [ready, setReady] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CHAT_KEY);
      if (raw) setMessages(JSON.parse(raw) as ChatMessage[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages, ready]);
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const pendingImages = sections.flatMap((s) => (s.images ?? []).filter((im) => !im.src).map((im) => ({ sectionId: s.id!, image: im })));

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, plan }),
      });
      const data = (await res.json()) as PlanResponse & { error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? `Request failed (${res.status})`);
      setPlan(data.plan);
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function generateImages() {
    if (busy || pendingImages.length === 0) return;
    setBusy(true);
    setError(null);
    setImageProgress({ done: 0, total: pendingImages.length });
    try {
      for (let i = 0; i < pendingImages.length; i++) {
        const { sectionId, image } = pendingImages[i];
        const res = await fetch("/api/images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: image.prompt, orientation: image.orientation }),
        });
        const data = (await res.json()) as { dataUrl?: string; error?: string };
        if (!res.ok || !data.dataUrl) throw new Error(data.error ?? `Image request failed (${res.status})`);
        const key = `${sectionId}:${image.slot}:${Date.now()}`;
        await putImage(key, data.dataUrl);
        setImageSrc(sectionId, image.slot, `idb:${key}`);
        setImageProgress({ done: i + 1, total: pendingImages.length });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Image generation failed");
    } finally {
      setBusy(false);
      setImageProgress(null);
    }
  }

  function startOver() {
    setMessages([]);
    setError(null);
    clear();
  }

  const toolBtn =
    "inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-pill border border-border-light bg-surface-primary px-3.5 text-[13px] font-medium leading-none text-text-primary transition-opacity duration-200 ease-out hover:opacity-70 disabled:cursor-default disabled:opacity-40";

  return (
    <section aria-labelledby="chat-heading" className="flex h-full min-h-0 flex-col rounded-card border border-border-06 bg-surface-primary">
      <div className="flex items-center justify-between gap-3 border-b border-border-06 px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <h2 id="chat-heading" className="text-[16px] font-medium leading-[normal] text-text-primary">
            Describe your site
          </h2>
          <p className="text-[13px] leading-[1.5] text-text-nav">Who it is for, what it sells, the tone. The planner picks sections, writes the copy and proposes photos.</p>
        </div>
        {messages.length > 0 ? (
          <button type="button" onClick={startOver} className={toolBtn}>
            Start over
          </button>
        ) : null}
      </div>

      <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-4 [scrollbar-width:thin]">
        {messages.length === 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-[13px] text-text-quaternary">Try one of these, or write your own brief:</p>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="cursor-pointer rounded-tile border border-border-06 bg-surface-muted/60 px-3.5 py-2.5 text-left text-[13.5px] leading-[1.5] text-text-nav transition-[background-color,color] duration-200 ease-out hover:bg-surface-muted hover:text-text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] whitespace-pre-wrap rounded-frame px-4 py-3 text-[14px] leading-[1.55] ${
                m.role === "user" ? "bg-button-primary text-button-content-primary" : "border border-border-06 bg-surface-muted/60 text-text-primary"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {busy ? (
          <div className="flex justify-start">
            <div className="rounded-frame border border-border-06 bg-surface-muted/60 px-4 py-3 text-[13px] text-text-nav" role="status">
              {imageProgress ? `Generating image ${imageProgress.done + 1} of ${imageProgress.total}…` : "Planning the site…"}
            </div>
          </div>
        ) : null}
        {error ? (
          <p role="alert" className="rounded-frame border border-status-negative/20 bg-status-negative-bg px-4 py-3 text-[13px] leading-[1.5] text-status-negative">
            {error}
          </p>
        ) : null}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex flex-col gap-3 border-t border-border-06 px-5 py-4"
      >
        <label htmlFor="chat-input" className="sr-only">
          Your brief
        </label>
        <textarea
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(input);
          }}
          rows={3}
          placeholder={messages.length === 0 ? "Describe the site…" : "Ask for changes: shorter copy, a different hero, add a FAQ…"}
          className="w-full resize-none rounded-tile border border-border-light bg-surface-primary px-3.5 py-2.5 text-[14px] leading-[1.5] text-text-primary placeholder:text-text-placeholder"
        />
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {pendingImages.length > 0 ? (
              <button type="button" onClick={generateImages} disabled={busy} className={toolBtn}>
                Generate images
                <span className="font-mono text-[11px] text-text-quaternary">{pendingImages.length}</span>
              </button>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="inline-flex h-[34px] cursor-pointer items-center rounded-pill bg-button-primary px-4 text-[13px] font-medium leading-none text-button-content-primary transition-opacity duration-200 ease-out hover:opacity-85 disabled:cursor-default disabled:opacity-40"
          >
            {messages.length === 0 ? "Plan the site" : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
