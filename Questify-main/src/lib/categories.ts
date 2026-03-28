// Diese Datei enthält alle Farben und Einstellungen für die Quest-Kategorien (Uni, Fitness, etc.).
// Statt dass jede Komponente ihre eigenen Farben festlegt, stehen sie hier zentral an einem Ort.
// So muss man Farben nur einmal ändern, wenn sich das Design anpassen soll.

import type { SuggestionCategory } from '../types';

// Die Reihenfolge, in der Kategorien in Listen und Formularen angezeigt werden
export const CATEGORY_ORDER: SuggestionCategory[] = ['Uni', 'Haushalt', 'Fitness', 'Gesundheit', 'Alltag'];

// Tailwind-CSS-Klassen für die kleinen Kategorie-Etiketten auf einer Aufgabenkarte
export const CATEGORY_PILL_CLASSES: Record<string, string> = {
  Uni:        'text-[#60e8ff] border-[rgba(96,232,255,0.3)]  bg-[rgba(96,232,255,0.07)]',
  Haushalt:   'text-[#39d98a] border-[rgba(57,217,138,0.3)]  bg-[rgba(57,217,138,0.07)]',
  Fitness:    'text-[#ffd166] border-[rgba(255,209,102,0.3)] bg-[rgba(255,209,102,0.07)]',
  Gesundheit: 'text-[#cb72ff] border-[rgba(203,114,255,0.3)] bg-[rgba(203,114,255,0.07)]',
  Alltag:     'text-[#8e55ff] border-[rgba(142,85,255,0.3)]  bg-[rgba(142,85,255,0.07)]',
};

// Farben für Fortschrittsbalken und den Leucht-Effekt (Glow) neben Kategorienamen
export const CATEGORY_CONFIG: Record<string, { color: string; glow: string; track: string }> = {
  Uni:        { color: '#60e8ff', glow: 'rgba(96,232,255,0.35)',  track: 'rgba(96,232,255,0.1)'  },
  Haushalt:   { color: '#39d98a', glow: 'rgba(57,217,138,0.35)',  track: 'rgba(57,217,138,0.1)'  },
  Fitness:    { color: '#ffd166', glow: 'rgba(255,209,102,0.35)', track: 'rgba(255,209,102,0.1)' },
  Gesundheit: { color: '#cb72ff', glow: 'rgba(203,114,255,0.35)', track: 'rgba(203,114,255,0.1)' },
  Alltag:     { color: '#8e55ff', glow: 'rgba(142,85,255,0.35)',  track: 'rgba(142,85,255,0.1)'  },
  // Fallback für Aufgaben ohne Kategorie
  _none:      { color: '#60e8ff', glow: 'rgba(96,232,255,0.2)',   track: 'rgba(96,232,255,0.07)' },
};
