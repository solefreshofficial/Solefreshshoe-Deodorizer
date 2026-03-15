import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Zap, Shield, ShoppingBag } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import productHero from "@/assets/product-hero.jpg";
import logo from "@/assets/solefresh-logo.png";
import { useTouchDevice } from "@/hooks/use-touch-device";
import { scrollToIdWithOffset, getMeeshoLink } from "@/lib/utils";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isTouchDevice = useTouchDevice();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => scrollToIdWithOffset(id, 12);

  const handleAnchor = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const isHome = !location.hash || location.hash === "#" || location.hash === "#/" || location.pathname === "/";
    if (isHome) {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (isTouchDevice) return;
    
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX / window.innerWidth - 0.5) * 10,
          y: (e.clientY / window.innerHeight - 0.5) * 10,
        });
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [isTouchDevice]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background Elements - optimized */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 noise-overlay opacity-[0.02]" />
        
        {/* Animated Orbs - simpler */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" 
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container-wide relative z-10 px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left - Content */}
          <motion.div
            style={{ y: isTouchDevice ? 0 : y, opacity: isTouchDevice ? 1 : opacity }}
            className="flex-1 text-center lg:text-left space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-3 h-3" />
              Revolutionary Shoe Care
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]"
            >
              Fresh Shoes. <br />
              <span className="text-gradient">Every Single Day.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
            >
              The 100% natural, chemical-free way to eliminate odors and moisture from your favorite footwear. 
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4"
            >
              <a
                href={getMeeshoLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-black text-lg rounded-[2rem] transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_50px_-12px_hsl(var(--primary))] active:scale-95 overflow-hidden"
              >
                {/* Magnetic shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                {/* Icon with animation */}
                <ShoppingBag className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                
                <span className="relative z-10 uppercase tracking-tight">Buy Now on Meesho</span>
                
                <ArrowDown className="w-5 h-5 -rotate-90 transition-transform duration-500 group-hover:translate-x-2" />
                
                {/* Glow ring */}
                <div className="absolute inset-0 border-2 border-primary-foreground/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <button
                onClick={(e) => handleAnchor(e as any, 'science')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-secondary/30 backdrop-blur-md border border-white/5 text-foreground font-bold rounded-[2rem] hover:bg-secondary/60 transition-all duration-300"
              >
                See How It Works
              </button>
            </motion.div>

            {/* Trusted Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8"
            >
              {[
                { icon: Shield, text: "100% Natural" },
                { icon: Zap, text: "Instant Effect" },
                { icon: Sparkles, text: "Eco-Friendly" }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  {item.text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Product Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative w-full max-w-[500px]"
            style={{
              perspective: "1000px",
              rotateY: isTouchDevice ? 0 : mousePos.x,
              rotateX: isTouchDevice ? 0 : -mousePos.y,
            }}
          >
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full animate-pulse-slow" />
            
            <div className="relative animate-float will-change-transform">
              <img
                src={productHero}
                alt="SoleFresh Product"
                className="w-full h-auto rounded-[2rem] shadow-2xl border border-white/10"
                loading="eager"
              />
              
              {/* Badge Overlay */}
              <div className="absolute -top-6 -right-6 lg:-right-10 bg-background/80 backdrop-blur-xl border border-primary/20 p-4 rounded-3xl shadow-xl animate-float-slow" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Premium</div>
                    <div className="text-sm font-bold">Shoe Care</div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-6 -left-6 bg-background/90 backdrop-blur-xl border border-green-500/20 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground">In Stock</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
