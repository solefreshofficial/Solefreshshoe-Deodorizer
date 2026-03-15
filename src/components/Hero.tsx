import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Dramatic scroll animations
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [0.55, 0]);
  
  const bottleY = useTransform(scrollYProgress, [0, 1], ["-50%", "20%"]);
  const bottleRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const borderOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const borderScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const imagePath = `${import.meta.env.BASE_URL}product.png`;

  return (
    <section
      ref={containerRef}
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
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
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

      {/* ── Outer Frame Lines (Animated) ── */}
      <motion.div 
        className="absolute pointer-events-none z-10 border border-[#F0EAD6]/20 left-4 right-4 top-4 bottom-4 md:left-6 md:right-6 md:top-6 md:bottom-6 origin-center"
        style={{ opacity: borderOpacity, scale: borderScale }}
      />
      <motion.div 
        className="absolute pointer-events-none z-10 border-l border-[#F0EAD6]/20 top-4 bottom-4 left-14 md:top-6 md:bottom-6 md:left-[88px]"
        style={{ opacity: borderOpacity }}
      />

      {/* ── Giant Background Text (Animated) ── */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none select-none gap-2 md:gap-4"
        style={{ y: textY, opacity: textOpacity }}
      >
        {["FRESH SHOES", "EVERY DAY"].map((word, i) => (
          <span
            key={i}
            className="anton uppercase"
            style={{
              fontSize: "clamp(60px, 15vw, 240px)",
              color: "#2A6040",
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>

      {/* ── Floating Product Bottle (Animated on Scroll + Keyframes) ── */}
      <motion.div
        className="absolute top-[50%] left-[50%] z-20 pointer-events-none"
        style={{ 
          x: "-50%", 
          y: bottleY,
          rotate: bottleRotate,
          scale: bottleScale
        }}
      >
        <img
          src={imagePath}
          alt="SoleFresh Natural Shoe Deodorizer"
          style={{ 
            width: "clamp(150px, 20vw, 290px)", 
            animation: "subtleFloat 3.8s ease-in-out infinite",
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7))",
            transform: "rotate(-5deg)", // Base rotation
          }}
        />
      </motion.div>

      {/* ── Bottom Left Title ── */}
      <motion.div 
        className="absolute bottom-10 left-20 md:bottom-16 md:left-[120px] z-30 flex flex-col pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
      >
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
      </motion.div>

      {/* ── Bottom Right Specs Card ── */}
      <motion.div
        className="hidden md:flex absolute bottom-12 right-12 md:bottom-16 md:right-16 z-30 p-6 w-[340px] flex-col gap-3"
        style={{
          backgroundColor: "rgba(10,26,15,0.75)",
          backdropFilter: "blur(8px)",
          borderLeft: "2px solid #4CAF6F",
          borderTop: "1px solid rgba(240,234,214,0.1)",
          borderRight: "1px solid rgba(240,234,214,0.1)",
          borderBottom: "1px solid rgba(240,234,214,0.1)",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
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
        <div className="mt-2 text-left">
          <a href="#details" className="anton text-[#F0EAD6] text-[15px] tracking-widest uppercase cursor-pointer hover:text-[#4CAF6F] transition-colors inline-block">
            LEARN MORE →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
