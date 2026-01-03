import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Dumbbell, Plane, Home, ArrowRight } from "lucide-react";
import { useTouchDevice } from "@/hooks/use-touch-device";

const useCases = [
  {
    icon: Briefcase,
    title: "Daily Work",
    description: "Perfect for office shoes worn during long work hours.",
    image: "👔",
    gradient: "from-blue-500/20 to-indigo-500/20",
    stats: "8+ Hours",
  },
  {
    icon: Dumbbell,
    title: "Gym & Sports",
    description: "Ideal for athletic shoes and gym bags.",
    image: "🏋️",
    gradient: "from-red-500/20 to-orange-500/20",
    stats: "High Sweat",
  },
  {
    icon: Plane,
    title: "Travel",
    description: "Keep your travel bags and shoes fresh on the go.",
    image: "✈️",
    gradient: "from-purple-500/20 to-pink-500/20",
    stats: "Portable",
  },
  {
    icon: Home,
    title: "Home Storage",
    description: "Great for shoe racks and cupboards.",
    image: "🏠",
    gradient: "from-green-500/20 to-teal-500/20",
    stats: "24/7",
  },
];

const UseCases = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isTouchDevice = useTouchDevice();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="use-cases" className="section-padding relative overflow-hidden bg-card">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            background: "radial-gradient(ellipse at 20% 30%, hsl(142 71% 45% / 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, hsl(142 71% 45% / 0.08) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(142 71% 45%) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating elements - desktop only */}
      {!isTouchDevice && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[10%] left-[5%] w-24 md:w-32 h-24 md:h-32 border border-primary/10 rounded-3xl"
            animate={{
              rotate: [0, 10, 0],
              y: [-15, 15, -15],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-[15%] right-[10%] w-20 md:w-24 h-20 md:h-24 border border-primary/10 rounded-full"
            animate={{
              rotate: [0, -15, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      {/* Central gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(142 71% 45%) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-block text-primary text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            Versatile
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
            Perfect{" "}
            <span className="text-gradient">For</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-4">
            Designed for the Indian lifestyle — humid weather, long commutes,
            and active days.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {useCases.map((useCase, index) => {
            const isActive = isTouchDevice ? activeIndex === index : false;
            
            return (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                onClick={() => isTouchDevice && setActiveIndex(isActive ? null : index)}
                className="group"
              >
                <motion.div
                  className={`glass-card rounded-2xl md:rounded-3xl p-4 md:p-8 h-full text-center relative overflow-hidden ${
                    isTouchDevice ? 'bg-gradient-to-br ' + useCase.gradient + ' bg-opacity-30' : ''
                  }`}
                  whileHover={isTouchDevice ? {} : {
                    scale: 1.02,
                    y: -8,
                  }}
                  whileTap={isTouchDevice ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Animated gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} ${
                      isTouchDevice ? 'opacity-30' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-300`}
                  />

                  {/* Shine effect - desktop only */}
                  {!isTouchDevice && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  )}

                  {/* Stats badge - always visible on mobile */}
                  <div
                    className={`absolute top-3 right-3 md:top-4 md:right-4 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs text-primary ${
                      isTouchDevice ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-300`}
                  >
                    {useCase.stats}
                  </div>

                  {/* Large emoji */}
                  <motion.div
                    className="text-4xl md:text-6xl mb-4 md:mb-6 relative z-10"
                    animate={isTouchDevice && isActive ? {
                      scale: 1.2,
                      rotate: [0, -5, 5, 0],
                      y: -5,
                    } : {}}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {useCase.image}
                  </motion.div>

                  {/* Icon with glow */}
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 md:mb-6 relative z-10">
                    <useCase.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>

                  <h3 className="text-base md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-foreground relative z-10">
                    {useCase.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground relative z-10 mb-3 md:mb-4">
                    {useCase.description}
                  </p>

                  {/* Learn more link - desktop hover only */}
                  {!isTouchDevice && (
                    <div className="flex items-center justify-center gap-2 text-primary text-xs md:text-sm font-medium relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Learn more
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                  )}

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-primary to-transparent ${
                      isTouchDevice ? 'opacity-50' : 'scale-x-0 group-hover:scale-x-100'
                    } transition-transform duration-300`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 md:mt-16 text-center"
        >
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Works with all types of footwear and storage spaces
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4">
            {["Sneakers", "Formal", "Sports", "Boots", "Loafers", "Sandals"].map((type, index) => (
              <motion.span
                key={type}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-background/50 border border-border/50 text-xs md:text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + index * 0.04 }}
              >
                {type}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCases;
