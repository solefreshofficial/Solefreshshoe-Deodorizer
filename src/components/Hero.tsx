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

  // Dense array of background bottle configurations for a congested 3D environment
  const bgBottles = [
    { id: 1, top: "10%", left: "5%", scale: 0.35, rotate: -35, blur: 8, opacity: 0.2, speed: -120 },
    { id: 2, top: "85%", left: "10%", scale: 0.7, rotate: 15, blur: 4, opacity: 0.3, speed: -400 },
    { id: 3, top: "25%", left: "90%", scale: 0.4, rotate: 45, blur: 6, opacity: 0.25, speed: -180 },
    { id: 4, top: "75%", left: "80%", scale: 0.8, rotate: -25, blur: 2, opacity: 0.35, speed: -320 },
    { id: 5, top: "40%", left: "15%", scale: 0.25, rotate: 75, blur: 10, opacity: 0.15, speed: -100, hideMobile: true },
    { id: 6, top: "15%", left: "75%", scale: 0.6, rotate: -15, blur: 5, opacity: 0.28, speed: -220 },
    { id: 7, top: "90%", left: "45%", scale: 0.45, rotate: -60, blur: 7, opacity: 0.24, speed: -380 },
    { id: 8, top: "5%", left: "40%", scale: 0.3, rotate: 25, blur: 6, opacity: 0.2, speed: -150 },
    { id: 9, top: "55%", left: "95%", scale: 0.5, rotate: 110, blur: 3, opacity: 0.32, speed: -280, hideMobile: true },
    { id: 10, top: "30%", left: "30%", scale: 0.35, rotate: -20, blur: 9, opacity: 0.18, speed: -140, hideMobile: true },
    { id: 11, top: "70%", left: "5%", scale: 0.55, rotate: 40, blur: 5, opacity: 0.29, speed: -340 },
    { id: 12, top: "12%", left: "18%", scale: 0.28, rotate: 180, blur: 8, opacity: 0.15, speed: -110, hideMobile: true },
    { id: 13, top: "88%", left: "88%", scale: 0.65, rotate: -80, blur: 4, opacity: 0.31, speed: -360 },
    { id: 14, top: "45%", left: "82%", scale: 0.42, rotate: 55, blur: 7, opacity: 0.26, speed: -240, hideMobile: true },
    { id: 15, top: "2%", left: "95%", scale: 0.32, rotate: -120, blur: 10, opacity: 0.23, speed: -130, hideMobile: true },
    { id: 16, top: "98%", left: "20%", scale: 0.75, rotate: 30, blur: 3, opacity: 0.4, speed: -450, hideMobile: true },
    { id: 17, top: "35%", left: "50%", scale: 0.3, rotate: -90, blur: 12, opacity: 0.1, speed: -100, hideMobile: true },
    { id: 18, top: "60%", left: "20%", scale: 0.4, rotate: 15, blur: 6, opacity: 0.2, speed: -200, hideMobile: true },
    { id: 19, top: "20%", left: "35%", scale: 0.25, rotate: 45, blur: 9, opacity: 0.15, speed: -150, hideMobile: true },
    { id: 20, top: "80%", left: "65%", scale: 0.5, rotate: -25, blur: 5, opacity: 0.25, speed: -250, hideMobile: true },
    { id: 21, top: "40%", left: "85%", scale: 0.35, rotate: 75, blur: 8, opacity: 0.2, speed: -180, hideMobile: true },
    { id: 22, top: "10%", left: "80%", scale: 0.3, rotate: -45, blur: 7, opacity: 0.15, speed: -120, hideMobile: true },
    { id: 23, top: "50%", left: "5%", scale: 0.5, rotate: 30, blur: 4, opacity: 0.22, speed: -200 },
    { id: 24, top: "30%", left: "95%", scale: 0.4, rotate: -20, blur: 6, opacity: 0.18, speed: -150 },
    { id: 25, top: "95%", left: "75%", scale: 0.6, rotate: 45, blur: 3, opacity: 0.3, speed: -380 },
    { id: 26, top: "65%", left: "10%", scale: 0.45, rotate: -30, blur: 5, opacity: 0.25, speed: -300 },
    { id: 27, top: "5%", left: "15%", scale: 0.35, rotate: 10, blur: 8, opacity: 0.15, speed: -100, hideMobile: true },
    { id: 28, top: "85%", left: "30%", scale: 0.5, rotate: 50, blur: 2, opacity: 0.3, speed: -400 },
    { id: 29, top: "45%", left: "45%", scale: 0.3, rotate: 15, blur: 10, opacity: 0.1, speed: -120, hideMobile: true },
    { id: 30, top: "20%", left: "60%", scale: 0.25, rotate: -60, blur: 9, opacity: 0.12, speed: -140, hideMobile: true },
    { id: 31, top: "70%", left: "95%", scale: 0.4, rotate: 25, blur: 6, opacity: 0.15, speed: -200 },
    { id: 32, top: "15%", left: "25%", scale: 0.3, rotate: 40, blur: 7, opacity: 0.18, speed: -150 },
    { id: 33, top: "80%", left: "5%", scale: 0.5, rotate: -15, blur: 4, opacity: 0.2, speed: -300 },
    { id: 34, top: "55%", left: "35%", scale: 0.35, rotate: 110, blur: 5, opacity: 0.15, speed: -220, hideMobile: true },
    { id: 35, top: "90%", left: "60%", scale: 0.45, rotate: -5, blur: 3, opacity: 0.25, speed: -350 },
    { id: 36, top: "25%", left: "10%", scale: 0.3, rotate: 90, blur: 8, opacity: 0.12, speed: -110 },
    { id: 37, top: "60%", left: "85%", scale: 0.4, rotate: -30, blur: 6, opacity: 0.2, speed: -250 },
    { id: 38, top: "10%", left: "70%", scale: 0.25, rotate: 180, blur: 11, opacity: 0.1, speed: -90, hideMobile: true },
    { id: 39, top: "40%", left: "5%", scale: 0.33, rotate: -45, blur: 7, opacity: 0.14, speed: -160 },
    { id: 40, top: "75%", left: "50%", scale: 0.42, rotate: 20, blur: 5, opacity: 0.22, speed: -280 },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set initial states explicitly for flawless entry
      gsap.set(".hero-text-line", { y: isMobile ? 50 : 150, opacity: 0 });
      gsap.set(".main-bottle-container", { y: isMobile ? 50 : 100, opacity: 0, scale: 0.85, rotate: -10 });
      gsap.set(".hero-ui", { y: 30, opacity: 0 });
      gsap.set(".bg-bottle", { opacity: 0, scale: 0 });
      gsap.set(".bg-overlay", { opacity: 0 });

      // Cinematic load-in Timeline
      const tl = gsap.timeline();
      tl.to(".bg-overlay", { opacity: 0.15, duration: 2, ease: "power2.inOut" })
        .to(".hero-text-line", { y: 0, opacity: 0.45, duration: 1.5, stagger: 0.2, ease: "power4.out" }, "-=1.5")
        .to(".main-bottle-container", { y: "0%", opacity: 1, scale: 1, rotate: -3, duration: 1.8, ease: "power4.out" }, "-=1.2")
        .to(".bg-bottle", { 
          opacity: (i, target) => parseFloat(target.getAttribute("data-opacity") || "0.2"), 
          scale: (i, target) => parseFloat(target.getAttribute("data-scale") || "1"), 
          duration: 2, 
          stagger: 0.02, 
          ease: "back.out(1.2)" 
        }, "-=1.5")
        .to(".hero-ui", { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }, "-=1.2");

      // Scroll Parallax Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      scrollTl.to(".main-bottle-wrapper", { yPercent: isMobile ? 25 : 40, scale: isMobile ? 1.15 : 1.25, rotate: 8, ease: "none" }, 0);
      scrollTl.to(".hero-text-line", { y: 250, opacity: 0, ease: "none", stagger: 0.1 }, 0);
      scrollTl.to(".hero-ui", { y: -150, opacity: 0, ease: "none", stagger: 0.05 }, 0);

      gsap.utils.toArray<HTMLElement>(".bg-bottle").forEach((bottle) => {
        const speed = parseFloat(bottle.dataset.speed || "-100");
        scrollTl.to(bottle, { y: speed, rotate: "+=40", opacity: 0, ease: "none" }, 0);
      });

      // Smooth Infinite Float for Main Bottle (Very subtle range to maintain center)
      gsap.to(".main-bottle-container", {
        y: isMobile ? -5 : -12,
        yoyo: true,
        repeat: -1,
        duration: 4,
        ease: "sine.inOut"
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, { scope: containerRef, dependencies: [isMobile] });

  // High-Performance Throttle using requestAnimationFrame
  let mouseFrame = 0;
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return; 
    
    cancelAnimationFrame(mouseFrame);
    mouseFrame = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 2; 
      const yPos = (clientY / innerHeight - 0.5) * 2; 

      // 3D Parallax engine
      gsap.to(".bg-bottle", {
        x: (i, target) => parseFloat(target.dataset.scale || "1") * xPos * -60,
        rotationY: xPos * 25,
        rotationX: -yPos * 25,
        duration: 2,
        ease: "power2.out",
      });

      gsap.to(".main-bottle-container", {
        x: xPos * -35,
        y: yPos * -35,
        rotationY: xPos * 18,
        rotationX: -yPos * 18,
        transformPerspective: 1200,
        duration: 2.5,
        ease: "power2.out",
      });
      
      gsap.to(".hero-ui", {
        x: xPos * 15,
        y: yPos * 15,
        duration: 2.5,
        ease: "power2.out"
      });
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to([".bg-bottle", ".main-bottle-container", ".hero-ui"], {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 2.5,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        height: "100svh", 
        minHeight: "750px",
        background: "radial-gradient(circle at 50% 35%, #1b4d31 0%, #0a2416 40%, #030a05 100%)",
        perspective: "1200px" 
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Serif+Display:ital@1&display=swap');
        .anton { font-family: 'Anton', sans-serif; }
        .dm-serif { font-family: 'DM Serif Display', serif; }
        .accelerate { will-change: transform, opacity; }
      `}</style>

      {/* ── Fixed Grayscale Film Grain ── */}
      <div className="bg-overlay pointer-events-none absolute inset-0 z-40 mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* ── Congested 3D Background Bottles ── */}
      <div className="absolute inset-0 z-0">
        {bgBottles.map((bottle) => {
          if (isMobile && bottle.hideMobile) return null;
          return (
            <img
              key={bottle.id}
              className="bg-bottle accelerate absolute pointer-events-none"
              src={imagePath}
              data-opacity={bottle.opacity}
              data-scale={bottle.scale}
              data-speed={bottle.speed}
              style={{
                top: bottle.top,
                left: bottle.left,
                filter: isMobile 
                  ? "brightness(1.1) drop-shadow(0 10px 15px rgba(0,0,0,0.6))"
                  : `blur(${bottle.blur}px) brightness(1.2) contrast(1.15) drop-shadow(0 20px 40px rgba(0,0,0,0.5))`,
                transform: `translate(-50%, -50%) rotate(${bottle.rotate}deg)`,
                width: "clamp(120px, 15vw, 280px)",
                opacity: 0,
              }}
              alt=""
            />
          );
        })}
      </div>

      {/* ── Giant Background Text (Awwwards Solid Variant) ── */}
      <h1 className="absolute inset-x-0 w-full flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4 gap-4 md:gap-12" 
           style={{ top: isMobile ? "48%" : "45%", transform: "translateY(-50%)" }}>
        <div className="overflow-hidden">
          <span
            className="hero-text-line accelerate anton uppercase block text-center"
            style={{
              fontSize: "clamp(60px, 20vw, 360px)",
              color: "#2A6040",
              opacity: isMobile ? 0.25 : 0.3,
              lineHeight: 0.8,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            FRESH SHOES
          </span>
        </div>
        <div className="overflow-hidden">
          <span
            className="hero-text-line accelerate anton uppercase block text-center"
            style={{
              fontSize: "clamp(60px, 20vw, 360px)",
              color: "#2A6040",
              opacity: isMobile ? 0.25 : 0.3,
              lineHeight: 0.8,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            EVERY DAY
          </span>
        </div>
      </h1>

      {/* ── Main Hero Bottle (Centered & Overlapping Text) ── */}
      <div className="main-bottle-wrapper absolute z-20 pointer-events-none flex items-center justify-center w-full"
           style={{ top: isMobile ? "48%" : "45%", transform: "translateY(-50%)" }}>
        <div className="main-bottle-container relative w-fit h-fit accelerate">
          <img
            src={imagePath}
            alt="SoleFresh Natural Shoe Deodorizer"
            style={{
              width: "clamp(350px, 72vw, 850px)",
              filter: "drop-shadow(0 50px 100px rgba(0,0,0,0.85)) saturate(1.15) contrast(1.1) brightness(1.08)",
              transform: "rotate(-3deg)",
            }}
          />
          {/* Intense Cinematic Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-[#4CAF6F]/25 blur-[100px] rounded-full -z-10 animate-pulse" />
        </div>
      </div>

      {/* ── Left Title with Aesthetic Spacing (Top-Aligned on Mobile) ── */}
      <div 
        className="hero-ui accelerate absolute z-30 flex flex-col pointer-events-none w-auto max-w-[90vw]"
        style={{ 
          top: isMobile ? "12%" : "auto",
          bottom: isMobile ? "auto" : "12%",
          left: "8vw",
          alignItems: "flex-start",
        }}
      >
        <div
          className="dm-serif italic mb-2 md:mb-2 text-left opacity-90"
          style={{ color: "#F0EAD6", fontSize: "clamp(16px, 2.5vw, 24px)" }}
        >
          Premium Natural Care
        </div>
        <div className="flex flex-col gap-1 items-start">
          <span
            className="anton uppercase leading-[1.05] tracking-normal"
            style={{
              fontSize: "clamp(32px, 8.5vw, 100px)",
              color: "#F0EAD6",
              textShadow: "0 8px 24px rgba(0,0,0,0.6)"
            }}
          >
            SHOE
          </span>
          <span
            className="anton uppercase leading-[1.05] tracking-normal"
            style={{
              fontSize: "clamp(32px, 8.5vw, 100px)",
              color: "#F0EAD6",
              display: "block",
              textShadow: "0 8px 24px rgba(0,0,0,0.6)"
            }}
          >
            DEODORIZER
          </span>
        </div>
      </div>

      {/* ── Bottom Right Specs Card (Glassmorphism & Responsive Center) ── */}
      <div
        className="hero-ui accelerate flex absolute z-30 p-5 md:p-6 w-[calc(100%-2.5rem)] md:w-[360px] flex-col gap-3 md:gap-4 left-5 md:left-auto right-5 md:right-[6vw] lg:right-[8vw] bottom-8 md:bottom-[12%]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)", 
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "2px solid #4CAF6F", 
          borderTop: "1px solid rgba(255, 255, 255, 0.12)", 
          borderRight: "1px solid rgba(255, 255, 255, 0.06)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.02)",
          borderRadius: "12px"
        }}
      >
        <div className="border-b border-[rgba(255,255,255,0.15)] pb-3">
          <span className="anton tracking-wider uppercase text-[#F0EAD6] text-[14px] md:text-[15px]">
            SPEC — 2 SACHETS · 7×5CM · NATURAL FILL
          </span>
        </div>
        <p className="text-[#F0EAD6] text-[13px] md:text-sm leading-relaxed opacity-95 font-medium tracking-wide">
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
