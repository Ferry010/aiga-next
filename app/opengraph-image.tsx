import { ImageResponse } from "next/og";

export const alt = "AI Geletterdheid Academy | EU AI Act Training voor Organisaties";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
            borderRadius: "12px",
            padding: "8px 20px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "32px",
            letterSpacing: "0.05em",
          }}
        >
          AIGA
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "56px",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "900px",
            marginBottom: "24px",
          }}
        >
          AI Geletterdheid Academy
        </div>
        <div
          style={{
            color: "#a1a1aa",
            fontSize: "26px",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          EU AI Act training en certificering voor organisaties
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            color: "#52525b",
            fontSize: "18px",
          }}
        >
          aigeletterdheid.academy
        </div>
      </div>
    ),
    { ...size }
  );
}
