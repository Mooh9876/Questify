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

export const getRewardAccentLabel = (reward: LootReward): string => {
  if (reward.type === 'coins') {
    return `+${reward.coins} Coins`;
  }

  return 'Kein Extra-Loot';
};