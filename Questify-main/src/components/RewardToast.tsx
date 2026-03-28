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
    <section className="reward-toast" aria-live="polite">
      <div className="reward-toast-copy">
        <span className="eyebrow">Quest Belohnung</span>
        <h3>{feedback.taskTitle}</h3>
        <div className="reward-feedback-list">
          <span className="reward-feedback-chip xp-chip">+{feedback.xpGained} XP</span>
          <span className={`reward-feedback-chip reward-chip reward-${feedback.reward.type}`}>
            {getRewardAccentLabel(feedback.reward)}
          </span>
        </div>
        <p>{feedback.reward.description}</p>
      </div>
      <button type="button" className="secondary-button reward-dismiss-button" onClick={onDismiss}>
        Schließen
      </button>
    </section>
  );
};