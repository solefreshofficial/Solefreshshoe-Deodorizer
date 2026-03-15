import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Package, Calendar, MapPin, ArrowRight, Sparkles, Shield, Instagram } from "lucide-react";
import { getMeeshoLink } from "@/lib/utils";
import { useTouchDevice } from "@/hooks/use-touch-device";

const ProductDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isTouchDevice = useTouchDevice();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [3, -3]);

  const details = [
    { icon: Calendar, label: "Shelf Life", value: "2-3 Months", color: "from-purple-500/20 to-purple-600/20" },
    { icon: MapPin, label: "Made in", value: "India 🇮🇳", color: "from-orange-500/20 to-orange-600/20" },
  ];

  const benefits = [
    { text: "Chemical-free & natural", icon: "🌿" },
    { text: "Safe for daily use", icon: "✅" },
    { text: "Reusable for months", icon: "♻️" },
    { text: "Works overnight", icon: "🌙" },
    { text: "Fits all shoe sizes", icon: "👟" },
    { text: "Multi-purpose use", icon: "✨" },
  ];

  return (
    <section
      ref={containerRef}
      id="details"
      className="section-padding relative overflow-hidden"
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      {/* Animated geometric shapes - desktop only */}
      {!isTouchDevice && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[20%] right-[10%] w-16 md:w-20 h-16 md:h-20 border border-primary/10 rotate-45"
            animate={{
              y: [-15, 15, -15],
              rotate: [45, 90, 45],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[30%] left-[5%] w-12 md:w-16 h-12 md:h-16 border border-primary/10 rotate-45"
            animate={{
              y: [15, -15, 15],
              rotate: [45, 0, 45],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div ref={ref} className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left - Product info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Product Details
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
              Premium{" "}
              <span className="text-gradient">Quality</span>
            </h2>

            {/* Price removed for cleaner hero — price available on shop page */}

            {/* Detail cards */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-10">
              {details.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.2 + index * 0.08, ease: "easeOut" }}
                  className={`glass-card rounded-xl md:rounded-2xl p-3 md:p-5 text-center group relative overflow-hidden ${
                    isTouchDevice ? 'bg-gradient-to-br ' + detail.color + ' bg-opacity-20' : ''
                  }`}
                >
                  {/* Hover gradient - desktop only */}
                  {!isTouchDevice && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${detail.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  )}
                  
                  <div className="relative z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 md:mb-3">
                      <detail.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground mb-0.5 md:mb-1">
                      {detail.label}
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-foreground">
                      {detail.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits grid - always visible */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-8 md:mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.25, delay: 0.35 + index * 0.04, ease: "easeOut" }}
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-card/50 transition-all duration-300"
                >
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs md:text-sm">{benefit.icon}</span>
                  </div>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Product overview and policies */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 md:mb-10">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-2">Product Overview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Shoe smell happens because moisture gets trapped inside your shoes — and sprays only hide it for a while.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  SOLEFRESH fixes the problem at its source. It absorbs moisture and odor from inside your shoes, keeping them fresh naturally — without sprays, chemicals, or artificial fragrance.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                  Just place it inside your shoes after use and let it work overnight. Reusable, easy to maintain, and designed for Indian weather.
                </p>
                <p className="text-sm text-muted-foreground font-semibold mt-4">
                  Fresh shoes. Real confidence. Every day.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4"
            >
              <a
                href={getMeeshoLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 md:gap-4 px-6 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden relative group transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 active:scale-95"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-green-400 to-primary bg-[length:200%_100%] animate-gradient" />
                
                <span className="relative z-10 text-base md:text-lg">Buy Now</span>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <div className="flex items-center justify-center sm:justify-start gap-2 px-4">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                <span className="text-xs md:text-sm text-muted-foreground">Secure Checkout</span>
              </div>

              <div className="flex items-center gap-3 mt-3 md:mt-0">
                <a href="https://www.instagram.com/solefreshofficial?igsh=MTZmemNwM3Z5Y28wcA==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Instagram className="w-4 h-4" />
                  Follow on Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Product image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            <motion.div 
              style={{ 
                y: isTouchDevice ? 0 : imageY, 
                rotate: isTouchDevice ? 0 : imageRotate 
              }} 
              className="will-change-transform"
            >
              {/* Glow */}
              <div className="absolute inset-[-15px] md:inset-[-30px] bg-primary/10 rounded-full blur-2xl md:blur-3xl animate-pulse-slow" />

              {/* Product container */}
              <div className="relative">
                <img
                  src={`${import.meta.env.BASE_URL}product.png`}
                  alt="SoleFresh Product Package"
                  className="relative w-full max-w-[320px] md:max-w-md mx-auto"
                  style={{ 
                    filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7)) saturate(1.15) contrast(1.1) brightness(1.08)" 
                  }}
                  loading="lazy"
                />

                {/* Make CTAs responsive */}

                {/* Overlay effect */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-transparent" />
                
                {/* Shimmer - simplified for mobile */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>

              <motion.div
                className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 bg-card border border-border px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm shadow-lg flex items-center gap-1.5 md:gap-2"
                animate={{ y: [3, -3, 3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
