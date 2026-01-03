import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/solefresh-logo.png";

const navLinks = [
  { href: "#science", label: "How It Works" },
  { href: "#ingredients", label: "Ingredients" },
  { href: "#details", label: "Details" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-2xl border-b border-border/50 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        {/* Progress bar with glow */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-primary to-primary/50 will-change-transform"
          style={{ width: progressWidth }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] blur-sm bg-primary/50 will-change-transform"
          style={{ width: progressWidth }}
        />

        <div className="container-wide">
          <div className="flex items-center justify-between h-16 md:h-20 px-6 md:px-12 lg:px-24">
            {/* Premium Logo with 3D hover */}
            <Link
              to="/"
              className="flex items-center relative z-10 group"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({
                  x: (e.clientX - rect.left - rect.width / 2) / 10,
                  y: (e.clientY - rect.top - rect.height / 2) / 10,
                });
              }}
              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            >
              <motion.div
                className="relative"
                animate={{
                  rotateY: mousePos.x,
                  rotateX: -mousePos.y,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={logo}
                  alt="SoleFresh"
                  className="h-8 md:h-10 lg:h-12 w-auto relative z-10 drop-shadow-lg"
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 blur-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index, ease: "easeOut" }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full" />
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] blur-sm bg-primary/50 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button with enhanced effects */}
            <div className="flex items-center gap-4">
              <Link
                to="/shop"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full relative overflow-hidden group transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                <ShoppingBag className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Buy Now</span>
                {/* Animated shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Glow */}
                <span className="absolute inset-0 bg-primary-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-foreground relative group"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu with improved animation */}
      <motion.div
        initial={false}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          y: mobileMenuOpen ? 0 : -20,
          pointerEvents: mobileMenuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-2xl border-b border-border md:hidden"
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : -20 }}
              transition={{ delay: index * 0.1 }}
              className="block text-lg text-muted-foreground hover:text-foreground py-2 transition-colors duration-300"
            >
              {link.label}
            </motion.a>
          ))}
          <Link
            to="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full text-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full mt-4"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy Now
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
