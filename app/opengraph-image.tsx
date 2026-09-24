import { ImageResponse } from "next/og";

// Default violet accent constant from lib/colors.ts: oklch(0.55 0.2 280) ≈ #8b5cf6
const DEFAULT_VIOLET_HEX = "#8b5cf6";

export const alt = "SimpleThink — Keep It Simple. Make It Luxury.";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b", // zinc-950
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 128, fontWeight: "bold", display: "flex" }}>
          <span>Simple</span>
          <span style={{ color: DEFAULT_VIOLET_HEX }}>Think</span>
        </div>
        <p style={{ fontSize: 32, color: "#a1a1aa", marginTop: 40 }}>
          Keep It Simple. Make It Luxury.
        </p>
      </div>
    ),
    { ...size }
  );
}
