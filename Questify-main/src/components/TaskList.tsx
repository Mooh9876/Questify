// Diese Datei zeigt alle Aufgaben (Quests) nach Kategorie gruppiert an.
// Jede Kategorie (z.B. Uni, Fitness) ist ein ausklappbarer Bereich mit einem Fortschrittsbalken.
// So sieht der Spieler auf einen Blick, wie weit er in jeder Kategorie ist.

import { useState } from 'react';
import { CATEGORY_CONFIG, CATEGORY_ORDER } from '../lib/categories';
import type { Task } from '../types';
import { TaskCard } from './TaskCard';

type TaskListProps = {
  tasks: Task[];
  onComplete: (id: string) => void;
};

type CategoryGroup = {
  key: string;
  label: string;
  tasks: Task[];
};

const CategorySection = ({
  group,
  onComplete,
}: {
  group: CategoryGroup;
  onComplete: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const cfg = CATEGORY_CONFIG[group.key] ?? CATEGORY_CONFIG['_none'];
  const total = group.tasks.length;
  const done = group.tasks.filter((t) => t.completed).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = done === total;

  const openTasks = group.tasks.filter((t) => !t.completed);
  const completedTasks = group.tasks.filter((t) => t.completed);

  return (
    <div className="rounded-sm overflow-hidden border border-[rgba(255,255,255,0.06)] transition-all duration-200 hover:border-[rgba(255,255,255,0.1)]">
      {/* Header — clickable */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-[rgba(14,16,28,0.9)] hover:bg-[rgba(20,22,36,0.95)] transition-colors duration-150 text-left"
      >
        {/* Color dot */}
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.glow}` }}
        />

        {/* Name + count */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-display text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: cfg.color }}>
              {group.label}
            </span>
            <span className="font-display text-[9px] text-[rgba(255,255,255,0.3)] tabular-nums">
              {done}/{total} {allDone ? '· ✓' : ''}
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1 rounded-full overflow-hidden" style={{ background: cfg.track }}>
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{
                width: `${pct}%`,
                background: cfg.color,
                boxShadow: pct > 0 ? `0 0 6px ${cfg.glow}` : undefined,
              }}
            />
          </div>
        </div>

        {/* Chevron */}
        <span
          className="font-display text-[10px] text-[rgba(255,255,255,0.25)] transition-transform duration-200 shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▾
        </span>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-4 pt-2 bg-[rgba(10,12,22,0.7)] border-t border-[rgba(255,255,255,0.05)] flex flex-col gap-4">
          {/* Open tasks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-[9px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.4)]">Offen</span>
              <span className="font-display text-[9px] text-[rgba(96,232,255,0.5)]">{openTasks.length}</span>
            </div>
            {openTasks.length === 0 ? (
              <p className="text-[11px] text-[rgba(255,255,255,0.2)] italic px-1">Alle Quests erledigt 🎉</p>
            ) : (
              <div className="flex flex-col gap-2">
                {openTasks.map((t) => <TaskCard key={t.id} task={t} onComplete={onComplete} />)}
              </div>
            )}
          </div>

          {/* Completed tasks */}
          {completedTasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-[9px] tracking-[0.18em] uppercase text-[rgba(255,255,255,0.25)]">Erledigt</span>
                <span className="font-display text-[9px] text-[rgba(142,85,255,0.5)]">{completedTasks.length}</span>
              </div>
              <div className="flex flex-col gap-2">
                {completedTasks.map((t) => <TaskCard key={t.id} task={t} onComplete={onComplete} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const TaskList = ({ tasks, onComplete }: TaskListProps) => {
  // Build groups: known categories in order, then uncategorised tasks
  const groups: CategoryGroup[] = [];

  for (const cat of CATEGORY_ORDER) {
    const catTasks = tasks.filter((t) => t.category === cat);
    if (catTasks.length > 0) {
      groups.push({ key: cat, label: cat, tasks: catTasks });
    }
  }

  const uncategorised = tasks.filter((t) => !t.category);
  if (uncategorised.length > 0) {
    groups.push({ key: '_none', label: 'Sonstige', tasks: uncategorised });
  }

  return (
    <section className="panel-shape bg-[rgba(11,13,24,0.85)] backdrop-blur-xl border border-[rgba(96,232,255,0.1)] shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(96,232,255,0.06)] p-6 animate-fade-up">
      <div className="mb-5">
        <span className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(96,232,255,0.6)] block mb-1">Quests</span>
        <h2 className="font-display text-xl font-bold text-white leading-tight">Deine Aufgabenliste</h2>
      </div>

      {tasks.length === 0 ? (
        <div className="py-10 text-center border border-dashed border-[rgba(96,232,255,0.1)] rounded-sm">
          <strong className="block font-display text-sm text-[rgba(255,255,255,0.5)] mb-1">Noch keine Quests vorhanden.</strong>
          <p className="text-xs text-[rgba(255,255,255,0.25)]">Lege deine erste Aufgabe an und sammle direkt die ersten XP.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {groups.map((g) => (
            <CategorySection key={g.key} group={g} onComplete={onComplete} />
          ))}
        </div>
      )}
    </section>
  );
};

