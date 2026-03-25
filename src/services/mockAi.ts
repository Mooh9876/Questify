import type { SuggestionCategory, Task, UserProgress } from '../types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const suggestionMap: Record<SuggestionCategory, string[]> = {
  Uni: [
    '30 Minuten Mathe lernen',
    'Vorlesungsnotizen ordnen',
    'Kapitel 2 wiederholen',
    'Eine Zusammenfassung schreiben',
  ],
  Haushalt: [
    'Schreibtisch aufräumen',
    'Wäsche sortieren',
    'Müll rausbringen',
    'Küche sauber machen',
  ],
  Fitness: [
    '20 Minuten spazieren gehen',
    'Kurzes Home-Workout machen',
    '10 Minuten Dehnen',
    'Fahrrad fahren',
  ],
  Gesundheit: [
    '1 Liter Wasser trinken',
    'Gesundes Mittagessen vorbereiten',
    '15 Minuten Pause ohne Handy',
    'Früh schlafen gehen',
  ],
  Alltag: [
    'E-Mails beantworten',
    'Einkaufsliste schreiben',
    'Termine für morgen prüfen',
    'Rucksack vorbereiten',
  ],
};

const rewritePatterns: Array<{ test: RegExp; result: string }> = [
  { test: /mathe lernen/i, result: '30 Minuten Mathe lernen' },
  { test: /zimmer/i, result: 'Zimmer in 15 Minuten aufräumen' },
  { test: /wasser/i, result: '1 Liter Wasser trinken' },
  { test: /sport/i, result: '20 Minuten Sport machen' },
];

const motivationMessages = [
  'Stark, Quest abgeschlossen.',
  'Du kommst deinem nächsten Level näher.',
  'Sauber erledigt – weiter so.',
  'Ein kleiner Schritt, viel Fortschritt.',
  'Questify sieht deinen Fortschritt.',
];

export const getTaskSuggestions = async (category: SuggestionCategory): Promise<string[]> => {
  await wait(500);
  return suggestionMap[category];
};

export const rewriteTaskTitle = async (input: string): Promise<string> => {
  await wait(350);
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error('Bitte gib zuerst eine Aufgabe ein.');
  }

  const matched = rewritePatterns.find((pattern) => pattern.test.test(trimmed));

  if (matched) {
    return matched.result;
  }

  return trimmed[0].toUpperCase() + trimmed.slice(1) + (trimmed.includes('Minuten') ? '' : ' in 25 Minuten');
};

export const getMotivationMessage = async (
  completedTask: Task,
  progress: UserProgress,
): Promise<string> => {
  await wait(250);
  const baseMessage = motivationMessages[(progress.level + completedTask.xp) % motivationMessages.length];
  return `${baseMessage} Level ${progress.level} wartet schon auf dich.`;
};

export const getSuggestedXp = async (title: string): Promise<number> => {
  await wait(200);
  const normalized = title.toLowerCase();

  if (/(prüf|projekt|training|wohn|putz|aufräum)/.test(normalized)) {
    return 30;
  }

  if (/(lernen|sport|einkauf|kochen|hausaufgaben)/.test(normalized)) {
    return 20;
  }

  return 10;
};