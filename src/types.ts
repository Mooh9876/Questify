export type Task = {
  id: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  createdAt: string;
};

export type UserProgress = {
  totalXp: number;
  level: number;
  currentLevelXp: number;
  xpToNextLevel: number;
  progressPercentage: number;
};

export type SuggestionCategory = 'Uni' | 'Haushalt' | 'Fitness' | 'Gesundheit' | 'Alltag';
