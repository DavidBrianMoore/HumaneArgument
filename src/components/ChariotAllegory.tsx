'use client';

import { motion } from "framer-motion";
import { Sparkles, Heart, Activity, ArrowUp } from "lucide-react";

export default function ChariotAllegory() {
  return (
    <div className="premium-card bg-bg-tertiary/20 overflow-hidden relative border-accent/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(45,100%,65%,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 p-12 text-center">
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent-soft border border-accent-glow text-accent mb-8"
        >
            <Activity size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Synthesis Allegory: The Chariot</span>
        </motion.div>

        <h3 className="text-3xl font-bold mb-6 tracking-tight">The Living Movement</h3>
        <p className="text-text-secondary max-w-2xl mx-auto italic mb-16">
          "The Human is not a static object, but a purposeful movement toward a Destination."
        </p>

        {/* Chariot Allegory Visualization */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative items-center">
            
            {/* The Horses (Agency / Strength) */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Activity size={32} />
                </div>
                <div>
                    <h4 className="font-bold text-blue-400">The Horses</h4>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-text-muted mt-1">Agency (θυμός)</p>
                    <p className="text-xs text-text-secondary mt-2 opacity-70">The raw power and capacity for movement.</p>
                </div>
            </motion.div>

            {/* The Charioteer (Reason / Vision) */}
            <motion.div 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 relative"
            >
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-accent to-transparent" />
                <div className="w-24 h-24 rounded-full bg-accent-soft border-2 border-accent flex items-center justify-center text-accent shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                    <Sparkles size={40} />
                </div>
                <div>
                    <h4 className="font-bold text-accent">The Charioteer</h4>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-text-muted mt-1">Reason (νοῦς)</p>
                    <p className="text-xs text-text-secondary mt-2 opacity-70">The vision that guides and perceives the track.</p>
                </div>
            </motion.div>

            {/* The Destination/Pulse (Love / Worship) */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Heart size={32} />
                </div>
                <div>
                    <h4 className="font-bold text-rose-400">The Orientation</h4>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-text-muted mt-1">Love (ἀγάπη)</p>
                    <p className="text-xs text-text-secondary mt-2 opacity-70">The destination that draws the movement forward.</p>
                </div>
            </motion.div>

            {/* Connecting Arc */}
            <svg className="absolute top-1/2 left-0 w-full h-full -z-10 opacity-20 hidden md:block" viewBox="0 0 600 200">
                <path d="M 100 100 Q 300 0 500 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-accent" />
            </svg>
        </div>

        {/* Synthesis Conclusion */}
        <div className="mt-20 p-8 rounded-xl bg-bg-primary/40 border border-glass-border">
            <div className="flex items-center gap-4 mb-4 justify-center">
                <ArrowUp className="text-accent animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] font-mono">Dynamic Dependency Logic</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl mx-auto">
                Without the **Charioteer (Reason)**, the horses gallop to destruction. Without the **Horses (Agency)**, the vision remains a dream. Without the **Orientation (Love)**, the movement lacks a reason to begin.
            </p>
        </div>
      </div>
    </div>
  );
}
