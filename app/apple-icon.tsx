import { ImageResponse } from "next/og";

/**
 * Replaces the previous manual <link rel="apple-touch-icon" href="data:...">
 * in layout.tsx. Next's apple-icon file convention only accepts raster
 * images (jpg/png) — not the svg used for app/icon.svg — so this
 * generates the 180x180 PNG on demand via ImageResponse instead of a
 * hand-maintained data URI. Full-bleed, no rounded corners: iOS applies
 * its own mask.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #101a2e 0%, #070707 75%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
          <div style={{ display: "flex", color: "#fff" }}>VH</div>
          <div style={{ display: "flex", color: "#4F8CFF" }}>.</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
