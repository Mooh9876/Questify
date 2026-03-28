// Diese Datei zeigt eine Belohnungs-Nachricht an, nachdem eine Quest abgeschlossen wurde.
// Sie erscheint kurz oben als auffällige Karte mit XP und Coins-Gewinn.
// Nach ein paar Sekunden verschwindet sie automatisch, oder der Spieler schließt sie manuell.

import { getRewardAccentLabel } from '../lib/rewards';
import type { QuestCompletionFeedback } from '../types';

type RewardToastProps = {
  feedback: QuestCompletionFeedback | null;
  onDismiss: () => void;
};

export const RewardToast = ({ feedback, onDismiss }: RewardToastProps) => {
  if (!feedback) {
    return null;
  }

  return (
    <section
      className="relative z-50 panel-shape bg-[rgba(11,13,24,0.96)] backdrop-blur-xl border border-[rgba(142,85,255,0.45)] shadow-[0_0_32px_rgba(142,85,255,0.25),0_8px_40px_rgba(0,0,0,0.6)] p-5 animate-toast-in"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <span className="font-display text-[9px] font-semibold tracking-[0.22em] uppercase text-[rgba(203,114,255,0.8)] block mb-1">
            Quest Belohnung
          </span>
          <h3 className="font-display text-base font-bold text-white truncate">{feedback.taskTitle}</h3>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="font-display text-[9px] tracking-widest uppercase bg-[rgba(96,232,255,0.12)] border border-[rgba(96,232,255,0.3)] text-[#60e8ff] px-2 py-1 rounded-sm">
              +{feedback.xpGained} XP
            </span>
            <span className="font-display text-[9px] tracking-widest uppercase bg-[rgba(203,114,255,0.12)] border border-[rgba(203,114,255,0.35)] text-[#cb72ff] px-2 py-1 rounded-sm">
              {getRewardAccentLabel(feedback.reward)}
            </span>
          </div>
          <p className="mt-2 text-xs text-[rgba(160,168,220,0.55)] leading-relaxed">{feedback.reward.description}</p>
        </div>
        <button
          type="button"
          className="shrink-0 font-display text-[9px] tracking-[0.18em] uppercase border border-[rgba(142,85,255,0.3)] text-[rgba(142,85,255,0.8)] px-3 py-1.5 rounded-sm hover:border-[#8e55ff] hover:bg-[rgba(142,85,255,0.1)] active:scale-95 transition-all duration-200"
          onClick={onDismiss}
        >
          Schließen
        </button>
      </div>
    </section>
  );
};