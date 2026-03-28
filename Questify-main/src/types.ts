// Diese Datei legt fest, wie die wichtigsten Daten in der App aussehen.
// Hier stehen z.B. wie eine Aufgabe (Task), ein Profil oder eine Belohnung aufgebaut ist.
// Alle anderen Dateien nutzen diese Definitionen, damit Daten überall gleich aussehen.

export type Task = {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  completedAt?: string;
  category?: SuggestionCategory;
  createdAt: string;
};

export type RewardType = 'coins';

export type LootReward = {
  type: RewardType;
  title: string;
  description: string;
  coins: number;
};

export type UserProfile = {
  id: string;
  coins: number;
  streak: number;
  jokers: number;
};

export type QuestRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

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
