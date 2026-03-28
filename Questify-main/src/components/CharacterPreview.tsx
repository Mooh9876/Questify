import { useEffect, useMemo, useRef, useState } from 'react';

type CharacterPreviewProps = {
  level: number;
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

export const CharacterPreview = ({ level }: CharacterPreviewProps) => {
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const previousLevel = useRef(level);
  const stage = useMemo(() => getStage(level), [level]);

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

  return (
    <div className={`character-card ${stage.accentClass} ${isLevelingUp ? 'is-leveling-up' : ''}`}>
      <div className="character-copy">
        <span className="eyebrow">Begleiter</span>
        <strong>{stage.title}</strong>
        <p>Dein Questify-Charakter entwickelt sich mit jedem neuen Level weiter.</p>
      </div>

      <div className="character-stage" aria-label={`Questify Charakter auf Level ${level}`}>
        <div className="character-glow" />
        <svg viewBox="0 0 160 180" className="character-svg" role="img" aria-hidden="true">
          <circle className="character-head" cx="80" cy="42" r="24" />
          <rect className="character-body" x="54" y="68" width="52" height="58" rx="24" />
          <rect className="character-leg" x="60" y="122" width="14" height="34" rx="7" />
          <rect className="character-leg" x="86" y="122" width="14" height="34" rx="7" />
          <rect className="character-arm" x="34" y="76" width="18" height="16" rx="8" />
          <rect className="character-arm" x="108" y="76" width="18" height="16" rx="8" />

          {stage.accessory === 'spark' ? (
            <g className="character-accessory">
              <circle cx="120" cy="34" r="7" />
              <path d="M120 20 L123 28 L131 31 L123 34 L120 42 L117 34 L109 31 L117 28 Z" />
            </g>
          ) : null}

          {stage.accessory === 'shield' ? (
            <g className="character-accessory">
              <path d="M122 64 L138 70 L134 100 C130 109 124 116 116 120 C108 116 102 109 98 100 L94 70 Z" />
            </g>
          ) : null}

          {stage.accessory === 'crown' ? (
            <g className="character-accessory crown-accessory">
              <path d="M53 18 L66 30 L80 14 L94 30 L107 18 L111 38 L49 38 Z" />
              <circle cx="66" cy="25" r="3" />
              <circle cx="80" cy="20" r="3" />
              <circle cx="94" cy="25" r="3" />
            </g>
          ) : null}
        </svg>
      </div>
    </div>
  );
};