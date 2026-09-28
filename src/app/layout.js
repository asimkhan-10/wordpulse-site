import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "5 Letter Word Finder & Solver",
    template: "%s | 5 Letter Words"
  },
  description: "Free 5 letter word finder and solver for Wordle, Scrabble, and Words With Friends. Filter by letter position, include, and exclude to find every matching word instantly.",
  keywords: ["wordle solver", "5 letter word finder", "wordle helper", "five letter words", "wordle cheat", "unscramble words"],
  authors: [{ name: "5 Letter Words Studio" }],
  creator: "5 Letter Words Studio",
  publisher: "5 Letter Words Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.5letterwords.me'),
  alternates: {
    canonical: '/',
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-1434000394357253"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
