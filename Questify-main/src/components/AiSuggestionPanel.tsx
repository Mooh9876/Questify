// Diese Datei zeigt den KI-Hilfebereich am unteren Ende der App an.
// Hier kann der Spieler sich Aufgaben-Ideen von der KI vorschlagen lassen
// oder eine schlecht formulierte Aufgabe automatisch verbessern lassen.

import { CATEGORY_ORDER } from '../lib/categories';
import { inputClass, labelClass, secondaryBtnClass } from '../lib/styles';
import type { SuggestionCategory } from '../types';

type AiSuggestionPanelProps = {
  category: SuggestionCategory;
  suggestions: string[];
  rewriteInput: string;
  rewrittenTask: string;
  onCategoryChange: (value: SuggestionCategory) => void;
  onLoadSuggestions: () => void;
  onRewriteInputChange: (value: string) => void;
  onRewrite: () => void;
  isLoadingSuggestions: boolean;
  isRewriting: boolean;
};



export const AiSuggestionPanel = ({
  category,
  suggestions,
  rewriteInput,
  rewrittenTask,
  onCategoryChange,
  onLoadSuggestions,
  onRewriteInputChange,
  onRewrite,
  isLoadingSuggestions,
  isRewriting,
}: AiSuggestionPanelProps) => (
  <section className="panel-shape bg-[rgba(11,13,24,0.85)] backdrop-blur-xl border border-[rgba(96,232,255,0.1)] shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(96,232,255,0.06)] p-6 animate-fade-up">
    <div className="mb-5">
      <span className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(96,232,255,0.6)] block mb-1">Optional</span>
      <h2 className="font-display text-xl font-bold text-white leading-tight">KI-Hilfe für deine Quests</h2>
      <p className="mt-1 text-sm text-[rgba(160,168,220,0.5)]">Nutze die KI nur bei Bedarf für Ideen oder eine bessere Formulierung.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Suggestions column */}
      <div className="flex flex-col gap-3">
        <label className="block">
          <span className={labelClass}>Kategorie</span>
          <select
            className={inputClass}
            value={category}
            onChange={(event) => onCategoryChange(event.target.value as SuggestionCategory)}
          >
            {CATEGORY_ORDER.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
        <button className={secondaryBtnClass} onClick={onLoadSuggestions} disabled={isLoadingSuggestions}>
          {isLoadingSuggestions ? 'Vorschläge laden…' : 'Aufgaben vorschlagen'}
        </button>
        {suggestions.length > 0 ? (
          <ul className="flex flex-col gap-0.5 mt-1">
            {suggestions.map((suggestion) => (
              <li key={suggestion} className="suggestion-item">{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[rgba(255,255,255,0.25)] italic mt-1">
            Nach dem Klick erscheinen hier 3 bis 5 passende Quest-Ideen.
          </p>
        )}
      </div>

      {/* Rewrite column */}
      <div className="flex flex-col gap-3">
        <label className="block">
          <span className={labelClass}>Aufgabe verbessern</span>
          <input
            className={inputClass}
            value={rewriteInput}
            onChange={(event) => onRewriteInputChange(event.target.value)}
            placeholder="z. B. mathe lernen"
          />
        </label>
        <button className={secondaryBtnClass} onClick={onRewrite} disabled={isRewriting}>
          {isRewriting ? 'Wird verbessert…' : 'Besser formulieren'}
        </button>
        <div className="mt-1 bg-[rgba(14,16,28,0.7)] border border-[rgba(96,232,255,0.08)] rounded-sm p-3">
          <span className="block font-display text-[9px] tracking-widest uppercase text-[rgba(96,232,255,0.5)] mb-1.5">Vorschlag</span>
          <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">
            {rewrittenTask || 'Hier erscheint eine klarere Aufgabenformulierung.'}
          </p>
        </div>
      </div>
    </div>
  </section>
);