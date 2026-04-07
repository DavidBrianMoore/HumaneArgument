'use client';

import { motion } from "framer-motion";
import { Heart, User, Sparkles } from "lucide-react";

export default function TriadSynthesis() {
  const circleSize = 400;
  const iconSize = 36;

  const faculties = [
    {
      id: "reason",
      icon: <Sparkles size={iconSize} />,
      label: "Reason",
      subtitle: "Vision",
      color: "hsl(45, 100%, 65%)",
      angle: -90, // Top
    },
    {
      id: "love",
      icon: <Heart size={iconSize} />,
      label: "Love",
      subtitle: "Worship",
      color: "hsl(0, 100%, 75%)",
      angle: 30, // Bottom Right
    },
    {
      id: "agency",
      icon: <User size={iconSize} />,
      label: "Agency",
      subtitle: "Strength",
      color: "hsl(220, 100%, 75%)",
      angle: 150, // Bottom Left
    },
  ];

  return (
    <section className="py-24 px-8 max-w-7xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent-soft border border-accent-glow text-accent mb-4"
        >
          <Sparkles size={12} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Synthesis Logic</span>
        </motion.div>
        <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Ecosystemic Unity</h3>
        <p className="text-text-secondary max-w-2xl mx-auto italic">
          "περιχώρησις (Perichoresis): The faculties do not exist in isolation. They are 
          mutual, indwelling, and co-constitutive of the Humane Person."
        </p>
      </div>

      {/* Diagram Container */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
        {/* Connection Lines (SVG) - Placed behind icons */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" 
          viewBox={`0 0 ${circleSize} ${circleSize}`}
        >
          {faculties.map((f, i) => {
            const next = faculties[(i + 1) % faculties.length];
            const radius = (circleSize / 2) - 60;
            const x1 = (circleSize/2) + Math.cos((f.angle * Math.PI) / 180) * radius;
            const y1 = (circleSize/2) + Math.sin((f.angle * Math.PI) / 180) * radius;
            const x2 = (circleSize/2) + Math.cos((next.angle * Math.PI) / 180) * radius;
            const y2 = (circleSize/2) + Math.sin((next.angle * Math.PI) / 180) * radius;

            return (
              <motion.path
                key={`${f.id}-${next.id}`}
                d={`M ${x1} ${y1} Q ${circleSize/2} ${circleSize/2} ${x2} ${y2}`}
                fill="none"
                stroke="url(#gradient-accent)"
                strokeWidth="2"
                strokeDasharray="8 8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient-accent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#3d4451" />
            </linearGradient>
          </defs>
        </svg>

        {/* Central Glow Core */}
        <div className="absolute w-24 h-24 bg-accent/20 blur-[60px] rounded-full animate-pulse z-0" />
        
        {/* Connecting Ring (Static Visual Decor) */}
        <div className="absolute w-[280px] h-[280px] rounded-full border-2 border-dashed border-glass-border opacity-20 z-0" />

        {faculties.map((faculty, idx) => {
          const radius = (circleSize / 2) - 60;
          const x = (circleSize / 2) + Math.cos((faculty.angle * Math.PI) / 180) * radius;
          const y = (circleSize / 2) + Math.sin((faculty.angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, type: "spring", damping: 12 }}
              style={{ left: `${(x / circleSize) * 100}%`, top: `${(y / circleSize) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
            >
              <div 
                style={{ backgroundColor: "rgba(22, 23, 28, 0.8)", borderColor: faculty.color }}
                className="w-20 h-20 rounded-full border-2 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500 backdrop-blur-xl"
              >
                <div style={{ color: faculty.color }}>
                  {faculty.icon}
                </div>
                {/* Individual Faculty Glow */}
                <div 
                  style={{ backgroundColor: faculty.color }}
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full" 
                />
              </div>
              <div className="mt-4 text-center">
                <div className="font-bold tracking-tight text-white/90 text-sm">{faculty.label}</div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#d4af37] opacity-60 italic">{faculty.subtitle}</div>
              </div>
            </motion.div>
          );
        })}

        {/* Central Branding Overlay */}
        <div className="absolute text-center z-10 pointer-events-none">
          <div className="text-[8px] font-mono uppercase tracking-[0.4em] text-[#d4af37] opacity-40">The Synthesis</div>
          <div className="text-xl font-bold tracking-widest text-white/80">Humane</div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="premium-card bg-bg-tertiary/40 border-glass-border/50"
        >
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-2 font-mono">Synthesis Principle 01</h4>
            <p className="text-sm text-text-secondary leading-relaxed first-letter:text-lg first-letter:text-[#d4af37] first-letter:font-bold first-letter:mr-1">
              Reason without Love is cold calculation (Machine). Love without Reason is blind instinct (Animal).
            </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="premium-card bg-bg-tertiary/40 border-glass-border/50"
        >
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-2 font-mono">Synthesis Principle 02</h4>
            <p className="text-sm text-text-secondary leading-relaxed first-letter:text-lg first-letter:text-[#d4af37] first-letter:font-bold first-letter:mr-1">
              Agency without Reason is aimless movement. Agency without Love is hollow power.
            </p>
        </motion.div>
      </div>
    </section>
  );
}
