import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useTouchDevice } from "@/hooks/use-touch-device";

const ingredients = [
  {
    name: "Activated Carbon",
    source: "Coconut Shell Based",
    description: "High adsorption capacity traps odor-causing gases and volatile compounds.",
    color: "from-zinc-600 to-zinc-900",
    percentage: "40%",
    icon: "🥥",
  },
  {
    name: "Silica Gel Crystals",
    source: "Desiccant Material",
    description: "Absorbs excess moisture, reducing humidity that promotes bacterial growth.",
    color: "from-sky-400/50 to-sky-600/50",
    percentage: "35%",
    icon: "💎",
  },
  {
    name: "Fragrance-Infused Rice",
    source: "Essential Oil Infused",
    description: "Provides mild, natural freshness without overpowering artificial scents.",
    color: "from-amber-400/50 to-amber-600/50",
    percentage: "25%",
    icon: "🌾",
  },
];

const Ingredients = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isTouchDevice = useTouchDevice();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="ingredients" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-48 md:w-64 h-48 md:h-64 rounded-full border border-primary/10 hidden md:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 md:w-96 h-64 md:h-96 rounded-full border border-primary/5 hidden md:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-3 h-3" />
            Pure & Natural
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
            What's <span className="text-gradient">Inside</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            A carefully balanced blend of three powerful <span className="text-primary">natural ingredients</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
          {ingredients.map((ingredient, index) => {
            const isActive = isTouchDevice ? activeIndex === index : false;
            
            return (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                onClick={() => isTouchDevice && setActiveIndex(isActive ? null : index)}
                className="group"
              >
                <motion.div
                  className={`glass-card rounded-2xl md:rounded-3xl p-6 md:p-10 h-full overflow-hidden relative ${
                    isTouchDevice ? 'bg-gradient-to-br ' + ingredient.color + ' bg-opacity-20' : ''
                  }`}
                  whileHover={isTouchDevice ? {} : { scale: 1.02, y: -8 }}
                  whileTap={isTouchDevice ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Background gradient - always visible on mobile */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${ingredient.color} ${
                      isTouchDevice ? 'opacity-20' : 'opacity-0 group-hover:opacity-30'
                    } transition-opacity duration-300`}
                  />

                  {/* Large emoji icon */}
                  <motion.div
                    className="text-4xl md:text-5xl mb-4 md:mb-6 text-center"
                    animate={isTouchDevice && isActive ? { scale: 1.15, rotate: 8 } : {}}
                  >
                    {ingredient.icon}
                  </motion.div>

                  {/* Percentage ring */}
                  <div className="relative mb-6 md:mb-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-muted flex items-center justify-center mx-auto relative">
                      <div
                        className="absolute inset-0 rounded-full border-4 border-primary"
                        style={{
                          clipPath: isInView 
                            ? `polygon(0 0, 100% 0, 100% ${parseInt(ingredient.percentage) + 10}%, 0 ${parseInt(ingredient.percentage) + 10}%)`
                            : "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
                          transition: "clip-path 0.7s ease-out",
                        }}
                      />
                      <span className="text-xl md:text-2xl font-bold text-gradient">{ingredient.percentage}</span>
                    </div>
                  </div>

                  <div className="relative z-10 text-center">
                    <span className="text-[10px] md:text-xs text-primary uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 md:mb-3 block font-medium">
                      {ingredient.source}
                    </span>
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 text-foreground">
                      {ingredient.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {ingredient.description}
                    </p>
                  </div>

                  {/* Bottom accent - visible on mobile */}
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

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 md:mt-16 text-center px-4"
        >
          <div className="inline-flex items-center gap-3 md:gap-4 px-4 md:px-8 py-3 md:py-4 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary animate-pulse" />
            <p className="text-xs md:text-sm text-muted-foreground">
              Packed in <span className="text-primary font-medium">PP Spunbond Non-Woven Fabric (100 GSM)</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ingredients;
