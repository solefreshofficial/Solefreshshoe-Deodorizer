import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, ShoppingBag, Star, Shield, Truck, ArrowRight } from "lucide-react";
import logo from "@/assets/solefresh-logo.png";

const platforms = [
  {
    name: "Meesho",
    description: "Best prices with COD available",
    url: "https://www.meesho.com/",
    color: "from-pink-500 to-rose-600",
    icon: "🛍️",
    features: ["Cash on Delivery", "Easy Returns", "Best Prices"],
  },
  {
    name: "Amazon",
    description: "Fast Prime delivery",
    url: "https://www.amazon.in/",
    color: "from-orange-500 to-amber-600",
    icon: "📦",
    features: ["Prime Delivery", "Trusted Platform", "Easy Returns"],
  },
];

const Shop = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(5);
  const [selectedPlatform, setSelectedPlatform] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handlePlatformClick = (index: number, url: string) => {
    setSelectedPlatform(index);
    setCountdown(5);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.open(url, "_blank", "noopener,noreferrer");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Interactive cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, hsl(142 71% 45% / 0.06), transparent 40%)`,
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(142 71% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(142 71% 45%) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        
        {/* Floating orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-float-slow will-change-transform"
          style={{
            background: "radial-gradient(circle, hsl(142 71% 45% / 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl animate-float will-change-transform"
          style={{
            background: "radial-gradient(circle, hsl(142 80% 55% / 0.3) 0%, transparent 70%)",
            animationDelay: "2s",
          }}
        />

        {/* 3D rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div 
            className="absolute inset-0 rounded-full border border-primary/10 animate-spin-slow will-change-transform"
            style={{ animationDuration: "30s" }}
          />
          <div 
            className="absolute inset-8 rounded-full border border-primary/5 animate-spin-slow will-change-transform"
            style={{ animationDuration: "40s", animationDirection: "reverse" }}
          />
          <div 
            className="absolute inset-16 rounded-full border border-primary/10 animate-spin-slow will-change-transform"
            style={{ animationDuration: "50s" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative group"
        >
          <img
            src={logo}
            alt="SoleFresh"
            className="h-16 md:h-20 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 blur-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.a>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Choose Your{" "}
            <span className="text-gradient">Platform</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto">
            Select your preferred shopping platform to purchase SoleFresh
          </p>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {[
            { icon: Shield, text: "100% Authentic" },
            { icon: Truck, text: "Fast Delivery" },
            { icon: Star, text: "Top Rated" },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 backdrop-blur-sm"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{badge.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="group relative"
            >
              <div
                onClick={() => handlePlatformClick(index, platform.url)}
                className="glass-card rounded-3xl p-8 cursor-pointer relative overflow-hidden transform-gpu transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-primary/50"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* 3D shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl transform-gpu transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                      {platform.icon}
                    </span>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                    {platform.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {platform.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {platform.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all duration-300`}>
                    {selectedPlatform === index ? (
                      <span className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-sm font-bold">
                          {countdown}
                        </span>
                        Redirecting...
                      </span>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>Shop on {platform.name}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back link */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Home
        </motion.a>
      </div>
    </div>
  );
};

export default Shop;
