import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import sachet from "@/assets/sachet.jpg";
import { Sparkles, CheckCircle2 } from "lucide-react";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section
      ref={containerRef}
      id="how-to-use"
      className="section-padding relative overflow-hidden"
    >
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      {/* Animated geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hexagons */}
        <motion.div
          className="absolute top-[10%] right-[15%] w-20 h-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            border: "1px solid hsl(142 71% 45% / 0.1)",
            background: "transparent",
          }}
          animate={{
            rotate: [0, 60, 0],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Connecting lines animation */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.line
            x1="10%"
            y1="20%"
            x2="30%"
            y2="80%"
            stroke="hsl(142 71% 45%)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line
            x1="70%"
            y1="10%"
            x2="90%"
            y2="60%"
            stroke="hsl(142 71% 45%)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </svg>

        {/* Glowing particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${5 + i * 10}%`,
              top: `${15 + (i % 5) * 18}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Large gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />

      <div ref={ref} className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left side - Product image with 3D effects */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <motion.div 
              style={{ scale: imageScale, rotate: imageRotate }} 
              className="will-change-transform relative"
            >
              {/* Multi-layer glow */}
              <div className="absolute inset-[-20px] bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
              <div
                className="absolute inset-0 rounded-3xl animate-pulse-glow will-change-auto"
                style={{
                  background: "radial-gradient(circle at center, hsl(142 71% 45% / 0.3) 0%, transparent 60%)",
                }}
              />

              {/* 3D floating wrapper */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={sachet}
                  alt="SoleFresh Sachet"
                  className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                  loading="lazy"
                />

                {/* Glass reflection */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                
                {/* Animated shine */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Step indicators */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeStep === index ? "bg-primary w-8" : "bg-muted"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setActiveStep(index)}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Steps */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <CheckCircle2 className="w-3 h-3" />
                Simple & Effective
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 tracking-tight">
                How to{" "}
                <span className="text-gradient">Use</span>
              </h2>
            </motion.div>

            {/* Interactive timeline steps */}
            <div className="space-y-4 relative">
              {/* Timeline line */}
              <div className="absolute left-[42px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  onMouseEnter={() => setActiveStep(index)}
                  className="group cursor-pointer"
                >
                  <motion.div
                    className={`flex gap-6 p-6 rounded-2xl relative overflow-hidden transition-all duration-500 ${
                      activeStep === index
                        ? "bg-card/80 border border-primary/30 shadow-lg shadow-primary/5"
                        : "bg-transparent hover:bg-card/40"
                    }`}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                      initial={{ opacity: 0, x: "-100%" }}
                      animate={{
                        opacity: activeStep === index ? 1 : 0,
                        x: activeStep === index ? "0%" : "-100%",
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Step number with icon */}
                    <div className="flex-shrink-0 relative z-10">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                          activeStep === index ? "bg-primary/20" : "bg-card/50"
                        }`}
                        animate={{
                          scale: activeStep === index ? 1.1 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-3xl z-10">{step.icon}</span>
                        <span className="absolute bottom-1 right-1 text-xs font-bold text-primary/50">
                          {step.number}
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="pt-2 relative z-10 flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2 text-foreground flex items-center gap-3">
                        {step.title}
                        <motion.span
                          className="text-primary"
                          animate={{
                            x: activeStep === index ? [0, 5, 0] : 0,
                          }}
                          transition={{
                            duration: 1,
                            repeat: activeStep === index ? Infinity : 0,
                          }}
                        >
                          →
                        </motion.span>
                      </h3>
                      <p className="text-muted-foreground text-lg mb-2">
                        {step.description}
                      </p>
                      <motion.p
                        className="text-sm text-primary"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: activeStep === index ? "auto" : 0,
                          opacity: activeStep === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {step.detail}
                      </motion.p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
