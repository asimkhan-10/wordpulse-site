import React from 'react';
import Link from 'next/link';
import { Zap, ChevronLeft } from 'lucide-react';

/**
 * MANUAL FIX: 
 * Change the path to '../../data/words.json' 
 * because 'starting-with/[letter]' is 2 levels deep from the 'app' folder.
 */
import wordData from '../../data/words.json';

export async function generateStaticParams() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  return alphabet.map((letter) => ({
    letter: letter,
  }));
}

export async function generateMetadata({ params }) {
  const { letter } = await params;
  const char = letter?.toUpperCase() || '';
  return {
    title: `5 Letter Words Starting With ${char} - WordPulse`,
    description: `Complete list of five-letter words starting with the letter ${char}. Perfect for Wordle, Scrabble, and crosswords.`,
  };
}

export default async function LetterPage({ params }) {
  const { letter } = await params;
  
  // Safety check for data
  const allWords = wordData?.allWords || [];
  
  // Filtering for the specific letter
  const filteredWords = allWords.filter(w => 
    w.toLowerCase().startsWith(letter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-purple-500/30 font-sans antialiased">
      {/* Navbar Overlay */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-purple-600 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-transform group-hover:scale-110">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter uppercase">WordPulse</span>
          </Link>
          <div className="text-[10px] text-slate-500 font-mono font-bold bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
             SEO LANDING PAGE
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-purple-400 transition-colors mb-12 group"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          BACK TO GENERATOR
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            Starting With <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">{letter.toUpperCase()}</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-slate-400 text-lg max-w-2xl border-l-2 border-purple-500/30 pl-6 py-2">
              Browse our curated collection of <span className="text-white font-bold">{filteredWords.length}</span> five-letter words beginning with the letter "{letter.toUpperCase()}". Perfect for competitive word games and vocabulary building.
            </p>
          </div>
        </header>

        {filteredWords.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredWords.map((word) => (
              <div 
                key={word} 
                className="p-5 bg-[#0f172a] border border-slate-800 rounded-2xl text-center shadow-xl group hover:border-purple-500/50 transition-all duration-300"
              >
                <span className="font-mono text-xl font-black uppercase tracking-[0.25em] text-slate-200 group-hover:text-purple-400 transition-colors">
                  {word}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl p-20 text-center">
            <p className="text-slate-500 font-bold uppercase tracking-widest">No words found for this category</p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-900 py-12 bg-slate-950 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 WordPulse | High-Performance Word Discovery
          </p>
        </div>
      </footer>
    </div>
  );
}