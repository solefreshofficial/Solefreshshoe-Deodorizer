export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", backgroundColor: "#F5F2EA", minHeight: 600 }}
    >
      {/* ── Injected styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
        @keyframes floatUpDown {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-12px); }
        }
        .product-float {
          position: absolute;
          top: 50%;
          left: 50%;
          animation: floatUpDown 3s ease-in-out infinite;
          filter: drop-shadow(0 30px 60px rgba(0,0,0,0.28));
          z-index: 20;
        }
        .anton { font-family: 'Anton', sans-serif; }
        .hero-buy-btn:hover { background-color: #4CAF6F !important; }
      `}</style>

      {/* ── Giant background text ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 0, pointerEvents: "none", userSelect: "none" }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(80px, 22vw, 300px)",
            color: "#1A3A2A",
            opacity: 0.12,
            display: "block",
            textTransform: "uppercase",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          BREATHE
        </span>
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(80px, 22vw, 300px)",
            color: "#1A3A2A",
            opacity: 0.12,
            display: "block",
            textTransform: "uppercase",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
          }}
        >
          FRESH
        </span>
      </div>

      {/* ── Product image (floating) ── */}
      <img
        src="/product.png"
        alt="SoleFresh Shoe Deodorizer"
        className="product-float"
        style={{ width: "clamp(140px, 20vw, 280px)" }}
      />

      {/* ── Top navbar ── */}
      <nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:px-6 md:py-5"
        style={{ zIndex: 30 }}
      >
        {/* LEFT — sidebar icons */}
        <div className="flex flex-col gap-4">
          {/* Hamburger */}
          <div>
            <div style={{ width: 20, height: 1.5, backgroundColor: "#1A3A2A", marginBottom: 4 }} />
            <div style={{ width: 20, height: 1.5, backgroundColor: "#1A3A2A", marginBottom: 4 }} />
            <div style={{ width: 20, height: 1.5, backgroundColor: "#1A3A2A" }} />
          </div>
          {/* Search */}
          <svg width={18} height={18} viewBox="0 0 20 20" fill="none">
            <circle cx={8} cy={8} r={5} stroke="#1A3A2A" strokeWidth={1.5} />
            <line x1={12} y1={12} x2={17} y2={17} stroke="#1A3A2A" strokeWidth={1.5} />
          </svg>
        </div>

        {/* CENTER — brand name */}
        <div
          className="absolute"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
            letterSpacing: "0.25em",
            fontSize: 11,
            color: "#1A3A2A",
          }}
        >
          SOLEFRESH
        </div>

        {/* RIGHT — CTA button */}
        <button
          className="hero-buy-btn"
          style={{
            backgroundColor: "#1A3A2A",
            color: "#F5F2EA",
            padding: "8px 20px",
            fontSize: 10,
            fontWeight: "bold",
            letterSpacing: "0.2em",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
            borderRadius: 0,
          }}
        >
          BUY NOW
        </button>
      </nav>

      {/* ── Bottom-left text block ── */}
      <div
        className="absolute bottom-5 left-4 md:bottom-8 md:left-10"
        style={{ zIndex: 20 }}
      >
        {/* Small italic label */}
        <div
          style={{
            fontSize: 11,
            fontStyle: "italic",
            color: "#1A3A2A",
            opacity: 0.6,
            marginBottom: 4,
          }}
        >
          Natural Shoe Deodorizer
        </div>

        {/* Large word SOLE */}
        <span
          className="anton"
          style={{
            fontSize: "clamp(40px, 8vw, 100px)",
            color: "#1A3A2A",
            lineHeight: 1,
            display: "block",
          }}
        >
          SOLE
        </span>

        {/* Partial word FRESH — top-half visible */}
        <div
          style={{
            overflow: "hidden",
            height: "clamp(20px, 4vw, 50px)",
          }}
        >
          <span
            className="anton"
            style={{
              fontSize: "clamp(40px, 8vw, 100px)",
              color: "#1A3A2A",
              display: "block",
              lineHeight: 1,
            }}
          >
            FRESH
          </span>
        </div>
      </div>

      {/* ── Bottom-right stats card ── */}
      <div
        className="hidden md:block absolute"
        style={{
          bottom: 32,
          right: 32,
          zIndex: 20,
          border: "1px solid rgba(26,58,42,0.35)",
          padding: 16,
          backgroundColor: "rgba(245,242,234,0.85)",
          width: 176,
        }}
      >
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "#1A3A2A",
            opacity: 0.5,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          EFFECTIVENESS
        </div>
        <div
          className="anton"
          style={{ fontSize: 36, color: "#1A3A2A", lineHeight: 1, marginBottom: 8 }}
        >
          98%
        </div>
        <hr
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "rgba(26,58,42,0.2)",
            border: "none",
            marginBottom: 8,
          }}
        />
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "#1A3A2A",
            opacity: 0.5,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          BACTERIA KILLED
        </div>
        <div
          className="anton"
          style={{ fontSize: 36, color: "#1A3A2A", lineHeight: 1, marginBottom: 4 }}
        >
          24hrs
        </div>
        <div
          style={{ fontSize: 9, color: "#1A3A2A", opacity: 0.5, marginBottom: 12 }}
        >
          Lasting freshness
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.1em",
            color: "#1A3A2A",
            textDecoration: "underline",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          LEARN MORE →
        </div>
      </div>
    </section>
  );
}
