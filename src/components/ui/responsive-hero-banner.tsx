"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import OrbitalSystem from '../OrbitalSystem';

interface Partner {
    logoUrl: string;
    href: string;
    name: string;
}

interface ResponsiveHeroBannerProps {
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
    onNodeClick?: (service: string, description: string) => void;
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
    badgeLabel = "New",
    badgeText = "Award-Winning Studio 2024",
    title = "Websites that refuse",
    titleLine2 = "to blend in",
    description = "We help businesses plan, design, and build exceptional websites through consultancy and custom development. Experience digital luxury redefined.",
    primaryButtonText = "View Our Work",
    primaryButtonHref = "#portfolio",
    secondaryButtonText = "Watch Showreel",
    secondaryButtonHref = "#",
    partnersTitle = "Trusted by industry leaders worldwide",
    partners = [
        { name: "Global Finance", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?w=200&h=80&fit=crop&q=80", href: "#" },
        { name: "TechNova", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?w=200&h=80&fit=crop&q=80", href: "#" },
        { name: "Elite Arch", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?w=200&h=80&fit=crop&q=80", href: "#" },
        { name: "Aura Health", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?w=200&h=80&fit=crop&q=80", href: "#" },
        { name: "Luxe Co", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aba9?w=200&h=80&fit=crop&q=80", href: "#" }
    ],
    onNodeClick = () => {}
}) => {
    return (
        <section className="w-full isolate min-h-screen overflow-hidden relative flex flex-col justify-center pt-20">
            {/* Background Orbital System - Maintaining the Luxury Space Vibe */}
            <div className="absolute inset-0 z-0">
                <OrbitalSystem onNodeClick={onNodeClick} />
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/40 to-luxury-black pointer-events-none" />
            </div>

            <div className="z-10 relative">
                <div className="max-w-7xl mx-auto px-6 pb-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full glass px-3 py-2 animate-fade-slide-in-1">
                            <span className="inline-flex items-center text-xs font-bold text-luxury-black bg-gradient-to-r from-luxury-gold to-luxury-gold-light rounded-full py-1 px-3 uppercase tracking-wider">
                                {badgeLabel}
                            </span>
                            <span className="text-sm font-medium text-luxury-ivory/90 font-sans pr-2 flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-luxury-gold" />
                                {badgeText}
                            </span>
                        </div>

                        <h1 className="sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] text-5xl text-luxury-ivory tracking-tight font-serif animate-fade-slide-in-2">
                            {title}
                            <br className="hidden sm:block" />
                            <span className="text-gradient-gold italic">{titleLine2}</span>
                        </h1>

                        <p className="sm:text-xl animate-fade-slide-in-3 text-lg text-luxury-muted max-w-2xl mt-8 mx-auto leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:gap-6 mt-12 gap-4 items-center justify-center animate-fade-slide-in-4">
                            <motion.a
                                href={primaryButtonHref}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-black px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-[0_0_30px_rgba(199,162,79,0.4)]"
                            >
                                {primaryButtonText}
                                <ArrowRight className="w-4 h-4" />
                            </motion.a>
                            <motion.a
                                href={secondaryButtonHref}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 glass px-8 py-4 rounded-full text-luxury-ivory font-bold text-sm transition-all hover:bg-white/5"
                            >
                                <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                                    <Play className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                                </div>
                                {secondaryButtonText}
                            </motion.a>
                        </div>
                    </div>

                    <div className="mx-auto mt-24 max-w-5xl">
                        <p className="animate-fade-slide-in-1 text-xs text-luxury-muted uppercase tracking-[0.2em] text-center mb-8">
                            {partnersTitle}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 animate-fade-slide-in-2 items-center justify-items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
                            {partners.map((partner, index) => (
                                <motion.a
                                    key={index}
                                    href={partner.href}
                                    whileHover={{ opacity: 1, scale: 1.1 }}
                                    className="flex items-center justify-center"
                                >
                                    {/* Using a placeholder styled for luxury theme if logos are missing */}
                                    <div className="h-8 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                                        <span className="font-serif text-sm tracking-widest text-luxury-ivory">{partner.name}</span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResponsiveHeroBanner;
