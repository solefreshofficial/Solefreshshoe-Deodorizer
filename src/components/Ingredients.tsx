import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="ingredients" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card via-background to-card" />

      {/* 3D Floating elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full border border-primary/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-[0.3em] mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-3 h-3" />
            Pure & Natural
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            What's <span className="text-gradient">Inside</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            A carefully balanced blend of three powerful <span className="text-primary">natural ingredients</span>.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group"
            >
              <motion.div
                className="glass-card rounded-3xl p-10 h-full overflow-hidden relative"
                whileHover={{ scale: 1.02, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${ingredient.color}`}
                  animate={{ opacity: hoveredIndex === index ? 0.3 : 0 }}
                />

                {/* Large emoji icon */}
                <motion.div
                  className="text-5xl mb-6 text-center"
                  animate={{ scale: hoveredIndex === index ? 1.2 : 1, rotate: hoveredIndex === index ? 10 : 0 }}
                >
                  {ingredient.icon}
                </motion.div>

                {/* Percentage ring */}
                <div className="relative mb-8">
                  <motion.div 
                    className="w-24 h-24 rounded-full border-4 border-muted flex items-center justify-center mx-auto relative"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div
                      className="absolute inset-0 rounded-full border-4 border-primary"
                      style={{
                        clipPath: isInView ? `polygon(0 0, 100% 0, 100% ${parseInt(ingredient.percentage) + 10}%, 0 ${parseInt(ingredient.percentage) + 10}%)` : "polygon(0 0, 100% 0, 100% 0%, 0 0%)",
                        transition: "clip-path 0.7s ease-out",
                      }}
                    />
                    <span className="text-2xl font-bold text-gradient">{ingredient.percentage}</span>
                  </motion.div>
                </div>

                <div className="relative z-10 text-center">
                  <span className="text-xs text-primary uppercase tracking-[0.2em] mb-3 block font-medium">{ingredient.source}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{ingredient.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{ingredient.description}</p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <p className="text-muted-foreground">
              Packed in <span className="text-primary font-medium">PP Spunbond Non-Woven Fabric (100 GSM)</span> — breathable, durable, and leak-proof.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ingredients;
