import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export const metadata = {
  title: 'Privacy Policy - 5 Letter Words',
  description: 'Privacy Policy for 5letterwords.me — learn how we collect, use, and protect your data when you use our word finder tool.',
  alternates: {
    canonical: 'https://5letterwords.me/privacy-policy',
  },
};

const LAST_UPDATED = 'April 1, 2026';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">

      <SiteNav activePage="privacy" />

      <main className="max-w-3xl mx-auto px-4 md:px-6">

        {/* Header */}
        <header className="text-center py-12 space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 rounded-full px-4 py-2 mb-4">
            <ShieldCheck size={14} className="text-green-600" />
            <span className="text-[11px] font-black text-green-700 uppercase tracking-widest">Privacy Policy</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Privacy <span className="text-purple-600">Policy</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">Last updated: {LAST_UPDATED}</p>
        </header>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 space-y-10">

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Welcome to 5 Letter Words (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), accessible at <a href="https://5letterwords.me" className="text-purple-600 hover:underline font-medium">5letterwords.me</a>. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">2. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed mb-4">We may collect the following types of information:</p>
            <div className="space-y-3">
              {[
                { title: 'Log Data', desc: 'When you visit our site, our servers may automatically log standard data provided by your web browser, including your IP address, browser type and version, pages you visit, time spent on pages, and referring URLs.' },
                { title: 'Usage Data', desc: 'We collect anonymized, aggregated data about how visitors interact with the site — such as which letters and filters are searched most often — to improve the tool. This data cannot be used to identify you.' },
                { title: 'Cookies', desc: 'We use cookies to store your preferences (such as the "Common Only" toggle setting) and to enable third-party services such as Google Analytics and Google AdSense.' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <strong className="text-sm font-black text-slate-800 uppercase tracking-wide block mb-1">{item.title}</strong>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="space-y-2">
              {[
                'Operate, maintain, and improve our website and word finder tool',
                'Analyze usage trends to enhance user experience',
                'Understand how users interact with our filters and content',
                'Comply with legal obligations',
                'Display relevant advertisements through Google AdSense',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">4. Google AdSense & Advertising</h2>
            <p className="text-slate-600 leading-relaxed">
              We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites on the internet. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the internet.
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">Google Ad Settings</a>. Alternatively, you can opt out of a third-party vendor&apos;s use of cookies by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-medium">www.aboutads.info/choices</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">5. Google Analytics</h2>
            <p className="text-slate-600 leading-relaxed">
              We use Google Analytics to understand how visitors use our site. Google Analytics collects information using cookies and may transmit data to Google servers in the United States. Google Analytics does not identify individual users or associate your IP address with any other data held by Google. We use this service to compile reports and improve our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">6. Cookies Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              Our website uses cookies — small text files stored on your device. Cookies help us remember your preferences and understand how you use our site. You can choose to disable cookies through your browser settings. Note that disabling cookies may affect the functionality of certain features.
            </p>
            <div className="mt-4 space-y-3">
              {[
                { type: 'Essential Cookies', use: 'Required for the site to function correctly, including preference storage.' },
                { type: 'Analytics Cookies', use: 'Used by Google Analytics to collect anonymous usage statistics.' },
                { type: 'Advertising Cookies', use: 'Used by Google AdSense to deliver relevant advertisements.' },
              ].map((c, i) => (
                <div key={i} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-xs font-black text-slate-700 uppercase tracking-wide w-36 flex-shrink-0">{c.type}</strong>
                  <p className="text-sm text-slate-500">{c.use}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">7. Third-Party Links</h2>
            <p className="text-slate-600 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these sites. We encourage you to review the privacy policy of every website you visit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-slate-600 leading-relaxed">
              Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us so we can take appropriate action.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">9. Your Data Rights</h2>
            <p className="text-slate-600 leading-relaxed">
              Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete information we hold about you. As we collect minimal personal data (primarily through third-party analytics and advertising tools), most requests can be handled by adjusting your browser&apos;s cookie settings or opting out through Google&apos;s ad settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">10. Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide italic mb-4">11. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="text-sm font-bold text-slate-700">5 Letter Words</p>
              <p className="text-sm text-slate-500 mt-1">Website: <a href="https://5letterwords.me" className="text-purple-600 hover:underline">5letterwords.me</a></p>
              <p className="text-sm text-slate-500">Email: <a href="mailto:contact@5letterwords.me" className="text-purple-600 hover:underline">contact@5letterwords.me</a></p>
            </div>
          </section>

        </div>
      </main>

      <SiteFooter />

    </div>
  );
}
