import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagePath = `${import.meta.env.BASE_URL}product.png`;

  // Array of background bottle configurations to create a 3D environment depth
  const bgBottles = [
    { id: 1, top: "15%", left: "10%", scale: 0.4, rotate: -25, blur: 8, opacity: 0.15, speed: -100 },
    { id: 2, top: "60%", left: "5%", scale: 0.6, rotate: 15, blur: 4, opacity: 0.2, speed: -250 },
    { id: 3, top: "20%", left: "80%", scale: 0.5, rotate: 35, blur: 5, opacity: 0.18, speed: -150 },
    { id: 4, top: "75%", left: "85%", scale: 0.7, rotate: -15, blur: 3, opacity: 0.25, speed: -300 },
    { id: 5, top: "45%", left: "25%", scale: 0.3, rotate: 60, blur: 10, opacity: 0.1, speed: -80 },
    { id: 6, top: "35%", left: "70%", scale: 0.8, rotate: -10, blur: 2, opacity: 0.3, speed: -200 },
    { id: 7, top: "80%", left: "40%", scale: 0.5, rotate: -45, blur: 6, opacity: 0.2, speed: -350 },
    { id: 8, top: "10%", left: "50%", scale: 0.45, rotate: 20, blur: 5, opacity: 0.15, speed: -120 },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Apple-style load-in sequence
    tl.fromTo(".bg-overlay", { opacity: 0 }, { opacity: 1, duration: 2 })
      .fromTo(".hero-text-line", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.2 }, "-=1.5")
      .fromTo(".main-bottle", { y: "100%", opacity: 0, scale: 0.8, rotate: -15 }, { y: "0%", opacity: 1, scale: 1, rotate: -5, duration: 1.5, ease: "power4.out" }, "-=1.0")
      .fromTo(".bg-bottle", { opacity: 0, scale: 0 }, { opacity: (i, target) => target.dataset.opacity, scale: (i, target) => target.dataset.scale, duration: 2, stagger: 0.1 }, "-=1.0")
      .fromTo(".hero-ui", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, "-=1.0");

    // Scroll parallax animations
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    scrollTl.to(".main-bottle", { yPercent: 15, scale: 1.15, rotate: 5, ease: "none" }, 0);
    scrollTl.to(".hero-text-line", { y: 150, opacity: 0, ease: "none", stagger: 0.05 }, 0);
    scrollTl.to(".hero-ui", { y: -50, opacity: 0, ease: "none" }, 0);

    // Dynamic background bottles parallax
    gsap.utils.toArray<HTMLElement>(".bg-bottle").forEach((bottle) => {
      const speed = parseFloat(bottle.dataset.speed || "-100");
      scrollTl.to(bottle, { y: speed, rotate: "+=20", ease: "none" }, 0);
    });

    // Continuous floating for main bottle
    gsap.to(".main-bottle", {
      y: "-=20",
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        height: "100svh",
        minHeight: "600px",
        background: "radial-gradient(circle at center, #163824 0%, #050D08 100%)",
        paddingTop: 0, // Ensure it covers fully behind navbar
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Serif+Display:ital@1&display=swap');
        .anton { font-family: 'Anton', sans-serif; }
        .dm-serif { font-family: 'DM Serif Display', serif; }
      `}</style>

      {/* ── Grain Texture Overlay ── */}
      <div className="bg-overlay pointer-events-none absolute inset-0 z-40 opacity-15 overflow-hidden mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>

      {/* ── 3D Background Floating Bottles ── */}
      {bgBottles.map((bottle) => (
        <img
          key={bottle.id}
          className="bg-bottle absolute z-0 pointer-events-none"
          src={imagePath}
          data-opacity={bottle.opacity}
          data-scale={bottle.scale}
          data-speed={bottle.speed}
          style={{
            top: bottle.top,
            left: bottle.left,
            filter: `blur(${bottle.blur}px) brightness(1.5) contrast(0.8) drop-shadow(0 20px 30px rgba(0,0,0,0.5))`,
            transform: `translate(-50%, -50%) rotate(${bottle.rotate}deg)`,
            width: "clamp(120px, 15vw, 250px)",
            opacity: 0, // Set to 0 initially for GSAP intro
          }}
          alt=""
        />
      ))}

      {/* ── Giant Background Text ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4">
        <div className="overflow-hidden">
          <span
            className="hero-text-line anton uppercase block"
            style={{
              fontSize: "clamp(60px, 16vw, 280px)",
              color: "#2A6040",
              opacity: 0.6,
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            FRESH SHOES
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            className="hero-text-line anton uppercase block"
            style={{
              fontSize: "clamp(60px, 16vw, 280px)",
              color: "#2A6040",
              opacity: 0.6,
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            EVERY DAY
          </span>
        </div>
      </div>

      {/* ── Main Hero Bottle ── */}
      <img
        className="main-bottle relative z-20 pointer-events-none"
        src={imagePath}
        alt="SoleFresh Natural Shoe Deodorizer"
        style={{
          width: "clamp(250px, 35vw, 600px)", // Increased size significantly
          filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.9)) saturate(1.1) contrast(1.1)",
        }}
      />

      {/* ── Bottom Left Title (Half Clipped) ── */}
      <div className="hero-ui absolute bottom-8 left-6 md:bottom-16 md:left-[100px] z-30 flex flex-col pointer-events-none">
        <div
          className="dm-serif italic mb-1 md:mb-2 opacity-90"
          style={{ color: "#F0EAD6", fontSize: "clamp(16px, 2vw, 24px)" }}
        >
          Premium Care
        </div>
        <span
          className="anton uppercase leading-[0.85]"
          style={{
            fontSize: "clamp(50px, 10vw, 140px)",
            color: "#F0EAD6",
            letterSpacing: "0.01em",
          }}
        >
          SHOE
        </span>
        <div style={{ overflow: "hidden", height: "clamp(25px, 5vw, 70px)" }}>
          <span
            className="anton uppercase leading-[0.85]"
            style={{
              fontSize: "clamp(50px, 10vw, 140px)",
              color: "#F0EAD6",
              display: "block",
              letterSpacing: "0.01em",
            }}
          >
            DEODORIZER
          </span>
        </div>
      </div>

      {/* ── Bottom Right Specs Card ── */}
      <div
        className="hero-ui hidden md:flex absolute bottom-12 right-12 md:bottom-16 md:right-16 z-30 p-6 w-[340px] flex-col gap-3"
        style={{
          backgroundColor: "rgba(10,26,15,0.65)",
          backdropFilter: "blur(12px)",
          borderLeft: "2px solid #4CAF6F",
          borderTop: "1px solid rgba(240,234,214,0.08)",
          borderRight: "1px solid rgba(240,234,214,0.08)",
          borderBottom: "1px solid rgba(240,234,214,0.08)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
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
        <div className="mt-2 text-left pointer-events-auto">
          <a href="#details" className="anton text-[#F0EAD6] text-[15px] tracking-widest uppercase cursor-pointer hover:text-[#4CAF6F] transition-colors inline-block">
            LEARN MORE →
          </a>
        </div>
      </div>
    </section>
  );
}
