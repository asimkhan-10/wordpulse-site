"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Check, X, Zap, Star, RotateCcw, Info, Hash, ChevronDown } from 'lucide-react';

/**
 * PATH RESOLUTION FIX:
 * Using the standard Next.js '@' alias which points to the 'src' directory.
 * This ensures the path is resolved correctly regardless of where the build runs.
 * Ensure your file is located at: src/app/data/words.json
 */
import wordDataImport from '@/app/data/words.json';

const wordData = wordDataImport || { allWords: [], commonWords: [] };

export default function App() {
  const [knownPos, setKnownPos] = useState(["", "", "", "", ""]);
  const [includeLetters, setIncludeLetters] = useState("");
  const [excludeLetters, setExcludeLetters] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [commonOnly, setCommonOnly] = useState(true);
  const [copiedWord, setCopiedWord] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(25);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const allWords = wordData?.allWords || [];
  const commonWords = wordData?.commonWords || [];

  useEffect(() => {
    setDisplayLimit(25);
  }, [knownPos, includeLetters, excludeLetters, searchTerm, commonOnly]);

  const filteredWords = useMemo(() => {
    const source = commonOnly ? commonWords : allWords;
    if (!source) return [];

    return source.filter(word => {
      const w = word.toLowerCase();
      for (let i = 0; i < 5; i++) {
        if (knownPos[i] && w[i] !== knownPos[i].toLowerCase()) return false;
      }
      if (includeLetters) {
        const letters = includeLetters.toLowerCase().split(/[\s,]+/).filter(Boolean);
        if (!letters.every(char => w.includes(char))) return false;
      }
      if (excludeLetters) {
        const letters = excludeLetters.toLowerCase().split(/[\s,]+/).filter(Boolean);
        if (letters.some(char => w.includes(char))) return false;
      }
      if (searchTerm && !w.includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [knownPos, includeLetters, excludeLetters, searchTerm, commonOnly, allWords, commonWords]);

  const handleGridChange = (index, value) => {
    const newPos = [...knownPos];
    const char = value.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();
    newPos[index] = char;
    setKnownPos(newPos);
    if (char && index < 4) {
      document.getElementById(`grid-${index + 1}`)?.focus();
    }
  };

  const copyToClipboard = (word) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(word);
      setCopiedWord(word);
      setTimeout(() => setCopiedWord(null), 2000);
    }
  };

  const resetAll = () => {
    setKnownPos(["", "", "", "", ""]);
    setIncludeLetters("");
    setExcludeLetters("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans antialiased cursor-default select-none overflow-x-hidden">
      <nav className="border-b border-slate-800/50 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50 px-4 py-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/20">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="text-lg md:text-xl font-black text-white tracking-tighter uppercase italic">WordPulse</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
              Database: {allWords.length} Words
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#0f172a] border border-slate-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-600/10 blur-[80px] rounded-full" />
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                  <Hash size={14} className="text-purple-500" /> Professional Solver
                </h2>
                <button onClick={resetAll} className="text-[10px] font-bold text-slate-600 hover:text-purple-400 transition-colors uppercase tracking-widest">
                  Reset
                </button>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center justify-between px-1">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Letter Positions</p>
                   <Info size={12} className="text-slate-700" title="Corresponds to Green boxes in Wordle" />
                </div>
                <div className="flex gap-2">
                  {knownPos.map((val, i) => (
                    <input
                      key={i}
                      id={`grid-${i}`}
                      type="text"
                      value={val}
                      onChange={(e) => handleGridChange(i, e.target.value)}
                      className={`w-full aspect-square text-center text-xl md:text-2xl font-black rounded-xl md:rounded-2xl border-2 transition-all outline-none shadow-inner cursor-text
                        ${val ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-slate-950 border-slate-800 text-white focus:border-purple-500'}`}
                      placeholder={(i+1).toString()}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Must Include</label>
                  <input type="text" value={includeLetters} onChange={(e) => setIncludeLetters(e.target.value)} placeholder="e.g. A, E (Yellow)" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:border-purple-500 text-white placeholder:text-slate-800 transition-all shadow-inner cursor-text" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Must Exclude</label>
                  <input type="text" value={excludeLetters} onChange={(e) => setExcludeLetters(e.target.value)} placeholder="e.g. X, Q (Grey)" className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:border-red-900 text-white placeholder:text-slate-800 transition-all shadow-inner cursor-text" />
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-800">
                <div onClick={() => setCommonOnly(!commonOnly)} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-2xl cursor-pointer hover:border-purple-500/30 transition-all shadow-inner">
                  <div className="flex items-center gap-2">
                    <Star size={14} className={commonOnly ? "text-yellow-500 fill-yellow-500" : "text-slate-700"} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Common Only</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${commonOnly ? 'bg-purple-600' : 'bg-slate-800'}`}>
                    <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${commonOnly ? 'left-4.5' : 'left-0.5'}`} />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 space-y-6">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-purple-500 transition-colors" size={24} />
              <input type="text" placeholder="Search dictionary..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#0f172a] border border-slate-800 rounded-[2rem] md:rounded-[2.5rem] py-6 pl-16 pr-8 outline-none focus:border-purple-500 text-xl md:text-2xl font-medium text-white shadow-2xl transition-all placeholder:text-slate-800 cursor-text" />
            </div>
            
            <div className="bg-[#0f172a]/30 border border-slate-800 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 min-h-[500px] backdrop-blur-md relative shadow-2xl overflow-hidden cursor-default">
              <div className="flex items-center justify-between mb-8 border-b border-slate-800/50 pb-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.4em]">
                    {filteredWords.length} Matches
                  </span>
                  {filteredWords.length > displayLimit && (
                    <span className="text-[9px] md:text-[10px] font-bold text-purple-400/60 uppercase tracking-widest">
                      Showing top {displayLimit}. Use filters to narrow.
                    </span>
                  )}
                </div>
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75" />
                </div>
              </div>
              
              {filteredWords.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {filteredWords.slice(0, displayLimit).map(word => (
                      <button key={word} onClick={() => copyToClipboard(word)} className="p-4 md:p-6 bg-slate-900/60 hover:bg-purple-600/10 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-center transition-all group relative active:scale-95 overflow-hidden shadow-lg cursor-pointer">
                        <span className="font-mono font-black uppercase tracking-[0.3em] text-sm md:text-lg text-slate-400 group-hover:text-white transition-colors">{word}</span>
                        <div className={`absolute inset-0 flex items-center justify-center bg-purple-600 transition-all duration-300 ${copiedWord === word ? 'opacity-100' : 'opacity-0'}`}><Check size={20} className="text-white" /></div>
                      </button>
                    ))}
                  </div>
                  {filteredWords.length > displayLimit && (
                    <div className="mt-12 flex justify-center pb-8">
                      <button onClick={() => setDisplayLimit(prev => prev + 50)} className="px-8 py-4 bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.3em] transition-all flex items-center gap-3 group">
                        Show More <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-40">
                  <X size={48} className="text-slate-800 mb-4" />
                  <p className="font-black uppercase tracking-[0.4em] text-slate-800">No matches</p>
                </div>
              )}
            </div>

            <div className="mt-8 md:mt-12 bg-slate-950/20 border border-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 select-none">
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] mb-6 md:mb-8 text-center sm:text-left">Dictionary Index</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {alphabet.map((char) => (
                  <a key={char} href={`/starting-with/${char}`} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-[10px] md:text-xs font-bold text-slate-500 hover:border-purple-500 hover:text-white transition-all uppercase cursor-pointer">
                    {char}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}