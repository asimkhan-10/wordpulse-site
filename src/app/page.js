import Link from 'next/link';
import Image from 'next/image';
import wordDataImport from './data/words.json';
import WordPulseSolver from '@/components/WordPulseSolver';
import SiteFooter from '@/components/SiteFooter';

const wordData = wordDataImport || { allWords: [], commonWords: [] };

export const metadata = {
  title: {
    absolute: "5 Letter Word Finder & Solver for Wordle, Scrabble & Word Games",
  },
  description: "Free 5 letter word finder and solver for Wordle, Scrabble, and Words With Friends. Filter by letter position, include, and exclude to find every matching word instantly.",
  alternates: {
    canonical: 'https://www.5letterwords.me',
  },
  openGraph: {
    title: "5 Letter Word Finder & Solver for Wordle, Scrabble & Word Games",
    description: "Free 5 letter word finder and solver for Wordle, Scrabble, and Words With Friends. Filter by letter position, include, and exclude to find every matching word instantly.",
    url: 'https://www.5letterwords.me',
    siteName: '5 Letter Words',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "5 Letter Word Finder & Solver for Wordle, Scrabble & Word Games",
    description: "Free 5 letter word finder and solver for Wordle, Scrabble, and Words With Friends. Filter by letter position, include, and exclude to find every matching word instantly.",
  },
};

