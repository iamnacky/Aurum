import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OrbitalSystem from './OrbitalSystem';
import { X } from 'lucide-react';

export default function HeroSection() {
  const [selectedService, setSelectedService] = useState<{ name: string; description: string } | null>(null);

  return (
    <section id="home" className="relative flex flex-col items-center justify-start overflow-hidden pt-20 pb-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-charcoal to-luxury-black" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-luxury-gold/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-4"
        >
          Websites that <br />
          <span className="text-gradient-gold italic">refuse to</span> blend in
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:xl text-luxury-muted max-w-2xl leading-relaxed mb-6 text-balance"
        >
          We help businesses plan, design, and build exceptional websites through consultancy and custom development.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-2"
        >
          <motion.a
            href="#pricing"
            className="group relative px-8 py-3 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-black font-medium rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Packages</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.a>
          
          <motion.a
            href="#contact"
            className="group relative px-8 py-3 glass rounded-full overflow-hidden border border-luxury-gold/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 text-luxury-ivory">Book Consultation</span>
            <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </motion.div>

        {/* Orbital System (Centered below buttons) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-full h-[250px] md:h-[280px]"
        >
          <OrbitalSystem
            onNodeClick={(name, description) => setSelectedService({ name, description })}
          />
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-luxury-black/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-md w-full glass-dark rounded-2xl p-8 glow-gold"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 text-luxury-muted hover:text-luxury-ivory transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-gold-light flex items-center justify-center">
                  <div className="w-3 h-3 bg-luxury-black rounded-full" />
                </div>
                <h3 className="text-2xl font-serif text-luxury-ivory">{selectedService.name}</h3>
                <p className="text-luxury-muted leading-relaxed">{selectedService.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll indicator (absolute positioning prevents it from adding empty space) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-luxury-gold to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}