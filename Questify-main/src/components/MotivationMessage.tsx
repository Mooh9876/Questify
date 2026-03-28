type MotivationMessageProps = {
  message: string;
};

export const MotivationMessage = ({ message }: MotivationMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <section className="motivation-banner" aria-live="polite">
      ✨ {message}
    </section>
  );
};