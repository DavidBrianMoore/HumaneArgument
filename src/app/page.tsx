'use client';

import { motion, Variants } from "framer-motion";
import { masterSyllabus } from "@/lib/syllabus";
import { Book, ChevronRight, Sparkles, Library } from "lucide-react";
import Link from "next/link";
import FacultyTriad from "@/components/FacultyTriad";
import TriadSynthesis from "@/components/TriadSynthesis";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] p-8 md:p-12 lg:p-24 overflow-hidden relative">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[radial-gradient(circle,hsla(45,100%,65%,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,hsla(220,100%,65%,0.03)_0%,transparent_70%)] pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10"
      >
        <header className="mb-20 text-center">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent-glow text-accent mb-6">
            <Sparkles size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">The Philosophical Synthesis</span>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            The Humane <span className="text-[#d4af37]">Argument</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto font-light leading-relaxed italic mb-8"
          >
            "{masterSyllabus.coreArgument}"
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Link 
              href="/library" 
              className="inline-flex items-center gap-3 px-8 py-3 rounded-xl bg-accent text-bg-primary font-bold uppercase tracking-[0.2em] text-xs shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all hover:scale-105"
            >
              <Library size={16} />
              Launch Research Library
            </Link>
          </motion.div>
        </header>

        <motion.div 
          variants={itemVariants}
          className="premium-card mb-20 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-[#d4af37] opacity-50 group-hover:opacity-100 transition-opacity" />
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Book className="text-[#d4af37]" />
            Central Thesis
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#d4af37] first-letter:mr-3 first-letter:float-left">
            {masterSyllabus.thesis}
          </p>
        </motion.div>

        <FacultyTriad />
        <TriadSynthesis />

        {/* Recent Research Logs (Accomodation for later posts) */}
        <section className="mt-24 pt-12 border-t border-glass-border">
          <motion.div variants={itemVariants} className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-2">Research Logs</h3>
              <p className="text-text-secondary italic">Annotations and investigations into the core faculties.</p>
            </div>
            <div className="text-accent text-sm font-mono tracking-widest cursor-pointer hover:underline">VIEW ARCHIVE →</div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="premium-card opacity-50 border-dashed">
              <div className="text-[10px] uppercase tracking-[0.2em] mb-4 text-text-muted">Draft — April 2026</div>
              <h4 className="text-xl font-bold mb-4">The Price of Reduction</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                A study on why the modern project to reduce the human experience to biological modules fails to account for the sovereignty of Agency...
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="premium-card opacity-50 border-dashed">
              <div className="text-[10px] uppercase tracking-[0.2em] mb-4 text-text-muted">Draft — April 2026</div>
              <h4 className="text-xl font-bold mb-4">νοῦς vs. Logic</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Distinguishing between the analytical processing of a machine and the perception of truth unique to the Humane vision...
              </p>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
