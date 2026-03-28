export type Task = {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  createdAt: string;
};

export type RewardType = 'none' | 'coins';

export type LootReward = {
  type: RewardType;
  title: string;
  description: string;
  coins: number;
};

export type UserProfile = {
  id: string;
  coins: number;
};

export type QuestCompletionFeedback = {
  taskTitle: string;
  xpGained: number;
  reward: LootReward;
};

export type UserProgress = {
  totalXp: number;
  level: number;
  currentLevelXp: number;
  xpToNextLevel: number;
  progressPercentage: number;
};

export type SuggestionCategory = 'Uni' | 'Haushalt' | 'Fitness' | 'Gesundheit' | 'Alltag';
