import type { Task, UserProgress } from '../types';

export const XP_PER_LEVEL = 100;

export const calculateProgress = (totalXp: number): UserProgress => {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const currentLevelXp = totalXp % XP_PER_LEVEL;
  const xpToNextLevel = XP_PER_LEVEL - currentLevelXp;

  return {
    totalXp,
    level,
    currentLevelXp,
    xpToNextLevel: xpToNextLevel === 0 ? XP_PER_LEVEL : xpToNextLevel,
    progressPercentage: (currentLevelXp / XP_PER_LEVEL) * 100,
  };
};

export const calculateTotalXp = (tasks: Task[]): number =>
  tasks.filter((task) => task.completed).reduce((sum, task) => sum + task.xp, 0);

export const getTaskCounts = (tasks: Task[]) => ({
  completed: tasks.filter((task) => task.completed).length,
  open: tasks.filter((task) => !task.completed).length,
});

export const suggestXp = (title: string, description: string): number => {
  const combinedText = `${title} ${description}`.toLowerCase();

  if (/(projekt|prüfung|training|60 minuten|1 stunde|aufräumen|putzen)/.test(combinedText)) {
    return 30;
  }

  if (/(lernen|lesen|sport|einkaufen|emails|kochen|hausaufgaben)/.test(combinedText)) {
    return 20;
  }

  return 10;
};