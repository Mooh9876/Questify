// Diese Datei zeigt einen Lade-Indikator (drei springende Punkte) mit einem Text an.
// Er erscheint immer dann, wenn die App gerade auf den Server wartet.
// So weiß der Spieler, dass im Hintergrund etwas passiert.

type LoadingIndicatorProps = {
  label: string;
};

export const LoadingIndicator = ({ label }: LoadingIndicatorProps) => (
  <div
    className="flex items-center gap-2.5 font-display text-[10px] tracking-[0.15em] uppercase text-[rgba(96,232,255,0.6)] py-2 animate-fade-in"
    aria-live="polite"
  >
    <span className="flex gap-0.5">
      <span className="w-1 h-1 rounded-full bg-[#60e8ff] animate-bounce [animation-delay:0ms]" />
      <span className="w-1 h-1 rounded-full bg-[#60e8ff] animate-bounce [animation-delay:150ms]" />
      <span className="w-1 h-1 rounded-full bg-[#60e8ff] animate-bounce [animation-delay:300ms]" />
    </span>
    {label}
  </div>
);