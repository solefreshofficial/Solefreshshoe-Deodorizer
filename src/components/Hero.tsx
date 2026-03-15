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

  // Expanded array of background bottle configurations for a dense 3D environment
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
    { id: 16, top: "98%", left: "20%", scale: 0.75, rotate: 30, blur: 3, opacity: 0.36, speed: -450, hideMobile: true },
  ];

  useGSAP(() => {
    // Kill previous GSAP instances if re-rendering
    ScrollTrigger.getAll().forEach(t => t.kill());
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Apple-style load-in sequence
    tl.fromTo(".bg-overlay", { opacity: 0 }, { opacity: 1, duration: 2 })
      .fromTo(".hero-text-line", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.2 }, "-=1.5")
      .fromTo(".main-bottle", { y: "100%", opacity: 0, scale: 0.8, rotate: -15 }, { y: "0%", opacity: 1, scale: 1, rotate: -5, duration: 1.5, ease: "power4.out" }, "-=1.0")
      .fromTo(".bg-bottle", { opacity: 0, scale: 0 }, { opacity: (i, target) => target.dataset.opacity, scale: (i, target) => target.dataset.scale, duration: 2, stagger: 0.05 }, "-=1.0")
      .fromTo(".hero-ui", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, "-=1.0");

    // Scroll parallax animations
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smoother scrubbing for performance
      }
    });

    scrollTl.to(".main-bottle", { yPercent: 30, scale: 1.3, rotate: 15, ease: "none" }, 0);
    scrollTl.to(".hero-text-line", { y: 150, opacity: 0, ease: "none", stagger: 0.1 }, 0);
    scrollTl.to(".hero-ui", { y: -100, opacity: 0, ease: "none" }, 0);

    // Dynamic background bottles parallax
    gsap.utils.toArray<HTMLElement>(".bg-bottle").forEach((bottle) => {
      const speed = parseFloat(bottle.dataset.speed || "-100");
      scrollTl.to(bottle, { y: speed, rotate: "+=30", opacity: 0, ease: "none" }, 0);
    });

    // Main bottle floating
    gsap.to(".main-bottle-wrapper", {
      y: -30,
      yoyo: true,
      repeat: -1,
      duration: 3,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  // Throttle mouse movement for high performance
  let mouseFrame = 0;
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return; // Disable heavy mouse tracking on mobile
    if (!containerRef.current) return;
    
    cancelAnimationFrame(mouseFrame);
    mouseFrame = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 2; // -1 to 1 range
      const yPos = (clientY / innerHeight - 0.5) * 2; // -1 to 1 range

      // 3D Parallax for Background Bottles based on depth (scale)
      gsap.to(".bg-bottle", {
        x: (i, target) => {
          const depth = parseFloat(target.dataset.scale || "1");
          return xPos * depth * -50;
        },
        rotationY: xPos * 20,
        rotationX: -yPos * 20,
        duration: 2,
        ease: "power2.out",
      });

      // Main Bottle 3D Tilt
      gsap.to(".main-bottle", {
        x: xPos * -20,
        y: yPos * -20,
        rotationY: xPos * 10,
        rotationX: -yPos * 10,
        transformPerspective: 1000,
        duration: 2,
        ease: "power2.out",
      });
      
      // UI Elements slight opposite movement (glassmorphism tracking)
      gsap.to(".hero-ui", {
        x: xPos * 10,
        y: yPos * 10,
        duration: 2,
        ease: "power2.out"
      });
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to([".bg-bottle", ".main-bottle", ".hero-ui"], {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 2,
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
        height: "100svh", // Changed to 100svh for accurate mobile rendering
        minHeight: "700px",
        // Enhanced cinematic aesthetic gradient
        background: "radial-gradient(circle at 50% 30%, #205c36 0%, #0d2e1a 45%, #030a05 100%)",
        perspective: "1000px" // Enable 3D space
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=DM+Serif+Display:ital@1&display=swap');
        .anton { font-family: 'Anton', sans-serif; }
        .dm-serif { font-family: 'DM Serif Display', serif; }
        
        /* Hardware acceleration classes */
        .accelerate {
          will-change: transform, opacity;
          transform: translateZ(0);
        }
      `}</style>

      {/* ── Subtle Background Animation (Blinking/Pulse) ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      {/* ── Texture Overlay (Simplified for performance) ── */}
      <div className="bg-overlay pointer-events-none absolute inset-0 z-40 opacity-15 overflow-hidden">
        <svg className="h-full w-full">
          <filter id="hero-noise">
            {/* Reduced numOctaves for massive performance boost */}
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>

      {/* ── 3D Background Floating Bottles ── */}
      {bgBottles.map((bottle) => {
        if (isMobile && bottle.hideMobile) return null; // Render fewer bottles on mobile for massive performance gains

        return (
          <img
            key={bottle.id}
            className="bg-bottle accelerate absolute z-10 pointer-events-none"
            src={imagePath}
            data-opacity={bottle.opacity}
            data-scale={bottle.scale}
            data-speed={bottle.speed}
            style={{
              top: bottle.top,
              left: bottle.left,
              // Optimized blur and enhanced visibility
              filter: isMobile 
                ? `brightness(1.2) drop-shadow(0 10px 20px rgba(0,0,0,0.8))` 
                : `blur(${bottle.blur}px) brightness(1.3) contrast(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.6))`,
              transform: `translate(-50%, -50%) rotate(${bottle.rotate}deg)`,
              width: "clamp(100px, 15vw, 250px)",
              opacity: 0,
              transformStyle: "preserve-3d"
            }}
            alt=""
          />
        );
      })}

      {/* ── Giant Background Text ── */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 pointer-events-none select-none px-4 gap-8 md:gap-16">
        <div className="overflow-hidden">
          <span
            className="hero-text-line accelerate anton uppercase block text-center"
            style={{
              fontSize: "clamp(60px, 16vw, 340px)",
              color: "#307a50", // Brighter green for better contrast
              opacity: 0.35, // More subtle
              lineHeight: 0.85,
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
              fontSize: "clamp(60px, 16vw, 340px)",
              color: "#307a50",
              opacity: 0.35,
              lineHeight: 0.85,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
            }}
          >
            EVERY DAY
          </span>
        </div>
      </div>

      {/* ── Main Hero Bottle ── */}
      <div className="main-bottle-wrapper accelerate absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex items-center justify-center w-full h-full">
        <div className="main-bottle relative w-fit h-fit" style={{ transformStyle: "preserve-3d" }}>
          <img
            src={imagePath}
            alt="SoleFresh Natural Shoe Deodorizer"
            style={{
              width: "clamp(250px, 45vw, 800px)", // Adjusted for mobile fit
              // Massive cinematic boost: High contrast, high brightness, deep shadow
              filter: "drop-shadow(0 60px 100px rgba(0,0,0,0.95)) saturate(1.35) contrast(1.25) brightness(1.15)",
              transform: "rotate(-3deg)",
            }}
          />
          {/* Multi-layered cinematic glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#4CAF6F]/25 blur-[100px] rounded-full -z-10 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#ffffff]/10 blur-[50px] rounded-full -z-10" />
        </div>
      </div>

      {/* ── Mobile Layout Wrapper ── */}
      {/* ── Bottom Left Title ── */}
      <div 
        className="hero-ui accelerate absolute z-30 flex flex-col pointer-events-none left-4 bottom-[220px] md:left-[8vw] md:bottom-[12%]"
      >
        <div
          className="dm-serif italic mb-1 md:mb-2 opacity-95"
          style={{ color: "#F0EAD6", fontSize: "clamp(15px, 2.2vw, 24px)" }}
        >
          Premium Natural Care
        </div>
        <div className="flex flex-col">
          <span
            className="anton uppercase leading-[0.9]"
            style={{
              fontSize: "clamp(35px, 7vw, 100px)", // Scaled down for mobile safety
              color: "#F0EAD6",
              letterSpacing: "0.01em",
            }}
          >
            SHOE
          </span>
          <span
            className="anton uppercase leading-[0.9]"
            style={{
              fontSize: "clamp(35px, 7vw, 100px)",
              color: "#F0EAD6",
              display: "block",
              letterSpacing: "0.01em",
            }}
          >
            DEODORIZER
          </span>
        </div>
      </div>

      {/* ── Bottom Right Specs Card (Visible on mobile now) ── */}
      <div
        className="hero-ui accelerate flex absolute z-30 p-4 md:p-6 w-[calc(100%-2rem)] md:w-[360px] flex-col gap-2 md:gap-4 right-4 bottom-8 md:right-[6vw] lg:right-[8vw] md:bottom-[12%]"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.03)", 
          backdropFilter: "blur(20px)", 
          WebkitBackdropFilter: "blur(20px)",
          borderLeft: "2px solid #4CAF6F", 
          borderTop: "1px solid rgba(255, 255, 255, 0.15)", 
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.8), inset 0 0 15px rgba(255,255,255,0.03)",
          borderRadius: "12px"
        }}
      >
        <div className="border-b border-[rgba(255,255,255,0.15)] pb-2 md:pb-4">
          <span className="anton tracking-wide md:tracking-wider uppercase text-[#F0EAD6] text-[13px] md:text-[15px]">
            SPEC — 2 SACHETS · 7×5CM · NATURAL FILL
          </span>
        </div>
        <p className="text-[#F0EAD6] text-xs md:text-sm leading-snug md:leading-relaxed opacity-95 font-medium tracking-wide">
          Activated carbon, silica gel & fragranced rice work together to absorb odor and moisture from inside your shoes overnight. No sprays, no chemicals, no mess.
        </p>
        <div className="mt-1 pb-1 md:pb-0 text-left pointer-events-auto">
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
