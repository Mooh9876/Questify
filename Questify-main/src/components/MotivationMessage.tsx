// Diese Datei zeigt eine kurze Motivationsnachricht in der App an.
// Zum Beispiel nach dem Erstellen oder Abschließen einer Quest.
// Ist keine Nachricht vorhanden, zeigt diese Datei einfach nichts an.

type MotivationMessageProps = {
  message: string;
};

export const MotivationMessage = ({ message }: MotivationMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="font-display text-[10px] tracking-[0.15em] uppercase text-[rgba(96,232,255,0.7)] bg-[rgba(96,232,255,0.05)] border border-[rgba(96,232,255,0.12)] rounded-sm px-4 py-2.5 animate-fade-in"
      aria-live="polite"
    >
      ✨ {message}
    </div>
  );
};