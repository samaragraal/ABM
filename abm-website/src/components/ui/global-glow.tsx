export function GlobalGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
      {/* Top-left blue */}
      <div
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          maxWidth: 600,
          maxHeight: 600,
          top: "-15%",
          left: "-10%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.13) 0%, transparent 70%)",
          animation: "glow-drift-a 18s ease-in-out infinite",
          filter: "blur(4px)",
        }}
      />
      {/* Bottom-right indigo */}
      <div
        style={{
          position: "absolute",
          width: "55vw",
          height: "55vw",
          maxWidth: 560,
          maxHeight: 560,
          bottom: "-15%",
          right: "-10%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(99,60,220,0.11) 0%, transparent 70%)",
          animation: "glow-drift-b 24s ease-in-out infinite",
          filter: "blur(4px)",
        }}
      />
      {/* Top-right cyan */}
      <div
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          maxWidth: 420,
          maxHeight: 420,
          top: "10%",
          right: "-8%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(6,182,212,0.07) 0%, transparent 70%)",
          animation: "glow-drift-c 15s ease-in-out infinite",
          filter: "blur(6px)",
        }}
      />
      {/* Mid violet */}
      <div
        style={{
          position: "absolute",
          width: "35vw",
          height: "35vw",
          maxWidth: 380,
          maxHeight: 380,
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(124,58,237,0.07) 0%, transparent 70%)",
          animation: "glow-pulse 14s ease-in-out infinite",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
