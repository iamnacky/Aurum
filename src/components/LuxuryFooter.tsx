import { motion } from 'framer-motion';

export default function LuxuryFooter() {
  return (
    <footer className="relative bg-luxury-black border-t border-luxury-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center">
          <p className="text-luxury-muted text-sm">
            © 2026 AURUM Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}