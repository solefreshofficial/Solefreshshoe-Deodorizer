import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check, Package, Calendar, MapPin, ArrowRight, Sparkles, Shield, Star } from "lucide-react";
import productPack from "@/assets/product-pack.jpg";

const ProductDetails = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const details = [
    { icon: Package, label: "Quantity", value: "2 × 40-50g Sachets", color: "from-blue-500/20 to-blue-600/20" },
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

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating diamonds */}
        <motion.div
          className="absolute top-[20%] right-[10%] w-20 h-20 border border-primary/10 rotate-45"
          animate={{
            y: [-20, 20, -20],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[5%] w-16 h-16 border border-primary/15 rotate-45"
          animate={{
            y: [20, -20, 20],
            rotate: [45, 0, 45],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glowing lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/3 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div ref={ref} className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Product info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Product Details
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              Premium{" "}
              <span className="text-gradient">Quality</span>
            </h2>

            {/* Animated price display */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            >
              <div className="inline-flex items-baseline gap-4 px-8 py-5 rounded-2xl bg-card/50 border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-colors duration-300">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <span className="text-5xl md:text-7xl font-black text-gradient relative z-10">
                  ₹199
                </span>
                <div className="relative z-10">
                  <span className="block text-muted-foreground text-sm">
                    inclusive of all taxes
                  </span>
                  <span className="block text-green-500 text-xs font-medium">
                    Free Shipping
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Enhanced detail cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {details.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass-card rounded-2xl p-5 text-center group cursor-pointer relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${detail.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <detail.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {detail.label}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {detail.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Interactive benefits grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredBenefit(index)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                  className="flex items-center gap-3 p-3 rounded-xl group cursor-pointer hover:bg-card/50 transition-all duration-300"
                >
                  <div className={`w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 ${hoveredBenefit === index ? "scale-125 bg-primary/30" : ""}`}>
                    <span className="text-sm">{benefit.icon}</span>
                  </div>
                  <span className={`text-sm transition-colors duration-300 ${hoveredBenefit === index ? "text-foreground" : "text-muted-foreground"}`}>
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Premium CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/shop"
                className="inline-flex items-center gap-4 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-full overflow-hidden relative group transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-green-400 to-primary bg-[length:200%_100%] animate-gradient" />
                
                <span className="relative z-10 text-lg">Buy Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center gap-2 px-4">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-muted-foreground">Secure Checkout</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Product image with 3D effects */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <motion.div style={{ y: imageY, rotate: imageRotate }} className="will-change-transform">
              {/* Multi-layer glow */}
              <div className="absolute inset-0 glow-intense rounded-3xl opacity-40 animate-pulse-glow will-change-auto" />
              <div className="absolute inset-[-30px] bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />

              {/* 3D Product container */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={productPack}
                  alt="SoleFresh Product Package"
                  className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                  loading="lazy"
                />

                {/* Overlay effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-background/40 via-transparent to-white/5" />
                
                {/* Reflection */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-6 -right-6 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-2"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Star className="w-4 h-4 fill-current" />
                Best Seller
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-2"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                In Stock
              </motion.div>

              {/* Rating badge */}
              <motion.div
                className="absolute top-1/2 -left-8 bg-card/90 backdrop-blur-sm border border-border/50 px-4 py-3 rounded-2xl shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">5.0 Rating</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
