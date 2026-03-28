// Diese Datei enthält kleine Hilfsfunktionen für Quest-Belohnungen.
// Sie erstellt das Feedback-Objekt, das nach dem Abschließen einer Quest angezeigt wird,
// und formatiert die Belohnungsanzeige (z.B. '+5 Coins').

import type { LootReward, QuestCompletionFeedback } from '../types';

export const buildQuestCompletionFeedback = (
  taskTitle: string,
  xpGained: number,
  reward: LootReward,
): QuestCompletionFeedback => ({
  taskTitle,
  xpGained,
  reward,
});

export const getRewardAccentLabel = (reward: LootReward): string => `+${reward.coins} Coins`;