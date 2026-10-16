import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { MOCK_RESPONSE } from "@/lib/plan/mock-plan";
import { SYSTEM_PROMPT } from "@/lib/plan/prompt";
import { PlanResponseSchema, SitePlanSchema, type ChatMessage, type PlanResponse, type SitePlan } from "@/lib/plan/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const MODEL = "claude-opus-5-5";

type Body = { messages: ChatMessage[]; plan?: SitePlan | null };

/** POST /api/plan — the site-builder chat: conversation + current plan in, reply + updated plan out. */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const messages = Array.isArray(body.messages) ? body.messages.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string") : [];
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "The last message must come from the user" }, { status: 400 });
  }
  const previous = body.plan ? SitePlanSchema.safeParse(body.plan) : null;
  const previousPlan = previous?.success ? previous.data : null;

  const useMock = process.env.AI_MOCK === "1" || (!process.env.ANTHROPIC_API_KEY && process.env.NODE_ENV !== "production");
  if (useMock) {
    await new Promise((r) => setTimeout(r, 900));
    return NextResponse.json(finalize(MOCK_RESPONSE, previousPlan));
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set. Add it in Vercel → Project → Settings → Environment Variables (and in .env.local for local development), then redeploy." },
      { status: 503 }
    );
  }

  const client = new Anthropic();
  const history: Anthropic.MessageParam[] = messages.map((m, i) => {
    const isLast = i === messages.length - 1;
    const content =
      isLast && previousPlan
        ? `${m.content}\n\n<current_plan>\n${JSON.stringify(previousPlan)}\n</current_plan>\nRevise the plan above according to my message and return the complete updated plan.`
        : m.content;
    return { role: m.role, content };
  });

  try {
    const first = await ask(client, history);
    let parsed = parsePlan(first);
    if (!parsed.ok) {
      // One repair round: show the model the validation problem and ask for corrected JSON only.
      const repaired = await ask(client, [
        ...history,
        { role: "assistant", content: first },
        { role: "user", content: `That JSON was invalid: ${parsed.error}. Return only the corrected JSON object.` },
      ]);
      parsed = parsePlan(repaired);
      if (!parsed.ok) return NextResponse.json({ error: `The model returned an invalid plan: ${parsed.error}` }, { status: 502 });
    }
    return NextResponse.json(finalize(parsed.value, previousPlan));
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) return NextResponse.json({ error: "The Anthropic API key was rejected." }, { status: 503 });
    if (error instanceof Anthropic.RateLimitError) return NextResponse.json({ error: "Rate limited by the Anthropic API. Try again in a moment." }, { status: 429 });
    if (error instanceof Anthropic.APIError) return NextResponse.json({ error: `Anthropic API error ${error.status}: ${error.message}` }, { status: 502 });
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function ask(client: Anthropic, messages: Anthropic.MessageParam[]): Promise<string> {
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages,
    output_config: { effort: "high" },
  });
  const final = await stream.finalMessage();
  if (final.stop_reason === "refusal") throw new Error("The model declined this request.");
  return final.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");
}

function parsePlan(text: string): { ok: true; value: PlanResponse } | { ok: false; error: string } {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return { ok: false, error: "no JSON object found" };
  let json: unknown;
  try {
    json = JSON.parse(text.slice(start, end + 1));
  } catch (e) {
    return { ok: false, error: `JSON.parse failed: ${(e as Error).message}` };
  }
  const result = PlanResponseSchema.safeParse(json);
  if (!result.success) return { ok: false, error: result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).slice(0, 5).join("; ") };
  return { ok: true, value: result.data };
}

/** Give every section an id and carry generated images over from the previous plan when the prompt is unchanged. */
function finalize(response: PlanResponse, previous: SitePlan | null): PlanResponse {
  const prevImages = new Map<string, string>();
  previous?.sections.forEach((s) => s.images?.forEach((img) => img.src && prevImages.set(`${s.component}|${img.slot}|${img.prompt}`, img.src)));
  const used = new Set<string>();
  const sections = response.plan.sections.map((s, i) => {
    const id = s.id && !used.has(s.id) ? s.id : `${s.component}-${i + 1}-${Math.random().toString(36).slice(2, 7)}`;
    used.add(id);
    const images = s.images?.map((img) => ({ ...img, src: img.src ?? prevImages.get(`${s.component}|${img.slot}|${img.prompt}`) }));
    return { ...s, id, images };
  });
  return { reply: response.reply, plan: { ...response.plan, sections } };
}
