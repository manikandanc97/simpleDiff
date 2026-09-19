import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SimpleDiff - Keep It Simple. Make It Different.";
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
          <span style={{ color: "#a855f7" }}>Diff</span> {/* Violet primary approximation */}
        </div>
        <p style={{ fontSize: 32, color: "#a1a1aa", marginTop: 40 }}>
          Keep It Simple. Make It Different.
        </p>
      </div>
    ),
    { ...size }
  );
}
