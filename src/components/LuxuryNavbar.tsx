import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Studio", href: "#studio" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export default function LuxuryNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop / Tablet Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 mx-auto z-50 transition-all duration-500 w-[95%] max-w-5xl ${
          isScrolled ? "top-4" : "top-6"
        }`}
      >
        <div
          className={`glass rounded-full px-6 py-2 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "shadow-[0_0_30px_rgba(199,162,79,0.15)]" : ""
          }`}
        >
          {/* Left Column: Logo */}
          <div className="flex-1 flex justify-start">
            <motion.a
              href="#home"
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center">
                <span className="text-luxury-black font-serif font-bold text-sm">A</span>
              </div>
              <span className="hidden lg:block font-serif text-sm tracking-widest text-luxury-ivory">AURUM</span>
            </motion.a>
          </div>

          {/* Center Column: Navigation Links */}
          <div className="hidden md:flex flex-none items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative px-3 py-2 text-sm font-medium text-luxury-ivory/80 hover:text-luxury-ivory transition-colors"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ y: -1 }}
              >
                {item.name}
                {hoveredItem === item.name && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-1 right-1 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-gold-light rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Right Column: CTA */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <motion.a
              href="#contact"
              className="hidden md:block px-5 py-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-black font-medium text-sm rounded-full hover:shadow-[0_0_20px_rgba(199,162,79,0.4)] transition-shadow whitespace-nowrap"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Consultation
            </motion.a>

            {/* Mobile menu toggle */}
            <motion.button
              className="md:hidden p-2 text-luxury-ivory"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-luxury-black/95 backdrop-blur-xl md:hidden pt-24"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center">
                  <span className="text-luxury-black font-serif font-bold">A</span>
                </div>
                <span className="font-serif text-xl tracking-wide text-luxury-ivory">
                  AURUM
                </span>
              </motion.div>

              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-serif text-luxury-ivory hover:text-luxury-gold transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                className="mt-4 px-8 py-3 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-black font-medium rounded-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Consultation
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}