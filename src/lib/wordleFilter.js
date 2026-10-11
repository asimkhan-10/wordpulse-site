/**
 * Pure functions for Wordle feedback calculation and filtering logic.
 */

/**
 * Wordle feedback scoring function.
 * Handles duplicates correctly: marks greens first, then yellows while unmatched letters remain.
 * @param {string} guess - 5-letter guess
 * @param {string} answer - 5-letter candidate answer
 * @returns {Array<'gray' | 'yellow' | 'green'>}
 */
export function getFeedback(guess, answer) {
  if (!guess || !answer || guess.length !== 5 || answer.length !== 5) {
    return ['gray', 'gray', 'gray', 'gray', 'gray'];
  }

  const g = guess.toUpperCase();
  const a = answer.toUpperCase();
  const pattern = ['gray', 'gray', 'gray', 'gray', 'gray'];
  const answerCounts = {};

  // First pass: mark greens and tally remaining answer letters
  for (let i = 0; i < 5; i++) {
    if (g[i] === a[i]) {
      pattern[i] = 'green';
    } else {
      const char = a[i];
      answerCounts[char] = (answerCounts[char] || 0) + 1;
    }
  }

  // Second pass: mark yellows for remaining letter occurrences
  for (let i = 0; i < 5; i++) {
    if (pattern[i] !== 'green') {
      const char = g[i];
      if (answerCounts[char] > 0) {
        pattern[i] = 'yellow';
        answerCounts[char]--;
      }
    }
  }

  return pattern;
}

/**
 * Compares two 5-tile patterns for equality.
 */
export function patternsEqual(p1, p2) {
  if (!p1 || !p2 || p1.length !== 5 || p2.length !== 5) return false;
  return (
    p1[0] === p2[0] &&
    p1[1] === p2[1] &&
    p1[2] === p2[2] &&
    p1[3] === p2[3] &&
    p1[4] === p2[4]
  );
}

/**
 * Checks if a candidate word matches a single guess and pattern.
 */
export function matchesGuess(guessWord, pattern, candidate) {
  const feedback = getFeedback(guessWord, candidate);
  return patternsEqual(feedback, pattern);
}

// Pre-allocated static buffers for zero-allocation execution
const counts = new Uint8Array(26);
const mod = new Int8Array(5);

function candidateMatchesGuessFast(cand, gCodes, tCodes) {
  let modCount = 0;

  // Pass 1: greens
  for (let i = 0; i < 5; i++) {
    let c = cand.charCodeAt(i);
    if (c >= 97) c -= 32;
    c -= 65;

    const g = gCodes[i];
    if (c === g) {
      if (tCodes[i] !== 2) {
        for (let m = 0; m < modCount; m++) counts[mod[m]] = 0;
        return false;
      }
    } else {
      if (tCodes[i] === 2) {
        for (let m = 0; m < modCount; m++) counts[mod[m]] = 0;
        return false;
      }
      if (c >= 0 && c < 26) {
        counts[c]++;
        mod[modCount++] = c;
      }
    }
  }

  // Pass 2: yellows & grays
  for (let i = 0; i < 5; i++) {
    if (tCodes[i] !== 2) {
      const g = gCodes[i];
      if (g >= 0 && g < 26 && counts[g] > 0) {
        if (tCodes[i] !== 1) {
          for (let m = 0; m < modCount; m++) counts[mod[m]] = 0;
          return false;
        }
        counts[g]--;
      } else {
        if (tCodes[i] !== 0) {
          for (let m = 0; m < modCount; m++) counts[mod[m]] = 0;
          return false;
        }
      }
    }
  }

  // Reset only modified indices
  for (let m = 0; m < modCount; m++) counts[mod[m]] = 0;
  return true;
}

/**
 * Filters a word list against a list of guess objects: { word: string, pattern: string[] }
 * Optimized to run in under 2ms across 14,855 words.
 * @param {string[]} wordList
 * @param {Array<{ word: string, pattern: string[] }>} guesses
 * @returns {string[]}
 */
export function filterWords(wordList, guesses) {
  if (!guesses || guesses.length === 0) return wordList;

  const validGuesses = guesses.filter(
    (g) => g && typeof g.word === 'string' && g.word.length === 5 && Array.isArray(g.pattern) && g.pattern.length === 5
  );

  if (validGuesses.length === 0) return wordList;

  // Prepare numerical codes once per filter pass
  const prepared = validGuesses.map((g) => {
    const wordUpper = g.word.toUpperCase();
    const gCodes = [
      wordUpper.charCodeAt(0) - 65,
      wordUpper.charCodeAt(1) - 65,
      wordUpper.charCodeAt(2) - 65,
      wordUpper.charCodeAt(3) - 65,
      wordUpper.charCodeAt(4) - 65,
    ];
    const tCodes = g.pattern.map((p) => (p === 'green' ? 2 : p === 'yellow' ? 1 : 0));
    return { gCodes, tCodes };
  });

  const results = [];
  const len = wordList.length;

  for (let i = 0; i < len; i++) {
    const word = wordList[i];
    let matchesAll = true;

    for (let j = 0; j < prepared.length; j++) {
      if (!candidateMatchesGuessFast(word, prepared[j].gCodes, prepared[j].tCodes)) {
        matchesAll = false;
        break;
      }
    }

    if (matchesAll) {
      results.push(word);
    }
  }

  return results;
}

/**
 * Splits and sorts words into common words and valid non-common words.
 * Common words are listed first, both alphabetically sorted.
 * @param {string[]} words
 * @param {Set<string>} commonSet
 * @returns {{ common: string[], other: string[], total: number }}
 */
export function partitionResults(words, commonSet) {
  const common = [];
  const other = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i].toUpperCase();
    if (commonSet.has(w.toLowerCase())) {
      common.push(w);
    } else {
      other.push(w);
    }
  }

  common.sort();
  other.sort();

  return {
    common,
    other,
    total: common.length + other.length,
  };
}
