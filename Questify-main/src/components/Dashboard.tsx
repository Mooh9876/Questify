// Diese Datei zeigt das Spieler-Dashboard an – die Übersichtsfläche oben in der App.
// Hier sieht der Spieler sein Level, seinen XP-Fortschritt, Coins, Streak und Joker.
// Außerdem ist hier der animierte Charakter (Begleiter) sichtbar.

import { CharacterPreview } from './CharacterPreview';

type DashboardProps = {
  level: number;
  totalXp: number;
  currentLevelXp: number;
  xpToNextLevel: number;
  progressPercentage: number;
  coins: number;
  streak: number;
  jokers: number;
};

export const Dashboard = ({
  level,
  totalXp,
  currentLevelXp,
  xpToNextLevel,
  progressPercentage,
  coins,
  streak,
  jokers,
}: DashboardProps) => (
  <section className="panel-shape bg-[rgba(11,13,24,0.85)] backdrop-blur-xl border border-[rgba(96,232,255,0.1)] shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(96,232,255,0.06)] p-6 animate-fade-up">
    <div className="flex gap-6 items-start">
      {/* Left: stats */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="font-display text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(96,232,255,0.6)] block mb-0.5">
              Dashboard
            </span>
            <h2 className="text-grad-cyan font-display text-2xl font-bold leading-tight">
              Level {level}
            </h2>
          </div>
          <strong className="font-display text-lg text-[#60e8ff] tabular-nums">{totalXp} XP</strong>
        </div>

        <div
          className="h-2 rounded-full bg-[rgba(96,232,255,0.1)] mb-2.5 overflow-hidden"
          aria-label="Fortschritt bis zum nächsten Level"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#60e8ff] to-[#8e55ff] progress-shimmer transition-[width] duration-700"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <p className="text-[11px] text-[rgba(160,168,220,0.45)] mb-4">
          {currentLevelXp} / 100 XP · Noch {xpToNextLevel} XP bis Level {level + 1}
        </p>

        {/* Stat cards: Coins + Streak + Jokers */}
        <div className="flex gap-2 flex-wrap" aria-label="Questify Statistiken">
          <div className="bg-[rgba(14,16,28,0.9)] border border-[rgba(96,232,255,0.1)] rounded-sm px-3 py-2 transition-all duration-200 hover:border-[rgba(255,215,0,0.3)] hover:shadow-[0_0_12px_rgba(255,215,0,0.12)]">
            <span className="block font-display text-[9px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.35)] mb-0.5">Coins</span>
            <strong className="font-display text-base text-[#ffd700]">{coins}</strong>
          </div>

          <div className={`bg-[rgba(14,16,28,0.9)] border rounded-sm px-3 py-2 transition-all duration-200 ${
            streak > 0
              ? 'border-[rgba(255,107,53,0.3)] hover:border-[rgba(255,107,53,0.6)] hover:shadow-[0_0_14px_rgba(255,107,53,0.2)]'
              : 'border-[rgba(96,232,255,0.1)]'
          }`}>
            <span className="block font-display text-[9px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.35)] mb-0.5">Streak</span>
            <strong className="font-display text-base flex items-center gap-1">
              <span className={streak > 0 ? 'text-[#ff6b35]' : 'text-white/30'}>{streak}</span>
              {streak > 0 ? <span className="text-sm">🔥</span> : null}
            </strong>
          </div>

          <div className={`bg-[rgba(14,16,28,0.9)] border rounded-sm px-3 py-2 transition-all duration-200 ${
            jokers > 0
              ? 'border-[rgba(203,114,255,0.3)] hover:border-[rgba(203,114,255,0.6)] hover:shadow-[0_0_14px_rgba(203,114,255,0.2)]'
              : 'border-[rgba(96,232,255,0.1)]'
          }`}>
            <span className="block font-display text-[9px] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.35)] mb-0.5">Joker</span>
            <strong className="font-display text-base flex items-center gap-1">
              <span className={jokers > 0 ? 'text-[#cb72ff]' : 'text-white/30'}>{jokers}</span>
              {jokers > 0 ? <span className="text-sm">🎭</span> : null}
            </strong>
          </div>
        </div>

        {streak > 0 ? (
          <p className="mt-2 text-[10px] text-[rgba(255,107,53,0.6)]">
            {streak >= 7
              ? `${streak} Tage am Stück — stark!`
              : `Noch ${7 - (streak % 7)} Tage bis zum nächsten Joker`}
          </p>
        ) : null}
      </div>

      <CharacterPreview level={level} totalXp={totalXp} />
    </div>
  </section>
);