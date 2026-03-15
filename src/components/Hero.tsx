export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden flex"
      style={{
        height: "100svh",
        minHeight: "600px",
        background: "radial-gradient(circle at center, #163824 0%, #050D08 100%)",
      }}
    >
      {/* ── Injected styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Serif+Display:ital@1&display=swap');
        @keyframes floatBottle {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(-5deg); }
          50% { transform: translate(-50%, -50%) translateY(-16px) rotate(-5deg); }
        }
        .product-bottle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(150px, 20vw, 290px);
          animation: floatBottle 3.8s ease-in-out infinite;
          filter: drop-shadow(0 40px 80px rgba(0,0,0,0.7));
          z-index: 20;
        }
        .anton { font-family: 'Anton', sans-serif; }
        .dm-serif { font-family: 'DM Serif Display', serif; }
      `}</style>

      {/* ── Texture Overlay ── */}
      <div className="pointer-events-none absolute inset-0 z-40 opacity-15 overflow-hidden mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* ── Outer Frame Lines ── */}
      <div className="absolute pointer-events-none z-10 border border-[#F0EAD6]/20 left-4 right-4 top-4 bottom-4 md:left-6 md:right-6 md:top-6 md:bottom-6" />
      <div className="absolute pointer-events-none z-10 border-l border-[#F0EAD6]/20 top-4 bottom-4 left-14 md:top-6 md:bottom-6 md:left-[88px]" />

      {/* ── Giant Background Text ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none">
        {["BREATHE", "NATURAL", "FRESH"].map((word, i) => (
          <span
            key={i}
            className="anton uppercase"
            style={{
              fontSize: "clamp(70px, 18vw, 300px)",
              color: "#2A6040",
              opacity: 0.55,
              lineHeight: 0.82,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* ── Sidebar Icons ── */}
      <div className="absolute top-10 left-4 w-10 md:left-6 md:w-[64px] md:top-14 z-30 flex flex-col items-center gap-6">
        <div className="cursor-pointer space-y-[4px] p-2 hover:opacity-80 transition-opacity">
          <div className="w-5 h-[2px] bg-[#F0EAD6]" />
          <div className="w-5 h-[2px] bg-[#F0EAD6]" />
          <div className="w-5 h-[2px] bg-[#F0EAD6]" />
        </div>
        <div className="cursor-pointer p-2 hover:opacity-80 transition-opacity">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F0EAD6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>

      {/* ── Top Left Brand Block ── */}
      <div className="absolute top-8 left-20 md:top-12 md:left-[120px] z-30">
        <h1
          className="anton uppercase leading-none"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            color: "#F0EAD6",
            letterSpacing: "0.02em",
          }}
        >
          SOLEFRESH
        </h1>
        <div className="flex items-center mt-1">
          <span
            className="uppercase font-bold tracking-[0.2em] text-[#F0EAD6]"
            style={{ fontSize: "clamp(8px, 1vw, 10px)" }}
          >
            — NATURAL SHOE CARE —
          </span>
        </div>
      </div>

      {/* ── Top Right CTA ── */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-30">
        <button
          className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-[10px] hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#4CAF6F" }}
        >
          <span className="font-bold tracking-[0.1em] md:tracking-[0.15em] text-[#0A1A0F] text-[10px] md:text-xs uppercase mt-0.5">
            SHOP SOLEFRESH
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0A1A0F"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </button>
      </div>

      {/* ── Floating Product Bottle ── */}
      <img
        src="/product.png"
        alt="SoleFresh Natural Shoe Deodorizer"
        className="product-bottle"
      />

      {/* ── Bottom Left Title ── */}
      <div className="absolute bottom-10 left-20 md:bottom-16 md:left-[120px] z-30 flex flex-col pointer-events-none">
        <div
          className="dm-serif italic mb-1 md:mb-2 opacity-90"
          style={{ color: "#F0EAD6", fontSize: "clamp(16px, 2vw, 24px)" }}
        >
          Natural Shoe Deodorizer
        </div>
        <span
          className="anton uppercase leading-[0.85]"
          style={{
            fontSize: "clamp(50px, 12vw, 160px)",
            color: "#F0EAD6",
            letterSpacing: "0.01em",
          }}
        >
          SOLE
        </span>
        <div style={{ overflow: "hidden", height: "clamp(25px, 6vw, 80px)" }}>
          <span
            className="anton uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(50px, 12vw, 160px)",
              color: "#F0EAD6",
              display: "block",
              letterSpacing: "0.01em",
            }}
          >
            FRESH
          </span>
        </div>
      </div>

      {/* ── Bottom Right Specs Card ── */}
      <div
        className="hidden md:flex absolute bottom-12 right-12 md:bottom-16 md:right-16 z-30 p-6 w-[340px] flex-col gap-3"
        style={{
          backgroundColor: "rgba(10,26,15,0.75)",
          backdropFilter: "blur(8px)",
          borderLeft: "2px solid #4CAF6F",
          borderTop: "1px solid rgba(240,234,214,0.1)",
          borderRight: "1px solid rgba(240,234,214,0.1)",
          borderBottom: "1px solid rgba(240,234,214,0.1)",
        }}
      >
        <div className="border-b border-[#F0EAD6]/20 pb-3 mb-1">
          <span className="anton tracking-wider uppercase text-[#F0EAD6] text-[16px]">
            SPEC — 100ML · PLANT-BASED · 30+ USES
          </span>
        </div>
        <p className="text-[#F0EAD6] text-sm leading-relaxed opacity-90 font-medium tracking-wide">
          SoleFresh eliminates shoe odor at the source using plant-based actives. No harsh chemicals. Safe for all materials.
        </p>
        <div className="mt-2">
          <span className="anton text-[#F0EAD6] text-[15px] tracking-widest uppercase cursor-pointer hover:text-[#4CAF6F] transition-colors">
            LEARN MORE →
          </span>
        </div>
      </div>
    </section>
  );
}
