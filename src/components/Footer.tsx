import { motion } from "framer-motion";
import { Instagram, Mail, Phone, ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/solefresh-logo.png";

const Footer = () => {
  return (
    <footer className="section-padding bg-background border-t border-border relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-primary/3 blur-3xl rounded-full" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(142 71% 45%) 1px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Logo with glow */}
            <Link to="/" className="relative inline-block mb-6 group">
              <img src={logo} alt="SoleFresh" className="h-12 md:h-14 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 blur-2xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            <p className="text-muted-foreground text-lg mb-6">
              Fresh shoes. Every day.
            </p>
            
            {/* Social links with enhanced hover */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Mail, href: "mailto:hello@solefresh.in" },
                { icon: Phone, href: "tel:+919876543210" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-card/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-card transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <h4 className="text-foreground font-bold mb-6 text-lg">Quick Links</h4>
            <div className="space-y-4">
              {[
                { label: "Shop", href: "/shop", isRoute: true },
                { label: "How It Works", href: "#science" },
                { label: "Ingredients", href: "#ingredients" },
                { label: "Product Details", href: "#details" },
              ].map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                )
              ))}
            </div>
          </motion.div>

          {/* Safety note with glass effect */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          >
            <h4 className="text-foreground font-bold mb-6 text-lg">Safety</h4>
            <div className="glass-card rounded-2xl p-6 hover:border-primary/30 transition-colors duration-300">
              <p className="text-sm text-muted-foreground leading-relaxed">
                For external use only. Keep away from children and pets. Do not
                open sachets. Store in a cool, dry place. If contact occurs with
                eyes, rinse immediately.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar with animated border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 relative"
        >
          {/* Animated gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-2">
            © {new Date().getFullYear()} SoleFresh. Made with{" "}
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
            in India
          </p>
          <div className="flex items-center gap-4">
            {["Natural", "Reusable", "Chemical-Free"].map((tag, index) => (
              <span
                key={tag}
                className="text-xs text-muted-foreground/60 px-3 py-1 rounded-full bg-card/30 border border-border/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
