import { CharacterPreview } from './CharacterPreview';

type DashboardProps = {
  level: number;
  totalXp: number;
  currentLevelXp: number;
  xpToNextLevel: number;
  progressPercentage: number;
  coins: number;
};

export const Dashboard = ({
  level,
  totalXp,
  currentLevelXp,
  xpToNextLevel,
  progressPercentage,
  coins,
}: DashboardProps) => (
  <section className="panel dashboard-panel">
    <div className="dashboard-layout">
      <div className="dashboard-main">
        <div className="dashboard-topline">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h2>Level {level}</h2>
          </div>
          <strong className="dashboard-xp">{totalXp} XP</strong>
        </div>

        <div className="progress-track" aria-label="Fortschritt bis zum nächsten Level">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
        </div>

        <p className="dashboard-caption">
          {currentLevelXp} / 100 XP im aktuellen Level · Noch {xpToNextLevel} XP bis zum nächsten Level
        </p>

        <div className="dashboard-stats" aria-label="Questify Coin-Uebersicht">
          <div className="dashboard-stat-card">
            <span className="dashboard-stat-label">Coins</span>
            <strong>{coins}</strong>
          </div>
        </div>
      </div>

      <CharacterPreview level={level} />
    </div>
  </section>
);