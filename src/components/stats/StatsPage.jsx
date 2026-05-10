import { useGame } from '../../context/GameContext';
import { ACHIEVEMENTS } from '../../data/achievements';
import HistoryLog from './HistoryLog';

export default function StatsPage() {
  const { state } = useGame();

  const workoutCount = Object.keys(state.workouts).length;

  return (
    <div>
      <div className="card">
        <div className="section-title">Statistiques globales</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatItem label="Workouts" value={workoutCount} color="var(--accent-xp)" />
          <StatItem label="XP total" value={state.player.totalXP} color="var(--accent-xp)" />
          <StatItem label="Meilleur streak" value={`${state.streak.longest}j`} color="var(--accent-orange)" />
          <StatItem label="Boss vaincus" value={state.bossFights.defeated.length} color="var(--accent-red)" />
        </div>
      </div>

      <div className="card">
        <div className="section-title">Stats de combat</div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-value" style={{ color: 'var(--accent-red)' }}>{state.stats.force}</div>
            <div className="stat-label">Force</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-value" style={{ color: 'var(--accent-cyan)' }}>{state.stats.equilibre}</div>
            <div className="stat-label">Équilibre</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="stat-value" style={{ color: 'var(--accent-green)' }}>{state.stats.endurance}</div>
            <div className="stat-label">Endurance</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">Historique</div>
        <HistoryLog workouts={state.workouts} />
      </div>

      <div className="card">
        <div className="section-title">Achievements</div>
        <div className="achievement-grid">
          {ACHIEVEMENTS.map(ach => {
            const unlocked = state.achievements.includes(ach.id);
            return (
              <div key={ach.id} className={`achievement-item ${unlocked ? 'unlocked' : 'locked'}`}>
                <span className="achievement-icon">{unlocked ? ach.icon : '❓'}</span>
                <span>{unlocked ? ach.name : '???'}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }) {
  return (
    <div style={{ background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', padding: 12, textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{label}</div>
    </div>
  );
}
