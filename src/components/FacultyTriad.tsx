'use client';

import { motion } from "framer-motion";
import { User, Heart, ArrowRight, Sparkles } from "lucide-react";

const faculties = [
  {
    id: "reason",
    name: "Reason",
    subtitle: "The Dignity of Vision (νοῦς)",
    description: "The faculty that perceives the 'True' and allows the Human to transcend mere biological instinct. It is the eye of the soul.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "hsl(45, 100%, 65%)", // Gold
    bg: "hsla(45, 100%, 65%, 0.1)",
    border: "hsla(45, 100%, 65%, 0.3)"
  },
  {
    id: "love",
    name: "Love",
    subtitle: "The Faculty of Worship (ἀγάπη)",
    description: "The primordial orientation towards the 'Good'. It is the motive force that gives direction to Reason and Agency.",
    icon: <Heart className="w-8 h-8" />,
    color: "hsl(0, 100%, 75%)", // Rose/Soft Red
    bg: "hsla(0, 100%, 75%, 0.1)",
    border: "hsla(0, 100%, 75%, 0.3)"
  },
  {
    id: "agency",
    name: "Agency",
    subtitle: "The Dignity of Strength (θυμός)",
    description: "The faculty of free choice and sovereign action. It is the irreducible power of a Person to initiate movement.",
    icon: <User className="w-8 h-8" />,
    color: "hsl(220, 100%, 75%)", // Blue
    bg: "hsla(220, 100%, 75%, 0.1)",
    border: "hsla(220, 100%, 75%, 0.3)"
  }
];

export default function FacultyTriad() {
  return (
    <section className="py-24 px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent-soft border border-accent-glow text-accent mb-4"
        >
          <Sparkles size={12} />
          <span className="text-[10px] font-bold uppercase tracking-widest">The Vital Triad</span>
        </motion.div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">The Three Crown Jewels</h2>
        <p className="text-text-secondary max-w-2xl mx-auto italic">
          "For Love, The Eternal God Gives us Reason and Agency. These faculties are not 
          modules added to an animal; they are the irreducible substance of the Humane."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connection Lines (Visual Decor) */}
        <div className="hidden md:block absolute top-[40%] left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-glass-border to-transparent -z-10" />
        
        {faculties.map((faculty, idx) => (
          <motion.div
            key={faculty.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="premium-card group h-full flex flex-col items-center text-center p-10 relative overflow-hidden"
          >
            {/* Faculty Icon & Glow */}
            <div 
              style={{ backgroundColor: faculty.bg, borderColor: faculty.border, color: faculty.color }}
              className="w-20 h-20 rounded-2xl border flex items-center justify-center mb-8 relative z-10 transition-transform group-hover:scale-110 duration-500"
            >
              {faculty.icon}
              <div 
                style={{ backgroundColor: faculty.color }}
                className="absolute inset-0 blur-2xl opacity-10 group-hover:opacity-30 transition-opacity" 
              />
            </div>

            {/* Typography */}
            <div className="mb-4">
              <h3 className="text-3xl font-bold mb-2 tracking-tight group-hover:text-accent transition-colors">{faculty.name}</h3>
              <p className="text-xs font-mono uppercase tracking-widest opacity-60 italic">{faculty.subtitle}</p>
            </div>

            <p className="text-text-secondary leading-relaxed mb-8 flex-grow">
              {faculty.description}
            </p>

            {/* Relationship Callout */}
            <div className="w-full pt-6 border-t border-glass-border flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-muted mt-auto">
              <span>Ontological Unity</span>
              <ArrowRight size={12} className="text-accent" />
            </div>

            {/* Hover Accent Decor */}
            <div 
              style={{ backgroundColor: faculty.color }}
              className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-50 transition-opacity" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
