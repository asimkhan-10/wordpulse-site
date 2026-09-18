"use client";

import Link from 'next/link';
import wordDataImport from './data/words.json';
import WordPulseSolver from '@/components/WordPulseSolver';
import SiteFooter from '@/components/SiteFooter';

const wordData = wordDataImport || { allWords: [], commonWords: [] };

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "5 Letter Words",
            "url": "https://www.5letterwords.me",
            "description": "Professional 5 letter word finder and solver for word games like Wordle.",
            "applicationCategory": "GameApplication",
            "operatingSystem": "All"
          })
        }}
      />

      <WordPulseSolver
        wordData={wordData}
        pageTitle="Professional 5-Letter Word Finder"
      />

      {/* --- SEO CONTENT SECTIONS --- */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">
        <article className="mt-24 border-t border-slate-200 pt-16 space-y-12">
        
          <header className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
              Five Letter <span className="text-purple-600">Word Finder</span>
            </h1>
          </header>

          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              Our 5 Letter Word Finder helps you solve Wordle puzzles by showing all possible words that match your clues. Enter the letters you know, the letters you've ruled out, and we'll instantly narrow down the possibilities.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our word finder is designed to help you solve puzzles, not do them for you. We only show the possible words remaining in your Wordle grid, not spoil the actual answer (unless of course if there's only one possible word left).
            </p>
            <p className="text-slate-600 leading-relaxed">
              The tool works by filtering through thousands of five letter words based on your criteria. You can enter letters in certain positions (green tiles), have letters in the wrong spots (yellow tiles), or exclude letters entirely (gray tiles). Words that are common Wordle answers appear in bold to help you make the best guess.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Beyond Wordle, you can use our finder to unscramble letters, search by starting or ending letters, or improve your performance in Scrabble, Words With Friends, and other word games.
            </p>

            <section id="how-to-use" className="scroll-mt-8">
              <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">How to Use the 5-Letter Word Finder</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Our word finder tool provides four powerful filters to narrow down any puzzle:
              </p>
              <ul className="space-y-4 list-none pl-0">
                <li className="flex gap-4 items-start bg-green-50 p-4 rounded-xl border border-green-100">
                  <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-green-800 mt-0.5">1</div>
                  <div>
                    <strong className="text-green-800 text-sm uppercase tracking-wide block mb-1">Position Slots 1–5 (Known Letters / Green)</strong>
                    <span className="text-slate-600 text-sm">Enter letters that you already know are in the word at specific positions. For example, if you know the word starts with &quot;CA&quot; and ends with &quot;T&quot;, enter &quot;C&quot; in slot 1, &quot;A&quot; in slot 2, and &quot;T&quot; in slot 5.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                  <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-yellow-800 mt-0.5">2</div>
                  <div>
                    <strong className="text-yellow-700 text-sm uppercase tracking-wide block mb-1">Must Include Letters (Yellow Tiles)</strong>
                    <span className="text-slate-600 text-sm">Enter letters that you know are in the word but whose position is unknown (yellow tiles in Wordle).</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-slate-800 mt-0.5">3</div>
                  <div>
                    <strong className="text-slate-700 text-sm uppercase tracking-wide block mb-1">Must Exclude Letters (Gray Tiles)</strong>
                    <span className="text-slate-600 text-sm">Enter letters that you know are not in the word at all (gray tiles in Wordle) to eliminate impossible words.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <div className="w-6 h-6 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black text-purple-800 mt-0.5">4</div>
                  <div>
                    <strong className="text-purple-800 text-sm uppercase tracking-wide block mb-1">Common Only Toggle</strong>
                    <span className="text-slate-600 text-sm">Turn this on to see only the most frequently used words — ideal for Wordle where answers are always common words — or turn it off to explore the full Scrabble dictionary.</span>
                  </div>
                </li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-6">
                After entering your letters, click the &quot;Find Words&quot; button to find 5 letter words with these letters. Words that are common and more likely to be Wordle solutions are shown in bold.
              </p>
            </section>

            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">Using Five Letter Word Finder as a 5 Letter Word Unscrambler</h3>
            <p className="text-slate-600 leading-relaxed">
              To unscramble 5 letters into words, simply enter the letters you want to unscramble into the &quot;Include Letters&quot; (Yellow) field and leave the other fields empty. Our tool will generate a list of all possible words that can be made from those letters. For example, here is the list of 12 words that can be formed from the letters A, E, L, S, T, including &quot;LEAST&quot;, &quot;SLATE&quot;, &quot;STALE&quot;, and &quot;STEAL&quot;.
            </p>

            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">Finding 5 Letter Words by Position</h3>
            <p className="text-slate-600 leading-relaxed">
              If you know the position of certain letters in the word, you can use our tool to find words that match those positions. For example, if you know that the first letter in the word is &quot;C&quot;, the third letter is &quot;A&quot; and the last letter is &quot;N&quot;, you can enter &quot;C&quot; in the first green box, &quot;A&quot; in the third, and &quot;N&quot; in the 5th (last) green box. Press &quot;Find Words&quot; and you&apos;ll find the word you&apos;re looking for (in this case, &quot;CHAIN&quot; is the only word that matches this criteria).
            </p>

            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">Wordle Strategy Tips</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Some proven strategies to improve your Wordle game:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 marker:text-purple-500">
              <li>Start with vowel-rich words like &quot;<Link href="/starting-with/a" className="text-purple-600 hover:underline">ADIEU</Link>&quot; or &quot;<Link href="/starting-with/a" className="text-purple-600 hover:underline">AUDIO</Link>&quot; to quickly identify which vowels are in the puzzle.</li>
              <li>Use common consonants early such as <Link href="/starting-with/l" className="text-purple-600 hover:underline">L</Link>, <Link href="/starting-with/n" className="text-purple-600 hover:underline">N</Link>, <Link href="/starting-with/r" className="text-purple-600 hover:underline">R</Link>, <Link href="/starting-with/s" className="text-purple-600 hover:underline">S</Link>, and <Link href="/starting-with/t" className="text-purple-600 hover:underline">T</Link> to maximize the information from your first guesses.</li>
              <li>Pay attention to letter frequency - letters like <Link href="/starting-with/a" className="text-purple-600 hover:underline">A</Link>, <Link href="/starting-with/e" className="text-purple-600 hover:underline">E</Link>, I, O, R appear most often in five-letter words.</li>
              <li>Eliminate possibilities systematically by using the Exclude Letters (Gray) field to track letters you&apos;ve ruled out.</li>
              <li>Consider word patterns - many English words follow common patterns like consonant-vowel-consonant-vowel-consonant (CVCVC).</li>
            </ul>

            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">Sharing Search Results</h3>
            <p className="text-slate-600 leading-relaxed">
              Our word finder tool allows you to save your search results for future reference or sharing. When you click the &quot;Find Words&quot; button, you will be redirected to a page that specifically shows only your search results. You can then share or bookmark this page for future reference.
            </p>

            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">Reporting a Technical Issue</h3>
            <p className="text-slate-600 leading-relaxed">
              If you encounter any technical issues with our website, please contact us at our email and we will do our best to resolve the issue as soon as possible.
            </p>

            <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">Suggesting New Features</h3>
            <p className="text-slate-600 leading-relaxed">
              We are always looking for ways to improve our website and make it more useful for our users. If you have any suggestions for new features or improvements, please contact us at 5letterwords.me.
            </p>

            {/* Frequently Asked Questions */}
            <section className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm">Can I use this tool for Scrabble?</h4>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Absolutely. Toggle off &quot;Common Only&quot; to see the full dictionary including less common words that are still valid in Scrabble. This reveals many high-value words useful for competitive play.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h4 className="font-bold text-slate-900 text-sm">How do I use the Wordle solver?</h4>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Type confirmed green letters into their exact position slots (1–5), add yellow letters to &quot;Must Include&quot;, and enter gray letters into &quot;Must Exclude&quot;. The list updates in real time to display every valid remaining word.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
