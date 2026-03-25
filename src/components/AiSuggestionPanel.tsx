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

const categories: SuggestionCategory[] = ['Uni', 'Haushalt', 'Fitness', 'Gesundheit', 'Alltag'];

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
  <section className="panel ai-panel compact-panel">
    <div className="panel-heading">
      <div>
        <span className="eyebrow">Optional</span>
        <h2>KI-Hilfe für deine Quests</h2>
        <p className="section-copy">Nutze die KI nur bei Bedarf für Ideen oder eine bessere Formulierung.</p>
      </div>
    </div>

    <div className="ai-grid compact-ai-grid">
      <div className="ai-box">
        <label>
          Kategorie
          <select value={category} onChange={(event) => onCategoryChange(event.target.value as SuggestionCategory)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <button className="secondary-button" onClick={onLoadSuggestions} disabled={isLoadingSuggestions}>
          {isLoadingSuggestions ? 'Vorschläge laden…' : 'Aufgaben vorschlagen'}
        </button>
        {suggestions.length > 0 ? (
          <ul className="suggestion-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p className="helper-copy">Nach dem Klick erscheinen hier 3 bis 5 passende Quest-Ideen.</p>
        )}
      </div>

      <div className="ai-box">
        <label>
          Aufgabe verbessern
          <input
            value={rewriteInput}
            onChange={(event) => onRewriteInputChange(event.target.value)}
            placeholder="z. B. mathe lernen"
          />
        </label>
        <button className="secondary-button" onClick={onRewrite} disabled={isRewriting}>
          {isRewriting ? 'Wird verbessert…' : 'Besser formulieren'}
        </button>
        <div className="rewrite-result">
          <strong>Vorschlag:</strong>
          <p>{rewrittenTask || 'Hier erscheint eine klarere Aufgabenformulierung.'}</p>
        </div>
      </div>
    </div>
  </section>
);