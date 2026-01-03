import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, Dumbbell, Plane, Home, ArrowRight } from "lucide-react";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="use-cases" className="section-padding relative overflow-hidden bg-card">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: "radial-gradient(ellipse at 20% 30%, hsl(142 71% 45% / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, hsl(142 71% 45% / 0.1) 0%, transparent 50%)",
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
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(142 71% 45%) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating 3D elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[10%] left-[5%] w-32 h-32 border border-primary/10 rounded-3xl"
          animate={{
            rotate: [0, 15, 0],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-[15%] right-[10%] w-24 h-24 border border-primary/15 rounded-full"
          animate={{
            rotate: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-[5%] w-16 h-16 bg-primary/5 rounded-xl"
          animate={{
            y: [-30, 30, -30],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Central gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, hsl(142 71% 45%) 0%, transparent 50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container-wide relative z-10">
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
            Versatile
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            Perfect{" "}
            <span className="text-gradient">For</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Designed for the Indian lifestyle — humid weather, long commutes,
            and active days.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <motion.div
                className="glass-card rounded-3xl p-8 h-full text-center relative overflow-hidden"
                whileHover={{
                  scale: 1.02,
                  y: -10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* 3D shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Stats badge */}
                <motion.div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0, scale: hoveredIndex === index ? 1 : 0.8 }}
                >
                  {useCase.stats}
                </motion.div>

                {/* Large emoji with 3D effect */}
                <motion.div
                  className="text-6xl mb-6 relative z-10"
                  animate={{
                    scale: hoveredIndex === index ? 1.3 : 1,
                    rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                    y: hoveredIndex === index ? -10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {useCase.image}
                </motion.div>

                {/* Icon with glow */}
                <motion.div 
                  className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <useCase.icon className="w-8 h-8 text-primary" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  />
                </motion.div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground relative z-10">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground relative z-10 mb-4">
                  {useCase.description}
                </p>

                {/* Learn more link */}
                <motion.div
                  className="flex items-center justify-center gap-2 text-primary text-sm font-medium relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </motion.div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Works with all types of footwear and storage spaces
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Sneakers", "Formal Shoes", "Sports Shoes", "Boots", "Loafers", "Sandals"].map((type, index) => (
              <motion.span
                key={type}
                className="px-4 py-2 rounded-full bg-background/50 border border-border/50 text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
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
