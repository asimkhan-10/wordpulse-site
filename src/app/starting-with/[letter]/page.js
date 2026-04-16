import React from 'react';
import WordPulseSolver from '@/components/WordPulseSolver';
import wordData from '../../data/words.json';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';

export async function generateStaticParams() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return alphabet.map((letter) => ({
    letter: letter,
  }));
}

export async function generateMetadata({ params }) {
  const { letter } = await params;
  const char = letter?.toUpperCase() || '';
  const url = `https://5letterwords.me/starting-with/${letter}`;

  return {
    title: `5 Letter Words Starting With ${char} - Complete List | 5 Letter Words`,
    description: `Browse the complete list of five-letter words starting with ${char}. Filter by letter position, include/exclude letters, and find the perfect word for Wordle, Scrabble, or crosswords.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `5 Letter Words Starting With ${char}`,
      description: `Complete list of five-letter words starting with ${char}, with filters for Wordle, Scrabble, and more.`,
      url,
      siteName: '5 Letter Words',
    },
  };
}

// Per-letter content for rich SEO articles
const letterContent = {
  a: {
    intro: 'Five-letter words starting with A are among the most valuable in English — they cover everything from everyday nouns to powerful adjectives. The letter A is the most common vowel and starts hundreds of valid five-letter words.',
    common: ['APPLE', 'AROSE', 'AUDIO', 'ADIEU', 'ABBEY', 'ABIDE', 'ABODE', 'ABOUT', 'ABOVE', 'ABUSE'],
    tips: 'Words starting with A often contain multiple vowels, making them excellent Wordle openers. Try ADIEU or AUDIO to test four vowels in a single guess.',
    wordle: 'ADIEU and AUDIO are among the best Wordle starting words because they reveal whether A, E, I, U, or O are in the puzzle, all in one guess.',
  },
  b: {
    intro: 'Five-letter words starting with B are incredibly diverse, covering everything from natural phenomena to everyday objects. The letter B opens up many high-scoring opportunities in Scrabble and is common in Wordle puzzles.',
    common: ['BEACH', 'BEAST', 'BEGAN', 'BEING', 'BELOW', 'BIRTH', 'BLAME', 'BLAND', 'BLAST', 'BLEND'],
    tips: 'Many B-words follow the pattern B+vowel+consonant+vowel+consonant, such as BASIC or BAKER. These patterns are worth remembering when narrowing down Wordle answers.',
    wordle: 'If your Wordle clues include a B, look at whether it is paired with common vowels. Words like BEACH, BLAND, or BRIDE are frequent Wordle answers.',
  },
  c: {
    intro: 'Five-letter words starting with C are some of the most common in English. C is a high-frequency consonant that pairs well with most vowels and forms both hard and soft sounds, giving rise to a wide range of everyday words.',
    common: ['CABLE', 'CANDY', 'CARGO', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHALK', 'CHEAP', 'CHEST'],
    tips: 'C can make both a hard sound (as in CANDY) and a soft sound (as in CEDAR). When searching for five-letter C words, try filtering by a vowel in the second position to find words like CABIN, CABLE, or CEDAR.',
    wordle: 'Common Wordle answers starting with C include CHAIR, CREAM, CRISP, and CLOUD. Look for C words with two or more common vowels for the best guesses.',
  },
  d: {
    intro: 'Five-letter words starting with D span a wide range of meanings, from descriptive adjectives to action verbs. D-words are common in Wordle puzzles and show up frequently in Scrabble boards.',
    common: ['DAILY', 'DAISY', 'DANCE', 'DEATH', 'DEBUT', 'DELAY', 'DELTA', 'DEMON', 'DEPOT', 'DEPTH'],
    tips: 'Double-letter D words like DADDY are rare in Wordle, but D endings (as the last letter) are also uncommon. Focus on D at the start with a strong vowel (A, E, I) in position 2.',
    wordle: 'Strong Wordle guesses starting with D include DANCE, DELTA, and DRINK. These expose common vowels and consonant clusters quickly.',
  },
  e: {
    intro: 'Five-letter words starting with E are particularly useful in word games because E is the most common letter in the English language. Words beginning with E offer a wealth of options for both Wordle and Scrabble.',
    common: ['EAGLE', 'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMBER', 'EMOTE', 'EMPTY', 'ENJOY', 'ENTER'],
    tips: 'E-words often contain multiple vowels. Try starting with EARLY or EARTH to cover E, A, and R — three of the most frequently occurring letters in five-letter words.',
    wordle: 'EARLY is statistically one of the best Wordle starting words, covering E, A, R, L, and Y — all high-frequency letters.',
  },
  f: {
    intro: 'Five-letter words starting with F include many familiar everyday terms. F-words are moderately common in Wordle puzzles and tend to pair strongly with common vowel combinations.',
    common: ['FABLE', 'FACET', 'FAITH', 'FAULT', 'FAVOR', 'FEAST', 'FEVER', 'FIELD', 'FIERY', 'FINAL'],
    tips: 'Common patterns for F-words include F+R blends (FREED, FRAIL, FRANK) and F+L blends (FLAIR, FLAME, FLASK). These consonant clusters narrow your Wordle guesses effectively.',
    wordle: 'If a Wordle clue shows F is in the puzzle, consider words like FAITH, FLAME, and FLARE, which are among the most common F-starting answers.',
  },
  g: {
    intro: 'Five-letter words starting with G cover a broad range of vocabulary, from action verbs to descriptive terms. G is a reliable consonant in word games, appearing both at the start and end of common words.',
    common: ['GHOST', 'GIANT', 'GIVEN', 'GLAND', 'GLARE', 'GLASS', 'GLEAN', 'GLIDE', 'GLOBE', 'GLOOM'],
    tips: 'G+L blends (GLASS, GLIDE, GLOBE) are very common five-letter patterns. If G is confirmed in position 1, filtering for L in position 2 significantly narrows results.',
    wordle: 'Frequent Wordle G-words include GHOST, GIANT, GRAFT, and GROAN. The GR blend appears in many valid Wordle answers.',
  },
  h: {
    intro: 'Five-letter words starting with H are highly common in English, including many everyday nouns and verbs. H is a silent modifier in some combinations but a strong opener in most five-letter words.',
    common: ['HABIT', 'HAPPY', 'HARDY', 'HARSH', 'HAVEN', 'HEART', 'HEAVY', 'HEDGE', 'HERBS', 'HINGE'],
    tips: 'H+E and H+A combinations are the most frequent H-word openings. HEART, HEAVY, and HERBS are good guesses because they cover several high-frequency letters.',
    wordle: 'HEART is one of the most popular Wordle starting guesses and often one of the most efficient, exposing H, E, A, R, and T simultaneously.',
  },
  i: {
    intro: 'Five-letter words starting with I are less common than A or E words but still play a significant role in word games. I-words often contain multiple vowels, making them useful for vowel-hunting in Wordle.',
    common: ['IDEAL', 'IMAGE', 'IMPLY', 'INDEX', 'INDIE', 'INFER', 'INPUT', 'INTER', 'IRATE', 'IRONY'],
    tips: 'I-words with two vowels in the first three positions (like IRATE or IMAGE) are excellent for discovering which vowels are in a Wordle puzzle.',
    wordle: 'IRATE and IRONY are underutilized Wordle openers that reveal information about I, R, A, T, E, O, and N — some of the most common Wordle letters.',
  },
  j: {
    intro: 'Five-letter words starting with J are less common but highly valuable in Scrabble due to the J tile\'s high point value (8 points). In Wordle, J-words appear occasionally and can catch players off guard.',
    common: ['JAUNT', 'JAZZY', 'JEWEL', 'JOUST', 'JUICE', 'JUMBO', 'JUROR', 'JUDGE', 'DELTA', 'JIFFY'],
    tips: 'J+U combinations are the most productive (JUICE, JUMBO, JUROR). J+A and J+E combinations also yield useful words. J rarely appears at the end of five-letter words.',
    wordle: 'J is uncommon enough in Wordle that saving it for later guesses is smart. But if J appears as a clue, words like JUICE, JOUST, and JUDGE are strong candidates.',
  },
  k: {
    intro: 'Five-letter words starting with K include many distinctive and memorable terms. K is relatively rare in English but rewards players in Scrabble and helps narrow down Wordle when it appears as a clue.',
    common: ['KARMA', 'KAYAK', 'KEBAB', 'KNACK', 'KNEEL', 'KNIFE', 'KNOLL', 'KNOT', 'KOALA', 'KUDOS'],
    tips: 'KN blends (KNACK, KNEEL, KNIFE, KNOLL) are a productive category for K-words. Also look at KA and KE combinations for shorter vowel patterns.',
    wordle: 'K appears in Wordle answers less frequently than most other consonants. If K is revealed by a clue, it most likely appears in the KN blend or before a common vowel.',
  },
  l: {
    intro: 'Five-letter words starting with L are extremely common and versatile. L is one of the highest-frequency consonants in English, showing up in thousands of five-letter words as both an opener and a mid-word consonant.',
    common: ['LABEL', 'LANCE', 'LARGE', 'LASER', 'LATER', 'LATHE', 'LEAKY', 'LEARN', 'LEDGE', 'LEGAL'],
    tips: 'L+A and L+E combinations are the most common L-word openings. For Wordle, LEARN and LASER are excellent early guesses that expose L, E, A, R, N, and S.',
    wordle: 'LEARN is widely considered one of the strongest Wordle starting words, covering five of the most common letters in the game.',
  },
  m: {
    intro: 'Five-letter words starting with M make up a large and important part of the English lexicon. M is a common starting consonant in everyday speech and appears prominently in Wordle answers.',
    common: ['MAGIC', 'MAJOR', 'MAKER', 'MANGO', 'MAPLE', 'MARCH', 'MARSH', 'MEDAL', 'MERCY', 'MERIT'],
    tips: 'M+A combinations are extremely productive (MAGIC, MAJOR, MAPLE, MARCH). M+E and M+I also yield many common words. The MA pattern alone generates dozens of five-letter words.',
    wordle: 'MAGIC, MAJOR, and MERCY are frequent Wordle answers. If M is confirmed, targeting words with M in position 1 and A or E in position 2 is a strong strategy.',
  },
  n: {
    intro: 'Five-letter words starting with N include many core English words. N is one of the most common consonants in the language, and N-words are regularly featured in Wordle puzzles.',
    common: ['NAIVE', 'NAVAL', 'NERVE', 'NIGHT', 'NOBLE', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE'],
    tips: 'N+A, N+E, and N+O combinations are the most frequent patterns. NERVE and NIGHT are solid five-letter words that cover diverse consonant-vowel pairings.',
    wordle: 'NIGHT and NOVEL are common Wordle answers. N frequently appears in both the first and last positions, so check both when strategizing.',
  },
  o: {
    intro: 'Five-letter words starting with O are valuable in word games because O is the second most common vowel. O-words often contain additional vowels, helping players reveal multiple vowels in a single guess.',
    common: ['OASIS', 'OCEAN', 'OFFER', 'OFTEN', 'OLIVE', 'ONSET', 'OPERA', 'OPTIC', 'ORDER', 'ORGAN'],
    tips: 'O-words with two vowels (OCEAN, OLIVE, OPERA) are excellent for vowel discovery in Wordle. Look for patterns like O+C+E or O+P+E to find productive guesses.',
    wordle: 'OCEAN and OLIVE are excellent early Wordle guesses because they contain three vowels (O, E, A/I) and high-frequency consonants (C/L, N).',
  },
  p: {
    intro: 'Five-letter words starting with P are among the most numerous in the English language. P is a high-frequency consonant that begins thousands of common words, from everyday nouns to scientific terms.',
    common: ['PAINT', 'PANIC', 'PAPER', 'PARTY', 'PASTA', 'PATCH', 'PAUSE', 'PEACE', 'PEACH', 'PEARL'],
    tips: 'P+A and P+E combinations are the richest source of P-words. PAINT and PEACE are particularly good Wordle guesses because they combine P with very common vowel pairings.',
    wordle: 'PANIC, PAPER, and PEACH are frequent Wordle answers starting with P. The PA pattern is especially productive and worth exploring first.',
  },
  q: {
    intro: 'Five-letter words starting with Q are rare and unusual, but they are highly valuable in Scrabble (Q scores 10 points) and can be surprising Wordle answers. Q is almost always followed by U in English.',
    common: ['QUALM', 'QUEEN', 'QUERY', 'QUEST', 'QUEUE', 'QUICK', 'QUIET', 'QUILT', 'QUIRK', 'QUOTA'],
    tips: 'All common Q-words in English use the QU combination. QUE leads to QUEEN and QUERY, while QUI leads to QUICK, QUIET, and QUIRK. QUA gives you QUALM and QUAFF.',
    wordle: 'If Q appears as a clue in Wordle, it is almost certainly in the QU combination. QUEEN, QUEST, QUICK, and QUIET are the most likely Q-starting Wordle answers.',
  },
  r: {
    intro: 'Five-letter words starting with R are extremely common in English. R is one of the highest-frequency consonants and appears at the start of hundreds of everyday five-letter words.',
    common: ['RADAR', 'RADIO', 'RAISE', 'RALLY', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'REACT', 'REALM'],
    tips: 'R+A and R+E combinations are the most productive. RAISE, RANGE, RAPID, and REACH are all strong Wordle guesses because they cover R with high-frequency vowel pairings.',
    wordle: 'RAISE and REACT are among the best Wordle second-guess words, especially when used after a vowel-heavy opener like ADIEU or AUDIO.',
  },
  s: {
    intro: 'Five-letter words starting with S are the most numerous of any letter, covering an extraordinarily wide range of meanings. S is the single most common starting letter for five-letter words in English.',
    common: ['SAINT', 'SALAD', 'SAUCE', 'SCALE', 'SCARE', 'SCENE', 'SCORE', 'SCOUT', 'SENSE', 'SHARE'],
    tips: 'S-words with ST, SC, SH, or SL blends are particularly common (STAGE, SCALE, SHARE, SLAB). These blends alone account for hundreds of valid five-letter words.',
    wordle: 'SHARE, STARE, and SHINE are among the most common Wordle answers starting with S. The SH and ST blends are especially frequent in Wordle answer lists.',
  },
  t: {
    intro: 'Five-letter words starting with T are extremely common in English. T is one of the most frequently used consonants, and T-words appear regularly in both Wordle puzzles and Scrabble games.',
    common: ['TABLE', 'TALON', 'TANGO', 'TASTE', 'TEACH', 'THORN', 'TIGER', 'TIMER', 'TITLE', 'TOAST'],
    tips: 'T+A and T+H combinations (TABLE, TASTE, THORN, THICK) are the richest source of T-words. TR and TH blends are especially productive — try filtering for the second letter to narrow results quickly.',
    wordle: 'TASTE and TORCH are excellent Wordle guesses starting with T. THORN covers T, H, O, R, and N — five high-frequency Wordle letters.',
  },
  u: {
    intro: 'Five-letter words starting with U are less common than other vowel starters but are incredibly useful for vowel discovery in Wordle. U-words very often contain other vowels, making them efficient openers.',
    common: ['ULCER', 'ULTRA', 'UNCLE', 'UNDER', 'UNIFY', 'UNION', 'UNITE', 'UNITY', 'UNTIL', 'UPPER'],
    tips: 'UN prefix words (UNDER, UNIFY, UNION, UNITE, UNTIL, UNITY) are particularly productive and easy to remember. UN- is the most common U-starting pattern in five-letter words.',
    wordle: 'UNCLE and UNDER are useful Wordle guesses when U is confirmed by an earlier clue. They expose common consonant combinations while testing the position of U.',
  },
  v: {
    intro: 'Five-letter words starting with V are moderately common and can be highly valuable in Scrabble (V scores 4 points). V-words cover a range of meanings and appear occasionally in Wordle puzzles.',
    common: ['VAGUE', 'VALID', 'VALUE', 'VALVE', 'VAPOR', 'VAULT', 'VERSE', 'VIDEO', 'VIGOR', 'VIRAL'],
    tips: 'V+A and V+I combinations are the most common. VALUE, VALID, VIGOR, and VIRAL are productive starting points when V is confirmed as a Wordle clue.',
    wordle: 'V is relatively rare in Wordle answers. When it does appear, VALUE, VERSE, and VITAL are among the most likely candidates.',
  },
  w: {
    intro: 'Five-letter words starting with W include many high-frequency everyday English words. W-words cover a wide range from directional terms (WEST, WEIRD) to emotional words (WEARY, WORRY).',
    common: ['WAIST', 'WATCH', 'WATER', 'WEARY', 'WEDGE', 'WEIRD', 'WHERE', 'WHICH', 'WHILE', 'WHITE'],
    tips: 'WH blends (WHERE, WHICH, WHILE, WHITE) are among the most productive W-word patterns. WA combinations (WAIST, WATCH, WATER) also generate many common words.',
    wordle: 'WATER and WHERE are strong Wordle guesses starting with W. WEARY is particularly useful as it covers W, E, A, R, and Y — five common Wordle letters.',
  },
  x: {
    intro: 'Five-letter words starting with X are the rarest in English. X is the least common starting letter, but X-words are extremely valuable in Scrabble (X scores 8 points) and can be surprising Wordle answers.',
    common: ['XENON', 'XYLEM'],
    tips: 'Genuine five-letter English words starting with X are very few. XENON (a noble gas) and XYLEM (plant tissue) are the most common. In Scrabble, knowing X words is worth the effort for the high point value.',
    wordle: 'X very rarely starts Wordle answers. If X appears in a clue, it is far more likely to be in a later position than the first — check words ending with X or with X in the middle.',
  },
  y: {
    intro: 'Five-letter words starting with Y are uncommon but notable. Y functions as both a vowel and a consonant in English, giving Y-words a distinctive character. They are valuable in both Scrabble and Wordle.',
    common: ['YACHT', 'YIELD', 'YOUNG', 'YOUTH', 'YOURS', 'YEAST', 'YEARN', 'YODEL'],
    tips: 'Y+E combinations (YEAST, YEARN) and Y+O combinations (YOUNG, YOUTH, YOURS) are the most productive. Y at the start of a Wordle word is uncommon, so confirming Y early gives a significant advantage.',
    wordle: 'YOUNG and YOURS are the most common Y-starting Wordle answers. YIELD and YEAST also appear. If Y is confirmed in position 1, you can narrow down significantly.',
  },
  z: {
    intro: 'Five-letter words starting with Z are rare but extremely valuable in Scrabble (Z scores 10 points). Z-words are unusual enough in Wordle that most players are unprepared for them.',
    common: ['ZEBRA', 'ZESTY', 'ZILCH', 'ZIPPY', 'ZONAL', 'ZONED'],
    tips: 'ZE and ZI combinations (ZEBRA, ZESTY, ZILCH, ZIPPY) are the most common Z-word patterns. In Scrabble, placing Z on a double or triple letter score yields enormous point totals.',
    wordle: 'Z is extremely rare in Wordle. ZEBRA and ZESTY are among the few common Z-starting five-letter words that might appear as answers. Most players never guess a Z-word.',
  },
};

function getLetterArticle(char, letter, wordCount) {
  const content = letterContent[letter] || {
    intro: `Five-letter words starting with ${char} make up a significant part of the English word game vocabulary. Whether you are playing Wordle, Scrabble, or a crossword puzzle, knowing your ${char}-words gives you a real edge.`,
    common: [],
    tips: `When searching for five-letter words starting with ${char}, use the position filters above to narrow down based on what you know from your game. Combining position constraints with include/exclude letters gives the fastest results.`,
    wordle: `If ${char} appears in your Wordle clue, use the solver above to filter by its position and any other letters you have discovered.`,
  };

  return content;
}

export default async function LetterPage({ params }) {
  const { letter } = await params;
  const char = letter?.toUpperCase() || '';
  const lowerLetter = letter?.toLowerCase() || '';

  // Pre-fill first position
  const initialKnownPos = [char, '', '', '', ''];

  // Get words for this letter for the article
  const allWords = wordData?.allWords || [];
  const commonWords = wordData?.commonWords || [];
  const letterWords = allWords.filter(w => w.length === 5 && w[0].toLowerCase() === lowerLetter);
  const letterCommonWords = commonWords.filter(w => w.length === 5 && w[0].toLowerCase() === lowerLetter);

  const content = getLetterArticle(char, lowerLetter, letterWords.length);

  // Dynamic common examples from actual word data (supplement hardcoded ones)
  const exampleWords = letterCommonWords.slice(0, 15);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://5letterwords.me"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": `5-Letter Words Starting With ${char}`,
                "item": `https://5letterwords.me/starting-with/${letter}`
              }
            ]
          })
        }}
      />
      <WordPulseSolver
        wordData={wordData}
        initialKnownPos={initialKnownPos}
        showBackToHome={true}
        pageTitle={`5-Letter Words Starting With ${char}`}
        initialDisplayLimit={500}
      />

      {/* Rich SEO Article Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pb-20">
        <article className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-10">

          {/* Intro */}
          <header>
            <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tight mb-4">
              Five-Letter Words Starting With <span className="text-purple-600">{char}</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {content.intro}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="bg-purple-50 border border-purple-100 text-purple-700 font-bold px-3 py-1.5 rounded-full">
                {letterWords.length.toLocaleString()} total words
              </span>
              <span className="bg-green-50 border border-green-100 text-green-700 font-bold px-3 py-1.5 rounded-full">
                {letterCommonWords.length.toLocaleString()} common words
              </span>
            </div>
          </header>

          {/* Common Words Examples */}
          {exampleWords.length > 0 && (
            <section>
              <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mb-4">
                Common 5-Letter Words Starting With {char}
              </h3>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Here are some of the most common five-letter words beginning with {char} — these are frequent Wordle answers and commonly used in Scrabble and other word games:
              </p>
              <div className="flex flex-wrap gap-2">
                {exampleWords.map(word => (
                  <span key={word} className="bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold text-sm px-4 py-2 rounded-xl uppercase tracking-widest hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 transition-all cursor-default">
                    {word}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Wordle Tips */}
          <section className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <h3 className="text-base font-black text-slate-900 uppercase italic tracking-wide mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center text-white text-xs font-black">W</span>
              Wordle Strategy: Words Starting With {char}
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {content.wordle}
            </p>
          </section>

          {/* Solver Tips */}
          <section>
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mb-4">
              Tips for Finding {char} Words
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {content.tips}
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Position Filter', desc: `The letter ${char} is pre-filled in Position 1. Add more letters in positions 2–5 if you know them.` },
                { title: 'Include Letters', desc: 'Enter yellow Wordle tiles in the "Must Include" field to further narrow results.' },
                { title: 'Exclude Letters', desc: 'Add gray Wordle tiles to the "Must Exclude" field to eliminate impossible words.' },
              ].map((tip, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide mb-2">{tip.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mb-4">
              How to Use the {char} Word Finder
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Our tool above already filters to show only five-letter words starting with {char}. You can refine further using:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black text-purple-600">1</div>
                <p className="text-slate-600 text-sm leading-relaxed"><strong className="text-slate-800">Position slots 2–5:</strong> Click any of the position inputs and type a letter if you know a specific letter at that position. For example, if the word is {char}_A_E_, enter A in position 3 and E in position 5.</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black text-purple-600">2</div>
                <p className="text-slate-600 text-sm leading-relaxed"><strong className="text-slate-800">Must Include:</strong> Type any letters you know are in the word but whose position is unknown (yellow tiles in Wordle).</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black text-purple-600">3</div>
                <p className="text-slate-600 text-sm leading-relaxed"><strong className="text-slate-800">Must Exclude:</strong> Type any letters that are not in the word at all (gray tiles in Wordle).</p>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black text-purple-600">4</div>
                <p className="text-slate-600 text-sm leading-relaxed"><strong className="text-slate-800">Common Only toggle:</strong> Turn this on to see only the most frequently used words — ideal for Wordle where answers are always common words.</p>
              </li>
            </ul>
          </section>

          {/* Other Starting Letters */}
          <section>
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mb-4">
              Browse Words by Starting Letter
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              Looking for five-letter words starting with a different letter? Browse our full dictionary by letter:
            </p>
            <div className="flex flex-wrap gap-2">
              {alphabet.map(l => (
                <Link
                  key={l}
                  href={`/starting-with/${l}`}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg border-2 text-xs font-black uppercase transition-all ${
                    l === lowerLetter
                      ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-200'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600'
                  }`}
                >
                  {l}
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: `How many 5-letter words start with ${char}?`,
                  a: `Our dictionary contains ${letterWords.length.toLocaleString()} five-letter words starting with ${char}, of which ${letterCommonWords.length.toLocaleString()} are considered common enough to regularly appear in word games like Wordle.`,
                },
                {
                  q: `What are the most common 5-letter words starting with ${char}?`,
                  a: exampleWords.length > 0
                    ? `Some of the most commonly used five-letter words starting with ${char} include: ${exampleWords.slice(0, 5).join(', ')}. These words appear frequently in Wordle, Scrabble, and everyday English.`
                    : `Words starting with ${char} are rarer in English, but they are valuable in Scrabble for their high point potential.`,
                },
                {
                  q: `Can I use this tool for Scrabble?`,
                  a: `Absolutely. Toggle off "Common Only" to see the full dictionary including less common words that are still valid in Scrabble. This reveals many high-value words useful for competitive play.`,
                },
                {
                  q: `How do I use the Wordle solver for ${char} words?`,
                  a: `The solver above is pre-filtered for words starting with ${char}. Add any yellow letters to "Must Include", any gray letters to "Must Exclude", and type confirmed letters into their exact position slots. The list updates instantly.`,
                },
              ].map((faq, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4">
                    <h4 className="font-black text-slate-800 text-sm">{faq.q}</h4>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </article>
      </div>
      <SiteFooter />
    </>
  );
}