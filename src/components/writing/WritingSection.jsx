import React, { useState } from 'react';
import { ArrowUpRight, BookOpen, PenTool, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../utils/useLanguage';

export default function WritingSection() {
  const { lang } = useLanguage();
  const substackUrl = "https://substack.com/@aizatfir";
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      window.open(`${substackUrl}?email=${encodeURIComponent(emailInput.trim())}`, '_blank');
    } else {
      window.open(substackUrl, '_blank');
    }
  };

  const writingDrafts = [
    {
      id: "draft-01",
      number: "01",
      title: lang === 'id' ? "Akustik Spasial 5D & Mekanika Crossover" : "5D Spatial Ribbon Audio & Phase Mechanics",
      status: lang === 'id' ? "INKUBASI" : "INCUBATING",
      note: lang === 'id' ? "Riset pemisahan crossover 32-bit float Web Audio & HRTF." : "Exploring 32-bit float Web Audio crossover and HRTF binaural rendering."
    },
    {
      id: "draft-02",
      number: "02",
      title: lang === 'id' ? "Ergonomi Kognitif: Gelombang Ultradian vs Pomodoro" : "Cognitive Ergonomics: Ultradian Waves vs Pomodoro",
      status: lang === 'id' ? "INKUBASI" : "INCUBATING",
      note: lang === 'id' ? "Menyelaraskan siklus biologis manusia pada software produktivitas." : "Researching biological attention cycles in productivity software."
    },
    {
      id: "draft-03",
      number: "03",
      title: lang === 'id' ? "Minimalisme Digital & Komputasi Sadar" : "Digital Minimalism & Intentional Computing",
      status: lang === 'id' ? "INKUBASI" : "INCUBATING",
      note: lang === 'id' ? "Refleksi desain antarmuka Fitrah Launcher yang tenang." : "Reflections on building Fitrah Launcher & distraction-free interfaces."
    }
  ];

  return (
    <section className="writing-section py-20 sm:py-24 border-b border-[var(--color-border)]" id="writing">
      <div className="w-[96vw] max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-[var(--color-orange)] uppercase tracking-wider font-bold block mb-1">
              03 // {lang === 'id' ? 'TULISAN' : 'ESSAYS'}
            </span>
            <h2 className="display-headline text-4xl sm:text-6xl font-bold">
              {lang === 'id' ? 'catatan' : 'writing'}
            </h2>
          </div>

          <a
            href={substackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn text-xs font-mono font-bold flex items-center gap-2 self-start md:self-auto"
          >
            <BookOpen size={13} className="text-[var(--color-orange)]" />
            <span>@aizatfir ON SUBSTACK ↗</span>
          </a>
        </div>

        {/* Substack Publication Embed Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {/* Main Substack Card */}
          <div className="lg:col-span-2 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-orange)] text-white flex items-center justify-center font-display font-black text-lg shadow-sm">
                    S
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[var(--color-headline)]">
                      Aizat's Substack
                    </h3>
                    <span className="font-mono text-xs text-[var(--color-muted)]">
                      substack.com/@aizatfir
                    </span>
                  </div>
                </div>

                <a
                  href={substackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--color-orange)] hover:underline"
                >
                  <span>{lang === 'id' ? 'Buka Substack' : 'Open Substack'}</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <p className="font-serif italic text-sm text-[var(--color-muted)] max-w-2xl mb-6">
                "{lang === 'id'
                  ? 'Catatan arsitektur sistem, audio spasial, ergonomi kognitif & minimalisme digital.'
                  : 'Essays on systems engineering, spatial audio mechanics, cognitive ergonomics, and digital minimalism.'}"
              </p>
            </div>

            {/* Direct Subscription Box */}
            <form onSubmit={handleSubscribeSubmit} className="pt-4 border-t border-[var(--color-border)]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] block mb-2">
                {lang === 'id' ? 'Langganan esai terbaru lewat email:' : 'Subscribe for upcoming essays:'}
              </span>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  placeholder={lang === 'id' ? 'ketik email kamu...' : 'your email address...'}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-tint)] font-mono text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-orange)]"
                />
                <button
                  type="submit"
                  className="pill-btn px-4 py-2 text-xs font-mono font-bold whitespace-nowrap cursor-pointer"
                >
                  <span>{lang === 'id' ? 'Langganan ↗' : 'Subscribe ↗'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Clean Status Card */}
          <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-card-bg)]/60 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PenTool size={15} className="text-[var(--color-orange)]" />
                <span className="font-mono text-xs font-bold text-[var(--color-headline)]">
                  {lang === 'id' ? 'Status Inkubasi' : 'Incubation Status'}
                </span>
              </div>
              <p className="font-mono text-xs text-[var(--color-muted)] leading-relaxed">
                {lang === 'id'
                  ? '3 esai riset sedang dirampungkan di workspace lokal sebelum rilis publik.'
                  : '3 research drafts currently in local development before public feed release.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
              <a
                href={substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--color-surface-tint)] border border-[var(--color-border)] text-xs font-mono font-bold text-[var(--color-headline)] hover:border-[var(--color-orange)] transition-colors"
              >
                <span>{lang === 'id' ? 'Profil Substack' : 'Substack Profile'}</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Drafts List */}
        <div className="space-y-2.5">
          {writingDrafts.map((draft) => (
            <a
              key={draft.id}
              href={substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 sm:p-5 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-card-bg)]/40 hover:bg-[var(--color-card-bg)] hover:border-[var(--color-orange)] transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--color-orange)]">
                    {draft.number};
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg text-[var(--color-headline)] group-hover:text-[var(--color-orange)] transition-colors">
                    {draft.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--color-muted)]">
                  <span className="px-2 py-0.5 rounded bg-[var(--color-surface-tint)] border border-[var(--color-border)] font-bold text-[var(--color-orange)]">
                    {draft.status}
                  </span>
                  <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <p className="font-serif italic text-xs text-[var(--color-muted)] pl-6">
                "{draft.note}"
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
