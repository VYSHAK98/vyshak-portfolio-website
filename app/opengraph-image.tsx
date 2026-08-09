import { ImageResponse } from "next/og";

/**
 * Generated at request time via Next's built-in ImageResponse (Satori) —
 * no external image tool or extra dependency, and Next automatically
 * wires this into both og:image and (as a fallback) twitter:image.
 * Replace the JSX below directly to change the design; there's no
 * separate static file to keep in sync.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vyshak Harikumar — Frontend Engineer, AI Interfaces";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #0a0f1c 0%, #050505 62%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,140,255,.32), rgba(79,140,255,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            border: "1px solid rgba(255,255,255,.08)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4F8CFF", display: "flex" }} />
          <div style={{ fontSize: 24, letterSpacing: 8, color: "#9dbcff", display: "flex" }}>
            FRONTEND ENGINEER — AI INTERFACES
          </div>
        </div>

        <div style={{ fontSize: 104, fontWeight: 700, color: "#fff", letterSpacing: -3, display: "flex" }}>
          Vyshak Harikumar
        </div>

        <div style={{ fontSize: 32, color: "#9B9B9B", marginTop: 28, display: "flex" }}>
          React · Next.js · TypeScript
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 56,
          }}
        >
          {["React", "Next.js", "TypeScript", "AI Interfaces"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                fontSize: 20,
                color: "#c9c9c9",
                padding: "10px 22px",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,.14)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
