import React from 'react';
import WordPulseSolver from '@/components/WordPulseSolver';
import wordData from '../../data/words.json';

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
    title: `5 Letter Words Starting With ${char} - 5 Letter Words`,
    description: `Complete list of five-letter words starting with the letter ${char}. Perfect for Wordle, Scrabble, and crosswords.`,
    alternates: {
      canonical: url,
    },
  };
}

export default async function LetterPage({ params }) {
  const { letter } = await params;
  const char = letter?.toUpperCase() || '';

  // Create an initial state where the first letter is pre-filled
  // Index 0 matches the first box
  const initialKnownPos = [letter.toUpperCase(), "", "", "", ""];

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
                "name": `Words Starting With ${char}`,
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
    </>
  );
}