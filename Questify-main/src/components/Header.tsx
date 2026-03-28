// Diese Datei zeigt die Kopfzeile (Header) ganz oben auf der Seite an.
// Sie enthält den App-Namen 'Questify', einen Untertitel und kleine Status-Anzeigen.
// Die Kopfzeile bleibt beim Scrollen immer sichtbar.

type HeaderProps = {
  subtitle: string;
};

export const Header = ({ subtitle }: HeaderProps) => (
  <header className="topbar-shape sticky top-0 z-50 backdrop-blur-xl bg-[rgba(11,13,24,0.94)] border-b border-[rgba(96,232,255,0.08)] px-6 py-4 mb-6">
    <div className="flex items-center justify-between mb-2">
      <span className="font-display text-[10px] font-semibold tracking-[0.25em] uppercase text-[rgba(96,232,255,0.65)]">
        Questify
      </span>
      <div className="flex items-center gap-2" aria-label="Systemstatus">
        <span className="font-display text-[9px] tracking-[0.18em] uppercase bg-[rgba(96,232,255,0.07)] border border-[rgba(96,232,255,0.18)] text-[#60e8ff] px-2.5 py-1 rounded-sm">
          Hunter UI
        </span>
        <span className="font-display text-[9px] tracking-[0.18em] uppercase bg-[rgba(96,232,255,0.07)] border border-[rgba(96,232,255,0.18)] text-[#60e8ff] px-2.5 py-1 rounded-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39d98a] animate-live-dot" />
          Sync
        </span>
      </div>
    </div>
    <h1 className="text-grad-title font-display text-2xl md:text-3xl font-bold tracking-tight leading-snug">
      Alltagsaufgaben als klare Quests
    </h1>
    <p className="mt-1.5 text-sm text-[rgba(160,168,220,0.55)]">{subtitle}</p>
  </header>
);