import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagePath = `${import.meta.env.BASE_URL}product.png`;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bgBottles = [
    { id: 1, top: "15%", left: "10%", scale: 0.4, rotate: -25, blur: 8, opacity: 0.2, speed: -100 },
    { id: 2, top: "75%", left: "15%", scale: 0.6, rotate: 15, blur: 4, opacity: 0.3, speed: -250 },
    { id: 3, top: "20%", left: "85%", scale: 0.5, rotate: 35, blur: 5, opacity: 0.25, speed: -150 },
    { id: 4, top: "65%", left: "80%", scale: 0.7, rotate: -15, blur: 3, opacity: 0.35, speed: -300 },
    { id: 5, top: "45%", left: "25%", scale: 0.3, rotate: 60, blur: 10, opacity: 0.15, speed: -80, hideMobile: true },
    { id: 6, top: "35%", left: "70%", scale: 0.8, rotate: -10, blur: 2, opacity: 0.4, speed: -200 },
    { id: 7, top: "85%", left: "45%", scale: 0.45, rotate: -45, blur: 6, opacity: 0.2, speed: -350 },
    { id: 8, top: "10%", left: "55%", scale: 0.35, rotate: 20, blur: 7, opacity: 0.18, speed: -120 },
    { id: 9, top: "50%", left: "90%", scale: 0.5, rotate: 100, blur: 4, opacity: 0.3, speed: -220, hideMobile: true },
    { id: 10, top: "90%", left: "90%", scale: 0.6, rotate: -30, blur: 5, opacity: 0.25, speed: -280, hideMobile: true },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set initial states explicitly
      gsap.set(".hero-text-line", { y: 150, opacity: 0 });
      gsap.set(".main-bottle-container", { y: "30%", opacity: 0, scale: 0.9, rotate: -10 });
      gsap.set(".hero-ui", { y: 30, opacity: 0 });
      gsap.set(".bg-bottle", { opacity: 0, scale: 0 });
      gsap.set(".bg-overlay", { opacity: 0 });

      // Apple-style fade-in Timeline
      const tl = gsap.timeline();
      tl.to(".bg-overlay", { opacity: 0.08, duration: 2, ease: "power2.inOut" })
        .to(".hero-text-line", { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }, "-=1.5")
        .to(".main-bottle-container", { y: "0%", opacity: 1, scale: 1, rotate: -3, duration: 1.5, ease: "power3.out" }, "-=1.0")
        .to(".bg-bottle", { 
          opacity: (i, target) => parseFloat(target.getAttribute("data-opacity") || "0.2"), 
          scale: (i, target) => parseFloat(target.getAttribute("data-scale") || "1"), 
          duration: 1.5, 
          stagger: 0.05, 
          ease: "power2.out" 
        }, "-=1.0")
        .to(".hero-ui", { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power2.out" }, "-=1.0");

      // Scroll Parallax Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      scrollTl.to(".main-bottle-wrapper", { yPercent: 40, scale: 1.2, rotate: 6, ease: "none" }, 0);
      scrollTl.to(".hero-text-line", { y: 200, opacity: 0, ease: "none", stagger: 0.1 }, 0);
      scrollTl.to(".hero-ui", { y: -100, opacity: 0, ease: "none" }, 0);

      gsap.utils.toArray<HTMLElement>(".bg-bottle").forEach((bottle) => {
        const speed = parseFloat(bottle.dataset.speed || "-100");
        scrollTl.to(bottle, { y: speed, rotate: "+=25", opacity: 0, ease: "none" }, 0);
      });

      // Continuous Floating
      gsap.to(".main-bottle-container", {
        y: "-=25",
        yoyo: true,
        repeat: -1,
        duration: 3.5,
        ease: "sine.inOut"
      });

    }, containerRef);
    
    return () => ctx.revert(); // Ensure animations reset nicely
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        height: "100svh",
        minHeight: "750px",
        background: "radial-gradient(circle at center, #1b4d31 0%, #050D08 100%)",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Serif+Display:ital@1&display=swap');
        .anton { font-family: 'Anton', sans-serif; }
        .dm-serif { font-family: 'DM Serif Display', serif; }
        .will-change-transform { will-change: transform, opacity; }
      `}</style>

      {/* ── Fixed Grayscale Noise Overlay ── */}
      {/* Reduced baseFrequency and added feColorMatrix to prevent ugly colored pixels */}
      <div className="bg-overlay pointer-events-none absolute inset-0 z-40 mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* ── 3D Background Floating Bottles ── */}
      <div className="absolute inset-0 z-0">
        {bgBottles.map((bottle) => {
          if (isMobile && bottle.hideMobile) return null;

          return (
            <img
              key={bottle.id}
              className="bg-bottle will-change-transform absolute pointer-events-none"
              src={imagePath}
              data-opacity={bottle.opacity}
              data-scale={bottle.scale}
              data-speed={bottle.speed}
              style={{
                top: bottle.top,
                left: bottle.left,
                filter: isMobile 
                  ? "brightness(1.1) drop-shadow(0 10px 15px rgba(0,0,0,0.5))"
                  : `blur(${bottle.blur}px) brightness(1.2) contrast(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.5))`,
                transform: `translate(-50%, -50%) rotate(${bottle.rotate}deg)`,
                width: "clamp(120px, 15vw, 250px)",
                opacity: 0,
              }}
              alt=""
            />
          );
        })}
      </div>

      {/* ── Giant Background Text ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4 gap-6 md:gap-16 w-full">
        <div className="overflow-hidden">
          <span
            className="hero-text-line will-change-transform anton uppercase block text-center"
            style={{
              fontSize: "clamp(60px, 18vw, 340px)",
              color: "#2A6040",
              opacity: 0.5,
              lineHeight: 0.82,
              letterSpacing: "-0.015em",
              whiteSpace: "nowrap",
            }}
          >
            FRESH SHOES
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            className="hero-text-line will-change-transform anton uppercase block text-center"
            style={{
              fontSize: "clamp(60px, 18vw, 340px)",
              color: "#2A6040",
              opacity: 0.5,
              lineHeight: 0.82,
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
        <div className="main-bottle-container relative w-fit h-fit will-change-transform">
          <img
            className="main-bottle"
            src={imagePath}
            alt="SoleFresh Natural Shoe Deodorizer"
            style={{
              width: "clamp(250px, 45vw, 800px)",
              filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.85)) saturate(1.25) contrast(1.15)",
              transform: "rotate(-3deg)",
            }}
          />
          {/* Subtle glow behind product */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#4CAF6F]/20 blur-[80px] rounded-full -z-10 animate-pulse" />
        </div>
      </div>

      {/* ── Bottom Left Title ── */}
      <div 
        className="hero-ui will-change-transform absolute z-30 flex flex-col pointer-events-none left-5 bottom-[240px] md:left-[8vw] md:bottom-[12%]"
      >
        <div
          className="dm-serif italic mb-1 md:mb-2 opacity-90"
          style={{ color: "#F0EAD6", fontSize: "clamp(16px, 2vw, 22px)" }}
        >
          Premium Natural Care
        </div>
        <div className="flex flex-col">
          <span
            className="anton uppercase leading-[0.9]"
            style={{
              fontSize: "clamp(38px, 8vw, 110px)",
              color: "#F0EAD6",
              letterSpacing: "0.01em",
            }}
          >
            SHOE
          </span>
          <span
            className="anton uppercase leading-[0.9]"
            style={{
              fontSize: "clamp(38px, 8vw, 110px)",
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
        className="hero-ui will-change-transform flex absolute z-30 p-5 md:p-6 w-[calc(100%-2.5rem)] md:w-[350px] flex-col gap-3 left-5 md:left-auto right-5 md:right-[8vw] bottom-8 md:bottom-[12%]"
        style={{
          backgroundColor: isMobile ? "rgba(10,26,15,0.75)" : "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(16px)", 
          WebkitBackdropFilter: "blur(16px)",
          borderLeft: "2px solid #4CAF6F", 
          borderTop: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.1)", 
          borderRight: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: isMobile ? "0 20px 40px rgba(0,0,0,0.5)" : "0 20px 40px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.02)",
          borderRadius: "8px"
        }}
      >
        <div className="border-b border-[#F0EAD6]/20 pb-2 md:pb-3">
          <span className="anton tracking-wide md:tracking-wider uppercase text-[#F0EAD6] text-[14px] md:text-[15px]">
            SPEC — 2 SACHETS · 7×5CM · NATURAL FILL
          </span>
        </div>
        <p className="text-[#F0EAD6] text-xs md:text-sm leading-relaxed opacity-90 font-medium tracking-wide">
          Activated carbon, silica gel & fragranced rice work together to absorb odor and moisture from inside your shoes overnight. No sprays, no chemicals, no mess.
        </p>
        <div className="mt-1 text-left pointer-events-auto">
          <a 
            href="#science"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="anton text-[#F0EAD6] text-[13px] md:text-[14px] tracking-widest uppercase cursor-pointer hover:text-[#4CAF6F] transition-colors inline-block"
          >
            SEE HOW IT WORKS →
          </a>
        </div>
      </div>
    </section>
  );
}
