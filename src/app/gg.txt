"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Copy, Check, Filter, X, Zap, Star, ChevronRight } from 'lucide-react';
import wordData from './data/words.json';

export default function WordPulse() {
  const [searchTerm, setSearchTerm] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [excludes, setExcludes] = useState("");
  const [commonOnly, setCommonOnly] = useState(true);
  const [copiedWord, setCopiedWord] = useState(null);

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const allWords = wordData?.allWords || [];
  const commonWords = wordData?.commonWords || [];

  const filteredWords = useMemo(() => {
    const source = commonOnly ? commonWords : allWords;
    return source.filter(word => {
      const w = word.toLowerCase();
      if (startsWith && !w.startsWith(startsWith.toLowerCase())) return false;
      if (endsWith && !w.endsWith(endsWith.toLowerCase())) return false;
      if (contains) {
        const letters = contains.toLowerCase().split(",").map(i => i.trim()).filter(i => i);
        if (!letters.every(char => w.includes(char))) return false;
      }
      if (excludes) {
        const letters = excludes.toLowerCase().split(",").map(i => i.trim()).filter(i => i);
        if (letters.some(char => w.includes(char))) return false;
      }
      if (searchTerm && !w.includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [searchTerm, startsWith, endsWith, contains, excludes, commonOnly, allWords, commonWords]);

  const copyToClipboard = (word) => {
    navigator.clipboard?.writeText(word);
    setCopiedWord(word);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-purple-500/30 font-sans antialiased">
      <nav className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={22} className="text-purple-500 fill-purple-500" />
            <span className="text-xl font-bold text-white tracking-tighter uppercase">WordPulse</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800 font-bold">
             {allWords.length} WORDS LOADED
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="space-y-6">
            <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <div onClick={() => setCommonOnly(!commonOnly)} className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer hover:border-purple-500/50 transition-all mb-8 shadow-inner">
                <div className="flex items-center gap-2">
                  <Star size={14} className={commonOnly ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} />
                  <span className="text-xs font-bold text-white uppercase tracking-tighter">Common Only</span>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${commonOnly ? 'bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.3)]' : 'bg-slate-800'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${commonOnly ? 'left-6' : 'left-1'}`} />
                </div>
              </div>
              <div className="space-y-5">
                <FilterInput label="Starts With" val={startsWith} set={setStartsWith} ph="e.g. s" />
                <FilterInput label="Ends With" val={endsWith} set={setEndsWith} ph="e.g. y" />
                <FilterInput label="Contains" val={contains} set={setContains} ph="a, e" />
                <FilterInput label="Exclude" val={excludes} set={setExcludes} ph="x, q" />
                <button onClick={() => {setStartsWith(""); setEndsWith(""); setContains(""); setExcludes(""); setSearchTerm("");}} className="w-full py-4 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-widest border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all">
                  RESET ALL
                </button>
              </div>
            </div>
          </aside>

          <section className="lg:col-span-3 space-y-6">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500" size={20} />
              <input type="text" placeholder="Live search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#0f172a] border border-slate-800 rounded-[2rem] py-6 pl-16 pr-8 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 text-xl font-medium text-white shadow-2xl transition-all" />
            </div>
            
            <div className="bg-[#0f172a]/30 border border-slate-800 rounded-[2.5rem] p-8 min-h-[600px] backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-10 border-b border-slate-800 pb-8">
                <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">{filteredWords.length} Matches Found</span>
                <span className="text-[10px] font-black text-purple-400 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">{commonOnly ? "Curated" : "Dictionary"}</span>
              </div>
              
              {filteredWords.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredWords.slice(0, 250).map(word => (
                    <button key={word} onClick={() => copyToClipboard(word)} className="p-5 bg-slate-900/80 hover:bg-purple-600/10 border border-slate-800 hover:border-purple-500/50 rounded-2xl text-center transition-all group relative overflow-hidden shadow-lg active:scale-95">
                      <span className="font-mono font-bold uppercase tracking-[0.4em] text-base text-slate-300 group-hover:text-white">{word}</span>
                      <div className={`absolute inset-0 flex items-center justify-center bg-purple-600 transition-all duration-300 ${copiedWord === word ? 'opacity-100' : 'opacity-0'}`}><Check size={22} className="text-white" /></div>
                    </button>
                  ))}
                </div>
              ) : <p className="text-center text-slate-700 py-32 font-bold uppercase tracking-widest">No matching words</p>}
            </div>

            {/* SEO Alphabet Footer Section */}
            <div className="mt-12 bg-slate-950/50 border border-slate-900 rounded-[2.5rem] p-10">
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Filter size={14} /> Browse 5 Letter Words by Letter
              </h2>
              <div className="flex flex-wrap gap-2">
                {alphabet.map((char) => (
                  <Link 
                    key={char} 
                    href={`/starting-with/${char}`}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-slate-400 hover:border-purple-500 hover:text-white hover:bg-purple-500/10 transition-all uppercase"
                  >
                    {char}
                  </Link>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                <span>WordPulse v1.0.0</span>
                <span>Optimized for Search Engines</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function FilterInput({ label, val, set, ph }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-2">{label}</label>
      <input type="text" value={val} onChange={(e) => set(e.target.value)} placeholder={ph} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 transition-all text-white placeholder:text-slate-900 shadow-inner font-medium" />
    </div>
  );
}