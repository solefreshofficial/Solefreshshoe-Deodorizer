import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Droplets, Wind, Leaf, RefreshCw, ArrowRight } from "lucide-react";
import { useTouchDevice } from "@/hooks/use-touch-device";

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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isTouchDevice = useTouchDevice();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      id="science"
      className="section-padding relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        style={{ y: isTouchDevice ? 0 : backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-card via-background to-card will-change-transform"
      />

      {/* Floating elements - simplified */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large morphing blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(142 71% 45%) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-16 md:w-24 h-16 md:h-24 border border-primary/15 rounded-2xl hidden md:block"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-12 md:w-16 h-12 md:h-16 border border-primary/10 rounded-full"
          animate={{
            y: [15, -15, 15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(142 71% 45%) 1px, transparent 0)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="container-wide relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block text-primary text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            The Science
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
            How It{" "}
            <span className="text-gradient relative">
              Works
              <motion.span
                className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-primary via-primary to-transparent rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Unlike sprays that mask odor, SoleFresh eliminates the root cause —{" "}
            <span className="text-primary font-medium">moisture and bacteria</span>.
          </p>
        </motion.div>

        {/* Features grid - mobile optimized with all details visible */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              className="group"
            >
              <motion.div
                className={`glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 h-full relative overflow-hidden ${
                  isTouchDevice ? 'bg-gradient-to-br ' + feature.gradient + ' bg-opacity-30' : ''
                }`}
                whileHover={isTouchDevice ? {} : {
                  scale: 1.02,
                  y: -5,
                }}
                whileTap={isTouchDevice ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Animated gradient background - visible on mobile */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} ${
                    isTouchDevice ? 'opacity-30' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300`}
                />

                {/* Shine effect - desktop only */}
                {!isTouchDevice && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                )}

                {/* Icon container */}
                <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 md:mb-6">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-primary relative z-10" />
                </div>

                {/* Stat counter - always visible */}
                <div className="mb-3 md:mb-4 relative z-10">
                  <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-gradient inline-block">
                    {feature.stat}
                  </span>
                  <span className="block text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-0.5 md:mt-1">
                    {feature.statLabel}
                  </span>
                </div>

                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3 text-foreground relative z-10">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed relative z-10">
                  {feature.description}
                </p>

                {/* Bottom accent - visible on mobile */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-primary to-transparent ${
                    isTouchDevice ? 'opacity-50' : 'scale-x-0 group-hover:scale-x-100'
                  } transition-transform duration-300`}
                />

                {/* Corner accent - desktop only */}
                {!isTouchDevice && (
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 w-6 md:w-8 h-6 md:h-8 rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors duration-300 flex items-center justify-center">
                    <ArrowRight className="w-3 md:w-4 h-3 md:h-4 text-primary/40 group-hover:text-primary transition-colors duration-300" />
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Science;
