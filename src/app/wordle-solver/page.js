import wordDataImport from '@/app/data/words.json';
import SiteFooter from '@/components/SiteFooter';
import WordleSolver from '@/components/WordleSolver';
import Link from 'next/link';

const wordData = wordDataImport || { allWords: [], commonWords: [] };

export const metadata = {
  title: "Free Wordle Solver: Green, Yellow & Gray Clues",
  description: "Free Wordle solver. Enter your green, yellow and gray letters and instantly see every 5-letter word that still fits. No signup needed.",
  alternates: {
    canonical: 'https://www.5letterwords.me/wordle-solver',
  },
  openGraph: {
    title: "Free Wordle Solver: Green, Yellow & Gray Clues",
    description: "Free Wordle solver. Enter your green, yellow and gray letters and instantly see every 5-letter word that still fits. No signup needed.",
    url: 'https://www.5letterwords.me/wordle-solver',
    siteName: '5 Letter Words',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free Wordle Solver: Green, Yellow & Gray Clues",
    description: "Free Wordle solver. Enter your green, yellow and gray letters and instantly see every 5-letter word that still fits. No signup needed.",
  },
};

const faqData = [
  {
    question: "Is the tool free?",
    answer: "Yes. It is free to use and does not ask for an account or signup."
  },
  {
    question: "Does it give away the answer?",
    answer: "Not directly. It narrows thousands of possibilities down to the words that match the clues entered. If only one word remains, it is highlighted, but getting there depends on the player's own clues."
  },
  {
    question: "Does it remember previous puzzles?",
    answer: "No. The tool does not keep track of past wordle answers and does not need to, since it works only from the clues entered for the current puzzle."
  },
  {
    question: "Where can words be browsed by first letter?",
    answer: "The letter pages list every word by its first letter, such as words starting with S."
  }
];

