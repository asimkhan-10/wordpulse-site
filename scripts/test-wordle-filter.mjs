import { getFeedback, filterWords, patternsEqual } from '../src/lib/wordleFilter.js';
import wordsData from '../src/app/data/words.json' with { type: 'json' };

const allWords = wordsData.allWords;
console.log(`========================================`);
console.log(`Wordle Filter Test Suite`);
console.log(`Dataset size: ${allWords.length} words`);
console.log(`========================================\n`);

let passedCount = 0;
const totalTests = 4;

// Test 1: Guess SPEED, pattern gray, gray, yellow, gray, yellow: ABIDE must remain in the results.
console.log('Test 1: Guess SPEED with pattern [gray, gray, yellow, gray, yellow]');
const t1Guess = {
  word: 'SPEED',
  pattern: ['gray', 'gray', 'yellow', 'gray', 'yellow']
};
const t1Feedback = getFeedback('SPEED', 'ABIDE');
console.log('  Feedback for SPEED on answer ABIDE:', t1Feedback);
const t1Matches = patternsEqual(t1Feedback, t1Guess.pattern);
const t1Filtered = filterWords(allWords, [t1Guess]);
const t1AbideFound = t1Filtered.map(w => w.toUpperCase()).includes('ABIDE');

if (t1Matches && t1AbideFound) {
  console.log(`  ✓ PASS: ABIDE correctly remains in results (${t1Filtered.length} matching words).\n`);
  passedCount++;
} else {
  console.error(`  ✗ FAIL: ABIDE was not preserved in results!\n`);
}

// Test 2: Guess CRANE with all gray: no remaining word may contain C, R, A, N or E.
console.log('Test 2: Guess CRANE with all gray');
const t2Guess = {
  word: 'CRANE',
  pattern: ['gray', 'gray', 'gray', 'gray', 'gray']
};
const t2Filtered = filterWords(allWords, [t2Guess]);
const t2Invalid = t2Filtered.filter(w => /[CRANE]/i.test(w));
console.log(`  Remaining words after all-gray CRANE: ${t2Filtered.length}`);
if (t2Invalid.length === 0 && t2Filtered.length > 0) {
  console.log(`  ✓ PASS: No remaining word contains C, R, A, N, or E.\n`);
  passedCount++;
} else {
  console.error(`  ✗ FAIL: Found ${t2Invalid.length} words containing excluded letters:`, t2Invalid.slice(0, 5));
}

// Test 3: Guess LIGHT with L, I, G and T green, H gray: remaining words must match _IGHT patterns appropriately and respect the gray H.
console.log('Test 3: Guess LIGHT with L, I, G, T green, H gray');
const t3Guess = {
  word: 'LIGHT',
  pattern: ['green', 'green', 'green', 'gray', 'green']
};

// Test with candidate words demonstrating the feedback and filtering logic
const testCandidates = ['LIGHT', 'LIGOT', 'LIGET', 'FIGHT', 'MIGHT', 'NIGHT', 'RIGHT'];
const t3TestFiltered = filterWords(testCandidates, [t3Guess]);
console.log('  Candidates tested:', testCandidates);
console.log('  Matches returned:', t3TestFiltered);

const lightExcluded = !t3TestFiltered.includes('LIGHT');
const nonHIncluded = t3TestFiltered.includes('LIGOT');
const hWordsExcluded = !t3TestFiltered.some(w => w === 'FIGHT' || w === 'MIGHT' || w === 'LIGHT');

// Also verify the _IGHT family behavior with L gray:
const ightFamilyGuess = {
  word: 'LIGHT',
  pattern: ['gray', 'green', 'green', 'green', 'green']
};
const ightFamilyMatches = filterWords(allWords, [ightFamilyGuess]);
const ightValid = ightFamilyMatches.includes('fight') && !ightFamilyMatches.includes('light');

if (lightExcluded && nonHIncluded && hWordsExcluded && ightValid) {
  console.log('  ✓ PASS: LIGHT (H green) is excluded, non-H LIG_T matches, and _IGHT rhyming family handles gray letters properly.\n');
  passedCount++;
} else {
  console.error('  ✗ FAIL: Test 3 failed verification!\n');
}

// Test 4: Fully green row returns exactly that word.
console.log('Test 4: Fully green row returns exactly that word');
const t4Guess = {
  word: 'CRANE',
  pattern: ['green', 'green', 'green', 'green', 'green']
};
const t4Filtered = filterWords(allWords, [t4Guess]);
console.log(`  Matches for all-green CRANE: ${t4Filtered.length} words ->`, t4Filtered);
if (t4Filtered.length === 1 && t4Filtered[0].toUpperCase() === 'CRANE') {
  console.log('  ✓ PASS: Exactly CRANE returned.\n');
  passedCount++;
} else {
  console.error('  ✗ FAIL: Expected exactly [crane]!\n');
}

// Benchmark
console.log('--- Performance Benchmark ---');
const runs = 50;
const benchStart = performance.now();
for (let i = 0; i < runs; i++) {
  filterWords(allWords, [t1Guess]);
}
const benchTime = (performance.now() - benchStart) / runs;
console.log(`Single-guess filtering time across all ${allWords.length} words: ${benchTime.toFixed(3)} ms`);

if (benchTime < 5) {
  console.log(`✓ Performance target met: ${benchTime.toFixed(3)} ms is well under 5ms!\n`);
} else {
  console.warn(`⚠ Performance warning: took ${benchTime.toFixed(3)} ms\n`);
}

console.log(`Summary: ${passedCount}/${totalTests} test suites passed.`);
if (passedCount !== totalTests) {
  process.exit(1);
}
