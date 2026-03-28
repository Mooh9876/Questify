// Diese Datei zeigt eine rote Fehlermeldung an, wenn etwas schiefgelaufen ist.
// Zum Beispiel wenn die Verbindung zum Server nicht klappt oder eine Eingabe fehlt.
// Ist keine Fehlermeldung vorhanden, zeigt diese Datei einfach nichts an.

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className="font-display text-[10px] tracking-[0.15em] uppercase text-[#ff4f6a] bg-[rgba(255,79,106,0.08)] border border-[rgba(255,79,106,0.3)] rounded-sm px-4 py-2.5 animate-fade-in"
      role="alert"
    >
      {message}
    </div>
  );
};