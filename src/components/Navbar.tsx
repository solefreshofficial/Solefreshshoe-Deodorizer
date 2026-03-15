import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scrollToIdWithOffset, getMeeshoLink } from "@/lib/utils";
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

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => scrollToIdWithOffset(id, 12);

  const handleAnchor = (e: any, id: string) => {
    e.preventDefault();
    const isHome = !location.hash || location.hash === "#" || location.hash === "#/" || location.pathname === "/";
    if (isHome) {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 150);
    }
  }; 

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
                requestAnimationFrame(() => {
                  setMousePos({
                    x: (e.clientX - rect.left - rect.width / 2) / 10,
                    y: (e.clientY - rect.top - rect.height / 2) / 10,
                  });
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
                  onClick={(e) => handleAnchor(e, link.href.replace('#',''))}
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
              <a
                href={getMeeshoLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full relative overflow-hidden group transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                <ShoppingBag className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Buy Now</span>
                {/* Animated shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Glow */}
                <span className="absolute inset-0 bg-primary-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

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

      {/* Full-screen Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          clipPath: mobileMenuOpen ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col items-center justify-center pointer-events-none"
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        <div className="absolute top-5 right-6">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-primary"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-8 px-6">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { setMobileMenuOpen(false); handleAnchor(e, link.href.replace('#','')); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 20 }}
              transition={{ 
                delay: mobileMenuOpen ? 0.2 + index * 0.1 : 0,
                duration: 0.5 
              }}
              className="text-4xl anton tracking-tight text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href={getMeeshoLink()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, scale: mobileMenuOpen ? 1 : 0.9 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground font-bold rounded-full text-xl mt-6 shadow-xl"
          >
            <ShoppingBag className="w-6 h-6" />
            Buy Now
          </motion.a>
        </div>

        {/* Decorative background logo in menu */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-5 scale-150 pointer-events-none">
          <img src={logo} alt="" className="w-64 grayscale hue-rotate-180" />
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
