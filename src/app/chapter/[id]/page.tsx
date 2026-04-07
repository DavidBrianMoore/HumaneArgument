'use client';

import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { masterSyllabus } from "@/lib/syllabus";
import { ArrowLeft, ChevronLeft, ChevronRight, Hash, Target, Compass } from "lucide-react";
import Link from "next/link";

import AnnotationEditor from "@/components/AnnotationEditor";
import ChariotAllegory from "@/components/ChariotAllegory";
import { getAnnotation } from "@/lib/persistence";
import { useEffect, useState } from "react";


export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.id as string;
  const chapterIndex = masterSyllabus.chapters.findIndex(c => c.id === chapterId);
  const chapter = masterSyllabus.chapters[chapterIndex];

  const [initialNote, setInitialNote] = useState<string | null>(null);
  const [isLoadingNote, setIsLoadingNote] = useState(true);

  useEffect(() => {
    async function loadNote() {
      setIsLoadingNote(true);
      const content = await getAnnotation(chapterId);
      setInitialNote(content);
      setIsLoadingNote(false);
    }
    loadNote();
  }, [chapterId]);

  const handleSaveNote = (content: string) => {
    console.log(`Note updated for ${chapterId}`);
  };

  if (!chapter) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Chapter Not Found</h1>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={18} /> Return to Syllabus
          </Link>
        </div>
      </div>
    );
  }

  const prevChapter = masterSyllabus.chapters[chapterIndex - 1];
  const nextChapter = masterSyllabus.chapters[chapterIndex + 1];

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-text-primary">
      {/* Premium Header/Nav */}
      <nav className="glass-nav px-8 py-4 flex items-center justify-between sticky top-0">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-lg bg-bg-tertiary flex items-center justify-center border border-glass-border group-hover:border-accent transition-colors">
            <ChevronLeft size={20} className="text-text-secondary group-hover:text-accent" />
          </div>
          <span className="text-sm font-semibold tracking-widest uppercase text-text-secondary">Overview</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent-glow text-accent">
          <Compass size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Master Syllabus Navigation</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-8 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={chapterId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Chapter Intro */}
            <div className="mb-16">
              <div className="text-accent font-mono text-sm uppercase tracking-[0.3em] mb-4">Chapter 0{chapterIndex + 1}</div>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">{chapter.title}</h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div className="premium-card bg-accent-soft/20 border-accent-glow/50 flex gap-6 items-start">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-accent flex items-center justify-center text-bg-primary">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Primary Objective</h3>
                    <p className="text-lg text-text-secondary italic leading-relaxed">
                      "{chapter.objective}"
                    </p>
                  </div>
                </div>

                {chapter.summary && (
                  <div className="p-8 border-l-2 border-accent-glow/30">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4 font-mono">Philosophical Summary</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {chapter.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sections List */}
            <div className="space-y-6 mb-20">
              <h2 className="text-xl font-bold uppercase tracking-widest text-text-muted mb-8 flex items-center gap-3">
                <Hash className="text-accent" size={18} />
                Detailed Sections
              </h2>
              {chapter.sections.map((section, sIdx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * sIdx }}
                  className="premium-card group hover:bg-bg-tertiary"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      <span className="text-xs font-mono text-text-muted mt-1">{section.id}</span>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{section.title}</h3>
                        {section.description && (
                          <p className="text-sm text-text-secondary opacity-70 leading-relaxed max-w-2xl">
                            {section.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-text-muted transform translate-x-0 opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all mt-1" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Synthesis Visualization (Chapter Specific) */}
            {chapterId === "ch4" && (
              <div className="mb-20">
                <ChariotAllegory />
              </div>
            )}

            {/* Annotation Engine (Phase 3B/C) */}
            <div className="mb-24">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight mb-2">Reflective Inquiry</h2>
                <p className="text-text-secondary leading-relaxed max-w-2xl">
                  Synthesize your findings below. These research logs are persisted as part of your unique path through the Humane Argument.
                </p>
              </div>
              
              {isLoadingNote ? (
                <div className="premium-card h-[300px] flex items-center justify-center border-dashed opacity-50">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent animate-pulse">Loading Inquiry...</span>
                  </div>
                </div>
              ) : (
                <AnnotationEditor 
                  key={chapterId}
                  chapterId={chapterId}
                  initialContent={initialNote || ''}
                  onSave={handleSaveNote}
                />
              )}
            </div>

            {/* Bottom Navigation */}
            <div className="flex flex-col md:flex-row gap-6 border-t border-glass-border pt-12">
              {prevChapter ? (
                <Link 
                  href={`/chapter/${prevChapter.id}`}
                  className="flex-1 premium-card group flex items-center gap-4 text-left border-transparent hover:border-glass-border"
                >
                  <div className="w-10 h-10 rounded bg-bg-tertiary flex items-center justify-center group-hover:bg-accent-soft transition-colors text-text-muted group-hover:text-accent">
                    <ChevronLeft />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Previous Chapter</div>
                    <div className="font-bold">{prevChapter.title}</div>
                  </div>
                </Link>
              ) : <div className="flex-1 h-20" />}

              {nextChapter ? (
                <Link 
                  href={`/chapter/${nextChapter.id}`}
                  className="flex-1 premium-card group flex items-center justify-between text-right border-transparent hover:border-glass-border"
                >
                  <div className="ml-auto">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Next Chapter</div>
                    <div className="font-bold">{nextChapter.title}</div>
                  </div>
                  <div className="w-10 h-10 rounded bg-bg-tertiary flex items-center justify-center group-hover:bg-accent-soft transition-colors text-text-muted group-hover:text-accent">
                    <ChevronRight />
                  </div>
                </Link>
              ) : (
                <div className="flex-1 h-20 flex items-center justify-center premium-card border-dashed opacity-50">
                  <span className="text-xs uppercase font-bold tracking-widest text-text-muted">Conclusion Reached</span>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