export default function App() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const faqData = [
    {
      question: "Is this 5 letter word finder really free?",
      answer: "Yes. Every filter, the full dictionary toggle, and unlimited searches cost nothing, and there's no account to create."
    },
    {
      question: "Does it work on mobile phones?",
      answer: "It was built for it. The layout is thumb-friendly, so players can run the finder in their phone browser right alongside the Wordle app."
    },
    {
      question: "Can it reveal today's Wordle answer?",
      answer: "Not directly — and that's by design. The finder won't hand over the wordle answer today on a platter; it narrows thousands of candidates to the few that fit the clues entered. The final guess is still the player's. It also doesn't track past wordle answers, since Wordle never repeats one."
    },
    {
      question: "What dictionary does it search?",
      answer: "A curated list of over 2,300 common five-letter words with the Common Only toggle on, expanding to the full Scrabble-style dictionary — 6,000+ entries — when it's toggled off. That makes it a true 5 letter solver for both casual puzzles and serious word games."
    },
    {
      question: "Is it only for Wordle?",
      answer: "No. Crossword fills, Scrabble checks, anagram unscrambling, vocabulary building — if the word has five letters, the finder earns its keep."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                "name": "5 Letter Word Finder",
                "url": "https://www.5letterwords.me",
                "description": "Free 5 letter word finder and solver for Wordle, Scrabble, and Words With Friends. Filter by letter position, include, and exclude to find every matching word instantly.",
                "applicationCategory": "GameApplication",
                "operatingSystem": "All"
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqData.map((item) => ({
                  "@type": "Question",
                  "name": item.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                  }
                }))
              }
            ]
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
              5 Letter <span className="text-purple-600">Word Finder</span>
            </h1>
          </header>

          <div className="prose prose-slate prose-lg max-w-none">
            {/* Introduction */}
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              Every morning, millions of players open Wordle to find five empty tiles and one big question: where to start? A five letter word finder answers it in seconds — type in the confirmed letters, rule out the misses, and thousands of possibilities narrow to the few words that still fit.
            </p>

            {/* Screenshot 1: Default tool view */}
            <figure className="my-8">
              <Image
                src="/screenshots/screenshot1.png"
                alt="The tool as players first see it — 2,309 common matches, top 25 shown."
                width={1229}
                height={600}
                className="w-full h-auto rounded-xl shadow-md border border-slate-200"
              />
              <figcaption className="text-xs md:text-sm text-slate-500 italic mt-2.5 text-center">
                The tool as players first see it — 2,309 common matches, top 25 shown.
              </figcaption>
            </figure>

            <p className="text-slate-600 leading-relaxed">
              5LetterWords.me built its five letter word finder for exactly that moment. It&apos;s free, needs no signup, and runs in a phone browser right beside the Wordle app — whether the puzzle is a daily Wordle, a crossword slot, or a jumble that won&apos;t untangle.
            </p>

            {/* How the 5 Letter Word Finder Works */}
            <section id="how-it-works" className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                How the 5 Letter Word Finder Works
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                The tool gives players four simple filters. Combine them, press Find Words, and the match list updates instantly. That&apos;s what makes it a true 5 letter words finder rather than a static word list.
              </p>

              <div className="space-y-6 not-prose">
                {/* Step 1 */}
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <div className="flex gap-4 items-center mb-3">
                    <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black text-green-800">
                      1
                    </div>
                    <h3 className="text-lg font-black text-green-900 uppercase tracking-wide">
                      Step 1 — Enter Known Letters by Position
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                    The five position boxes are for letters confirmed in a specific spot — the green tiles in Wordle. If the puzzle shows a green C first and a green T last, those go in slots 1 and 5. The classic example: C in slot 1, A in slot 3, N in slot 5 leaves exactly one match — CHAIN.
                  </p>
                  {/* Screenshot 2: CHAIN position test */}
                  <figure className="mt-4">
                    <Image
                      src="/screenshots/screenshot2.png"
                      alt="Position slots in action: C in slot 1, A in slot 3, N in slot 5 narrows the field to a single match — CHAIN."
                      width={1229}
                      height={600}
                      className="w-full h-auto rounded-xl shadow-md border border-green-200"
                    />
                    <figcaption className="text-xs text-slate-500 italic mt-2 text-center">
                      Position slots in action: C in slot 1, A in slot 3, N in slot 5 narrows the field to a single match — CHAIN.
                    </figcaption>
                  </figure>
                </div>

                {/* Step 2 */}
                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                  <div className="flex gap-4 items-center mb-3">
                    <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black text-yellow-800">
                      2
                    </div>
                    <h3 className="text-lg font-black text-yellow-900 uppercase tracking-wide">
                      Step 2 — Add Must-Include Letters
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                    Letters that are in the word but sitting in the wrong spot — the yellow tiles — go in the &quot;Must Include&quot; field. One practical note: separate letters with commas, like A,E,L,S,T. Typing them as one unbroken string won&apos;t match anything, so the commas matter.
                  </p>
                  {/* Screenshot 3: Include-letters test */}
                  <figure className="mt-4">
                    <Image
                      src="/screenshots/screenshot3.png"
                      alt="Must-include letters at work: entering ‘A’ narrows the results to 906 matches."
                      width={1229}
                      height={600}
                      className="w-full h-auto rounded-xl shadow-md border border-yellow-200"
                    />
                    <figcaption className="text-xs text-slate-500 italic mt-2 text-center">
                      Must-include letters at work: entering ‘A’ narrows the results to 906 matches.
                    </figcaption>
                  </figure>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
                  <div className="flex gap-4 items-center mb-3">
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black text-slate-800">
                      3
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide">
                      Step 3 — Rule Out Letters
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                    Every gray tile — every letter proven absent — goes in the &quot;Must Exclude&quot; field. Each excluded letter shrinks the results dramatically, which is why entering grays is the fastest way to corner a stubborn puzzle.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                  <div className="flex gap-4 items-center mb-3">
                    <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black text-purple-800">
                      4
                    </div>
                    <h3 className="text-lg font-black text-purple-900 uppercase tracking-wide">
                      Step 4 — Toggle Common Words Only
                    </h3>
                  </div>
                  <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                    With the toggle on, the finder searches everyday words first — the kind of vocabulary Wordle answers are drawn from. Toggle it off and the full dictionary opens up: thousands of additional entries, including obscure Scrabble-valid words like AAHED and AALII.
                  </p>
                  {/* Screenshot 4: Common Only toggle off */}
                  <figure className="mt-4">
                    <Image
                      src="/screenshots/screenshot4.png"
                      alt="Toggling Common Only off opens the full dictionary — 6,030 matches, including obscure entries like AAHED."
                      width={1229}
                      height={600}
                      className="w-full h-auto rounded-xl shadow-md border border-purple-200"
                    />
                    <figcaption className="text-xs text-slate-500 italic mt-2 text-center">
                      Toggling Common Only off opens the full dictionary — 6,030 matches, including obscure entries like AAHED.
                    </figcaption>
                  </figure>
                </div>
              </div>

              {/* Reading the Results */}
              <div className="mt-8">
                <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mb-3">
                  Reading the Results
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  The tool opens on 2,309 common matches and shows the top 25 alphabetically, with a Show More button for the rest. Narrow the filters and watch that number collapse — going from thousands of candidates to a handful is the whole point.
                </p>
              </div>
            </section>

            {/* The 5 Letter Word Solver Wordle Players Rely On */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                The 5 Letter Word Solver Wordle Players Rely On
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Wordle hands players six guesses and five empty slots. A good <Link href="/wordle-solver" className="text-purple-600 hover:underline font-semibold">5 letter word solver</Link> turns those guesses into information instead of gambles: enter each round&apos;s green, yellow, and gray letters, and only the words that still fit the grid survive.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Most regulars open with the best wordle starting words they know — vowel-heavy guesses like <Link href="/starting-with/a" className="text-purple-600 hover:underline font-semibold">ADIEU</Link> or <Link href="/starting-with/a" className="text-purple-600 hover:underline font-semibold">AUDIO</Link> that reveal the puzzle&apos;s skeleton in one move. From there, the solver does the bookkeeping. Used as a wordle hint engine, it answers the only question that matters after guess three: &quot;what can the answer possibly still be?&quot;
              </p>
              <p className="text-slate-600 leading-relaxed">
                It proves its worth in wordle hard mode, where revealed letters must be reused and there&apos;s no room for throwaway guesses — the best wordle hard mode tips all start with the same habit: enter every clue before guessing again. That&apos;s also where 5 letter words with double letters turn deadly — ESSAY, KNOLL, and their cousins have ended many runs, because nothing in the early clues warns that a letter repeats. The solver surfaces those traps before they cost a guess.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A little wordle letter frequency knowledge helps too. <Link href="/starting-with/e" className="text-purple-600 hover:underline font-semibold">E</Link>, <Link href="/starting-with/a" className="text-purple-600 hover:underline font-semibold">A</Link>, <Link href="/starting-with/r" className="text-purple-600 hover:underline font-semibold">R</Link>, <Link href="/starting-with/o" className="text-purple-600 hover:underline font-semibold">O</Link>, and <Link href="/starting-with/t" className="text-purple-600 hover:underline font-semibold">T</Link> carry the most weight in five-letter words, so guesses rich in those letters eliminate the most candidates. And when every vowel is ruled out, there&apos;s a whole corner of the dictionary waiting: 5 letter words with no vowels — think CRYPT, GYPSY, RHYTHM — which the solver finds in one step.
              </p>
              <p className="text-slate-600 leading-relaxed">
                For anyone guarding a streak, these wordle tips pair well with the tool: enter every guess&apos;s results before guessing again, and when two options remain, favor the more common word. That&apos;s the practical routine behind every &quot;how to keep wordle streak&quot; success story — less luck, more elimination.
              </p>
            </section>

            {/* Unscramble Letters Into 5 Letter Words */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Unscramble Letters Into 5 Letter Words
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Not every puzzle is Wordle. Sometimes players just have a jumble — five letters from a game, a worksheet, or a brain teaser — and need every word those letters can build. Drop them into the Must-Include field, comma-separated, and the finder doubles as a 5 letter anagram solver.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Enter A,E,L,S,T and it returns four words: LEAST, SLATE, STALE, and STEAL. Whether someone calls it a word solver 5 letters tool or an anagram helper, the job is the same — turn a pile of letters into answers.
              </p>

              {/* Screenshot 5: A,E,L,S,T unscramble test */}
              <figure className="my-8">
                <Image
                  src="/screenshots/screenshot5.png"
                  alt="Unscrambling in action: A,E,L,S,T returns exactly four words — LEAST, SLATE, STALE, STEAL."
                  width={1228}
                  height={539}
                  className="w-full h-auto rounded-xl shadow-md border border-slate-200"
                />
                <figcaption className="text-xs md:text-sm text-slate-500 italic mt-2.5 text-center">
                  Unscrambling in action: A,E,L,S,T returns exactly four words — LEAST, SLATE, STALE, STEAL.
                </figcaption>
              </figure>
            </section>

            {/* Browse 5 Letter Words by Letter and Pattern */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Browse 5 Letter Words by Letter and Pattern
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Some searches don&apos;t start with clues at all. Players often just need words shaped a certain way, and the built-in five-letter word finder dictionary is organized to serve exactly that.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The letter pages cover every starting letter A through Z — the <Link href="/starting-with/s" className="text-purple-600 hover:underline font-semibold">5 letter words starting with s</Link> collection, for example, is one of the busiest, since S opens more English words than any other letter. Beyond starting letters, players browse 5 letter words ending in y for that classic Wordle finale, or <Link href="/starting-with/z" className="text-purple-600 hover:underline font-semibold">5 letter words with z</Link> (and X and Q) when the rare letters refuse to cooperate.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Vowel hunters have their own corners: <Link href="/starting-with/a" className="text-purple-600 hover:underline font-semibold">5 letter words with a</Link> for the most common vowel of all, and 5 letter words with 2 vowels for balanced guesses. Positional searches go deeper still — 5 letter words 3rd letter a narrows the field to a single slot, which is devastatingly effective in late-game Wordle.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Writers and puzzle makers browse by word type instead: 5 letter nouns for headlines and crossword fills, 5 letter verbs for sharper sentences. And for the purely curious, there&apos;s the 5 letter palindromes shelf — short, strange, and wonderful.
              </p>

              {/* A-Z Letter Grid */}
              <div className="not-prose my-8 p-6 bg-slate-100 rounded-2xl border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 text-center">
                  Browse by Starting Letter (A–Z)
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {alphabet.map((letter) => (
                    <Link
                      key={letter}
                      href={`/starting-with/${letter}`}
                      className="w-9 h-9 flex items-center justify-center bg-white hover:bg-purple-600 hover:text-white text-slate-800 font-bold text-sm rounded-xl border border-slate-200 transition-colors shadow-sm"
                    >
                      {letter.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Built for Every Word Game */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Built for Every Word Game
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Wordle may be the headline act, but the same four filters serve every word game in the house:
              </p>
              <div className="not-prose space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-slate-900 min-w-[170px] uppercase text-xs tracking-wider text-purple-700">
                    Scrabble
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Tournament players sanity-check 5 letter words scrabble plays before committing tiles, especially the obscure two-vowel dumps that win games.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-slate-900 min-w-[170px] uppercase text-xs tracking-wider text-purple-700">
                    Words With Friends
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The 5 letter words words with friends crowd uses the include/exclude fields to test high-scoring placements.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-slate-900 min-w-[170px] uppercase text-xs tracking-wider text-purple-700">
                    Crosswords
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Stuck on a five-letter slot? 5 letter crossword answers fall out of the position boxes in seconds — enter the known letters, leave the rest blank.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-slate-900 min-w-[170px] uppercase text-xs tracking-wider text-purple-700">
                    Wordle variants
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Fans of games like wordle, from Dordle to Quordle, reuse the exact same workflow with more grids to feed.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-slate-900 min-w-[170px] uppercase text-xs tracking-wider text-purple-700">
                    Creativity
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A random 5 letter words generator sparks usernames, team names, and writing prompts.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="font-bold text-slate-900 min-w-[170px] uppercase text-xs tracking-wider text-purple-700">
                    Learning
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Teachers and parents use the calmer corners of the dictionary for wordle for kids activities, building vocabulary one five-letter word at a time.
                  </p>
                </div>
              </div>
            </section>

            {/* Fair Play: Is Using a Word Finder Cheating? */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Fair Play: Is Using a Word Finder Cheating?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                It&apos;s a fair question, and searches for a wordle solver cheat prove players ask it often. The honest answer depends on the game being played. In a friendly Wordle competition, solving unaided is the whole sport — the solver is best kept as a last resort when the streak is on the line. For solo play, learning, or just getting on with the day, it&apos;s simply a tool.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A five letter word solver doesn&apos;t replace thinking; it organizes it. And these word finder tips make it a genuine learning aid: study <em>why</em> the surviving words fit, notice the letter patterns, and the next puzzle gets easier without any help at all.
              </p>
            </section>

            {/* Frequently Asked Questions */}
            <section className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 not-prose">
                {faqData.map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                      <h3 className="font-bold text-slate-900 text-base">
                        {item.question}
                      </h3>
                    </div>
                    <div className="px-6 py-4">
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </article>
      </div>
      <SiteFooter />
    </div>
  );
}
