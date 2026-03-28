// Diese Datei zeigt das Formular zum Erstellen einer neuen Quest an.
// Hier kann der Spieler Titel, Beschreibung, XP und Kategorie einer neuen Aufgabe eingeben.
// Über den 'XP vorschlagen'-Button kann die KI eine passende XP-Zahl vorschlagen.

import { FormEvent } from 'react';
import { CATEGORY_ORDER } from '../lib/categories';
import { inputClass, labelClass } from '../lib/styles';
import type { SuggestionCategory } from '../types';

type TaskFormProps = {
  title: string;
  description: string;
  xp: number;
  taskCategory: SuggestionCategory | '';
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onXpChange: (value: number) => void;
  onTaskCategoryChange: (value: SuggestionCategory | '') => void;
  onSubmit: () => void;
  onSuggestXp: () => void;
  isSuggestingXp: boolean;
};

export const TaskForm = ({
  title,
  description,
  xp,
  taskCategory,
  onTitleChange,
  onDescriptionChange,
  onXpChange,
  onTaskCategoryChange,
  onSubmit,
  onSuggestXp,
  isSuggestingXp,
}: TaskFormProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="panel-shape bg-[rgba(11,13,24,0.85)] backdrop-blur-xl border border-[rgba(96,232,255,0.1)] shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(96,232,255,0.06)] p-6 animate-fade-up">
      <div className="mb-5">
        <span className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(96,232,255,0.6)] block mb-1">Neue Quest</span>
        <h2 className="font-display text-xl font-bold text-white leading-tight">Was willst du heute erledigen?</h2>
        <p className="mt-1 text-sm text-[rgba(160,168,220,0.5)]">Erstelle eine neue Aufgabe in wenigen Sekunden und sammle direkt XP.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="block">
          <span className={labelClass}>Titel</span>
          <input
            className={inputClass}
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="z. B. 30 Minuten lernen"
          />
        </label>

        <label className="block">
          <span className={labelClass}>Beschreibung</span>
          <textarea
            className={`${inputClass} resize-none`}
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Optional: kurze Notiz zur Quest"
            rows={3}
          />
        </label>

        <div className="flex items-end gap-3">
          <label className="block w-28">
            <span className={labelClass}>XP</span>
            <input
              type="number"
              min={5}
              max={50}
              step={5}
              value={xp}
              onChange={(event) => onXpChange(Number(event.target.value))}
              className={inputClass}
            />
          </label>
          <label className="block flex-1">
            <span className={labelClass}>Kategorie</span>
            <select
              value={taskCategory}
              onChange={(e) => onTaskCategoryChange(e.target.value as SuggestionCategory | '')}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">— Keine —</option>
              {CATEGORY_ORDER.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="font-display text-[9px] tracking-[0.18em] uppercase border border-[rgba(96,232,255,0.3)] text-[#60e8ff] px-4 py-2.5 rounded-sm hover:border-[#60e8ff] hover:bg-[rgba(96,232,255,0.07)] hover:shadow-[0_0_14px_rgba(96,232,255,0.2)] active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={onSuggestXp}
            disabled={isSuggestingXp}
          >
            {isSuggestingXp ? 'XP…' : 'XP vorschlagen'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full font-display text-[10px] tracking-[0.2em] uppercase font-bold py-3 px-6 rounded-sm bg-gradient-to-r from-[#60e8ff] to-[#8e55ff] text-[#07080f] hover:shadow-[0_0_20px_rgba(96,232,255,0.4)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer"
        >
          Quest erstellen
        </button>
      </form>
    </section>
  );
};