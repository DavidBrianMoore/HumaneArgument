'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Library, 
  FileText, 
  Book, 
  FileCheck2, 
  ExternalLink, 
  Search, 
  RefreshCcw, 
  ArrowLeft,
  ChevronRight,
  User,
  Clock,
  HardDrive
} from 'lucide-react';
import Link from 'next/link';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink: string;
  iconLink?: string;
  size?: string;
  modifiedTime: string;
  accountEmail: string;
}

export default function LibraryPage() {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLibrary = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/drive/library');
      const data = await res.json();
      if (data.files) {
        setFiles(data.files);
      }
    } catch (e) {
      console.error('Failed to fetch library', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return <FileText className="text-red-400" />;
    if (mimeType.includes('google-apps.document')) return <FileCheck2 className="text-blue-400" />;
    if (mimeType.includes('word')) return <FileCheck2 className="text-blue-500" />;
    if (mimeType.includes('epub')) return <Book className="text-green-400" />;
    return <FileText className="text-text-muted" />;
  };

  const getFormatName = (mimeType: string) => {
    if (mimeType.includes('pdf')) return 'PDF Document';
    if (mimeType.includes('google-apps.document')) return 'Google Doc';
    if (mimeType.includes('word')) return 'MS Word';
    if (mimeType.includes('epub')) return 'EPUB Book';
    return 'Document';
  };

  const formatSize = (bytes?: string) => {
    if (!bytes) return '--';
    const b = parseInt(bytes);
    if (b < 1024) return b + ' B';
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
    return (b / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white">
      {/* Header Section */}
      <nav className="glass-nav px-8 py-6 border-b border-glass-border sticky top-0 bg-bg-primary/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center border border-glass-border hover:border-accent transition-all group">
              <ArrowLeft size={18} className="text-text-muted group-hover:text-accent" />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Library className="text-accent" size={24} />
                <h1 className="text-2xl font-bold tracking-tight">Research Library</h1>
              </div>
              <p className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-mono">
                Multimodal Source Repository
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input 
                type="text" 
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-bg-tertiary/50 border border-glass-border rounded-full pl-10 pr-6 py-2 text-sm focus:outline-none focus:border-accent transition-all w-full md:w-64"
              />
            </div>
            <button 
              onClick={fetchLibrary}
              disabled={isLoading}
              className="w-10 h-10 rounded-full bg-accent-soft/30 flex items-center justify-center border border-accent-glow/30 hover:bg-accent-soft/50 transition-all group"
            >
              <RefreshCcw size={16} className={isLoading ? "animate-spin text-accent" : "text-accent group-hover:rotate-180 transition-transform duration-500"} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="h-[60vh] flex flex-col items-center justify-center gap-6"
            >
              <div className="relative">
                <div className="w-16 h-16 border-4 border-accent-soft border-t-accent rounded-full animate-spin" />
                <Library className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent" size={20} />
              </div>
              <p className="text-xs uppercase tracking-[0.5em] text-accent animate-pulse font-bold">Synchronizing Archives...</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, idx) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="premium-card group hover:scale-[1.02] transition-all cursor-pointer p-0 overflow-hidden"
                  >
                    {/* Thumbnail / Placeholder */}
                    <div className="h-32 bg-gradient-to-br from-bg-tertiary to-bg-primary relative flex items-center justify-center group-hover:from-bg-secondary transition-all">
                      {file.thumbnailLink ? (
                        <img 
                          src={file.thumbnailLink} 
                          alt="" 
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                        />
                      ) : (
                        <div className="opacity-10">
                            {getFileIcon(file.mimeType)}
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-bg-primary/80 backdrop-blur pb-1 px-2.5 pt-1.5 rounded-lg border border-glass-border text-xs font-bold flex items-center gap-2">
                        {getFileIcon(file.mimeType)}
                        <span className="text-[10px] uppercase tracking-wider">{getFormatName(file.mimeType)}</span>
                      </div>
                    </div>

                    {/* Meta Section */}
                    <div className="p-5">
                      <h3 className="font-bold text-sm line-clamp-2 mb-4 group-hover:text-accent transition-colors min-h-[40px]">
                        {file.name}
                      </h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase tracking-wider">
                          <User size={12} className="text-accent/60" />
                          <span className="truncate">{file.accountEmail}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase tracking-wider">
                          <Clock size={12} className="text-accent/60" />
                          <span>{new Date(file.modifiedTime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-text-muted uppercase tracking-wider">
                          <HardDrive size={12} className="text-accent/60" />
                          <span>{formatSize(file.size)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <a 
                          href={file.webViewLink} 
                          target="_blank" 
                          className="flex-1 bg-accent-soft/20 hover:bg-accent text-accent hover:text-bg-primary border border-accent-glow/50 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={12} />
                          Preview
                        </a>
                        <button className="w-10 h-10 rounded-lg bg-bg-tertiary border border-glass-border flex items-center justify-center text-text-muted hover:text-white transition-all">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-glass-border rounded-3xl opacity-50">
                  <Library className="mx-auto mb-4 text-text-muted" size={48} />
                  <p className="text-sm font-bold uppercase tracking-widest text-text-muted">No Research Materials Found</p>
                  <p className="text-xs text-text-muted mt-2">Adjust your filters or connect another Drive</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 border-t border-glass-border/30 bg-bg-primary/50 text-center">
        <p className="text-[10px] uppercase font-mono tracking-[0.5em] text-text-muted">
          Unified Research Ecosystem • Humane Argument Protocol
        </p>
      </footer>
    </div>
  );
}
