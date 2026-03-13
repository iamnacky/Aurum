import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const packages = [
  {
    name: 'Essential Static',
    price: '10,000',
    description: 'High-performance static presence for established brands',
    features: [
      'Up to 5 custom pages',
      'Ultra-fast static generation',
      'Premium UI/UX design',
      'Advanced SEO foundation',
      'Mobile optimization',
      'Secure hosting setup',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '45,000',
    description: 'Full-scale dynamic platform with custom integrations',
    features: [
      'Up to 20 custom pages',
      'Full CMS integration',
      'Custom animations & motion',
      'Advanced API integrations',
      'Dynamic content architecture',
      '6 months priority support',
      'Performance audit & optimization',
      'Conversion tracking system',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Bespoke',
    description: 'Complex ecosystem solutions for industry leaders',
    features: [
      'Unlimited scale & pages',
      'Proprietary design system',
      'E-commerce & payment systems',
      'Multi-platform sync',
      'Dedicated project team',
      '24/7 technical oversight',
      'Unlimited revisions',
      'Strategic growth partnership',
    ],
    popular: false,
  },
];

export default function PricingSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-luxury-black" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-3xl" />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-luxury-gold text-sm tracking-widest uppercase">Investment</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-4 mb-6">
            Transparent pricing. <span className="text-gradient-gold italic">Luxury</span> results.
          </h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto">
            We work with brands that value quality above all. Our pricing reflects the level of craftsmanship and technical expertise we bring to every project.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
              className={`relative ${pkg.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              onMouseEnter={() => setHoveredCard(pkg.name)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1 px-4 py-1 bg-gradient-to-r from-luxury-gold to-luxury-gold-light rounded-full text-luxury-black text-sm font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`glass rounded-2xl p-8 h-full transition-all duration-500 ${
                  pkg.popular ? 'glow-gold border-luxury-gold/30' : ''
                } ${
                  hoveredCard === pkg.name && !pkg.popular ? 'glow-gold-sm border-luxury-gold/30' : ''
                }`}
              >
                {/* Package name */}
                <h3 className="text-xl font-serif text-luxury-ivory mb-2">{pkg.name}</h3>
                <p className="text-luxury-muted text-sm mb-6">{pkg.description}</p>

                {/* Price */}
                <div className="mb-8">
                  {pkg.price === 'Bespoke' ? (
                    <span className="text-4xl md:text-5xl font-serif text-gradient-gold">Contact Us</span>
                  ) : (
                    <>
                      <span className="text-4xl md:text-5xl font-serif text-gradient-gold">₹{pkg.price}</span>
                      <span className="text-luxury-muted ml-2">INR</span>
                    </>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-luxury-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-luxury-gold" />
                      </div>
                      <span className="text-luxury-muted text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  className={`block w-full py-4 rounded-full text-center font-medium transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-black hover:shadow-[0_0_30px_rgba(199,162,79,0.4)]'
                      : 'glass text-luxury-ivory hover:glow-gold-sm'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Consultation
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}