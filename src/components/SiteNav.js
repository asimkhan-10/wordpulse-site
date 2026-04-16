import Link from 'next/link';
import { Zap } from 'lucide-react';

/**
 * Shared site-wide navigation bar.
 * @param {string} activePage - One of: 'home' | 'about' | 'contact' | 'privacy'
 */
export default function SiteNav({ activePage = '' }) {
  const links = [
    { href: '/',               label: 'Home',    key: 'home'    },
    { href: '/about',          label: 'About',   key: 'about'   },
    { href: '/contact',        label: 'Contact', key: 'contact' },
    { href: '/privacy-policy', label: 'Privacy', key: 'privacy' },
  ];

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-900 rounded-lg shadow-md">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">5 Letter Words</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ href, label, key }) => (
            <Link
              key={key}
              href={href}
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                activePage === key
                  ? 'text-purple-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
