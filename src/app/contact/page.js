import Link from 'next/link';
import { Mail, MessageSquare, Bug, Lightbulb, Clock } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Contact Us - 5 Letter Words',
  description: 'Get in touch with the 5 Letter Words team. Report a bug, suggest a feature, or just say hello. We read every message.',
  alternates: {
    canonical: 'https://5letterwords.me/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">

      <SiteNav activePage="contact" />

      <main className="max-w-4xl mx-auto px-4 md:px-6">

        {/* Hero */}
        <header className="text-center py-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-2 mb-4">
            <Mail size={14} className="text-purple-600" />
            <span className="text-[11px] font-black text-purple-700 uppercase tracking-widest">Contact Us</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Get In <span className="text-purple-600">Touch</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Have a question, found a bug, or want to suggest a feature? We read every message and do our best to respond promptly.
          </p>
        </header>

        {/* Primary Email CTA */}
        <section className="bg-purple-600 rounded-3xl p-12 shadow-2xl shadow-purple-200 mb-10 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={28} className="text-white" />
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-wide mb-3">Send Us an Email</h2>
          <p className="text-purple-100 leading-relaxed mb-8 max-w-lg mx-auto text-base">
            The best way to reach us is by email. We aim to respond to all inquiries within 1–2 business days.
          </p>
          <a
            href="mailto:contact@5letterwords.me"
            className="inline-flex items-center gap-3 bg-white text-purple-700 font-black text-sm uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-purple-50 transition-colors shadow-xl"
          >
            <Mail size={16} />
            contact@5letterwords.me
          </a>
        </section>

        {/* Reason Cards */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-wide mb-6 text-center">What Can We Help With?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Bug,
                color: 'bg-red-50 text-red-500',
                title: 'Bug Reports',
                desc: 'Found something broken? Tell us the page, what you expected, and what happened. Screenshots are always helpful.',
              },
              {
                icon: Lightbulb,
                color: 'bg-yellow-50 text-yellow-500',
                title: 'Feature Suggestions',
                desc: 'Have an idea for a new filter, game mode, or tool feature? We love hearing from power users.',
              },
              {
                icon: MessageSquare,
                color: 'bg-blue-50 text-blue-500',
                title: 'General Feedback',
                desc: 'Something feel off about the design or experience? We take UX feedback seriously and act on it.',
              },
              {
                icon: Mail,
                color: 'bg-green-50 text-green-500',
                title: 'Business Enquiries',
                desc: 'Interested in partnerships, collaborations, or advertising? Reach out and we\'ll be happy to discuss.',
              },
            ].map(({ icon: Icon, color, title, desc }, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex gap-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color.split(' ')[0]}`}>
                  <Icon size={20} className={color.split(' ')[1]} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Response Time */}
        <section className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 mb-10 flex gap-6 items-start">
          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock size={20} className="text-slate-500" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wide mb-2">Response Times</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We aim to respond to all emails within <strong className="text-slate-700">1–2 business days</strong>. For bug reports that affect core functionality, we prioritize those and typically address them within 24 hours. Feature suggestions are reviewed weekly and added to our roadmap if they align with our goals.
            </p>
          </div>
        </section>

        {/* FAQ teaser */}
        <section className="text-center">
          <p className="text-sm text-slate-400 font-medium">
            Looking for help using the word finder?{' '}
            <Link href="/" className="text-purple-600 font-bold hover:underline">
              Visit the home page
            </Link>{' '}
            — the tool instructions are there.
          </p>
        </section>

      </main>

      <SiteFooter />

    </div>
  );
}
