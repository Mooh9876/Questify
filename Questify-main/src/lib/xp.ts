// Diese Datei berechnet alles rund um Erfahrungspunkte (XP) und Level.
// Sie sagt z.B. wie weit der Spieler bis zum nächsten Level ist
// und schätzt XP-Werte für neue Aufgaben anhand des Titels.

import type { QuestRank, Task, UserProgress } from '../types';

export const XP_PER_LEVEL = 100;

const RANK_THRESHOLDS: Array<{ rank: QuestRank; minXp: number }> = [
  { rank: 'SSS', minXp: 100001 },
  { rank: 'SS', minXp: 50001 },
  { rank: 'S', minXp: 15001 },
  { rank: 'A', minXp: 11001 },
  { rank: 'B', minXp: 9001 },
  { rank: 'C', minXp: 5001 },
  { rank: 'D', minXp: 3001 },
  { rank: 'E', minXp: 1001 },
  { rank: 'F', minXp: 0 },
];

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

export const getRankForXp = (totalXp: number): QuestRank =>
  RANK_THRESHOLDS.find((threshold) => totalXp >= threshold.minXp)?.rank ?? 'F';

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