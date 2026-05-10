export default function WorkoutComplete({ result }) {
  return (
    <div className="workout-complete animate-pop">
      <div style={{ fontSize: 64 }}>🏆</div>
      <h2>Quête accomplie!</h2>
      <div className="xp-gained">+{result.totalXP} XP</div>
      <div className="stats-gained">
        {result.statsGained.force > 0 && (
          <div className="stat-gain-item">
            <span style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              +{result.statsGained.force}
            </span>
            <span className="stat-label">Force</span>
          </div>
        )}
        {result.statsGained.equilibre > 0 && (
          <div className="stat-gain-item">
            <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              +{result.statsGained.equilibre}
            </span>
            <span className="stat-label">Équilibre</span>
          </div>
        )}
        {result.statsGained.endurance > 0 && (
          <div className="stat-gain-item">
            <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              +{result.statsGained.endurance}
            </span>
            <span className="stat-label">Endurance</span>
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 16 }}>
        Continue demain pour maintenir ton streak!
      </div>
    </div>
  );
}
