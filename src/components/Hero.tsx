import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagePath = `${import.meta.env.BASE_URL}product.png`;

  // Expanded array of background bottle configurations for a dense 3D environment
  const bgBottles = [
    { id: 1, top: "10%", left: "5%", scale: 0.35, rotate: -35, blur: 10, opacity: 0.12, speed: -120 },
    { id: 2, top: "85%", left: "10%", scale: 0.7, rotate: 15, blur: 4, opacity: 0.2, speed: -400 },
    { id: 3, top: "25%", left: "90%", scale: 0.4, rotate: 45, blur: 8, opacity: 0.15, speed: -180 },
    { id: 4, top: "75%", left: "80%", scale: 0.8, rotate: -25, blur: 2, opacity: 0.25, speed: -320 },
    { id: 5, top: "40%", left: "15%", scale: 0.25, rotate: 75, blur: 12, opacity: 0.08, speed: -100 },
    { id: 6, top: "15%", left: "75%", scale: 0.6, rotate: -15, blur: 5, opacity: 0.18, speed: -220 },
    { id: 7, top: "90%", left: "45%", scale: 0.45, rotate: -60, blur: 7, opacity: 0.14, speed: -380 },
    { id: 8, top: "5%", left: "40%", scale: 0.3, rotate: 25, blur: 6, opacity: 0.1, speed: -150 },
    { id: 9, top: "55%", left: "95%", scale: 0.5, rotate: 110, blur: 3, opacity: 0.22, speed: -280 },
    { id: 10, top: "30%", left: "30%", scale: 0.35, rotate: -20, blur: 9, opacity: 0.11, speed: -140 },
    { id: 11, top: "70%", left: "5%", scale: 0.55, rotate: 40, blur: 5, opacity: 0.19, speed: -340 },
    { id: 12, top: "12%", left: "18%", scale: 0.28, rotate: 180, blur: 11, opacity: 0.09, speed: -110 },
    { id: 13, top: "88%", left: "88%", scale: 0.65, rotate: -80, blur: 4, opacity: 0.21, speed: -360 },
    { id: 14, top: "45%", left: "82%", scale: 0.42, rotate: 55, blur: 7, opacity: 0.16, speed: -240 },
    { id: 15, top: "2%", left: "95%", scale: 0.32, rotate: -120, blur: 10, opacity: 0.13, speed: -130 },
    { id: 16, top: "98%", left: "20%", scale: 0.75, rotate: 30, blur: 3, opacity: 0.26, speed: -450 },
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

    scrollTl.to(".main-bottle", { yPercent: 30, scale: 1.4, rotate: 15, ease: "power2.inOut" }, 0);
    scrollTl.to(".hero-text-line", { y: 250, opacity: 0, ease: "none", stagger: 0.1 }, 0);
    scrollTl.to(".hero-ui", { y: -150, opacity: 0, ease: "none" }, 0);

    // Dynamic background bottles parallax - more dramatic
    gsap.utils.toArray<HTMLElement>(".bg-bottle").forEach((bottle) => {
      const speed = parseFloat(bottle.dataset.speed || "-100");
      scrollTl.to(bottle, { y: speed * 1.5, rotate: "+=45", opacity: 0, ease: "none" }, 0);
    });

    // Main bottle floating
    gsap.to(".main-bottle-wrapper", {
      y: -40,
      yoyo: true,
      repeat: -1,
      duration: 4,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: "110vh", // Extra height for better scroll transition
        background: "radial-gradient(circle at center, #1b4d31 0%, #050D08 100%)", // Slightly brighter center
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Serif+Display:ital@1&display=swap');
        .anton { font-family: 'Anton', sans-serif; }
        .dm-serif { font-family: 'DM Serif Display', serif; }
      `}</style>

      {/* ── Texture Overlay ── */}
      <div className="bg-overlay pointer-events-none absolute inset-0 z-40 opacity-25 overflow-hidden mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
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
            filter: `blur(${bottle.blur}px) brightness(1.1) contrast(0.9) drop-shadow(0 20px 30px rgba(0,0,0,0.5))`,
            transform: `translate(-50%, -50%) rotate(${bottle.rotate}deg)`,
            width: "clamp(150px, 20vw, 300px)",
            opacity: 0,
          }}
          alt=""
        />
      ))}

      {/* ── Giant Background Text ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4 gap-12 md:gap-20">
        <div className="overflow-hidden">
          <span
            className="hero-text-line anton uppercase block"
            style={{
              fontSize: "clamp(80px, 18vw, 340px)",
              color: "#2A6040",
              opacity: 0.45,
              lineHeight: 0.8,
              letterSpacing: "-0.015em",
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
              fontSize: "clamp(80px, 18vw, 340px)",
              color: "#2A6040",
              opacity: 0.45,
              lineHeight: 0.8,
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
            }}
          >
            EVERY DAY
          </span>
        </div>
      </div>

      {/* ── Main Hero Bottle ── */}
      <div className="main-bottle-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-full h-full">
        <div className="main-bottle relative w-fit h-fit">
          <img
            src={imagePath}
            alt="SoleFresh Natural Shoe Deodorizer"
            style={{
              width: "clamp(380px, 50vw, 900px)",
              filter: "drop-shadow(0 80px 150px rgba(0,0,0,0.95)) saturate(1.1) contrast(1.05)",
              transform: "rotate(-3deg)",
            }}
          />
          {/* Enhanced Glow behind main product */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#4CAF6F]/15 blur-[150px] rounded-full -z-10 animate-pulse" />
        </div>
      </div>

      {/* ── Bottom Left Title (Full - No Clipping) ── */}
      <div className="hero-ui absolute bottom-12 left-6 md:bottom-20 md:left-[8vw] z-30 flex flex-col pointer-events-none">
        <div
          className="dm-serif italic mb-2 md:mb-3 opacity-90"
          style={{ color: "#F0EAD6", fontSize: "clamp(18px, 2.5vw, 26px)" }}
        >
          Premium Natural Care
        </div>
        <div className="flex flex-col">
          <span
            className="anton uppercase leading-[0.9]"
            style={{
              fontSize: "clamp(45px, 10vw, 130px)",
              color: "#F0EAD6",
              letterSpacing: "0.01em",
            }}
          >
            SHOE
          </span>
          <span
            className="anton uppercase leading-[0.9]"
            style={{
              fontSize: "clamp(45px, 10vw, 130px)",
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
        className="hero-ui hidden md:flex absolute bottom-12 right-12 md:bottom-20 md:right-16 z-30 p-6 w-[360px] flex-col gap-4"
        style={{
          backgroundColor: "rgba(10,26,15,0.7)",
          backdropFilter: "blur(16px)",
          borderLeft: "2px solid #4CAF6F",
          borderTop: "1px solid rgba(240,234,214,0.08)",
          borderRight: "1px solid rgba(240,234,214,0.08)",
          borderBottom: "1px solid rgba(240,234,214,0.08)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div className="border-b border-[#F0EAD6]/20 pb-4">
          <span className="anton tracking-wider uppercase text-[#F0EAD6] text-[15px]">
            SPEC — 2 SACHETS · 7×5CM · NATURAL FILL
          </span>
        </div>
        <p className="text-[#F0EAD6] text-sm leading-relaxed opacity-90 font-medium tracking-wide">
          Activated carbon, silica gel & fragranced rice work together to absorb odor and moisture from inside your shoes overnight. No sprays, no chemicals, no mess.
        </p>
        <div className="mt-1 text-left pointer-events-auto">
          <a 
            href="#science"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="anton text-[#F0EAD6] text-[14px] tracking-widest uppercase cursor-pointer hover:text-[#4CAF6F] transition-colors inline-block"
          >
            SEE HOW IT WORKS →
          </a>
        </div>
      </div>
    </section>
  );
}
