// Diese Datei zeigt eine einzelne Aufgabe (Quest) als Karte an.
// Hier wird festgelegt, wie eine Aufgabe aussieht: Titel, XP, Status und Kategorie.
// Außerdem gibt es hier den 'Abschließen'-Button direkt auf der Karte.

import { CATEGORY_PILL_CLASSES } from '../lib/categories';
import type { Task } from '../types';

type TaskCardProps = {
  task: Task;
  onComplete: (id: string) => void;
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long' });
};

export const TaskCard = ({ task, onComplete }: TaskCardProps) => (
  <article
    className={[
      'group relative border rounded-sm p-4 transition-all duration-200 animate-fade-up',
      'bg-[rgba(14,16,28,0.88)]',
      task.completed
        ? 'border-[rgba(142,85,255,0.18)] shadow-[inset_3px_0_0_rgba(142,85,255,0.38)] opacity-70'
        : 'border-[rgba(96,232,255,0.1)] shadow-[inset_3px_0_0_rgba(96,232,255,0.45)] hover:border-[rgba(96,232,255,0.3)] hover:shadow-[inset_3px_0_0_rgba(96,232,255,0.6),0_8px_32px_rgba(0,0,0,0.4)]',
    ].join(' ')}
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <div className="flex-1 min-w-0">
        {task.category ? (
          <span className={`inline-block font-display text-[8px] tracking-[0.18em] uppercase px-1.5 py-0.5 rounded-sm border mb-1.5 ${CATEGORY_PILL_CLASSES[task.category] ?? 'text-white/40 border-white/20'}`}>
            {task.category}
          </span>
        ) : null}
        <h3 className={`font-semibold text-sm leading-snug ${task.completed ? 'line-through text-[rgba(255,255,255,0.35)]' : 'text-white'}`}>
          {task.title}
        </h3>
        {task.description ? (
          <p className="mt-1 text-xs text-[rgba(160,168,220,0.5)] leading-relaxed">{task.description}</p>
        ) : null}
        {task.completed && task.completedAt ? (
          <p className="mt-1.5 font-display text-[9px] tracking-wide text-[rgba(142,85,255,0.6)]">
            Erledigt am {formatDate(task.completedAt)}
          </p>
        ) : null}
      </div>
      <span className="shrink-0 font-display text-[10px] font-bold tracking-widest uppercase bg-[rgba(96,232,255,0.1)] border border-[rgba(96,232,255,0.25)] text-[#60e8ff] px-2 py-1 rounded-sm">
        +{task.xp} XP
      </span>
    </div>

    <div className="flex items-center justify-between gap-2">
      <span
        className={`font-display text-[9px] tracking-[0.18em] uppercase px-2 py-1 rounded-sm border ${
          task.completed
            ? 'text-[#8e55ff] border-[rgba(142,85,255,0.35)] bg-[rgba(142,85,255,0.08)]'
            : 'text-[#60e8ff] border-[rgba(96,232,255,0.3)] bg-[rgba(96,232,255,0.07)]'
        }`}
      >
        {task.completed ? 'Erledigt' : 'Offen'}
      </span>
      <button
        className={[
          'font-display text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm border transition-all duration-200',
          task.completed
            ? 'border-[rgba(142,85,255,0.2)] text-[rgba(142,85,255,0.4)] cursor-not-allowed'
            : 'border-[rgba(96,232,255,0.35)] text-[#60e8ff] hover:border-[#60e8ff] hover:bg-[rgba(96,232,255,0.08)] hover:shadow-[0_0_12px_rgba(96,232,255,0.25)] active:scale-95',
        ].join(' ')}
        onClick={() => onComplete(task.id)}
        disabled={task.completed}
      >
        {task.completed ? 'Abgeschlossen' : 'Abschließen'}
      </button>
    </div>
  </article>
);