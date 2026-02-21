"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Check, X, Zap, Star, RotateCcw, Info, Hash, ChevronDown, ShieldCheck, Lightbulb, HelpCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function WordPulseSolver({ wordData, initialKnownPos = ["", "", "", "", ""], showBackToHome = false, pageTitle = "Professional 5-Letter Word Finder", initialDisplayLimit = 25 }) {
    const [knownPos, setKnownPos] = useState(initialKnownPos);
    const [includeLetters, setIncludeLetters] = useState("");
    const [excludeLetters, setExcludeLetters] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [commonOnly, setCommonOnly] = useState(true);
    const [copiedWord, setCopiedWord] = useState(null);
    const [displayLimit, setDisplayLimit] = useState(initialDisplayLimit);

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
            const el = document.createElement('textarea');
            el.value = word;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopiedWord(word);
            setTimeout(() => setCopiedWord(null), 1500);
        }
    };

    const resetAll = () => {
        setKnownPos(["", "", "", "", ""]);
        setIncludeLetters("");
        setExcludeLetters("");
        setSearchTerm("");
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 pb-20">

            {/* Navigation */}
            <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 mb-8">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-1.5 bg-slate-900 rounded-lg shadow-md">
                            <Zap size={16} className="text-white fill-white" />
                        </div>
                        <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">5 Letter Words</span>
                    </Link>
                    <div className="hidden md:block">
                        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                            Database: {allWords.length.toLocaleString()} Words
                        </span>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 md:px-6">

                {showBackToHome && (
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-purple-600 transition-colors mb-6 group uppercase tracking-widest"
                    >
                        <ChevronLeft size={12} className="transition-transform group-hover:-translate-x-1" strokeWidth={3} />
                        Back to Generator
                    </Link>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Sidebar - Solver Controls */}
                    <aside className="lg:col-span-4 space-y-4">
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 relative overflow-hidden">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <Hash size={16} className="text-slate-900" />
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Professional Solver</h3>
                                </div>
                                <button
                                    onClick={resetAll}
                                    aria-label="Reset all filters"
                                    className="text-[10px] font-bold text-slate-400 hover:text-purple-600 uppercase tracking-widest transition-colors"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Letter Positions */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Letter Positions</label>
                                    <Info size={12} className="text-slate-300" />
                                </div>
                                <div className="grid grid-cols-5 gap-2">
                                    {knownPos.map((val, i) => (
                                        <input
                                            key={i}
                                            id={`grid-${i}`}
                                            type="text"
                                            maxLength={1}
                                            autoComplete="off"
                                            aria-label={`Known letter position ${i + 1}`}
                                            value={val}
                                            onChange={(e) => handleGridChange(i, e.target.value)}
                                            className={`aspect-square text-center text-2xl font-bold rounded-xl border-2 transition-all outline-none shadow-sm
                                ${val ? 'bg-purple-50 border-purple-500 text-purple-700' : 'bg-white border-slate-200 text-slate-700 focus:border-purple-400 focus:ring-4 focus:ring-purple-50'}`}
                                            placeholder={(i + 1).toString()}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Must Include</label>
                                    <input
                                        type="text"
                                        value={includeLetters}
                                        aria-label="Must include letters"
                                        onChange={(e) => setIncludeLetters(e.target.value)}
                                        placeholder="e.g. A, E (Yellow)"
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-50 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Must Exclude</label>
                                    <input
                                        type="text"
                                        value={excludeLetters}
                                        aria-label="Must exclude letters"
                                        onChange={(e) => setExcludeLetters(e.target.value)}
                                        placeholder="e.g. X, Q (Grey)"
                                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-red-400 focus:ring-4 focus:ring-red-50 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
                                    />
                                </div>
                            </div>

                            {/* Common Only Toggle */}
                            <div className="pt-6 border-t border-slate-100">
                                <button aria-label="Toggle common words only" onClick={() => setCommonOnly(!commonOnly)} className="w-full flex items-center justify-between p-2 rounded-lg group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-1.5 bg-yellow-50 rounded-md text-yellow-500">
                                            <Star size={14} className="fill-yellow-500" />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider group-hover:text-slate-900 transition-colors">Common Only</span>
                                    </div>
                                    <div className={`w-10 h-6 rounded-full relative transition-all duration-300 ${commonOnly ? 'bg-purple-600' : 'bg-slate-200'}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${commonOnly ? 'left-5' : 'left-1'}`} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Column - Search & Results */}
                    <section className="lg:col-span-8 space-y-6">

                        {/* Search Bar */}
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search dictionary..."
                                aria-label="Search dictionary"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 text-lg font-medium text-slate-800 shadow-md hover:shadow-lg transition-all placeholder:text-slate-300 placeholder:font-light"
                            />
                        </div>

                        {/* Results Card */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl min-h-[500px] relative">

                            {/* Results Header */}
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                                <div className="space-y-1">
                                    <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">
                                        {pageTitle}
                                    </h1>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                                            {filteredWords.length.toLocaleString()} Matches Found
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4">
                                            {filteredWords.length > displayLimit ? `Showing top ${displayLimit}` : 'All matches shown'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                                </div>
                            </div>

                            {/* Word Grid */}
                            {filteredWords.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                                        {filteredWords.slice(0, displayLimit).map(word => (
                                            <button
                                                key={word}
                                                aria-label={`Copy word ${word}`}
                                                onClick={() => copyToClipboard(word)}
                                                className="group relative h-12 bg-white border-2 border-slate-100 hover:border-purple-500 hover:shadow-md rounded-xl transition-all duration-200 overflow-hidden flex items-center justify-center active:scale-95"
                                            >
                                                <span className="font-bold text-sm text-slate-700 tracking-widest uppercase group-hover:text-purple-700 transition-colors">
                                                    {word}
                                                </span>
                                                <div className={`absolute inset-0 flex items-center justify-center bg-purple-600 text-white transition-all duration-200 ${copiedWord === word ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                                    <Check size={16} strokeWidth={3} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {filteredWords.length > displayLimit && (
                                        <div className="mt-10 flex justify-center">
                                            <button
                                                onClick={() => setDisplayLimit(prev => prev + 100)}
                                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-purple-200 transition-all flex items-center gap-2 group"
                                            >
                                                Show More <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-24 opacity-40">
                                    <div className="p-4 bg-slate-50 rounded-full mb-4">
                                        <Search size={32} className="text-slate-300" />
                                    </div>
                                    <p className="font-bold uppercase tracking-widest text-slate-400 text-sm">No matches found</p>
                                </div>
                            )}
                        </div>

                        {/* Dictionary Index */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-6">Dictionary Index</p>
                            <div className="flex flex-wrap gap-2">
                                {alphabet.map((char) => (
                                    <Link key={char} href={`/starting-with/${char}`} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all uppercase cursor-pointer">
                                        {char}
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </section>
                </div>

                {/* --- SEO CONTENT SECTIONS --- */}
            </main>

            <footer className="py-12 border-t border-slate-200 text-center bg-white mt-20">
                <div className="flex items-center justify-center gap-2 mb-4 opacity-40">
                    <Zap size={14} className="text-purple-600 fill-purple-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-900 italic">5 Letter Words Studio</span>
                </div>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">Designed for Performance • Built for Word Games • © 2026</p>
            </footer>
        </div>
    );
}
