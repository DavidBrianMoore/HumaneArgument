'use client';

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0b0e] flex flex-col items-center justify-center p-8 md:p-12 overflow-hidden relative">
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(circle,hsla(45,100%,65%,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-20%] w-[900px] h-[900px] bg-[radial-gradient(circle,hsla(220,100%,65%,0.02)_0%,transparent_70%)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center relative z-10"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-12 tracking-tight leading-tight font-serif italic">
          The Humane <span className="text-[#d4af37]">Argument</span>
        </h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <Link 
            href="/library" 
            className="group flex items-center gap-4 text-[#d4af37] text-sm font-medium tracking-[0.4em] uppercase hover:gap-6 transition-all duration-500"
          >
            <span>Enter Library</span>
            <div className="h-[1px] w-12 bg-[#d4af37] group-hover:w-20 transition-all duration-500" />
          </Link>
        </motion.div>
      </motion.div>

      <footer className="absolute bottom-12 left-0 w-full text-center opacity-30">
        <p className="text-[10px] text-white tracking-[0.3em] uppercase">Human Dignity in the Age of Silicon</p>
      </footer>
    </div>
  );
}

