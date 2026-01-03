import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import sachet from "@/assets/sachet.jpg";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useTouchDevice } from "@/hooks/use-touch-device";

const steps = [
  {
    number: "01",
    title: "Place",
    description: "Drop one sachet inside each shoe after use.",
    detail: "Simply insert the pouch — no preparation needed.",
    icon: "👟",
  },
  {
    number: "02",
    title: "Leave",
    description: "Let it work overnight or between wears.",
    detail: "The ingredients actively absorb moisture and odor.",
    icon: "🌙",
  },
  {
    number: "03",
    title: "Reuse",
    description: "Refresh in sunlight every few days. Repeat for months.",
    detail: "2-3 hours in sunlight reactivates the absorbents.",
    icon: "☀️",
  },
];

const HowToUse = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeStep, setActiveStep] = useState(0);
  const isTouchDevice = useTouchDevice();

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [3, -3]);

  return (
    <section
      ref={containerRef}
      id="how-to-use"
      className="section-padding relative overflow-hidden"
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      {/* Animated geometric patterns - desktop only */}
      {!isTouchDevice && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[10%] right-[15%] w-16 md:w-20 h-16 md:h-20"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              border: "1px solid hsl(142 71% 45% / 0.08)",
            }}
            animate={{
              rotate: [0, 60, 0],
              y: [-15, 15, -15],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Connecting lines animation */}
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <motion.line
              x1="10%"
              y1="20%"
              x2="30%"
              y2="80%"
              stroke="hsl(142 71% 45%)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />
          </svg>
        </div>
      )}

      {/* Large gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-primary/3 rounded-full blur-3xl" />

      <div ref={ref} className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Left side - Product image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <motion.div 
              style={{ 
                scale: isTouchDevice ? 1 : imageScale, 
                rotate: isTouchDevice ? 0 : imageRotate 
              }} 
              className="will-change-transform relative"
            >
              {/* Glow */}
              <div className="absolute inset-[-15px] md:inset-[-20px] bg-primary/10 rounded-full blur-2xl md:blur-3xl animate-pulse-slow" />

              {/* 3D floating wrapper */}
              <div className="relative">
                <img
                  src={sachet}
                  alt="SoleFresh Sachet"
                  className="relative w-full max-w-sm md:max-w-md mx-auto rounded-2xl md:rounded-3xl shadow-2xl"
                  loading="lazy"
                />

                {/* Glass reflection */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                
                {/* Animated shine */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
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

              {/* Orbiting element - simplified */}
              <motion.div
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-14 h-14 md:w-20 md:h-20 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </motion.div>

              {/* Step indicators */}
              <motion.div
                className="absolute -bottom-3 md:-bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                      activeStep === index ? "bg-primary w-6 md:w-8" : "bg-muted w-2 md:w-3"
                    }`}
                    onClick={() => setActiveStep(index)}
                    aria-label={`Step ${index + 1}`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Steps */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <CheckCircle2 className="w-3 h-3" />
                Simple & Effective
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 tracking-tight">
                How to{" "}
                <span className="text-gradient">Use</span>
              </h2>
            </motion.div>

            {/* Interactive timeline steps */}
            <div className="space-y-3 md:space-y-4 relative">
              {/* Timeline line - desktop only */}
              <div className="absolute left-[32px] md:left-[42px] top-6 bottom-6 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

              {steps.map((step, index) => {
                const isActive = activeStep === index;
                
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: "easeOut" }}
                    onClick={() => setActiveStep(index)}
                    className="group cursor-pointer"
                  >
                    <motion.div
                      className={`flex gap-4 md:gap-6 p-4 md:p-6 rounded-xl md:rounded-2xl relative overflow-hidden transition-all duration-300 ${
                        isActive
                          ? "bg-card/80 border border-primary/30 shadow-lg shadow-primary/5"
                          : "bg-transparent hover:bg-card/40"
                      }`}
                      whileHover={isTouchDevice ? {} : { x: 6 }}
                      whileTap={isTouchDevice ? { scale: 0.98 } : {}}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? "0%" : "-100%",
                        }}
                        transition={{ duration: 0.25 }}
                      />

                      {/* Step number with icon */}
                      <div className="flex-shrink-0 relative z-10">
                        <motion.div
                          className={`w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden ${
                            isActive ? "bg-primary/20" : "bg-card/50"
                          }`}
                          animate={{
                            scale: isActive ? 1.05 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <span className="text-2xl md:text-3xl z-10">{step.icon}</span>
                          <span className="absolute bottom-0.5 right-1 text-[10px] md:text-xs font-bold text-primary/50">
                            {step.number}
                          </span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="pt-1 md:pt-2 relative z-10 flex-1">
                        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-foreground flex items-center gap-2 md:gap-3">
                          {step.title}
                          <motion.span
                            className="text-primary text-sm md:text-base"
                            animate={{
                              x: isActive ? [0, 4, 0] : 0,
                            }}
                            transition={{
                              duration: 1.2,
                              repeat: isActive ? Infinity : 0,
                            }}
                          >
                            →
                          </motion.span>
                        </h3>
                        <p className="text-sm md:text-lg text-muted-foreground mb-1 md:mb-2">
                          {step.description}
                        </p>
                        {/* Detail - always visible on mobile, animated on desktop */}
                        <motion.p
                          className="text-xs md:text-sm text-primary"
                          initial={isTouchDevice ? {} : { height: 0, opacity: 0 }}
                          animate={
                            isTouchDevice
                              ? { height: "auto", opacity: 1 }
                              : {
                                  height: isActive ? "auto" : 0,
                                  opacity: isActive ? 1 : 0,
                                }
                          }
                          transition={{ duration: 0.25 }}
                        >
                          {step.detail}
                        </motion.p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
