import React from 'react';
import { Zap } from 'lucide-react';
import WordPulseSolver from '../../../components/WordPulseSolver';

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

  // Create an initial state where the first letter is pre-filled
  // Index 0 matches the first box
  const initialKnownPos = [letter.toUpperCase(), "", "", "", ""];

  return <WordPulseSolver wordData={wordData} initialKnownPos={initialKnownPos} showBackToHome={true} />;
}