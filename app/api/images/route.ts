import { NextResponse } from "next/server";
import { IMAGE_STYLE } from "@/lib/plan/prompt";

export const runtime = "nodejs";
export const maxDuration = 120;

type Body = { prompt: string; orientation?: "landscape" | "portrait" | "square" };

const SIZES = { landscape: "1536x1024", portrait: "1024x1536", square: "1024x1024" } as const;

/** POST /api/images — generates one cinematic photo for a plan image slot; returns a JPEG data URL. */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  const orientation = body.orientation && body.orientation in SIZES ? body.orientation : "landscape";
  if (!prompt) return NextResponse.json({ error: "prompt is required" }, { status: 400 });

  if (process.env.AI_MOCK === "1" || (!process.env.OPENAI_API_KEY && process.env.NODE_ENV !== "production")) {
    await new Promise((r) => setTimeout(r, 500));
    return NextResponse.json({ dataUrl: mockImage(orientation) });
  }
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not set, so images cannot be generated. Add it in Vercel → Settings → Environment Variables." },
      { status: 501 }
    );
  }

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: `${prompt}. ${IMAGE_STYLE}`,
      size: SIZES[orientation],
      quality: "medium",
      output_format: "jpeg",
      output_compression: 80,
      n: 1,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: `Image API error ${res.status}: ${text.slice(0, 300)}` }, { status: 502 });
  }
  const data = (await res.json()) as { data?: { b64_json?: string }[] };
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) return NextResponse.json({ error: "Image API returned no image" }, { status: 502 });
  return NextResponse.json({ dataUrl: `data:image/jpeg;base64,${b64}` });
}

/** Offline stand-in: a soft warm gradient in the requested orientation (no text). */
function mockImage(orientation: keyof typeof SIZES): string {
  const [w, h] = SIZES[orientation].split("x").map(Number);
  const hue = 20 + Math.floor(Math.random() * 30);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue},35%,78%)"/><stop offset="1" stop-color="hsl(${hue + 180},18%,42%)"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><circle cx="${w * 0.68}" cy="${h * 0.38}" r="${Math.min(w, h) * 0.22}" fill="hsl(${hue + 10},45%,88%)" opacity="0.55"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
