// Diese Datei zeigt eine kompakte Übersicht aller Kategorien mit ihrem Fortschritt.
// Für jede Kategorie gibt es einen farbigen Balken, der zeigt wie viele Quests schon erledigt sind.
// Diese Übersicht erscheint nur, wenn der Spieler mindestens eine kategorisierte Aufgabe hat.

import { CATEGORY_CONFIG, CATEGORY_ORDER } from '../lib/categories';
import type { Task } from '../types';

type CategoryStat = {
  name: string;
  total: number;
  done: number;
  pct: number;
};

export const CategoryProgress = ({ tasks }: { tasks: Task[] }) => {
  const stats: CategoryStat[] = CATEGORY_ORDER.reduce<CategoryStat[]>((acc, cat) => {
    const catTasks = tasks.filter((t) => t.category === cat);
    if (catTasks.length === 0) return acc;
    const done = catTasks.filter((t) => t.completed).length;
    acc.push({ name: cat, total: catTasks.length, done, pct: Math.round((done / catTasks.length) * 100) });
    return acc;
  }, []);

  if (stats.length === 0) return null;

  return (
    <section className="panel-shape bg-[rgba(11,13,24,0.85)] backdrop-blur-xl border border-[rgba(96,232,255,0.1)] shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(96,232,255,0.06)] p-5 animate-fade-up">
      <span className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(96,232,255,0.6)] block mb-3">
        Kategorien
      </span>
      <div className="flex flex-col gap-3">
        {stats.map(({ name, total, done, pct }) => {
          const cfg = CATEGORY_CONFIG[name];
          return (
            <div key={name}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-display text-[10px] tracking-widest uppercase" style={{ color: cfg.color }}>
                  {name}
                </span>
                <span className="font-display text-[9px] text-[rgba(255,255,255,0.35)] tabular-nums">
                  {done}/{total} · {pct}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: cfg.track }}
              >
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{
                    width: `${pct}%`,
                    background: cfg.color,
                    boxShadow: pct > 0 ? `0 0 8px ${cfg.glow}` : undefined,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
