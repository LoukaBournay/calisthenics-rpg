import { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { BOSS_FIGHTS } from '../../data/bossFights';
import { getBossUrgency } from '../../engine/rewardEscalation';

export default function BossFight() {
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (!state.bossFights.current) {
      const defeated = state.bossFights.defeated;
      const cycle = state.bossFights.cycle || 0;
      const nextIdx = defeated.length % BOSS_FIGHTS.length;
      const boss = { ...BOSS_FIGHTS[nextIdx] };
      boss.hp = Math.floor(boss.hp * (1 + cycle * 0.5));
      boss.startDate = new Date().toISOString().split('T')[0];
      boss.currentDamage = 0;
      dispatch({ type: 'SET_BOSS', payload: boss });
    }
  }, [state.bossFights.current, state.bossFights.defeated, state.bossFights.cycle, dispatch]);

  const boss = state.bossFights.current;
  if (!boss) return null;

  const startDate = new Date(boss.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);
  const now = new Date();
  const daysRemaining = Math.max(0, Math.ceil((endDate - now) / (1000 * 60 * 60 * 24)));
  const urgency = getBossUrgency(daysRemaining);

  const damage = calculateBossDamage(boss, state.workouts, boss.startDate);
  const hpPercent = Math.min((damage / boss.hp) * 100, 100);

  return (
    <div className="boss-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 28 }}>{boss.icon}</span>
        <div>
          <div className="boss-name">{boss.name}</div>
          <div className="boss-desc">{boss.description}</div>
        </div>
      </div>

      <div className="progress-bar" style={{ height: 10, marginBottom: 6 }}>
        <div
          className={`progress-bar-fill boss ${hpPercent >= 80 ? 'near' : ''}`}
          style={{ width: `${hpPercent}%` }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          {damage}/{boss.hp}
        </span>
        <span style={{ color: urgency === 'critical' ? 'var(--accent-red)' : urgency === 'warning' ? 'var(--accent-orange)' : 'var(--text-dim)' }}>
          {daysRemaining}j restant{daysRemaining > 1 ? 's' : ''}
        </span>
      </div>

      {hpPercent >= 100 && (
        <button
          className="btn-primary"
          style={{ marginTop: 12, background: 'linear-gradient(135deg, var(--accent-red), var(--accent-orange))' }}
          onClick={() => dispatch({ type: 'DEFEAT_BOSS' })}
        >
          Vaincre le boss! (+{boss.reward?.xp} XP)
        </button>
      )}
    </div>
  );
}

function calculateBossDamage(boss, workouts, startDate) {
  const start = new Date(startDate);
  let damage = 0;

  for (const [date, workout] of Object.entries(workouts)) {
    if (new Date(date) < start) continue;

    switch (boss.type) {
      case 'complete_all_workouts':
        damage += 1;
        break;
      case 'total_pullups':
        for (const ex of workout.exercises) {
          if (ex.id.includes('traction')) {
            damage += ex.setsCompleted.filter(Boolean).length * ex.reps;
          }
        }
        break;
      case 'total_handstand_time':
        for (const ex of workout.exercises) {
          if (ex.id.includes('handstand')) {
            damage += ex.setsCompleted.filter(Boolean).length * ex.reps;
          }
        }
        break;
      case 'total_hollow_time':
        for (const ex of workout.exercises) {
          if (ex.id === 'hollow_body') {
            damage += ex.setsCompleted.filter(Boolean).length * ex.reps;
          }
        }
        break;
      case 'perfect_workouts': {
        const allDone = workout.exercises.every(ex => ex.setsCompleted.every(Boolean));
        if (allDone) damage += 1;
        break;
      }
    }
  }

  return damage;
}
