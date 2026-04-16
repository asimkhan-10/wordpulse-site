import Link from 'next/link';
import { Zap } from 'lucide-react';

/** Shared site-wide footer. */
export default function SiteFooter() {
  return (
    <footer className="py-10 border-t border-slate-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-purple-600 fill-purple-600" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-900 italic">5 Letter Words</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/"               className="text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors">Home</Link>
            <Link href="/about"          className="text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors">About</Link>
            <Link href="/contact"        className="text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="text-[11px] font-bold text-slate-400 hover:text-slate-700 uppercase tracking-widest transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 5 Letter Words</p>
        </div>
      </div>
    </footer>
  );
}
