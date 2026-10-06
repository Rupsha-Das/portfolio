import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — studio-ledger branding
 * (warm paper rounded square, ink "R.", clay dot).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6ed",
          borderRadius: "40px",
          position: "relative",
          fontFamily: "monospace,sans-serif",
          border: "6px solid #1d1912",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#1d1912" }}>
          R.
        </div>
        <div
          style={{
            position: "absolute",
            right: "34px",
            bottom: "40px",
            width: "18px",
            height: "18px",
            borderRadius: "9999px",
            background: "#b6461c",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
