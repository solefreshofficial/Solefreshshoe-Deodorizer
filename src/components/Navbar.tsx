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

      {/* Premium Full-screen Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          clipPath: mobileMenuOpen ? "circle(150% at 90% 5%)" : "circle(0% at 90% 5%)",
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center pointer-events-none"
        style={{ 
          pointerEvents: mobileMenuOpen ? "auto" : "none",
          background: "radial-gradient(circle at 90% 5%, #163824 0%, #050D08 100%)"
        }}
      >
        {/* Animated background patterns for menu */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="absolute top-5 right-6 z-[70]">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-[#F0EAD6] hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-10 px-6 relative z-10 w-full">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => { setMobileMenuOpen(false); handleAnchor(e, link.href.replace('#','')); }}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ 
                opacity: mobileMenuOpen ? 1 : 0, 
                scale: mobileMenuOpen ? 1 : 0.8,
                y: mobileMenuOpen ? 0 : 30 
              }}
              transition={{ 
                delay: mobileMenuOpen ? 0.3 + index * 0.1 : 0,
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1] 
              }}
              className="text-4xl font-sans font-bold tracking-tight text-[#F0EAD6] hover:text-primary transition-colors flex items-center gap-4 group"
            >
              <span className="text-primary/40 text-sm font-mono tracking-widest">0{index + 1}</span>
              {link.label}
              <div className="w-0 h-[2px] bg-primary group-hover:w-8 transition-all duration-300" />
            </motion.a>
          ))}
          
          <motion.a
            href={getMeeshoLink()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: mobileMenuOpen ? 1 : 0, y: mobileMenuOpen ? 0 : 40 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 px-12 py-5 bg-primary text-primary-foreground font-black rounded-full text-xl mt-8 shadow-[0_20px_40px_rgba(76,175,111,0.3)] hover:scale-105 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-6 h-6" />
            BUY NOW
          </motion.a>
        </div>

        {/* Decorative background logo in menu */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-10 scale-125 pointer-events-none">
          <img src={logo} alt="" className="w-64 grayscale invert brightness-200" />
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
