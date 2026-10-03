import { ImageResponse } from "next/og";

export const alt = "Rupsha Das — Full-Stack Developer. React · Next.js · Node.js · AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Homepage Open Graph image. Matches the portfolio visual language:
 * dark void background, lime/violet glows, editorial typography.
 * Statically generated at build time — no extra dependencies.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          background: "#08090d",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* glow accents */}
        <div
          style={{
            position: "absolute",
            left: "-120px",
            top: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            background: "rgba(215,255,63,0.16)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-140px",
            bottom: "-160px",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background: "rgba(139,92,255,0.22)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "120px",
            top: "-80px",
            width: "300px",
            height: "300px",
            borderRadius: "9999px",
            background: "rgba(125,238,255,0.10)",
          }}
        />

        {/* content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              letterSpacing: 6,
              color: "#d7ff3f",
            }}
          >
            RUPSHA DAS · PORTFOLIO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 130,
              fontWeight: 800,
              letterSpacing: -4,
              color: "#f5f3ee",
              lineHeight: 1,
              marginTop: 12,
            }}
          >
            RUPSHA.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                background: "#8b5cff",
                color: "#ffffff",
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: 2,
                padding: "12px 28px",
              }}
            >
              FULL-STACK DEVELOPER
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "rgba(245,243,238,0.75)",
              letterSpacing: 1,
              marginTop: 24,
            }}
          >
            React · Next.js · Node.js · AI
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "rgba(245,243,238,0.45)",
              letterSpacing: 2,
              marginTop: 28,
            }}
          >
            rupshadas.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
