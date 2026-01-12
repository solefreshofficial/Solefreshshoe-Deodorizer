import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Shield } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import productHero from "@/assets/product-hero.jpg";
import logo from "@/assets/solefresh-logo.png";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { Button } from "@/components/ui/button";
import { scrollToIdWithOffset } from "@/lib/utils";

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isTouchDevice = useTouchDevice();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => scrollToIdWithOffset(id, 12);

  const handleAnchor = (e: any, id: string) => {
    e.preventDefault();
    const isHome = !location.hash || location.hash === "#" || location.hash === "#/" || location.pathname === "/";
    if (isHome) {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const tilt = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  useEffect(() => {
    if (isTouchDevice) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-start justify-center overflow-hidden pt-8 md:pt-12 lg:pt-16"
    >
      {/* Interactive cursor glow - desktop only */}
      {!isTouchDevice && (
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 20 + (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)}px ${mousePos.y * 20 + (typeof window !== 'undefined' ? window.innerHeight / 2 : 400)}px, hsl(142 71% 45% / 0.06), transparent 40%)`,
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* 3D Perspective grid floor */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: `
            linear-gradient(180deg, transparent 0%, hsl(var(--background)) 70%),
            linear-gradient(transparent 95%, hsl(142 71% 45% / 0.4) 95%),
            linear-gradient(90deg, transparent 95%, hsl(142 71% 45% / 0.4) 95%)
          `,
          backgroundSize: "100% 100%, 80px 80px, 80px 80px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center top",
        }}
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full opacity-20 blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(142 71% 45% / 0.5) 0%, transparent 70%)",
          x: isTouchDevice ? 0 : mousePos.x * -0.5,
          y: isTouchDevice ? 0 : mousePos.y * -0.5,
        }}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full opacity-15 blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(142 80% 55% / 0.4) 0%, transparent 70%)",
          x: isTouchDevice ? 0 : mousePos.x * 0.5,
          y: isTouchDevice ? 0 : mousePos.y * 0.5,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Floating geometric shapes - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating rings - visible on all devices */}
        <motion.div
          className="absolute top-1/3 left-[8%] w-16 md:w-24 h-16 md:h-24 rounded-full border border-primary/10"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[8%] w-20 md:w-32 h-20 md:h-32 rounded-full border border-primary/10"
          animate={{
            y: [10, -10, 10],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/2 left-[5%] w-3 h-3 rounded-full bg-primary/30 blur-sm"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[20%] right-[20%] w-2 h-2 rounded-full bg-primary/40 blur-sm"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(142 71% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(142 71% 45%) 1px, transparent 1px)`,
          backgroundSize: "120px 120px",
        }}
      />

      <motion.div
        style={{ y: isTouchDevice ? 0 : y, scale: isTouchDevice ? 1 : scale, rotateX: isTouchDevice ? 0 : tilt }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-28 text-center will-change-transform"
      >
        {/* Premium Logo - slightly smaller and centered */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-10 mb-10 md:mb-14 relative inline-block flex items-center justify-center mx-auto"
        >
          {/* Glow backdrop */}
          <div className="absolute inset-[-15%] blur-3xl bg-primary/12 rounded-full animate-pulse-slow" />
          
          {/* Logo with 3D effect - desktop only parallax */}
          <motion.div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: isTouchDevice 
                ? "perspective(1000px)" 
                : `perspective(1000px) rotateY(${mousePos.x * 0.06}deg) rotateX(${mousePos.y * -0.06}deg)`,
            }}
          >
            <img
              src={logo}
              alt="SoleFresh"
              className="h-16 sm:h-20 md:h-28 lg:h-32 xl:h-36 w-auto mx-auto relative z-10 drop-shadow-2xl"
            />
            
            {/* Animated highlight sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Decorative sparkle - replaces orbiting star to avoid rating implication */}
          <motion.div
            className="absolute -top-2 -right-2 md:-top-4 md:-right-4"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-primary/80" />
          </motion.div>
        </motion.div>

        {/* Tagline & product snippet placed to avoid collision */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
          className="mb-10 md:mb-14 text-center space-y-6 px-4 sm:px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-primary/20 mb-4 md:mb-6 backdrop-blur-sm mx-auto">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium tracking-wide text-primary">
              Your best shoe care option
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-foreground">Fresh shoes.</span>{" "}
            <span className="text-gradient">Every day.</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground opacity-90 max-w-xl mx-auto leading-relaxed px-4 mt-4"
          >
            A chemical-free, reusable shoe deodorizer that eliminates odor at its
            source — <span className="text-primary font-medium">moisture</span>.
          </motion.p>


        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <Button asChild>
              <Link to="/shop">Buy now</Link>
            </Button>
          </div>
        </motion.div>

        {/* Feature badges - always visible with details on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 md:mb-12"
        >
          {[
            { icon: Zap, text: "Instant Results" },
            { icon: Shield, text: "100% Natural" },
            { icon: Sparkles, text: "Premium Quality" },
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.55 + index * 0.08 }}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm ${
                isTouchDevice ? 'border-primary/30' : 'hover:border-primary/50'
              } transition-colors duration-300`}
            >
              <badge.icon className={`w-3 h-3 md:w-4 md:h-4 text-primary ${isTouchDevice ? '' : 'group-hover:scale-110'} transition-transform duration-300`} />
              <span className="text-xs md:text-sm text-foreground/80">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>



        {/* Floating product card (desktop only) */}
        {/* Product image with optimized effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md md:max-w-lg px-4 md:px-0"
        >
          {/* Glow - simplified on mobile */}
          <div className="absolute inset-[-10px] md:inset-[-20px] blur-2xl md:blur-3xl bg-primary/10 rounded-full animate-pulse-slow" />

          {/* 3D Product container - no parallax on mobile */}
          <motion.div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: isTouchDevice 
                ? "perspective(1000px)" 
                : `perspective(1000px) rotateY(${mousePos.x * 0.03}deg) rotateX(${mousePos.y * -0.03}deg)`,
            }}
          >
            {/* Floating animation wrapper */}
            <div className="relative animate-float will-change-transform">
              <img
                src={productHero}
                alt="SoleFresh Shoe Deodorizer Sachets"
                className="relative w-full max-w-[320px] md:max-w-md mx-auto h-auto rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl"
                loading="eager"
              />

              {/* Glass reflection */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-primary/15" />
            </div>

            {/* Floating badges - always visible (repositioned) */}
            <motion.div
              className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-6 bg-card border border-border px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs shadow-lg flex items-center gap-1.5 md:gap-2"
              animate={{
                y: [3, -3, 3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500 animate-pulse" />
              In Stock
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-card border border-border px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs shadow-lg flex items-center gap-1.5 md:gap-2"
              animate={{
                y: [3, -3, 3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500 animate-pulse" />
              In Stock
            </motion.div>
          </motion.div>

          {/* Particles - reduced count */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/50"
              style={{
                left: `${25 + i * 25}%`,
                bottom: "-20px",
              }}
              animate={{
                y: [-15, -50, -15],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 md:mt-16"
        >
          <a
            href="#science"
            onClick={(e) => handleAnchor(e, 'science')}
            className="inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] font-medium">
              Explore
            </span>
            <motion.div
              className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-current flex items-start justify-center p-1"
            >
              <motion.div
                className="w-1 md:w-1.5 h-2 md:h-3 rounded-full bg-current"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
