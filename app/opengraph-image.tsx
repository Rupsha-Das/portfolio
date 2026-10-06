import { ImageResponse } from "next/og";

export const alt = "Rupsha Das — Full-Stack Developer. Reliable software people enjoy using.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Homepage Open Graph image. Matches the studio-ledger identity:
 * warm paper, ink typography, clay accent. Statically generated
 * at build time — no extra dependencies.
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
          background: "#faf6ed",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        {/* ledger rule + margin line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: "flex",
            border: "24px solid #faf6ed",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              border: "2px solid rgba(29,25,18,0.5)",
              borderRadius: "24px",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: "96px",
            top: 0,
            bottom: 0,
            width: "2px",
            background: "rgba(182,70,28,0.35)",
          }}
        />

        {/* content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 80px 80px 140px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 26,
              letterSpacing: 6,
              color: "#57503f",
              fontFamily: "monospace",
            }}
          >
            RUPSHA DAS · STUDIO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 900,
              letterSpacing: -4,
              color: "#1d1912",
              lineHeight: 1,
              marginTop: 8,
            }}
          >
            Rupsha.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontStyle: "italic",
              color: "#b6461c",
              marginTop: 8,
            }}
          >
            Reliable software, honestly built.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(29,25,18,0.6)",
              letterSpacing: 2,
              marginTop: 28,
              fontFamily: "monospace",
            }}
          >
            FULL-STACK · AI · EMBEDDED
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
