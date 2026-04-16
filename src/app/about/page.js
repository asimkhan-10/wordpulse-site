import Link from 'next/link';
import { BookOpen, Target, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'About Us - 5 Letter Words',
  description: 'Learn about 5 Letter Words — the professional word finder and Wordle solver tool. Our mission, story, and how we help millions of word game players.',
  alternates: {
    canonical: 'https://5letterwords.me/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 pb-20">

      <SiteNav activePage="about" />

      <main className="max-w-4xl mx-auto px-4 md:px-6">

        {/* Hero */}
        <header className="text-center py-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-2 mb-4">
            <BookOpen size={14} className="text-purple-600" />
            <span className="text-[11px] font-black text-purple-700 uppercase tracking-widest">About Us</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            About <span className="text-purple-600">5 Letter Words</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            The professional word finder and solver built for serious players of Wordle, Scrabble, and every word game in between.
          </p>
        </header>

        {/* Story */}
        <section className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 mb-8">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mb-6">Our Story</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              5 Letter Words was born out of a simple frustration: existing word finders were either too slow, too cluttered with ads, or just not smart enough to handle real Wordle strategy. We set out to build something different — a clean, fast, truly useful tool that respects your time and intelligence.
            </p>
            <p>
              Launched in 2024, our platform has grown to serve hundreds of thousands of word game enthusiasts every month. Whether you are a casual Wordle player who just needs a nudge in the right direction, or a competitive Scrabble player optimizing every play, 5 Letter Words has the depth you need.
            </p>
            <p>
              Our word database is carefully curated from authoritative English dictionaries, with a special emphasis on the most commonly used five-letter words — exactly the words you are most likely to encounter in daily Wordle puzzles. We continuously update and refine the database to stay accurate and relevant.
            </p>
          </div>
        </section>

        {/* Mission / Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Target size={20} className="text-purple-600" />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">Our Mission</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Make word games more enjoyable by giving players the smartest, cleanest, and fastest filtering tool on the web.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users size={20} className="text-green-600" />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">Who We Serve</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Casual Wordle players, competitive Scrabble enthusiasts, crossword lovers, ESL learners, and anyone who loves the English language.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={20} className="text-blue-600" />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3">Our Values</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Speed, accuracy, and simplicity. We believe the best tool is one that gets out of your way and just works.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 mb-8">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mb-6">What We Offer</h2>
          <ul className="space-y-4">
            {[
              { title: 'Wordle Solver', desc: 'Filter by known letter positions (green), misplaced letters (yellow), and eliminated letters (gray) to narrow down solutions in seconds.' },
              { title: '5-Letter Word Finder', desc: 'Search our database of thousands of five-letter words using powerful letter-position filters and pattern matching.' },
              { title: 'Letter-by-Letter Dictionary Index', desc: 'Browse all five-letter words starting with any letter of the alphabet — from A to Z — organized and easy to explore.' },
              { title: 'Word Unscrambler', desc: 'Enter any set of letters and instantly see every valid five-letter word that can be formed from them.' },
              { title: 'Common Word Mode', desc: 'Toggle between the full dictionary and our curated list of the most common Wordle-style words to focus your search.' },
            ].map((item, i) => (
              <li key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] font-black text-purple-600">{i + 1}</span>
                </div>
                <div>
                  <strong className="text-sm font-black text-slate-800 uppercase tracking-wide block mb-1">{item.title}</strong>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Contact CTA */}
        <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-wide mb-2">Have a Question?</h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md">
              Found a bug, have a feature idea, or just want to say hello? Head over to our Contact page — we read every message.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-colors shadow-lg shadow-purple-200 flex-shrink-0"
          >
            Contact Us <ArrowRight size={14} />
          </Link>
        </section>

      </main>

      <SiteFooter />

    </div>
  );
}
