import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const team = [
  {
    name: 'Ayush Tyagi',
    role: 'CEO',
    bio: 'Student of TCET pursuing B.E. Passionate about building premium digital experiences and luxury web solutions.',
  },
];

export default function TeamSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="team" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-charcoal/30 to-luxury-black" />

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-luxury-gold text-sm tracking-widest uppercase">Our Leadership</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-4 mb-6">
            The mind behind the <span className="text-gradient-gold italic">magic</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto">
            Driven by innovation and technical excellence to craft high-end digital solutions.
          </p>
        </motion.div>

        {/* Team Grid - Centered for single member */}
        <div className="flex justify-center">
          {team.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="group max-w-sm w-full"
            >
              <div className="glass rounded-2xl p-8 text-center hover:glow-gold-sm transition-all duration-500 border border-luxury-gold/10">
                {/* Info */}
                <h3 className="text-2xl font-serif text-luxury-ivory mb-2">{member.name}</h3>
                <div className="inline-block px-4 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/20 mb-4">
                  <p className="text-luxury-gold text-sm font-medium">{member.role}</p>
                </div>
                <p className="text-luxury-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}