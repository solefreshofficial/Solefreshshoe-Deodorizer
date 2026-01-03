import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Star, Zap, Shield } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productHero from "@/assets/product-hero.jpg";
import logo from "@/assets/solefresh-logo.png";

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 opacity-50"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x * 20 + window.innerWidth / 2}px ${mousePos.y * 20 + window.innerHeight / 2}px, hsl(142 71% 45% / 0.08), transparent 40%)`,
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* 3D Perspective grid floor */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          background: `
            linear-gradient(180deg, transparent 0%, hsl(var(--background)) 60%),
            linear-gradient(transparent 95%, hsl(142 71% 45% / 0.5) 95%),
            linear-gradient(90deg, transparent 95%, hsl(142 71% 45% / 0.5) 95%)
          `,
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center top",
        }}
      />

      {/* Animated gradient orbs with 3D parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-25 blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(142 71% 45% / 0.6) 0%, transparent 70%)",
          x: mousePos.x * -1,
          y: mousePos.y * -1,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl will-change-transform"
        style={{
          background: "radial-gradient(circle, hsl(142 80% 55% / 0.5) 0%, transparent 70%)",
          x: mousePos.x,
          y: mousePos.y,
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 3D Rotating cubes */}
        <motion.div
          className="absolute top-20 right-[15%] w-16 h-16 border border-primary/20 rounded-lg"
          style={{
            transformStyle: "preserve-3d",
            x: mousePos.x * 2,
            y: mousePos.y * 2,
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-[10%] w-12 h-12 border border-primary/15 rounded-lg"
          style={{
            x: mousePos.x * -1.5,
            y: mousePos.y * -1.5,
          }}
          animate={{
            rotateX: [0, -360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating rings */}
        <motion.div
          className="absolute top-1/3 left-[8%] w-24 h-24 rounded-full border-2 border-primary/10"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[8%] w-32 h-32 rounded-full border border-primary/15"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-1/2 left-[5%] w-4 h-4 rounded-full bg-primary/40 blur-sm"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[20%] right-[20%] w-3 h-3 rounded-full bg-primary/50 blur-sm"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(142 71% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(142 71% 45%) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 text-center will-change-transform"
      >
        {/* Brand tag */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary/80 border border-primary/20 mb-10 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-primary">
            Natural Shoe Care Revolution
          </span>
        </motion.div>

        {/* Premium Logo animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative inline-block group"
        >
          {/* Glow backdrop */}
          <motion.div
            className="absolute inset-0 blur-3xl bg-primary/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Logo with 3D hover effect */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.1}deg) rotateX(${mousePos.y * -0.1}deg)`,
            }}
          >
            <img
              src={logo}
              alt="SoleFresh"
              className="h-20 md:h-28 lg:h-36 w-auto mx-auto relative z-10 drop-shadow-2xl"
            />
            
            {/* Animated highlight sweep */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Orbiting stars */}
          <motion.div
            className="absolute -top-4 -right-4"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Star className="w-6 h-6 text-primary fill-primary/30" />
          </motion.div>
        </motion.div>

        {/* Tagline with text reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-6 overflow-hidden"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-block text-foreground"
            >
              Fresh shoes.
            </motion.span>{" "}
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="inline-block text-gradient"
            >
              Every day.
            </motion.span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A chemical-free, reusable shoe deodorizer that eliminates odor at its
          source — <span className="text-primary font-medium">moisture</span>.
        </motion.p>

        {/* Feature badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Zap, text: "Instant Results" },
            { icon: Shield, text: "100% Natural" },
            { icon: Star, text: "Premium Quality" },
          ].map((badge, index) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm group hover:border-primary/50 transition-colors duration-300"
            >
              <badge.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <Link
            to="/shop"
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Buy Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-foreground/20 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          <a
            href="#science"
            className="px-8 py-4 border border-border text-foreground font-semibold rounded-full hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>

        {/* Product image with optimized 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="relative mx-auto max-w-lg"
        >
          {/* Multi-layer glow */}
          <div className="absolute inset-0 glow-intense rounded-3xl animate-pulse-glow will-change-auto" />
          <div className="absolute inset-[-20px] blur-3xl bg-primary/10 rounded-full animate-pulse-slow" />

          {/* 3D Product container */}
          <motion.div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.05}deg) rotateX(${mousePos.y * -0.05}deg)`,
            }}
          >
            {/* Floating animation wrapper */}
            <div className="relative animate-float will-change-transform">
              <img
                src={productHero}
                alt="SoleFresh Shoe Deodorizer Sachets"
                className="relative w-full h-auto rounded-3xl shadow-2xl"
                loading="eager"
              />

              {/* Glass reflection */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-3xl border border-primary/20 opacity-50" />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-6 -right-6 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg"
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ₹199 Only
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 bg-card border border-border px-3 py-1.5 rounded-full text-xs shadow-lg flex items-center gap-2"
              animate={{
                y: [5, -5, 5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              In Stock
            </motion.div>
          </motion.div>

          {/* Enhanced particles */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/60"
              style={{
                left: `${15 + i * 18}%`,
                bottom: "-30px",
              }}
              animate={{
                y: [-20, -80, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-20"
        >
          <a
            href="#science"
            className="inline-flex flex-col items-center gap-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-medium">
              Explore
            </span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1"
              animate={{
                borderColor: ["currentColor", "hsl(142 71% 45%)", "currentColor"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <motion.div
                className="w-1.5 h-3 rounded-full bg-current"
                animate={{
                  y: [0, 12, 0],
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
