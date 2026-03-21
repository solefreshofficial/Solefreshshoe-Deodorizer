import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingBag, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { scrollToIdWithOffset, getMeeshoLink } from "@/lib/utils";
import logo from "@/assets/solefresh-logo.png";
import { StarButton } from "@/components/ui/star-button";

const navLinks = [
  { href: "science", label: "How It Works" },
  { href: "ingredients", label: "Ingredients" },
  { href: "details", label: "Details" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id: string) => scrollToIdWithOffset(id, 12);

  const handleAnchor = (e: any, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const isHome =
      !location.hash ||
      location.hash === "#" ||
      location.hash === "#/" ||
      location.pathname === "/";
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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Scroll progress line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1.5px] z-50"
          style={{
            width: progressWidth,
            background: "linear-gradient(90deg, #4CAF6F, #A8D5B5)",
            boxShadow: "0 0 8px rgba(76,175,111,0.6)",
          }}
        />

        {/* Nav container — pill on desktop, full-width on mobile */}
        <div
          className="transition-all duration-500 mx-auto"
          style={{
            maxWidth: scrolled ? "960px" : "100%",
            margin: scrolled ? "12px auto 0" : "0 auto",
            paddingLeft: scrolled ? "16px" : "0",
            paddingRight: scrolled ? "16px" : "0",
          }}
        >
          <div
            className="transition-all duration-500"
            style={{
              background: scrolled
                ? "rgba(5, 13, 8, 0.85)"
                : "transparent",
              backdropFilter: scrolled ? "blur(24px)" : "none",
              WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
              borderRadius: scrolled ? "100px" : "0",
              border: scrolled
                ? "1px solid rgba(76,175,111,0.18)"
                : "none",
              boxShadow: scrolled
                ? "0 4px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)"
                : "none",
              padding: scrolled ? "10px 28px" : "0 32px",
            }}
          >
            <div className="flex items-center justify-between h-14 md:h-16">
              {/* Logo */}
              <Link to="/" className="relative z-10 flex-shrink-0">
                <motion.img
                  src={logo}
                  alt="SoleFresh"
                  className="h-7 md:h-9 w-auto drop-shadow-md"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              </Link>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={`#${link.href}`}
                    onClick={(e) => handleAnchor(e, link.href)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                    className="relative text-[13px] font-medium tracking-wide text-[#c8ddd0] hover:text-[#F0EAD6] transition-colors duration-200 group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#4CAF6F] transition-all duration-300 group-hover:w-full rounded-full" />
                  </motion.a>
                ))}
              </div>

              {/* Right side: CTA + hamburger */}
              <div className="flex items-center gap-3">
                <motion.a
                  href={getMeeshoLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden md:block"
                >
                  <StarButton lightColor="#4CAF6F" backgroundColor="#050D08" className="h-9 px-5 text-[13px] font-semibold border-white/20">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Buy Now
                  </StarButton>
                </motion.a>

                {/* Mobile hamburger — custom animated */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] group"
                  aria-label="Toggle menu"
                >
                  <motion.span
                    animate={mobileMenuOpen
                      ? { rotate: 45, y: 7 }
                      : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block w-5 h-[1.5px] bg-[#F0EAD6] rounded-full origin-center"
                  />
                  <motion.span
                    animate={mobileMenuOpen
                      ? { opacity: 0, scaleX: 0 }
                      : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                    className="block w-5 h-[1.5px] bg-[#F0EAD6] rounded-full"
                  />
                  <motion.span
                    animate={mobileMenuOpen
                      ? { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block w-5 h-[1.5px] bg-[#F0EAD6] rounded-full origin-center"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Full-screen Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] md:hidden flex flex-col"
            style={{
              background: "radial-gradient(ellipse at 80% 10%, #1a4a2e 0%, #040d06 70%)",
            }}
          >
            {/* Top bar inside menu */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-white/5">
              <img src={logo} alt="SoleFresh" className="h-7 w-auto opacity-90" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-[#F0EAD6] hover:border-[#4CAF6F] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu links */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => handleAnchor(e, link.href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-5 border-b border-white/6 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[#4CAF6F]/50 text-xs font-mono tracking-widest">
                      0{index + 1}
                    </span>
                    <span className="text-[#F0EAD6] text-3xl font-bold tracking-tight group-hover:text-[#4CAF6F] transition-colors duration-200">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-[#4CAF6F]/40 text-xl group-hover:text-[#4CAF6F] transition-colors duration-200">→</span>
                </motion.a>
              ))}

              <motion.a
                href={getMeeshoLink()}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.42 }}
                className="mt-10"
              >
                <StarButton 
                  className="w-full h-[52px] text-lg font-bold shadow-[0_8px_32px_rgba(76,175,111,0.25)] border-[#4CAF6F]/30" 
                  lightColor="#4CAF6F" 
                  backgroundColor="#050D08"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Buy Now on Meesho
                </StarButton>
              </motion.a>
            </div>

            {/* Decorative corner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#4CAF6F]/10 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#4CAF6F]/6 blur-[60px] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
