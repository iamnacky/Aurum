import { useState } from 'react';
import LuxuryNavbar from '@/components/LuxuryNavbar';
import HeroSection from '@/components/HeroSection';
import { FeatureSteps } from '@/components/ui/feature-section';
import PricingSection from '@/components/PricingSection';
import TeamSection from '@/components/TeamSection';
import LuxuryFooter from '@/components/LuxuryFooter';
import CursorGlow from '@/components/CursorGlow';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const journeyFeatures = [
  { 
    step: 'Step 1', 
    title: '✓ Digital Discovery',
    content: 'We map out your vision, analyzing your market and objectives to craft a unique digital strategy.', 
  },
  { 
    step: 'Step 2',
    title: '✓ Artisanal Design',
    content: 'Our designers craft high-fidelity interfaces that balance luxury aesthetics with intuitive functionality.',
  },
  { 
    step: 'Step 3',
    title: '✓ Elite Development',
    content: 'We build your platform using cutting-edge technology, ensuring peak performance and total reliability.',
  },
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<{ name: string; description: string } | null>(null);

  return (
    <div className="relative min-h-screen bg-luxury-black">
      <CursorGlow />
      <LuxuryNavbar />
      
      <main>
        <HeroSection />
        
        {/* Service Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-luxury-black/80 backdrop-blur-sm"
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

        {/* The Animated Journey Section */}
        <FeatureSteps 
          features={journeyFeatures}
          title="Your Journey to Digital Excellence"
        />
        
        <PricingSection />
        <TeamSection />
      </main>
      
      <LuxuryFooter />
    </div>
  );
}