export default function WordleSolverPage() {
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
                "name": "Wordle Solver",
                "url": "https://www.5letterwords.me/wordle-solver",
                "description": "Free Wordle solver. Enter your green, yellow and gray letters and instantly see every 5-letter word that still fits. No signup needed.",
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

      <WordleSolver wordData={wordData} />

      {/* --- SEO CONTENT SECTIONS --- */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">
        <article className="mt-24 border-t border-slate-200 pt-16 space-y-12">
          {/* Header */}
          <header className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
              Wordle Solver: <span className="text-purple-600">A Free Tool for Green, Yellow and Gray Clues</span>
            </h1>
          </header>

          <div className="prose prose-slate prose-lg max-w-none">
            {/* Intro paragraphs */}
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              Three guesses in, the grid is a patchwork of green, yellow and gray tiles, and the answer could still be any one of a few dozen words. That is exactly the moment this free Wordle solver was built for. Players enter the colors from their own game, and the tool trims a list of nearly 15,000 valid five-letter words down to the few that still fit.
            </p>
            <p className="text-slate-600 leading-relaxed">
              It is free, it asks for no account, and it runs comfortably in a phone browser parked next to the game. This guide walks through how each part of the tool works, how to read the shortlist, and a few habits that make players better at the game itself, not just rescued from one tough puzzle.
            </p>

            {/* What the Tool Does */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                What the Tool Does
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The tool behaves like a small Wordle board. It has up to six guess rows with five tiles each, and clicking a tile cycles its color from gray to yellow to green, just like in the real game. Once a guess is locked in, the word list shrinks to only the words that would have produced exactly the same pattern of colors.
              </p>
              <p className="text-slate-600 leading-relaxed">
                That last part matters. Instead of loosely matching letters, the tool checks every candidate word against the real feedback rules, so repeated letters are handled correctly. It can be thought of as a 5 letter word solver tuned for one specific game.
              </p>
            </section>

            {/* How to Use the Wordle Solver */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                How to Use the Wordle Solver
              </h2>
              <div className="space-y-4 not-prose my-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-sm shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Step 1: Type the Guess</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Players begin by typing the five-letter word they played in the actual game into the first row of the board.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-sm shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Step 2: Match the Colors</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Next, each tile is clicked until its color matches what the game showed. Gray means the letter did not score, yellow means the letter is in the word but in the wrong spot, and green means the letter is in the right spot.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-sm shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Step 3: Add the Guess</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Pressing Add guess locks the row in and updates the shortlist right away. The next row opens up for the following guess, and the process repeats for up to six rows.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-black flex items-center justify-center text-sm shrink-0 mt-0.5">
                    ↺
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">Fixing Mistakes</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      A misclicked tile is not a disaster. Undo last guess removes the most recent row, and Reset clears the whole board for a fresh puzzle.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Reading the Results */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Reading the Results
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Above the list, the tool shows how many words still fit. Early on, that number can be large, but it usually shrinks fast. By the second or third guess, most puzzles are down to a short list.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Words shown in bold are the likely answers. They come from a smaller list of common words that the classic game used for its solutions, and they appear first. Everything below them is a valid guess that is less likely to be the answer. Because the game’s publisher has adjusted its answer list over time, a bold word is a strong hint rather than a promise.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When only one word is left, the tool highlights it. At that point, the puzzle has effectively solved itself.
              </p>
            </section>

            {/* When the Clues Get Tricky */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                When the Clues Get Tricky
              </h2>

              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mt-6 mb-3">
                Double Letters
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Repeated letters cause more confusion than anything else in the game. Consider a guess of SPEED when the answer is ABIDE. The first E scores yellow, but the second E scores gray, because the answer contains only one E. A gray tile there does not mean the letter is missing, and removing every E from the search would wrongly throw ABIDE out.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                The tool follows the game’s real scoring, so it keeps ABIDE on the list. That also makes it a good helper for 5 letter words with double letters, such as ESSAY, KNOLL or ABBEY, which tend to catch players who assume each letter appears only once.
              </p>

              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mt-6 mb-3">
                Words With No Vowels
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                At the other extreme, 5 letter words with no vowels, such as CRYPT, LYMPH and GYPSY, lean on the letter Y instead. They are rare but real, and a puzzle where every vowel guess turns gray is a good sign that one of them might be hiding.
              </p>

              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mt-6 mb-3">
                Rhyme Traps
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Some patterns hide a long list of near-identical words. A board showing _IGHT, for example, could still be LIGHT, NIGHT, FIGHT, MIGHT, SIGHT, TIGHT or RIGHT. Guessing them one at a time can burn through all six rows. The shortlist makes the danger visible, because the word count stays high even with four letters green. That is the cue to try a guess that tests several of the possible first letters at once.
              </p>
            </section>

            {/* Playing Smarter With the Tool */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Playing Smarter With the Tool
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The tool handles the bookkeeping, and strategy handles the rest. The best wordle starting words usually mix common consonants with a few vowels, and popular openers such as ADIEU, AUDIO and RAISE all follow that idea.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                A little wordle letter frequency knowledge helps too. Letters like E, A, R, O and T turn up again and again in five-letter words, so guesses rich in them tend to cut the list down quickly.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Used as a wordle hint rather than an answer machine, the shortlist answers one useful question after the third guess: what can the answer still be? Of all the wordle tips out there, the most ignored is also the simplest, which is to enter the colors from every guess before making the next one.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Players curious about how to keep wordle streak numbers climbing tend to find that habit matters more than any single clever guess. Stay calm, enter the clues, and pick from the shortlist.
              </p>
            </section>

            {/* Using the Tool in Wordle Hard Mode */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Using the Tool in Wordle Hard Mode
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Wordle hard mode requires every revealed hint to be reused in later guesses, so there are no throwaway words for testing letters.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The tool does not need a separate switch for it. Every word on the shortlist already contains all the green and yellow letters found so far, so anything picked from the list is a legal choice. The real challenge in that mode is the trap patterns described above, where several words fit and each wrong guess uses up a precious row.
              </p>
            </section>

            {/* Is Using a Solver Cheating? */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Is Using a Solver Cheating?
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Searches for a wordle solver cheat show that plenty of players wrestle with this question. The honest answer depends on the setting. In a friendly competition, solving unaided is the whole point, so the tool is best kept as a last resort. For solo play, practice, or rescuing a long streak, it is simply a helper.
              </p>
              <p className="text-slate-600 leading-relaxed">
                It does not show the wordle answer today before any clues are entered. The shortlist is built only from the colors a player supplies, and the final guess is always the player’s own call. Players who look at why the surviving words fit, noticing the patterns and the traps, often find the next puzzle easier without any help at all.
              </p>
            </section>

            {/* Beyond Wordle */}
            <section className="scroll-mt-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mt-12 mb-6">
                Beyond Wordle
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The same green, yellow and gray logic works for games like wordle, including Dordle and Quordle. Each board gives its own colors for the same guesses, so players can enter one board’s colors, note the shortlist, press Reset, and repeat for the next board.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Players after a general helper for crosswords, Scrabble or anagrams are better served by the main{' '}
                <Link href="/" className="text-purple-600 hover:underline font-semibold">
                  5 letter word finder
                </Link>{' '}
                on the homepage, which swaps colored tiles for position, include and exclude fields. Anyone who has searched for a five letter word solver, a plain 5 letter words finder, or just word solver 5 letters will find what they need there, along with a quick 5 letter solver for any other word game.
              </p>
            </section>

            {/* Frequently Asked Questions */}
            <section className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase italic tracking-wide mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 not-prose">
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-base">Is the tool free?</h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Yes. It is free to use and does not ask for an account or signup.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-base">Does it give away the answer?</h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Not directly. It narrows thousands of possibilities down to the words that match the clues entered. If only one word remains, it is highlighted, but getting there depends on the player’s own clues.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-base">Does it remember previous puzzles?</h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      No. The tool does not keep track of past wordle answers and does not need to, since it works only from the clues entered for the current puzzle.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900 text-base">Where can words be browsed by first letter?</h3>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The letter pages list every word by its first letter, such as{' '}
                      <Link href="/starting-with/s" className="text-purple-600 hover:underline font-semibold">
                        words starting with S
                      </Link>
                      .
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
