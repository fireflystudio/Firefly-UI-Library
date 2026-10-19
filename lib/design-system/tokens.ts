import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Reads the `@theme` block of registry/firefly/styles/firefly.css so the design-system pages show
 * the real token values (one source of truth: edit the CSS, the pages follow).
 *
 * A comment after a blank line starts a group ("Text", "Surfaces" …); a comment right under a
 * token becomes a note on the next token.
 */
export type Token = { name: string; value: string; note?: string };
export type TokenGroup = { title: string; note?: string; tokens: Token[] };

export function readTokenGroups(): TokenGroup[] {
  const css = readFileSync(path.join(process.cwd(), "registry/firefly/styles/firefly.css"), "utf8");
  const start = css.indexOf("@theme {");
  const end = css.indexOf("\n}", start);
  const lines = css.slice(start + "@theme {".length, end).split("\n");

  const groups: TokenGroup[] = [];
  let current: TokenGroup | null = null;
  let prevBlank = true;
  let pendingNote: string | undefined;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      prevBlank = true;
      continue;
    }
    const comment = line.match(/^\/\*\s*([\s\S]+?)\s*\*\/$/);
    if (comment) {
      if (prevBlank || !current) {
        const m = comment[1].match(/^([^(]+?)\s*(?:\((.+)\))?$/);
        current = { title: (m?.[1] ?? comment[1]).trim(), note: m?.[2]?.trim(), tokens: [] };
        groups.push(current);
      } else {
        pendingNote = comment[1];
      }
      prevBlank = false;
      continue;
    }
    const token = line.match(/^(--[\w-]+):\s*(.+?);$/);
    if (token && current) {
      current.tokens.push({ name: token[1], value: token[2], note: pendingNote });
      pendingNote = undefined;
    }
    prevBlank = false;
  }
  return groups;
}

export const colourGroups = () => readTokenGroups().filter((g) => g.tokens.some((t) => t.name.startsWith("--color-")));
export const tokenGroup = (prefix: string) => readTokenGroups().filter((g) => g.tokens.some((t) => t.name.startsWith(prefix)));

/** `--color-text-primary` → `text-primary` (the part used in utilities: text-text-primary, bg-text-primary) */
export const shortName = (name: string) => name.replace(/^--(color|radius|shadow|font|ease)-/, "");
