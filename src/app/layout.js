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
    default: "5 Letter Words - Professional Word Finder & Solver",
    template: "%s | 5 Letter Words"
  },
  description: "Advanced 5-letter word finder for Wordle and word games. Filter by green/yellow/gray positions, must include/exclude letters, and more.",
  keywords: ["wordle solver", "5 letter word finder", "wordle helper", "five letter words", "wordle cheat", "unscramble words"],
  authors: [{ name: "5 Letter Words Studio" }],
  creator: "5 Letter Words Studio",
  publisher: "5 Letter Words Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://5letterwords.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "5 Letter Words - Professional Word Finder & Solver",
    description: "Advanced 5-letter word finder for Wordle and word games. Filter by green/yellow/gray positions.",
    url: 'https://5letterwords.me',
    siteName: '5 Letter Words',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "5 Letter Words - Professional Word Finder & Solver",
    description: "Advanced 5-letter word finder for Wordle and word games.",
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
