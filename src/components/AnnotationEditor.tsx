'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo, 
  Type,
  Maximize2,
  Save,
  Sparkles
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import { saveAnnotation } from '@/lib/persistence';
import { getCitationString, getFullBibliographyEntry, ZoteroItem } from '@/lib/zotero';

interface AnnotationEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
  chapterId: string;
}

export default function AnnotationEditor({ initialContent = '', onSave, chapterId }: AnnotationEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  
  // Zotero State
  const [zoteroItems, setZoteroItems] = useState<ZoteroItem[]>([]);
  const [isZoteroLoading, setIsZoteroLoading] = useState(false);
  const [isCitationMode, setIsCitationMode] = useState(false);
  const [citedItems, setCitedItems] = useState<ZoteroItem[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
        try {
            const res = await fetch('/api/drive/accounts');
            const data = await res.json();
            if (data.accounts && data.accounts.length > 0) {
                setAccounts(data.accounts);
                setSelectedEmail(data.accounts[0].email);
            }
        } catch (e) {
            console.error('Failed to fetch accounts', e);
        }
    };

    const fetchZoteroList = async () => {
        setIsZoteroLoading(true);
        try {
            const res = await fetch('/api/zotero/items');
            const data = await res.json();
            if (data.items) {
                setZoteroItems(data.items);
            }
        } catch (e) {
            console.error('Zotero error', e);
        } finally {
            setIsZoteroLoading(false);
        }
    };

    fetchAccounts();
    fetchZoteroList();
  }, []);
  
  const handleInternalSave = async (content: string) => {
    setIsSaving(true);
    await saveAnnotation(chapterId, content);
    onSave?.(content);
    setTimeout(() => setIsSaving(false), 1000); // Visual feedback
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-6 text-lg font-serif leading-relaxed',
      },
    },
  });

  const insertCitation = (item: ZoteroItem) => {
    if (!editor) return;
    const citation = getCitationString(item);
    editor.chain().focus().insertContent(` <sup>${citation}</sup> `).run();
    if (!citedItems.find(i => i.key === item.key)) {
        setCitedItems(prev => [...prev, item]);
    }
    setIsCitationMode(false);
  };

  if (!editor) {
    return null;
  }

  const MenuBar = () => {
    return (
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-glass-border bg-bg-tertiary/50 backdrop-blur-sm sticky top-0 z-20 rounded-t-xl">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx('toolbar-btn', editor.isActive('bold') && 'active')}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx('toolbar-btn', editor.isActive('italic') && 'active')}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <div className="w-px h-6 bg-glass-border mx-1" />
        
        <button
          onClick={() => setIsCitationMode(!isCitationMode)}
          className={clsx('toolbar-btn flex items-center gap-2 px-3', isCitationMode && 'active text-accent')}
          title="Insert Citation"
        >
          <Quote size={16} />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Cite Source</span>
        </button>

        <div className="w-px h-6 bg-glass-border mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={clsx('toolbar-btn', editor.isActive('heading', { level: 2 }) && 'active')}
          title="Heading 2"
        >
          <Type size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx('toolbar-btn', editor.isActive('bulletList') && 'active')}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx('toolbar-btn', editor.isActive('orderedList') && 'active')}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx('toolbar-btn', editor.isActive('blockquote') && 'active')}
          title="Blockquote"
        >
          <Quote size={16} />
        </button>
        <div className="w-px h-6 bg-glass-border mx-1" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="toolbar-btn"
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="toolbar-btn"
          title="Redo"
        >
          <Redo size={16} />
        </button>
        
        <div className="ml-auto flex items-center gap-2">
            {accounts.length > 0 && (
                <select 
                    value={selectedEmail || ''} 
                    onChange={(e) => setSelectedEmail(e.target.value)}
                    className="bg-bg-primary/50 text-text-muted text-[10px] px-2 py-1.5 rounded border border-glass-border focus:outline-none focus:border-accent capitalize max-w-[100px]"
                >
                    {accounts.map(acc => (
                        <option key={acc.email} value={acc.email}>{acc.email.split('@')[0]}</option>
                    ))}
                    <option value="add_new">+ Add Account</option>
                </select>
            )}

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  if (selectedEmail === 'add_new') {
                    window.location.href = '/api/auth/google/login';
                    return;
                  }
                  const content = editor.getHTML();
                  const filename = `HumaneArgument_${chapterId}.html`;
                  try {
                    const res = await fetch('/api/drive/save', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ filename, content, email: selectedEmail }),
                    });
                    if (res.status === 401) {
                      window.location.href = '/api/auth/google/login';
                      return;
                    }
                    if (res.ok) {
                      const data = await res.json();
                      alert(`Successfully synced to ${data.email}!`);
                    } else {
                      const err = await res.json();
                      alert('Drive sync failed: ' + err.error);
                    }
                  } catch (e) {
                    alert('Drive sync failed: ' + (e as any).message);
                  }
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/40"
            >
                <div className="w-4 h-4" dangerouslySetInnerHTML={{ __html: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.71 3.502L1.15 15l3.43 6 6.55-11.498L7.71 3.502zm5.64 0l-3.41 6L16.49 21l3.42-6-6.56-11.498zM9.73 12l-3.41 6h13.11l-3.41-6H9.73z"/></svg>' }} />
                {accounts.length === 0 ? "Connect Drive" : "Sync Drive"}
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSaving}
                onClick={() => handleInternalSave(editor.getHTML())}
                className={clsx(
                    "flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all text-xs font-bold uppercase tracking-widest shadow-lg",
                    isSaving ? "bg-bg-tertiary text-text-muted" : "bg-accent text-bg-primary hover:bg-accent-glow shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                )}
            >
                {isSaving ? (
                    <div className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                ) : <Save size={14} />}
                {isSaving ? "Persisting..." : "Persist Annotation"}
            </motion.button>
        </div>
      </div>
    );
  };

  return (
    <div className="premium-card p-0 overflow-hidden border-glass-border/30 hover:border-glass-border/60 transition-colors shadow-2xl relative group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-4 border-b border-glass-border flex items-center justify-between bg-bg-secondary/40">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center text-accent ring-1 ring-accent-glow/50">
                <Sparkles size={16} />
            </div>
            <div>
                <h4 className="text-sm font-bold tracking-tight">Philosophical Field Notes</h4>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">Chapter Annotation Engine</p>
            </div>
        </div>
        <button className="text-text-muted hover:text-white transition-colors" title="Focus Mode">
            <Maximize2 size={16} />
        </button>
      </div>

      <MenuBar />
      
      <AnimatePresence>
        {isCitationMode && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-bg-tertiary border-b border-glass-border overflow-hidden"
            >
                <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">Dissertation Sources (Zotero)</h5>
                        <button onClick={() => setIsCitationMode(false)} className="text-text-muted hover:text-white">close</button>
                    </div>
                    {isZoteroLoading ? (
                        <div className="py-4 text-center">
                            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                            <span className="text-[10px] uppercase tracking-widest">Querying Zotero...</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {zoteroItems.map(item => (
                                <button
                                    key={item.key}
                                    onClick={() => insertCitation(item)}
                                    className="p-3 bg-bg-primary/40 border border-glass-border rounded-lg text-left hover:border-accent transition-all group"
                                >
                                    <div className="text-xs font-bold truncate group-hover:text-accent">{item.data.title}</div>
                                    <div className="text-[9px] text-text-muted mt-1">{item.meta.creatorSummary} ({item.meta.parsedDate ? new Date(item.meta.parsedDate).getFullYear() : 'n.d.'})</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative">
        <EditorContent editor={editor} className="bg-bg-primary/20" />
        <div className="absolute bottom-6 right-6 pointer-events-none opacity-10">
            <Sparkles size={120} className="text-accent" />
        </div>
      </div>

      {/* Auto-Generating Bibliography */}
      {citedItems.length > 0 && (
          <div className="p-8 border-t border-glass-border bg-bg-tertiary/20">
              <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-6 flex items-center gap-3">
                  <div className="w-4 h-px bg-accent" />
                  Bibliography
              </h5>
              <ul className="space-y-3">
                  {citedItems.map(item => (
                      <li key={item.key} className="text-xs text-text-secondary leading-relaxed font-serif italic border-l border-accent-glow/30 pl-4">
                          {getFullBibliographyEntry(item)}
                      </li>
                  ))}
              </ul>
          </div>
      )}

      <div className="p-4 bg-bg-tertiary/30 border-t border-glass-border flex justify-between items-center text-[10px] text-text-muted uppercase tracking-[0.2em] font-mono">
        <span className="flex items-center gap-2 italic">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Zotero Metadata Watcher Active
        </span>
        <span>{chapterId.toUpperCase()} ARCHIVE</span>
      </div>
    </div>
  );
}
