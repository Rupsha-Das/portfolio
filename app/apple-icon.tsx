import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon — reuses the existing favicon branding
 * (dark rounded square, lime "R.", violet dot).
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
          background: "#08090d",
          borderRadius: "40px",
          position: "relative",
          fontFamily: "monospace,sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#d7ff3f" }}>
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
            background: "#8b5cff",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
