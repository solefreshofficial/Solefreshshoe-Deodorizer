import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Droplets, Wind, Leaf, RefreshCw, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Absorbs Moisture",
    description:
      "Silica gel crystals powerfully absorb dampness, preventing bacterial growth.",
    stat: "99%",
    statLabel: "Moisture Absorbed",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Wind,
    title: "Neutralizes Odor",
    description:
      "Activated carbon traps odor-causing particles and volatile compounds.",
    stat: "24H",
    statLabel: "Fresh Protection",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "No chemicals, sprays, or artificial fragrances. Just natural freshness.",
    stat: "0",
    statLabel: "Harmful Chemicals",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: RefreshCw,
    title: "Reusable",
    description: "Refresh in sunlight for 2-3 hours. Reuse for weeks to months.",
    stat: "90+",
    statLabel: "Days of Use",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
];

const Science = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="science"
      className="section-padding relative overflow-hidden"
    >
      {/* Interactive cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(142 71% 45% / 0.05), transparent 40%)`,
        }}
      />

      {/* Animated background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-card via-background to-card will-change-transform"
      />

      {/* 3D Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large morphing blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(142 71% 45%) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-24 h-24 border border-primary/20 rounded-2xl"
          animate={{
            y: [-30, 30, -30],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-16 h-16 border border-primary/15 rounded-full"
          animate={{
            y: [20, -20, 20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[60%] left-[5%] w-12 h-12 bg-primary/5 rounded-xl"
          animate={{
            y: [-20, 40, -20],
            x: [-10, 10, -10],
            rotate: [0, -45, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-[30%] right-[8%] w-4 h-4 bg-primary/50 rounded-full blur-sm"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[35%] left-[12%] w-3 h-3 bg-primary/40 rounded-full blur-sm"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.4, 0.8, 0.4],
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
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(142 71% 45%) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div ref={ref} className="container-wide relative z-10">
        {/* Section header with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            whileHover={{ scale: 1.05 }}
          >
            The Science
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              How It{" "}
            </motion.span>
            <span className="text-gradient relative">
              Works
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Unlike sprays that mask odor, SoleFresh eliminates the root cause —{" "}
            <span className="text-primary font-medium">moisture and bacteria</span>.
          </p>
        </motion.div>

        {/* Features grid with 3D hover effects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative perspective-1000"
            >
              <motion.div
                className="glass-card rounded-3xl p-8 h-full relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  rotateX: 2,
                  rotateY: -2,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* 3D shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Icon container with 3D float */}
                <motion.div 
                  className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 overflow-hidden"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-8 h-8 text-primary relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-primary/30"
                    initial={{ y: "100%" }}
                    animate={{ y: hoveredIndex === index ? "0%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Animated stat counter */}
                <div className="mb-4 relative z-10">
                  <motion.span
                    className="text-4xl md:text-5xl font-bold text-gradient inline-block"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.stat}
                  </motion.span>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {feature.statLabel}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground relative z-10">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Animated bottom accent */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors duration-300 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Science;
