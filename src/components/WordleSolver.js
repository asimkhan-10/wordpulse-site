"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Check, Hash, Info, ChevronDown, Plus, Undo2, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import { filterWords, partitionResults } from '@/lib/wordleFilter';

const COLOR_CYCLE = {
  gray: 'yellow',
  yellow: 'green',
  green: 'gray',
};

const COLOR_STYLES = {
  gray: 'bg-slate-600 text-white border-slate-600',
  yellow: 'bg-amber-500 text-white border-amber-500',
  green: 'bg-emerald-600 text-white border-emerald-600',
};

const COLOR_LABELS = {
  gray: 'Gray (Not in word)',
  yellow: 'Yellow (Wrong position)',
  green: 'Green (Correct position)',
};

export default function WordleSolver({ wordData }) {
  const allWords = useMemo(() => wordData?.allWords || [], [wordData]);
  const commonWords = useMemo(() => wordData?.commonWords || [], [wordData]);
  const commonSet = useMemo(
    () => new Set((wordData?.commonWords || []).map((w) => w.toLowerCase())),
    [wordData]
  );

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  // 6 rows of 5 letters and patterns
  const [rows, setRows] = useState(() => [
    { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
    { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
    { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
    { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
    { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
    { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
  ]);

  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [lockedRowCount, setLockedRowCount] = useState(0);
  const [displayLimit, setDisplayLimit] = useState(25);
  const [copiedWord, setCopiedWord] = useState(null);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (currentRowIndex < 6) {
      inputRefs.current[currentRowIndex * 5]?.focus();
    }
  }, [currentRowIndex]);

  const handleLetterChange = (rowIndex, tileIndex, value) => {
    if (rowIndex >= lockedRowCount && rowIndex !== currentRowIndex) return;

    const char = value.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();

    setRows((prev) => {
      return prev.map((r, rIdx) => {
        if (rIdx !== rowIndex) return r;
        const newLetters = [...r.letters];
        newLetters[tileIndex] = char;
        return { ...r, letters: newLetters };
      });
    });

    if (char && tileIndex < 4) {
      inputRefs.current[rowIndex * 5 + tileIndex + 1]?.focus();
    }
  };

  const handleKeyDown = (rowIndex, tileIndex, e) => {
    if (e.key === 'Backspace' && !rows[rowIndex].letters[tileIndex] && tileIndex > 0) {
      inputRefs.current[rowIndex * 5 + tileIndex - 1]?.focus();
    } else if (e.key === 'Enter') {
      if (canAddGuess) {
        handleAddGuess();
      }
    }
  };

  const handleCycleColor = (rowIndex, tileIndex) => {
    if (rowIndex > lockedRowCount && rowIndex !== currentRowIndex) return;

    setRows((prev) => {
      return prev.map((r, rIdx) => {
        if (rIdx !== rowIndex) return r;
        const newPattern = [...r.pattern];
        const current = newPattern[tileIndex] || 'gray';
        newPattern[tileIndex] = COLOR_CYCLE[current] || 'gray';
        return { ...r, pattern: newPattern };
      });
    });
  };

  const currentRow = rows[currentRowIndex] || { letters: ['', '', '', '', ''] };
  const currentRowLetters = currentRow.letters.join('');
  const canAddGuess = currentRowLetters.length === 5 && lockedRowCount < 6 && currentRowIndex === lockedRowCount;

  const handleAddGuess = () => {
    if (!canAddGuess) return;
    const nextLocked = lockedRowCount + 1;
    setLockedRowCount(nextLocked);
    if (nextLocked < 6) {
      setCurrentRowIndex(nextLocked);
    }
    setDisplayLimit(25);
  };

  const handleUndo = () => {
    if (lockedRowCount === 0) return;
    const targetRow = lockedRowCount - 1;
    setLockedRowCount(targetRow);
    setCurrentRowIndex(targetRow);
    setDisplayLimit(25);
  };

  const handleReset = () => {
    setRows([
      { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
      { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
      { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
      { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
      { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
      { letters: ['', '', '', '', ''], pattern: ['gray', 'gray', 'gray', 'gray', 'gray'] },
    ]);
    setCurrentRowIndex(0);
    setLockedRowCount(0);
    setDisplayLimit(25);
  };

  // Active guesses to filter by
  const activeGuesses = useMemo(() => {
    const list = [];
    for (let i = 0; i < lockedRowCount; i++) {
      const row = rows[i];
      const word = row.letters.join('');
      if (word.length === 5) {
        list.push({ word, pattern: row.pattern });
      }
    }
    // Also include active row if full 5 letters for live feedback
    if (currentRowIndex === lockedRowCount && currentRowLetters.length === 5) {
      list.push({ word: currentRowLetters, pattern: rows[currentRowIndex].pattern });
    }
    return list;
  }, [rows, lockedRowCount, currentRowIndex, currentRowLetters]);

  const filteredWords = useMemo(() => {
    if (activeGuesses.length === 0) {
      return commonWords.length > 0 ? commonWords : allWords;
    }
    return filterWords(allWords, activeGuesses);
  }, [allWords, commonWords, activeGuesses]);

  const { common, other, total } = useMemo(() => {
    return partitionResults(filteredWords, commonSet);
  }, [filteredWords, commonSet]);

  // Combined list with common words first in bold
  const allCombinedWords = useMemo(() => {
    const combined = [];
    for (let i = 0; i < common.length; i++) {
      combined.push({ word: common[i], isCommon: true });
    }
    for (let i = 0; i < other.length; i++) {
      combined.push({ word: other[i], isCommon: false });
    }
    return combined;
  }, [common, other]);

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

  return (
    <div className="bg-slate-50 font-sans antialiased text-slate-900">
      {/* Navigation */}
      <SiteNav activePage="solver" />

      <main className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Sidebar - Solver Controls */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Hash size={16} className="text-slate-900" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Wordle Solver</span>
                </div>
                <button
                  onClick={handleReset}
                  aria-label="Reset all filters"
                  className="text-[10px] font-bold text-slate-400 hover:text-purple-600 uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Guesses Header / Legend */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Guess Rows (Click Tile to Color)
                  </label>
                  <Info size={12} className="text-slate-300" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" /> Gray
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Yellow
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" /> Green
                  </span>
                </div>
              </div>

              {/* 6 Wordle Rows */}
              <div className="space-y-2 mb-6">
                {rows.map((row, rIdx) => {
                  const isActive = rIdx === currentRowIndex && rIdx >= lockedRowCount;
                  const isFuture = rIdx > currentRowIndex;

                  return (
                    <div
                      key={rIdx}
                      className={`flex justify-center gap-1.5 p-1 rounded-xl transition-all ${
                        isActive ? 'bg-purple-50/70 ring-2 ring-purple-300' : ''
                      }`}
                    >
                      {row.letters.map((letter, tIdx) => {
                        const color = row.pattern[tIdx] || 'gray';
                        const hasLetter = Boolean(letter);
                        const tileClass = hasLetter
                          ? COLOR_STYLES[color]
                          : 'bg-white border-slate-200 text-slate-700 focus:border-purple-400 focus:ring-4 focus:ring-purple-50';

                        return (
                          <input
                            key={tIdx}
                            ref={(el) => {
                              inputRefs.current[rIdx * 5 + tIdx] = el;
                            }}
                            type="text"
                            maxLength={1}
                            autoComplete="off"
                            disabled={isFuture}
                            value={letter}
                            onChange={(e) => handleLetterChange(rIdx, tIdx, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(rIdx, tIdx, e)}
                            onClick={() => {
                              if (hasLetter) {
                                handleCycleColor(rIdx, tIdx);
                              }
                            }}
                            aria-label={`Row ${rIdx + 1} Tile ${tIdx + 1}: ${letter || 'empty'}, ${COLOR_LABELS[color]}`}
                            placeholder={!hasLetter && isActive ? (tIdx + 1).toString() : ''}
                            className={`w-11 h-11 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl font-bold rounded-xl border-2 transition-all outline-none shadow-sm cursor-pointer select-none ${tileClass} ${
                              isFuture ? 'opacity-30 cursor-not-allowed bg-slate-50' : ''
                            }`}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  id="add-guess-btn"
                  aria-label="Add Guess"
                  onClick={handleAddGuess}
                  disabled={!canAddGuess}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg transition-all duration-200 active:scale-95 group ${
                    canAddGuess
                      ? 'bg-slate-900 hover:bg-purple-600 text-white shadow-purple-100 cursor-pointer'
                      : 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed shadow-none'
                  }`}
                >
                  <Plus size={14} className="group-hover:scale-110 transition-transform" />
                  Add Guess
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleUndo}
                    disabled={lockedRowCount === 0}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      lockedRowCount > 0
                        ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-sm cursor-pointer'
                        : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                    }`}
                  >
                    <Undo2 size={13} />
                    Undo Last
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-200 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all cursor-pointer shadow-sm"
                  >
                    <RotateCcw size={13} />
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Column - Results */}
          <section className="lg:col-span-8 space-y-6">
            {/* Results Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xl min-h-[500px] relative">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">
                    Wordle Solver
                  </h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                      {total.toLocaleString()} Matches Found
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-4">
                      {total > displayLimit ? `Showing top ${displayLimit}` : 'All matches shown'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                </div>
              </div>

              {/* Single Word Highlight */}
              {total === 1 && (
                <div className="mb-8 p-5 bg-emerald-50 border-2 border-emerald-500 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block">
                      🎯 Exactly One Match Found
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-wider">
                      {allCombinedWords[0]?.word}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(allCombinedWords[0]?.word)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shrink-0 cursor-pointer"
                  >
                    {copiedWord === allCombinedWords[0]?.word ? 'Copied!' : 'Copy Answer'}
                  </button>
                </div>
              )}

              {/* Word Grid */}
              {total > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                    {allCombinedWords.slice(0, displayLimit).map(({ word, isCommon }) => (
                      <button
                        key={word}
                        aria-label={`Copy word ${word}`}
                        onClick={() => copyToClipboard(word)}
                        className="group relative h-12 bg-white border-2 border-slate-100 hover:border-purple-500 hover:shadow-md rounded-xl transition-all duration-200 overflow-hidden flex items-center justify-center active:scale-95 cursor-pointer"
                      >
                        <span
                          className={`text-sm tracking-widest uppercase transition-colors ${
                            isCommon
                              ? 'font-black text-slate-900 group-hover:text-purple-700'
                              : 'font-medium text-slate-600 group-hover:text-slate-900'
                          }`}
                        >
                          {word}
                        </span>
                        <div
                          className={`absolute inset-0 flex items-center justify-center bg-purple-600 text-white transition-all duration-200 ${
                            copiedWord === word ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                          }`}
                        >
                          <Check size={16} strokeWidth={3} />
                        </div>
                      </button>
                    ))}
                  </div>

                  {total > displayLimit && (
                    <div className="mt-10 flex justify-center">
                      <button
                        onClick={() => setDisplayLimit((prev) => prev + 100)}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-purple-200 transition-all flex items-center gap-2 group cursor-pointer"
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
                  <Link
                    key={char}
                    href={`/starting-with/${char}`}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all uppercase cursor-pointer"
                  >
                    {char}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
