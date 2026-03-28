// Diese Datei zeigt den animierten Spieler-Charakter (Begleiter) im Dashboard an.
// Der Charakter verändert sein Aussehen je nach Level: Novize, Abenteurer oder Champion.
// Beim Level-Aufstieg spielt er eine kurze Animation ab.

import { useEffect, useMemo, useRef, useState } from 'react';
import { getRankForXp } from '../lib/xp';

type CharacterPreviewProps = {
  level: number;
  totalXp: number;
};

type CharacterStage = {
  title: string;
  accentClass: string;
  accessory: 'spark' | 'shield' | 'crown';
};

const getStage = (level: number): CharacterStage => {
  if (level >= 5) {
    return {
      title: 'Champion',
      accentClass: 'stage-champion',
      accessory: 'crown',
    };
  }

  if (level >= 3) {
    return {
      title: 'Abenteurer',
      accentClass: 'stage-adventurer',
      accessory: 'shield',
    };
  }

  return {
    title: 'Novize',
    accentClass: 'stage-novice',
    accessory: 'spark',
  };
};

export const CharacterPreview = ({ level, totalXp }: CharacterPreviewProps) => {
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const previousLevel = useRef(level);
  const stage = useMemo(() => getStage(level), [level]);
  const rank = useMemo(() => getRankForXp(totalXp), [totalXp]);

  useEffect(() => {
    if (level > previousLevel.current) {
      setIsLevelingUp(true);
      const timeoutId = window.setTimeout(() => setIsLevelingUp(false), 1400);
      previousLevel.current = level;
      return () => window.clearTimeout(timeoutId);
    }

    previousLevel.current = level;
    return undefined;
  }, [level]);

  const glowClass = stage.accentClass === 'stage-novice'
    ? 'char-glow-novice'
    : stage.accentClass === 'stage-adventurer'
    ? 'char-glow-adventurer'
    : 'char-glow-champion';

  return (
    <div
      className={`${stage.accentClass} ${isLevelingUp ? 'is-leveling-up' : ''} flex flex-col items-center gap-3 bg-[rgba(14,16,28,0.85)] border border-[rgba(96,232,255,0.1)] rounded-sm p-4 min-w-[160px] animate-fade-in transition-all duration-300`}
    >
      <div className="text-center">
        <span className="font-display text-[9px] tracking-[0.22em] uppercase text-[rgba(96,232,255,0.55)] block mb-1">Begleiter</span>
        <div className="flex items-center gap-2 justify-center">
          <strong className="font-display text-sm font-bold text-white">{stage.title}</strong>
          <span className="rank-badge-new font-display text-[9px] font-bold tracking-widest uppercase bg-[rgba(142,85,255,0.15)] border border-[rgba(142,85,255,0.4)] text-[#cb72ff] px-1.5 py-0.5 rounded-sm">
            {rank}
          </span>
        </div>
      </div>

      <div
        className="relative flex items-center justify-center w-full"
        aria-label={`Questify Charakter auf Level ${level}`}
      >
        <div className={`${glowClass} absolute inset-0 rounded-full`} />
        <svg viewBox="0 0 160 180" className="char-svg w-28 h-28 animate-character-float relative z-10" role="img" aria-hidden="true">
          <circle className="char-body" cx="80" cy="42" r="24" />
          <rect className="char-body" x="54" y="68" width="52" height="58" rx="24" />
          <rect className="char-body" x="60" y="122" width="14" height="34" rx="7" />
          <rect className="char-body" x="86" y="122" width="14" height="34" rx="7" />
          <rect className="char-body" x="34" y="76" width="18" height="16" rx="8" />
          <rect className="char-body" x="108" y="76" width="18" height="16" rx="8" />

          {stage.accessory === 'spark' ? (
            <g className="char-acc">
              <circle cx="120" cy="34" r="7" />
              <path d="M120 20 L123 28 L131 31 L123 34 L120 42 L117 34 L109 31 L117 28 Z" />
            </g>
          ) : null}

          {stage.accessory === 'shield' ? (
            <g className="char-acc">
              <path d="M122 64 L138 70 L134 100 C130 109 124 116 116 120 C108 116 102 109 98 100 L94 70 Z" />
            </g>
          ) : null}

          {stage.accessory === 'crown' ? (
            <g className="char-acc">
              <path d="M53 18 L66 30 L80 14 L94 30 L107 18 L111 38 L49 38 Z" />
              <circle cx="66" cy="25" r="3" />
              <circle cx="80" cy="20" r="3" />
              <circle cx="94" cy="25" r="3" />
            </g>
          ) : null}
        </svg>
      </div>

      <p className="text-[10px] text-center text-[rgba(255,255,255,0.3)] leading-relaxed">
        XP bestimmt deinen Rank · aktuell ab F
      </p>
    </div>
  );
};