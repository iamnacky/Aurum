"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { GlowingEffect } from "./glowing-effect"

interface Feature {
  step: string
  title?: string
  content: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
}

export function FeatureSteps({
  features,
  className,
  title = "Your Journey to Digital Excellence",
}: FeatureStepsProps) {
  return (
    <section id="studio" className={cn("relative py-16 bg-luxury-black overflow-hidden", className)}>
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-luxury-gold text-sm tracking-[0.3em] uppercase font-medium">Process</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-6 text-luxury-ivory">
            {title}
          </h2>
        </motion.div>

        {/* Grid of Glowing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative h-full rounded-2xl border border-white/5 bg-luxury-charcoal/50 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-luxury-charcoal/80">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={2}
                />
                
                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold ring-1 ring-luxury-gold/20">
                    <span className="text-lg font-bold font-serif">{index + 1}</span>
                  </div>
                  
                  <h3 className="mb-4 text-2xl font-serif text-luxury-ivory transition-colors group-hover:text-luxury-gold">
                    {feature.title}
                  </h3>
                  
                  <p className="text-luxury-muted leading-relaxed">
                    {feature.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}