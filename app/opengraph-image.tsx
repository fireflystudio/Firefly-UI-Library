import { ImageResponse } from "next/og";

export const alt = "Firefly UI Library — every section Firefly builds, content-free and ready to install.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fdfcfc",
          color: "#0a0a0a",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, fontSize: 28 }}>
          <span style={{ fontWeight: 500 }}>Firefly</span>
          <span style={{ color: "#919191" }}>UI Library</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.04, letterSpacing: "-0.03em", maxWidth: 1000 }}>
          <span>Every section Firefly builds,</span>
          <span style={{ color: "#919191" }}>content-free and ready to install.</span>
        </div>
        <div style={{ display: "flex", gap: 10, fontSize: 20, color: "#6b6b6b" }}>
          <span>Preview at 390 · 834 · 1440</span>
          <span>·</span>
          <span>npx shadcn add</span>
        </div>
      </div>
    ),
    size
  );
}
