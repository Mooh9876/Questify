type LevelProgressProps = {
  level: number;
  currentLevelXp: number;
  xpToNextLevel: number;
  progressPercentage: number;
};

export const LevelProgress = ({
  level,
  currentLevelXp,
  xpToNextLevel,
  progressPercentage,
}: LevelProgressProps) => (
  <section className="panel level-panel">
    <div className="panel-heading">
      <div>
        <span className="eyebrow">Fortschritt</span>
        <h2>Level {level}</h2>
      </div>
      <strong>{currentLevelXp}/100 XP</strong>
    </div>
    <div className="progress-track" aria-label="Fortschritt bis zum nächsten Level">
      <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
    </div>
    <p>Noch {xpToNextLevel} XP bis zum nächsten Level.</p>
  </section>
);